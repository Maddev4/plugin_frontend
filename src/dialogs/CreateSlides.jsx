import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import SlideCard from "../components/SlideCard";
import PresentationTextArea from "../components/PresentationTextArea";
import SidebarSection from "../components/SidebarSection";
import { DialogContext } from "./dialogIndex";
import api from "../utils/api";
import { toast } from "react-toastify";

const CreateSlides = () => {
  const {
    selectSlides,
    setSelectSlides,
    activeTab,
    setActiveTab,
    step,
    setStep,
    setLoading,
    deck,
    setDeck,
    delHistory,
    setDelHistory,
  } = useContext(DialogContext);

  const [mainSection, setMainSection] = useState(null);
  const [subSection, setSubSection] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [deleteSection, setDeleteSection] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tabs = [
    { id: "found", label: "Found Slides" },
    { id: "selected", label: "Selected Slides" },
  ];

  useEffect(() => {
    // Remove the loading animation when component is mounted
    const loadingElement = document.querySelector(".loading-wave");
    if (loadingElement) {
      loadingElement.style.display = "none";
    }
    if (deck && deck[0]) {
      setMainSection(deck[0].sectionName);
      setSubSection(deck[0].subSections[0].subSectionName);
      setSelectedCard(deck[0].sectionName);
    }
  }, []);

  const createDeck = async (payload) => {
    try {
      setLoading(true);
      const { data } = await api.post("/decks/", payload);
      setDeck(data.storylineSlides.sections);
      setMainSection(data.storylineSlides.sections[0].sectionName);
      setSubSection(data.storylineSlides.sections[0].subSections[0].subSectionName);
      setSelectedCard(data.storylineSlides.sections[0].sectionName);
      setStep("second");
      setLoading(false);
      toast.success("Deck created successfully");
    } catch (error) {
      console.error("Error creating deck:", error);
      setLoading(false);
      toast.error("Error creating deck");
    }
  };

  const insertToDeck = async (payload) => {
    try {
      setLoading(true);
      const { data } = await api.post("/decks/slides_from_file_name/", payload);
      // console.log("Data: ", data);
      // Get the dialog object using Office.context.ui
      const messageObject = {
        type: "insertSlide",
        payload: data,
      };

      // Use Office Dialog API to send message to parent
      Office.context.ui.messageParent(JSON.stringify(messageObject));
      toast.success("Slides inserted to deck successfully");
      console.log("Message sent to taskpane:", messageObject);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
      toast.error("Error inserting slides to deck");
    }
  };

  return (
    <>
      <div
        className={
          step === "first"
            ? "ml-[200px] mr-[200px] min-h-screen bg-white flex flex-col z-0 flex justify-center items-center pt-[100px]"
            : "ml-[100px] mr-[240px] min-h-screen bg-white flex flex-col z-0 flex justify-center items-center "
        }
      >
        <div className="w-[80%]">
          <div className="flex-1 p-4 w-full overflow-y-auto">
            {/* Search and Filter */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-between mb-6 w-[100%]">
                <PresentationTextArea step={step} setStep={setStep} createDeck={createDeck} />
              </div>
            </div>

            {/* Tabs */}
            {step === "second" && (
              <div className="flex border-b border-[#E6E6EA] justify-between">
                <div className="flex gap-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-1 py-2 text-sm font-medium transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "text-[#00BEC0] border-b-2 border-[#00BEC0] -mb-[1px]"
                        : "text-[#666666] hover:text-[#333333]"
                    }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <h2 className="text-lg text-[#666666]">{`${selectSlides.filter((sli) => !sli.deleted).length || "No"} Selected Slides`}</h2>
              </div>
            )}

            {/* Grid Content */}
            <div className={`flex flex-col ${step !== "first" ? "overflow-y-auto min-h-[500px]" : ""}`}>
              <div className="flex flex-col h-full">
                {activeTab === "found" ? (
                  <div
                    className={`
                ${
                  step === "first" ? "flex flex-row gap-2 pb-4 " : "flex flex-col grid grid-cols-3 gap-2 pb-4 mt-[20px]"
                }
              `}
                  >
                    {(subSection
                      ? deck
                          ?.find((item) => item.sectionName === mainSection)
                          ?.subSections.find((item) => item.subSectionName === subSection)?.slides || []
                      : deck
                        ? deck[0]?.subSections[0]?.slides || []
                        : []
                    ).map((slide, index) => (
                      <div
                        key={slide.slideId}
                        className={`
                    ${step === "first" ? "flex-shrink-0 w-[180px]" : ""}
                  `}
                      >
                        <SlideCard slide={slide} mainSection={mainSection} subSection={subSection} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`flex flex-col ${selectSlides.length ? "grid grid-cols-3" : ""} gap-2 pb-4 mt-[20px] h-full`}
                  >
                    {selectSlides.length ? (
                      selectSlides
                        ?.filter((sli) => !sli.deleted)
                        .map((slide, index) => (
                          <div key={slide.slideId}>
                            <SlideCard
                              slide={slide}
                              setSelectSlides={setSelectSlides}
                              selectSlides={selectSlides}
                              mainSection={slide.mainSection}
                              subSection={slide.subSection}
                            />
                          </div>
                        ))
                    ) : (
                      <h1 className="text-center text-gray-500 text-2xl pt-20">No Slides Selected</h1>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Bottom Buttons */}
          {step === "second" && (
            <div className="sticky bottom-0 w-full border-t border-[#e6e6ea] bg-white p-4 flex justify-end">
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border border-[#00BEC0] text-[#00BEC0] hover:bg-[#f0fafa] transition-colors">
                  AI edits
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-[#00BEC0] text-white hover:bg-[#00a5a7] transition-colors"
                  onClick={() => {
                    if (selectSlides.length === 0) {
                      toast.error("No slides selected");
                      return;
                    }
                    insertToDeck(
                      // { file_name: "mckinsey.pptx" }
                      selectSlides.map((item) => ({
                        slide_id: item.slideId,
                        file_id: item.fileId,
                      }))
                    );
                  }}
                >
                  Insert to deck
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      {step === "second" && (
        <div className="w-[240px] h-full right-0 h-full fixed top-0 border-l border-[#e6e6ea] bg-white p-4 overflow-y-auto hide-scrollbar">
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium">Content Structure</h3>

            {deck?.map((section, index) => (
              <SidebarSection
                key={index + 1}
                title={section.sectionName}
                items={section.subSections}
                mainSection={mainSection}
                subSection={subSection}
                selectedCard={selectedCard}
                isExpanded={index === 0} // First section expanded by default
                setMainSection={setMainSection}
                setSubSection={setSubSection}
                setSelectedCard={setSelectedCard}
                setIsDialogOpen={setIsDialogOpen}
                setDeleteSection={setDeleteSection}
              />
            ))}
          </div>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={(e, data) => setIsDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete Section</DialogTitle>
            <DialogContent>{`Are you sure you want to delete the section "${deleteSection}"?`}</DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  setDelHistory((state) => [...state, deleteSection]);
                  setDeck((state) =>
                    state.map((item) =>
                      item.sectionName === deleteSection ? { ...item, deleted: delHistory.length + 1 } : item
                    )
                  );
                  setSelectSlides((state) =>
                    state.map((item) =>
                      item.mainSection === deleteSection ? { ...item, deleted: delHistory.length + 1 } : item
                    )
                  );
                  setIsDialogOpen(false);
                  setSelectedCard(null);
                  setMainSection(null);
                  setSubSection(null);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default CreateSlides;
