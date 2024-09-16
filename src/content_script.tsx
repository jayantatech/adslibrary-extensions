// import React from "react";
// import { createRoot } from "react-dom/client";
// import CustomElement from "./SaveToLibrary";

// console.log("Script is running on Facebook Ads Library page");

// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms
// const renderedElements = new Set<Element>();

// // Function to add the React component to all target elements
// function addCustomElement() {
//   const targetSpans = document.querySelectorAll(
//     "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//   );

//   targetSpans.forEach((targetSpan) => {
//     if (renderedElements.has(targetSpan)) {
//       return; // Skip if already rendered
//     }

//     const nextSibling = targetSpan.nextSibling;
//     if (
//       nextSibling &&
//       (nextSibling as HTMLElement).textContent ===
//         "Created by Jay and I own biswas"
//     ) {
//       return; // Avoid adding the same element multiple times
//     }

//     // Create a container div to render the React component into
//     const containerDiv = document.createElement("div");
//     targetSpan.insertAdjacentElement("afterend", containerDiv);

//     // Use React's createRoot to render the component
//     const root = createRoot(containerDiv);
//     root.render(<CustomElement />);

//     // Mark the element as processed
//     renderedElements.add(targetSpan);
//   });
// }

// // Throttled observer callback
// function throttledAddCustomElement() {
//   const currentTime = Date.now();
//   if (currentTime - lastExecutionTime >= throttleTime) {
//     addCustomElement();
//     lastExecutionTime = currentTime;
//   }
// }

// // MutationObserver to monitor DOM changes
// const observer = new MutationObserver(() => {
//   throttledAddCustomElement();
// });

// observer.observe(document.body, {
//   childList: true,
//   subtree: true,
// });

// // Initial call to add custom elements immediately on load
// addCustomElement();

import React from "react";
import { createRoot } from "react-dom/client";
import SaveToLibrary from "./SaveToLibrary";

console.log("Script is running on Facebook Ads Library page");

let lastExecutionTime = 0;
const throttleTime = 200; // Throttle interval in ms
const renderedElements = new Set<Element>();

// Function to add the React component to all target elements
function addCustomElement() {
  const targetSpans = document.querySelectorAll(
    "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
  );

  targetSpans.forEach((targetSpan) => {
    // Check if the element has been processed (either in Set or by class name)
    if (
      renderedElements.has(targetSpan) ||
      (targetSpan as HTMLElement).classList.contains("rendered-by-script")
    ) {
      return; // Skip if already rendered
    }

    // Create a container div to render the React component into
    const containerDiv = document.createElement("div");
    targetSpan.insertAdjacentElement("afterend", containerDiv);

    // Use React's createRoot to render the component
    const root = createRoot(containerDiv);
    root.render(<SaveToLibrary />);

    // Mark the element as processed
    renderedElements.add(targetSpan);
    (targetSpan as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
  });
}

// Throttled observer callback
function throttledAddCustomElement() {
  const currentTime = Date.now();
  if (currentTime - lastExecutionTime >= throttleTime) {
    addCustomElement();
    lastExecutionTime = currentTime;
  }
}

// MutationObserver to monitor DOM changes
const observer = new MutationObserver((mutations) => {
  // Only act on added nodes, not attribute or other changes
  for (const mutation of mutations) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      throttledAddCustomElement();
      break;
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial call to add custom elements immediately on load
addCustomElement();
