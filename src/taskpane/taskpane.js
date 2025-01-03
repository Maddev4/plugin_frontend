/* global Office */

const showModal = async (text) => {
  if (!text) return;

  return new Promise((resolve, reject) => {
    try {
      console.log("Starting to create slide with text:", text);

      Office.onReady((info) => {
        if (info.host === Office.HostType.PowerPoint) {
          // Initialize your app here
          console.log("Office.js is ready in PowerPoint");
        }
      });

      console.log(Office.context.requirements.isSetSupported("PowerPointApi", "1.1"))

      // Ensure we're in PowerPoint context
      if (Office.context.requirements.isSetSupported("PowerPointApi", "1.1")) {
        // First, create a new slide
        Office.context.document.setSelectedDataAsync(
          "", // Empty string as we just want to create a slide
          {
            coercionType: Office.CoercionType.Text,
            insertMode: "Slide", // Changed from Office.InsertMode.Slide to "Slide"
          },
          (result) => {
            if (result.status === Office.AsyncResultStatus.Failed) {
              console.error("Failed to create slide:", result.error.message);
              reject(result.error);
              return;
            }

            // Now add the text to the new slide
            Office.context.document.setSelectedDataAsync(
              text,
              {
                coercionType: Office.CoercionType.Text,
                insertMode: "InsertIntoSlide", // Changed from Office.InsertMode.InsertIntoSlide to "InsertIntoSlide"
              },
              (textResult) => {
                if (textResult.status === Office.AsyncResultStatus.Failed) {
                  console.error("Failed to add text:", textResult.error.message);
                  reject(textResult.error);
                } else {
                  console.log("Slide created and text added successfully");
                  resolve();
                }
              }
            );
          }
        );
      } else {
        throw new Error("PowerPoint API is not supported in this version");
      }
    } catch (error) {
      console.error("Error creating slide:", error);
      reject(error);
    }
  });
};

export default {
  showModal,
};
