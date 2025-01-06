import React, { useCallback, useEffect, useState } from "react";
import taskpane from "./taskpane";

export default function App() {
  const [mode, setMode] = useState(null);

  const showDialog = async (inputMode) => {
    try {
      // For web mode, we need to use the full URL
      const dialogUrl = `${window.location.protocol}//${window.location.host}/textDialog.html`;

      console.log("Opening dialog with URL:", dialogUrl); // For debugging

      const dialogOptions = {
        width: 75,
        height: 75,
        displayInIframe: true,
        title: "Insert",
      };

      // First set the mode so the dialog knows what to display
      setMode(inputMode);
      window.localStorage.setItem("appState", inputMode);

      Office.context.ui.displayDialogAsync(dialogUrl, dialogOptions, (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          console.error(`Dialog failed to open: ${result.error.message}`);
          return;
        }

        const dialog = result.value;

        // Handle messages from dialog
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, async (args) => {
          try {
            // console.log("Message received from dialog:", args.message);

            const {
              type,
              payload: { base64Only, slideIds },
            } = JSON.parse(args.message);
            console.log("payload:", { base64Only, slideIds });

            if (type === "insertSlide") {
              console.log("Inserting slide");
              try {
                await PowerPoint.run(async (context) => {
                  // Load the presentation first
                  const presentation = context.presentation;
                  context.load(presentation);
                  await context.sync();
                  console.log("Presentation loaded");

                  // Delete all existing slides before inserting new ones
                  const slides = context.presentation.slides;
                  slides.load("items");
                  await context.sync();

                  console.log("Current slides count:", slides.items.length);

                  // Delete slides in reverse order
                  for (let i = slides.items.length - 1; i >= 0; i--) {
                    slides.items[i].delete();
                  }
                  await context.sync();
                  console.log("Deleted existing slides");

                  // Validate base64 and slideIds
                  if (!base64Only) {
                    throw new Error("base64Only is empty or invalid");
                  }
                  if (!slideIds || !slideIds.length) {
                    throw new Error("slideIds is empty or invalid");
                  }

                  // Insert new slides
                  console.log("Starting slide insertion...");
                  presentation.insertSlidesFromBase64(base64Only, {
                    sourceSlideIds: slideIds,
                  });

                  // Important: The sync call is what we need to await, not insertSlidesFromBase64
                  await context.sync();
                  console.log("Slides inserted successfully");

                  // Verify the insertion
                  slides.load("items");
                  await context.sync();
                  console.log("New slides count:", slides.items.length);
                });
              } catch (error) {
                console.error("Error in slide insertion:", error);
                if (error.debugInfo) {
                  console.error("Debug info:", error.debugInfo);
                }
                // Optionally notify the user
                dialog.close(); // Close the dialog on error
              }
            }
          } catch (error) {
            console.error("Error handling dialog message:", error);
          } finally {
            // dialog.close();
          }
        });

        // Handle dialog closed event
        dialog.addEventHandler(Office.EventType.DialogEventReceived, (arg) => {
          console.log("Dialog event received:", arg);
        });
      });
    } catch (error) {
      console.error("Error showing dialog:", error);
    }
  };

  useEffect(() => {
    if (mode) {
      window.localStorage.setItem("appState", mode);
    }
  }, [mode]);

  const renderHeader = () => (
    <header className="flex items-center mb-5">
      <button className="text-2xl p-2 transition-transform active:scale-90">☰</button>
      <h1 className="ml-2 text-2xl text-[#00A4A6]">Cordial</h1>
    </header>
  );

  const renderSearchBar = () => (
    <div className="mb-4">
      <button
        className="w-full p-4 rounded-lg bg-[#00BEC0] text-white flex items-center gap-2 justify-center
          transition-all hover:shadow-md active:scale-[0.98]"
        onClick={() => showDialog("search")}
      >
        {/* <span className="opacity-80 text-lg">🔍</span> */}
        Search Slides
      </button>
    </div>
  );

  const renderCreateButton = () => (
    <button
      className="w-full p-4 rounded-lg bg-white shadow-sm flex items-center justify-center gap-3 
      transition-all hover:shadow-md active:scale-[0.98]"
      onClick={() => showDialog("create")}
    >
      <span className="text-gray-600">+</span>
      Create Slides
    </button>
  );

  const renderChatInput = () => (
    <div className="relative mt-4">
      <textarea
        placeholder="Ask for any changes..."
        className="w-full min-h-[150px] p-4 rounded-lg bg-white shadow-sm resize-none 
          text-sm outline-none transition-all focus:scale-[1.01] focus:shadow-md"
      />
      <button
        className="absolute bottom-3 left-3 text-xl opacity-60 transition-all 
        hover:opacity-100 active:scale-90"
      >
        💬
      </button>
    </div>
  );

  return (
    <div className="w-full mx-auto p-4 min-h-screen bg-[#FAFAFA]">
      {renderHeader()}
      {renderSearchBar()}
      {renderCreateButton()}
      {renderChatInput()}
    </div>
  );
}
