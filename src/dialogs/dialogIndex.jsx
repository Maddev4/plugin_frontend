import React, { useEffect, useState, createContext } from "react";
import { createRoot } from "react-dom/client";
import SearchSlides from "./SearchSlides";
import CreateSlides from "./CreateSlides";
import Sidebar from "../components/Sidebar";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "../styles/globals.css";

/* global document, Office */

// Create context
export const DialogContext = createContext();

const Layout = ({ children, appState, setAppState = (f) => f }) => {
  const [activeButton, setActiveButton] = useState(window.localStorage.getItem("appState"));

  // Add shared state here
  const [filters, setFilters] = useState([]);

  // Create Slides
  const [activeTab, setActiveTab] = useState("found");
  const [step, setStep] = useState("first");
  const [deck, setDeck] = useState(null);
  const [delHistory, setDelHistory] = useState([]);
  const [selectSlides, setSelectSlides] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Create context value object
  const contextValue = {
    selectSlides,
    setSelectSlides,
    userQuery,
    setUserQuery,
    selectedFile,
    setSelectedFile,
    filters,
    setFilters,
    appState,
    setAppState,
    activeTab,
    setActiveTab,
    step,
    setStep,
    deck,
    setDeck,
    delHistory,
    setDelHistory,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      <div className="h-screen w-screen">
        <div className="absolute bg-white overflow-y-auto hide-scrollbar shadow-lg w-full h-full">
          <Sidebar activeButton={activeButton} setActiveButton={setActiveButton} />
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
};

const DialogContent = () => {
  const [appState, setAppState] = useState(null);

  useEffect(() => {
    const savedState = window.localStorage.getItem("appState");
    setAppState(savedState);

    window.addEventListener("storage", (e) => {
      if (e.key === "appState") {
        console.log("appState", e.newValue);
        setAppState(e.newValue);
      }
    });
  }, []);

  switch (appState) {
    case "create":
      return (
        <Layout appState={appState} setAppState={setAppState}>
          <CreateSlides />
        </Layout>
      );
    case "search":
      return (
        <Layout appState={appState} setAppState={setAppState}>
          <SearchSlides />
        </Layout>
      );
    default:
      return <div>Loading...</div>;
  }
};

// Wait for both Office and DOM to be ready
function initialize() {
  try {
    console.log("Initializing dialog");
    const container = document.getElementById("container");

    if (!container) {
      throw new Error("Container element not found");
    }

    // Clear loading message
    container.innerHTML = "";

    const root = createRoot(container);

    console.log("Creating root and rendering component");

    root.render(
      <FluentProvider theme={webLightTheme}>
        <DialogContent />
      </FluentProvider>
    );
  } catch (error) {
    console.error("Error in dialog initialization:", error);
    const loadingElement = document.querySelector(".loading");
    if (loadingElement) {
      loadingElement.innerHTML = `Error: ${error.message}`;
    }
  }
}

// Ensure Office is initialized before rendering
if (window.Office) {
  Office.onReady((info) => {
    if (info.host === Office.HostType.PowerPoint) {
      console.log("PowerPoint is ready");
      console.log("Office.onReady called in dialog");
      initialize();
    }
  });
} else {
  console.error("Office.js is not loaded");
  document.querySelector(".loading").innerHTML = "Error: Office.js is not loaded";
}

// Add error boundary for uncaught errors
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global error:", { message, source, lineno, colno, error });
};
