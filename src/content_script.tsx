// import React from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary from "./SaveToLibrary";

// console.log("Script is running on Facebook Ads Library page");

// type CardData = {
//   brandLogo?: string;
//   url?: string;
//   name?: string;
//   description?: string;
// };

// // Function to extract card details for a specific ad (logo image, URL, name, description)
// const extractCardDetails = (card: Element): CardData | null => {
//   const cardData: CardData = {};

//   // Extract the logo image URL
//   const imageElement = card.querySelector("div._3qn7 img");
//   if (imageElement instanceof HTMLImageElement) {
//     cardData.brandLogo = imageElement.src;
//   }

//   // Extract the URL
//   const linkElement = card.querySelector("a.xt0psk2");
//   if (linkElement instanceof HTMLAnchorElement) {
//     cardData.url = linkElement.href;
//   }

//   // Extract the name (title)
//   const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
//   if (nameElement) {
//     cardData.name = nameElement.textContent || "";
//   }

//   // Extract the description (Sponsored)
//   const descriptionElement = card.querySelector("div._4ik4 div span");
//   if (descriptionElement) {
//     cardData.description = descriptionElement.textContent || "undifined";
//   }

//   if (Object.keys(cardData).length > 0) {
//     return cardData;
//   }

//   return null;
// };

// // Set to keep track of rendered elements and avoid duplicates
// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms

// // Function to add React components for each ad and handle button click
// function addCustomElement() {
//   // Select the main parent div where all the data is present
//   const targetAds = document.querySelectorAll(
//     "div._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
//   );

//   targetAds.forEach((adElement) => {
//     // Check if the element has been processed (either in Set or by class name)
//     if (
//       renderedElements.has(adElement) ||
//       (adElement as HTMLElement).classList.contains("rendered-by-script")
//     ) {
//       return; // Skip if already rendered
//     }

//     // Now target the correct div to inject after
//     const targetSpans = adElement.querySelectorAll(
//       "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//     );

//     targetSpans.forEach((targetSpan) => {
//       // Check if the specific span has already been processed
//       if (renderedElements.has(targetSpan)) {
//         return; // Skip if already rendered
//       }

//       // Create a container div to render the React component into
//       const containerDiv = document.createElement("div");
//       targetSpan.insertAdjacentElement("afterend", containerDiv);

//       // Use React's createRoot to render the component
//       const root = createRoot(containerDiv);
//       root.render(<SaveToLibrary onSave={() => handleSaveAd(adElement)} />);

//       // Mark the element as processed
//       renderedElements.add(targetSpan);
//     });

//     // Mark the parent ad element as processed
//     renderedElements.add(adElement);
//     (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
//   });
// }

// // Function to handle "Save Ad" button click
// const handleSaveAd = (adElement: Element) => {
//   const adData = extractCardDetails(adElement);
//   if (adData) {
//     console.log("Ad Data:", adData);
//     // You can perform further actions here, such as saving the adData or sending it to a server
//   } else {
//     console.log("No ad data found for this element.");
//   }
// };

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

// export default addCustomElement;

// import React from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary from "./SaveToLibrary";

// console.log("Script is running on Facebook Ads Library page");

// type CardData = {
//   brandLogo?: string;
//   url?: string;
//   name?: string;
//   description?: string;
//   posterImages?: string[]; // Array to store multiple poster images
// };

// // Function to extract card details for a specific ad (logo image, URL, name, description, poster images)
// const extractCardDetails = (card: Element): CardData | null => {
//   const cardData: CardData = {};

//   // Extract the logo image URL
//   const imageElement = card.querySelector("div._3qn7 img");
//   if (imageElement instanceof HTMLImageElement) {
//     cardData.brandLogo = imageElement.src;
//   }

//   // Extract the URL
//   const linkElement = card.querySelector("a.xt0psk2");
//   if (linkElement instanceof HTMLAnchorElement) {
//     cardData.url = linkElement.href;
//   }

//   // Extract the name (title)
//   const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
//   if (nameElement) {
//     cardData.name = nameElement.textContent || "";
//   }

//   // Extract the description (using the provided selector)
//   const descriptionElement = card.querySelector("div._4ik4._4ik5 div span");
//   if (descriptionElement) {
//     cardData.description = descriptionElement.textContent || "undefined";
//   }

