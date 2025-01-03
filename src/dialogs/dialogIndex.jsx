import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import SearchSlides from "./SearchSlides";
import CreateSlides from "./CreateSlides";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "../styles/globals.css";

/* global document, Office */

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
      return <CreateSlides />;
    case "search":
      return <SearchSlides />;
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
