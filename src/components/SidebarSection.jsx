import { Card } from "@fluentui/react-components";
import React, { useState } from "react";

const SidebarSection = ({
  title,
  items = [],
  mainSection,
  subSection,
  selectedCard,
  isExpanded: defaultExpanded = false,
  setMainSection = (f) => f,
  setSubSection = (f) => f,
  setDeleteSection = (f) => f,
  setIsDialogOpen = (f) => f,
  setSelectedCard = (f) => f,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // console.log("item------------->", items);
  return (
    <>
      <Card
        className={`border-[1px] border-transparent ${selectedCard === title ? "!border-[#00BEC0]" : ""}`}
        onClick={() => {
          setSelectedCard(title);
        }}
      >
        <div className="flex flex-col gap-2">
          <div
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center w-full p-2 rounded-md"
          >
            <div className="flex items-center w-full">
              <span className="text-sm font-medium">{title}</span>
              &nbsp;&nbsp;
              <div className="flex items-center">
                <svg
                  className={`w-4 h-4 transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {selectedCard === title && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                    setDeleteSection(title);
                  }}
                  className="mr-2 p-1 ml-auto hover:bg-gray-100 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {isExpanded && items.length > 0 && (
            <div className="ml-2 flex flex-col gap-1">
              {items.map((item, index) => (
                <button
                  key={index + 1}
                  className={`flex items-center gap-2 p-2 rounded-md text-sm hover:bg-blue-100 border-[1px] border-transparent ${
                    subSection === item.subSectionName ? "!border-[#00BEC0]" : ""
                  }`}
                  onClick={() => {
                    setSubSection(item.subSectionName);
                    setMainSection(title);
                  }}
                >
                  <span>{item.subSectionName}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default SidebarSection;