//   // Extract poster images (could be multiple, so we store in an array)
//   const posterImageElements = card.querySelectorAll(
//     "div.x78zum5.x1iyjqo2.x1n2onr6.x1q0g3np img"
//   );
//   const posterImages: string[] = [];
//   posterImageElements.forEach((imgElement) => {
//     if (imgElement instanceof HTMLImageElement) {
//       posterImages.push(imgElement.src);
//     }
//   });
//   if (posterImages.length > 0) {
//     cardData.posterImages = posterImages;
//   }

//   if (Object.keys(cardData).length > 0) {
//     return cardData;
//   }

//   return null;
// };

// // Set to keep track of rendered elements and avoid duplicates
// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms

// // Function to add React components for each ad and handle button click
// function addCustomElement() {
//   // Select the main parent div where all the data is present
//   const targetAds = document.querySelectorAll(
//     "div._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
//   );

//   targetAds.forEach((adElement) => {
//     // Check if the element has been processed (either in Set or by class name)
//     if (
//       renderedElements.has(adElement) ||
//       (adElement as HTMLElement).classList.contains("rendered-by-script")
//     ) {
//       return; // Skip if already rendered
//     }

//     // Now target the correct div to inject after
//     const targetSpans = adElement.querySelectorAll(
//       "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//     );

//     targetSpans.forEach((targetSpan) => {
//       // Check if the specific span has already been processed
//       if (renderedElements.has(targetSpan)) {
//         return; // Skip if already rendered
//       }

//       // Create a container div to render the React component into
//       const containerDiv = document.createElement("div");
//       targetSpan.insertAdjacentElement("afterend", containerDiv);

//       // Use React's createRoot to render the component
//       const root = createRoot(containerDiv);
//       root.render(<SaveToLibrary onSave={() => handleSaveAd(adElement)} />);

//       // Mark the element as processed
//       renderedElements.add(targetSpan);
//     });

//     // Mark the parent ad element as processed
//     renderedElements.add(adElement);
//     (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
//   });
// }

// // Function to handle "Save Ad" button click
// const handleSaveAd = (adElement: Element) => {
//   const adData = extractCardDetails(adElement);
//   if (adData) {
//     console.log("Ad Data:", adData);
//     // You can perform further actions here, such as saving the adData or sending it to a server
//   } else {
//     console.log("No ad data found for this element.");
//   }
// };

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

// export default addCustomElement;

//description is not working good but code is right

// import React from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary from "./SaveToLibrary";

// console.log("Script is running on Facebook Ads Library page");

// type CardData = {
//   brandLogo?: string;
//   url?: string;
//   name?: string;
//   description?: string;
//   mediaUrls?: string[];
//   adType?: "image" | "imageCarousel" | "video" | "videoCarousel";
// };

// // Function to extract card details for a specific ad (logo image, URL, name, description, media URLs)
// const extractCardDetails = (card: Element): CardData | null => {
//   const cardData: CardData = {};

//   // Extract the logo image URL
//   const imageElement = card.querySelector("div._3qn7 img");
//   if (imageElement instanceof HTMLImageElement) {
//     cardData.brandLogo = imageElement.src;
//   }

//   // Extract the URL
//   const linkElement = card.querySelector("a.xt0psk2");
//   if (linkElement instanceof HTMLAnchorElement) {
//     cardData.url = linkElement.href;
//   }

//   // Extract the name (title)
//   const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
//   if (nameElement) {
//     cardData.name = nameElement.textContent || "";
//   }

//   // Extract the description (using the provided selector)
//   const descriptionElement = card.querySelector("div._4ik4._4ik5 div span");
//   if (descriptionElement) {
//     cardData.description = descriptionElement.textContent || "undefined";
//   }

//   // Extract media URLs and determine ad type
//   const mediaUrls: string[] = [];

//   // Check for single image
//   const singleImageElement = card.querySelector(
//     "img.x1ll5gia.x19kjcj4.xh8yej3"
//   );
//   if (singleImageElement instanceof HTMLImageElement) {
//     mediaUrls.push(singleImageElement.src);
//     cardData.adType = "image";
//   }

