// import React, { useEffect, useState } from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary from "./SaveToLibrary";

// console.log("Script is running on Facebook Ads Library page");

// type CardData = {
//   image?: string;
//   url?: string;
//   name?: string;
//   description?: string;
// };

// // Function to extract card details (image, URL, name, description)
// const extractCardDetails = (): CardData[] => {
//   const cards = document.querySelectorAll("div._3qn7._61-0._2fyi._3qng");
//   const extractedData: CardData[] = [];

//   cards.forEach((card) => {
//     const cardData: CardData = {};

//     // Extract the image URL
//     const imageElement = card.querySelector("img");
//     if (imageElement instanceof HTMLImageElement) {
//       cardData.image = imageElement.src;
//     }

//     // Extract the URL
//     const linkElement = card.querySelector("a");
//     if (linkElement instanceof HTMLAnchorElement) {
//       cardData.url = linkElement.href;
//     }

//     // Extract the name (title)
//     const nameElement = card.querySelector(
//       "span.x8t9es0.x1fvot60.xxio538.x108nfp6.xq9mrsl.x1h4wwuj.x117nqv4.xeuugli"
//     );
//     if (nameElement) {
//       cardData.name = nameElement.textContent || "";
//     }

//     // Extract the description
//     const descriptionElement = card.querySelector("div._4ik4._4ik5 span");
//     if (descriptionElement) {
//       cardData.description = descriptionElement.textContent || "";
//     }

//     if (Object.keys(cardData).length > 0) {
//       extractedData.push(cardData);
//     }
//   });

//   console.log(extractedData); // For debugging purposes
//   return extractedData;
// };

// // Set to keep track of rendered elements and avoid duplicates
// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms

// // Function to add React components and extract card data
// function addCustomElement() {
//   const targetSpans = document.querySelectorAll(
//     "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//   );

//   targetSpans.forEach((targetSpan) => {
//     // Check if the element has been processed (either in Set or by class name)
//     if (
//       renderedElements.has(targetSpan) ||
//       (targetSpan as HTMLElement).classList.contains("rendered-by-script")
//     ) {
//       return; // Skip if already rendered
//     }

//     // Create a container div to render the React component into
//     const containerDiv = document.createElement("div");
//     targetSpan.insertAdjacentElement("afterend", containerDiv);

//     // Use React's createRoot to render the component
//     const root = createRoot(containerDiv);
//     root.render(<SaveToLibrary />);

//     // Mark the element as processed
//     renderedElements.add(targetSpan);
//     (targetSpan as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
//   });

//   // Extract card details after rendering the custom elements
//   extractCardDetails();
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
// const observer = new MutationObserver((mutations) => {
//   // Only act on added nodes, not attribute or other changes
//   for (const mutation of mutations) {
//     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//       throttledAddCustomElement();
//       break;
//     }
//   }
// });

// // Start observing the DOM for changes
// observer.observe(document.body, {
//   childList: true,
//   subtree: true,
// });

// // Initial call to add custom elements immediately on load
// addCustomElement();
