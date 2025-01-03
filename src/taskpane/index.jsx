import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "../styles/globals.css";
/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";

const rootElement = document.getElementById("container");
if (!rootElement) {
  console.error("Failed to find container element");
}
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady((info) => {
  console.log("Office.onReady called", info);
  if (root) {
    try {
      root.render(
        <FluentProvider theme={webLightTheme}>
          <App title={title} />
        </FluentProvider>
      );
    } catch (error) {
      console.error("Error rendering app:", error);
    }
  } else {
    console.error("Root element not initialized");
  }
}).catch((error) => {
  console.error("Office initialization failed:", error);
});

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    root?.render(NextApp);
  });
}