//   // Check for image carousel
//   const carouselImageElements = card.querySelectorAll(
//     "div.x78zum5.x1iyjqo2.x1n2onr6.x1q0g3np img"
//   );
//   if (carouselImageElements.length > 1) {
//     carouselImageElements.forEach((imgElement) => {
//       if (imgElement instanceof HTMLImageElement) {
//         mediaUrls.push(imgElement.src);
//       }
//     });
//     cardData.adType = "imageCarousel";
//   }

//   // Check for video
//   const videoElement = card.querySelector("div.x78zum5 video");
//   if (videoElement instanceof HTMLVideoElement) {
//     const posterUrl = videoElement.poster;
//     const videoUrl =
//       videoElement.src || videoElement.querySelector("source")?.src;

//     if (posterUrl) mediaUrls.push(posterUrl);
//     if (videoUrl) mediaUrls.push(videoUrl);

//     cardData.adType = "video";
//   }

//   // If media URLs were found, add them to cardData
//   if (mediaUrls.length > 0) {
//     cardData.mediaUrls = mediaUrls;
//   }

//   if (Object.keys(cardData).length > 0) {
//     return cardData;
//   }

//   return null;
// };

// // Set to keep track of rendered elements and avoid duplicates
// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms

// // Function to add React components for each ad and handle button click
// function addCustomElement() {
//   // Select the main parent div where all the data is present
//   const targetAds = document.querySelectorAll(
//     "div._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
//   );

//   targetAds.forEach((adElement) => {
//     // Check if the element has been processed (either in Set or by class name)
//     if (
//       renderedElements.has(adElement) ||
//       (adElement as HTMLElement).classList.contains("rendered-by-script")
//     ) {
//       return; // Skip if already rendered
//     }

//     // Now target the correct div to inject after
//     const targetSpans = adElement.querySelectorAll(
//       "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//     );

//     targetSpans.forEach((targetSpan) => {
//       // Check if the specific span has already been processed
//       if (renderedElements.has(targetSpan)) {
//         return; // Skip if already rendered
//       }

//       // Create a container div to render the React component into
//       const containerDiv = document.createElement("div");
//       targetSpan.insertAdjacentElement("afterend", containerDiv);

//       // Use React's createRoot to render the component
//       const root = createRoot(containerDiv);
//       root.render(<SaveToLibrary onSave={() => handleSaveAd(adElement)} />);

//       // Mark the element as processed
//       renderedElements.add(targetSpan);
//     });

//     // Mark the parent ad element as processed
//     renderedElements.add(adElement);
//     (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
//   });
// }

// // Function to handle "Save Ad" button click
// const handleSaveAd = (adElement: Element) => {
//   const adData = extractCardDetails(adElement);
//   if (adData) {
//     console.log("Ad Data:", adData);
//     // You can perform further actions here, such as saving the adData or sending it to a server
//   } else {
//     console.log("No ad data found for this element.");
//   }
// };

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

// export default addCustomElement;

// the code is working but has a full div

// import React from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary from "./SaveToLibrary";

// console.log("Script is running on Facebook Ads Library page");

// type CardData = {
//   brandLogo?: string;
//   url?: string;
//   name?: string;
//   description?: string;
//   mediaUrls?: string[];
//   adType?: "image" | "imageCarousel" | "video" | "videoCarousel";
// };

// // Function to extract card details for a specific ad (logo image, URL, name, description, media URLs)

// // Function to extract card details for a specific ad (logo image, URL, name, description, media URLs)

// // Function to extract card details for a specific ad (logo image, URL, name, description, media URLs)
// const extractCardDetails = (card: Element): CardData | null => {
//   const cardData: CardData = {};

//   // Extract the logo image URL
//   const imageElement = card.querySelector("div._3qn7 img");
//   if (imageElement instanceof HTMLImageElement) {
//     cardData.brandLogo = imageElement.src;
//   }

//   // Extract the URL
//   const linkElement = card.querySelector("a.xt0psk2");
//   if (linkElement instanceof HTMLAnchorElement) {
//     cardData.url = linkElement.href;
//   }

//   // Extract the name (title)
//   const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
//   if (nameElement) {
//     cardData.name = nameElement.textContent || "";
//   }

