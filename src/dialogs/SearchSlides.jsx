import React, { useState, useEffect } from "react";
import { Icons3 } from "../icons/Icons3";
import { Icons4 } from "../icons/Icons4";
import { Property1Hisotry } from "../icons/Property1Hisotry";
import { Property1Plus1 } from "../icons/Property1Plus1";
import { Property1Template } from "../icons/Property1Template";
import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4 from "../img/4.png";
import img5 from "../img/5.png";
import img6 from "../img/6.png";
import Sidebar from "../components/Sidebar";

const SearchSlides = () => {
  const [activeButton, setActiveButton] = useState(window.localStorage.getItem("appState"));
  const [activeTab, setActiveTab] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Filter categories
  const filterCategories = {
    industry: ["Renewables", "Manufacutring"],
    productOffering: ["Operating model", "Strategy"],
    other: ["Bot", "Copilot plugin", "Meeting", "Messaging", "Personal", "Tab"],
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterSelect = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const slides = [
    {
      title: "Endless options for data visualization",
      image: img1,
      type: "slide 1 - slide name here",
    },
    {
      title: "Apps Designed for Collaboration",
      image: img2,
      type: "slide 1 - slide name here",
    },
    {
      title: "Apps Designed for Collaboration",
      image: img3,
      type: "slide 1 - slide name here",
    },
    {
      title: "Classroom Collaboration",
      image: img4,
      type: "slide 1 - slide name here",
    },
    {
      title: "Collaboration Journey",
      image: img5,
      type: "slide 1 - slide name here",
    },
    {
      title: "About us",
      image: img6,
      type: "slide 1 - slide name here",
    },
    {
      title: "Classroom Collaboration",
      image: img4,
      type: "slide 1 - slide name here",
    },
    {
      title: "Collaboration Journey",
      image: img5,
      type: "slide 1 - slide name here",
    },
    {
      title: "About us",
      image: img6,
      type: "slide 1 - slide name here",
    },
  ];

  const tabs = [
    { id: "recent", label: "Recent slides" },
    { id: "common", label: "Most common slides" },
    { id: "favorite", label: "Your favorite slides" },
    { id: "selected", label: "Selected slides" },
  ];

  useEffect(() => {
    // Remove the loading animation when component is mounted
    const loadingElement = document.querySelector(".loading-wave");
    if (loadingElement) {
      loadingElement.style.display = "none";
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="absolute bg-white overflow-hidden animate-slideUp shadow-lg w-[100%] h-[100%]">
        {/* Modal Header */}

        {/* Left Sidebar */}
        {/* <div className="inline-flex flex-col h-[664px] items-start justify-center gap-2.5 px-3 py-20 fixed top-9 left-0 bg-white border-r [border-right-style:solid] border-[#e6e6ea]">
          <div className="inline-flex flex-col items-center gap-6 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              {renderButton("create")}
              {renderButton("history")}
              {renderButton("templates")}
              {renderButton("upload")}
              {renderButton("connections")}
            </div>
          </div>
        </div> */}
        <Sidebar activeButton={activeButton} setActiveButton={setActiveButton} />
        {/* Main Content Area */}
        <div className="absolute left-[100px] right-0 top-9 bottom-0 bg-white flex justify-center overflow-hidden">
          <div className="p-6 w-[80%] overflow-y-auto hide-scrollbar">
            {/* Search and Filter */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-between mb-6 w-[80%]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for slides by typing down the content or the visuals"
                    className="w-full h-[38px] px-4 pr-10 py-2 bg-[#F5F5F5] rounded-lg 
                    text-sm outline-none focus:border-[#00BEC0] transition-all duration-200"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transform transition-transform duration-200 hover:rotate-180"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#666666"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={handleFilterClick}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#666666] hover:bg-gray-50 rounded-lg"
                  >
                    Filter {selectedFilters.length > 0 && `(${selectedFilters.length})`}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8h8M2 4h12M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* Filter Dropdown */}
                  {showFilters && (
                    <div className="absolute right-0 top-full mt-2 w-[400px] bg-white rounded-lg shadow-lg p-4 z-50 border border-[#E6E6EA]">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">
                          Filter {selectedFilters.length > 0 && `(${selectedFilters.length})`}
                        </h3>
                        <button
                          onClick={() => setSelectedFilters([])}
                          className="text-sm text-[#00BEC0] hover:underline"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="flex gap-8">
                        {/* Left Column */}
                        <div className="flex-1">
                          {/* Industry Section */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="checkbox"
                                id="industry"
                                className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                              />
                              <label htmlFor="industry" className="font-medium">
                                Industry
                              </label>
                            </div>
                            <div className="ml-6 space-y-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="renewables"
                                  className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                                />
                                <label htmlFor="renewables" className="text-sm text-[#666666]">
                                  Renewables
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="manufacturing"
                                  className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                                />
                                <label htmlFor="manufacturing" className="text-sm text-[#666666]">
                                  Manufacturing
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Product Offering Section */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="checkbox"
                                id="product-offering"
                                className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                              />
                              <label htmlFor="product-offering" className="font-medium">
                                Product offering
                              </label>
                            </div>
                            <div className="ml-6 space-y-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="operating-model"
                                  className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                                />
                                <label htmlFor="operating-model" className="text-sm text-[#666666]">
                                  Operating model
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="strategy"
                                  className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                                />
                                <label htmlFor="strategy" className="text-sm text-[#666666]">
                                  Strategy
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1">
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <input type="checkbox" id="other" className="w-4 h-4 rounded border-2 border-[#E6E6EA]" />
                              <label htmlFor="other" className="font-medium">
                                Other
                              </label>
                            </div>
                            <div className="ml-6 space-y-2">
                              {["Bot", "Copilot plugin", "Meeting", "Messaging", "Personal", "Tab"].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={item.toLowerCase().replace(" ", "-")}
                                    className="w-4 h-4 rounded border-2 border-[#E6E6EA]"
                                  />
                                  <label
                                    htmlFor={item.toLowerCase().replace(" ", "-")}
                                    className="text-sm text-[#666666]"
                                  >
                                    {item}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-[#E6E6EA]">
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

            {/* Grid Content */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {slides.map((slide, index) => (
                <div key={index} className="group">
                  {/* Card Container */}
                  <div
                    className="rounded-lg overflow-hidden bg-white border border-[#E6E6EA] 
                    transition-all duration-200 hover:border-[#00BEC0] hover:shadow-md"
                  >
                    {/* Image Container */}
                    <div className="aspect-[16/9] w-full">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Checkbox and Label - Now Below Image */}
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-[#E6E6EA] 
                        checked:bg-[#00BEC0] checked:border-[#00BEC0]
                        transition-colors duration-200 cursor-pointer"
                    />
                    <span className="text-sm text-[#666666]">{slide.type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrow */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSlides;