//   // Extract the description from the correct div/span structure
//   const descriptionElement = card.querySelector("div._7jyr span");

//   if (
//     descriptionElement &&
//     !descriptionElement.closest("div")?.textContent?.includes("Sponsored")
//   ) {
//     // Ensures we skip elements with the word "Sponsored"
//     cardData.description = descriptionElement.innerHTML || "";
//   } else {
//     cardData.description = "No description available";
//   }

//   // Extract media URLs and determine ad type
//   const mediaUrls: string[] = [];

//   // Check for single image
//   const singleImageElement = card.querySelector(
//     "img.x1ll5gia.x19kjcj4.xh8yej3"
//   );
//   if (singleImageElement instanceof HTMLImageElement) {
//     mediaUrls.push(singleImageElement.src);
//     cardData.adType = "image";
//   }

//   // Check for image carousel
//   const carouselImageElements = card.querySelectorAll(
//     "div.x78zum5.x1iyjqo2.x1n2onr6.x1q0g3np img"
//   );
//   if (carouselImageElements.length > 1) {
//     carouselImageElements.forEach((imgElement) => {
//       if (imgElement instanceof HTMLImageElement) {
//         mediaUrls.push(imgElement.src);
//       }
//     });
//     cardData.adType = "imageCarousel";
//   }

//   // Check for video
//   const videoElement = card.querySelector("div.x78zum5 video");
//   if (videoElement instanceof HTMLVideoElement) {
//     const posterUrl = videoElement.poster;
//     const videoUrl =
//       videoElement.src || videoElement.querySelector("source")?.src;

//     if (posterUrl) mediaUrls.push(posterUrl);
//     if (videoUrl) mediaUrls.push(videoUrl);

//     cardData.adType = "video";
//   }

//   // If media URLs were found, add them to cardData
//   if (mediaUrls.length > 0) {
//     cardData.mediaUrls = mediaUrls;
//   }

//   if (Object.keys(cardData).length > 0) {
//     return cardData;
//   }

//   return null;
// };

// // Set to keep track of rendered elements and avoid duplicates
// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms

// // Function to add React components for each ad and handle button click
// function addCustomElement() {
//   // Select the main parent div where all the data is present
//   const targetAds = document.querySelectorAll(
//     "div._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
//   );

//   targetAds.forEach((adElement) => {
//     // Check if the element has been processed (either in Set or by class name)
//     if (
//       renderedElements.has(adElement) ||
//       (adElement as HTMLElement).classList.contains("rendered-by-script")
//     ) {
//       return; // Skip if already rendered
//     }

//     // Now target the correct div to inject after
//     const targetSpans = adElement.querySelectorAll(
//       "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//     );

//     targetSpans.forEach((targetSpan) => {
//       // Check if the specific span has already been processed
//       if (renderedElements.has(targetSpan)) {
//         return; // Skip if already rendered
//       }

//       // Create a container div to render the React component into
//       const containerDiv = document.createElement("div");
//       targetSpan.insertAdjacentElement("afterend", containerDiv);

//       // Use React's createRoot to render the component
//       const root = createRoot(containerDiv);
//       root.render(<SaveToLibrary onSave={() => handleSaveAd(adElement)} />);

//       // Mark the element as processed
//       renderedElements.add(targetSpan);
//     });

//     // Mark the parent ad element as processed
//     renderedElements.add(adElement);
//     (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
//   });
// }

// // Function to handle "Save Ad" button click
// const handleSaveAd = (adElement: Element) => {
//   const adData = extractCardDetails(adElement);
//   if (adData) {
//     console.log("Ad Data:", adData);
//     // You can perform further actions here, such as saving the adData or sending it to a server
//   } else {
//     console.log("No ad data found for this element.");
//   }
// };

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

// export default addCustomElement;

import React from "react";
import { createRoot } from "react-dom/client";
import SaveToLibrary from "./SaveToLibrary";

console.log("Script is running on Facebook Ads Library page");

type CardData = {
  brandLogo?: string;
  url?: string;
  name?: string;
  description?: string;
  mediaUrls?: string[];
  adType?: "image" | "imageCarousel" | "video" | "videoCarousel";
};

const extractCardDetails = (card: Element): CardData | null => {
  const cardData: CardData = {};

  // Extract the logo image URL
  const imageElement = card.querySelector("div._3qn7 img");
  if (imageElement instanceof HTMLImageElement) {
    cardData.brandLogo = imageElement.src;
  }

  // Extract the URL
  const linkElement = card.querySelector("a.xt0psk2");
  if (linkElement instanceof HTMLAnchorElement) {
    cardData.url = linkElement.href;
  }

  // Extract the name (title)
  const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
  if (nameElement) {
    cardData.name = nameElement.textContent || "";
  }

  // Extract the description from the correct div/span structure
  const descriptionElement = card.querySelector("div._7jyr span");

  if (
    descriptionElement &&
    !descriptionElement.closest("div")?.textContent?.includes("Sponsored")
  ) {
    // Extract only the text content from the span
    cardData.description = descriptionElement.textContent || "";
  } else {
    cardData.description = "No description available";
  }

  // Extract media URLs and determine ad type
  const mediaUrls: string[] = [];

  // Check for single image
  const singleImageElement = card.querySelector(
    "img.x1ll5gia.x19kjcj4.xh8yej3"
  );
  if (singleImageElement instanceof HTMLImageElement) {
    mediaUrls.push(singleImageElement.src);
    cardData.adType = "image";
  }

  // Check for image carousel
  const carouselImageElements = card.querySelectorAll(
    "div.x78zum5.x1iyjqo2.x1n2onr6.x1q0g3np img"
  );
  if (carouselImageElements.length > 1) {
    carouselImageElements.forEach((imgElement) => {
      if (imgElement instanceof HTMLImageElement) {
        mediaUrls.push(imgElement.src);
      }
    });
    cardData.adType = "imageCarousel";
  }

  // Check for video
  const videoElement = card.querySelector("div.x78zum5 video");
  if (videoElement instanceof HTMLVideoElement) {
    const posterUrl = videoElement.poster;
    const videoUrl =
      videoElement.src || videoElement.querySelector("source")?.src;

    if (posterUrl) mediaUrls.push(posterUrl);
    if (videoUrl) mediaUrls.push(videoUrl);

    cardData.adType = "video";
  }

  // If media URLs were found, add them to cardData
  if (mediaUrls.length > 0) {
    cardData.mediaUrls = mediaUrls;
  }

  if (Object.keys(cardData).length > 0) {
    return cardData;
  }

  return null;
};

// Set to keep track of rendered elements and avoid duplicates
const renderedElements = new Set<Element>();
let lastExecutionTime = 0;
const throttleTime = 200; // Throttle interval in ms

// Function to add React components for each ad and handle button click
function addCustomElement() {
  // Select the main parent div where all the data is present
  const targetAds = document.querySelectorAll(
    "div._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
  );

  targetAds.forEach((adElement) => {
    // Check if the element has been processed (either in Set or by class name)
    if (
      renderedElements.has(adElement) ||
      (adElement as HTMLElement).classList.contains("rendered-by-script")
    ) {
      return; // Skip if already rendered
    }

    // Now target the correct div to inject after
    const targetSpans = adElement.querySelectorAll(
      "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
    );

    targetSpans.forEach((targetSpan) => {
      // Check if the specific span has already been processed
      if (renderedElements.has(targetSpan)) {
        return; // Skip if already rendered
      }

      // Create a container div to render the React component into
      const containerDiv = document.createElement("div");
      targetSpan.insertAdjacentElement("afterend", containerDiv);

      // Use React's createRoot to render the component
      const root = createRoot(containerDiv);
      root.render(<SaveToLibrary onSave={() => handleSaveAd(adElement)} />);

      // Mark the element as processed
      renderedElements.add(targetSpan);
    });

    // Mark the parent ad element as processed
    renderedElements.add(adElement);
    (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
  });
}

// Function to handle "Save Ad" button click
const handleSaveAd = (adElement: Element) => {
  const adData = extractCardDetails(adElement);
  if (adData) {
    console.log("Ad Data:", adData);
    // You can perform further actions here, such as saving the adData or sending it to a server
  } else {
    console.log("No ad data found for this element.");
  }
};

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

// Start observing the DOM for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial call to add custom elements immediately on load
addCustomElement();

export default addCustomElement;
