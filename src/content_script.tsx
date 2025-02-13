// // old working code 14/10/2024
// import React from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary, { SelectedFile } from "./SaveToLibrary";
// import { handleSaveAdAPICall } from "./api";

// console.log("Script is running on Facebook Ads Library page");

// type CardData = {
//   logoUrl?: string;
//   pageUrl?: string;
//   brandName?: string;
//   adDescription?: string;
//   mediaUrls?: string[];
//   adFormat?: "image" | "imageCarousel" | "video" | "videoCarousel";
//   selectedFolder?: SelectedFile[]; // New field to store the user-selected folder
// };

// //new code start
// // const getTokenFromExtension = (): Promise<string | null> => {
// //   return new Promise((resolve) => {
// //     chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
// //       resolve(response.token);
// //     });
// //   });
// // };

// const getTokenFromExtension = (): Promise<string | null> => {
//   return new Promise((resolve) => {
//     try {
//       chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
//         if (chrome.runtime.lastError) {
//           console.error("Runtime error:", chrome.runtime.lastError);
//           resolve(null);
//           return;
//         }
//         resolve(response?.token || null);
//       });
//     } catch (error) {
//       console.error("Error getting token:", error);
//       resolve(null);
//     }
//   });
// };
// // new code end

// //old code start

// // Function to extract ad details from the page
// const extractCardDetails = (card: Element): CardData | null => {
//   const cardData: CardData = {};

//   // Extract the logo image URL
//   const imageElement = card.querySelector("div._3qn7 img");
//   if (imageElement instanceof HTMLImageElement) {
//     cardData.logoUrl = imageElement.src;
//   }

//   // Extract the URL
//   const linkElement = card.querySelector("a.xt0psk2");
//   if (linkElement instanceof HTMLAnchorElement) {
//     cardData.pageUrl = linkElement.href;
//   }

//   // Extract the name (title)
//   const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
//   if (nameElement) {
//     cardData.brandName = nameElement.textContent || "";
//   }

//   // Extract the description from the correct div/span structure
//   const descriptionElement = card.querySelector("div._7jyr span");
//   if (
//     descriptionElement &&
//     !descriptionElement.closest("div")?.textContent?.includes("Sponsored")
//   ) {
//     cardData.adDescription = descriptionElement.textContent || "";
//   } else {
//     cardData.adDescription = "No description available";
//   }

//   // Extract media URLs and  determine ad type
//   const mediaUrls: string[] = [];

//   // Check for single image
//   const singleImageElement = card.querySelector(
//     "img.x1ll5gia.x19kjcj4.xh8yej3"
//   );
//   if (singleImageElement instanceof HTMLImageElement) {
//     mediaUrls.push(singleImageElement.src);
//     cardData.adFormat = "image";
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
//     cardData.adFormat = "imageCarousel";
//   }

//   // Check for video
//   const videoElement = card.querySelector("div.x78zum5 video");
//   if (videoElement instanceof HTMLVideoElement) {
//     const posterUrl = videoElement.poster;
//     const videoUrl =
//       videoElement.src || videoElement.querySelector("source")?.src;

//     if (posterUrl) mediaUrls.push(posterUrl);
//     if (videoUrl) mediaUrls.push(videoUrl);

//     cardData.adFormat = "video";
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

// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200; // Throttle interval in ms

// function addCustomElement() {
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
//       root.render(
//         <SaveToLibrary onSave={(folder) => handleSaveAd(adElement, folder)} />
//       );

//       // Mark the element as processed
//       renderedElements.add(targetSpan);
//     });

//     // Mark the parent ad element as processed
//     renderedElements.add(adElement);
//     (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
//   });
// }

// // Function to handle "Save Ad" button click and store the folder
// // const handleSaveAd = async (
// //   adElement: Element,
// //   selectedFolder: SelectedFile[]
// // ) => {
// //   const adData = extractCardDetails(adElement);
// //   if (adData) {
// //     adData.selectedFolder = selectedFolder; // Store the selected folder
// //     // console.log("the page token:", token);

// //     const token = await getTokenFromExtension();
// //     console.log(
// //       "Ad Data with selected folder:",
// //       adData,
// //       "after new  and old token",
// //       token
// //     );
// //     console.log("the page token:", token);

// //     if (!token) {
// //       console.error("Token not available, cannot proceed with API call.");
// //       return; // Exit early if token is null
// //     }
// //     const response = handleSaveAdAPICall(
// //       {
// //         platformId: "765b58a7-f277-4969-82e8-c830ac49cea9",
// //         ...adData,
// //       },
// //       token
// //     );
// //     console.log("API Response after saving ad:", response);
// //     // You can perform further actions here, such as saving the adData or sending it to a server
// //   } else {
// //     console.log("No ad data found for this element.");
// //   }

// //   // try {
// //   //   // const accessToken = await getAccessToken();
// //   //   // if (!accessToken) {
// //   //   //   console.error("No access token available");
// //   //   //   return;
// //   //   // }

// //   //   const response = await fetch(`http://localhost:4000/api/v1/ads/save-ads`, {
// //   //     method: "POST",
// //   //     headers: {
// //   //       "Content-Type": "application/json",
// //   //     },
// //   //     body: JSON.stringify({
// //   //       adsData: adData,
// //   //     }),
// //   //   });

// //   //   if (!response.ok) {
// //   //     throw new Error("Failed to save ad data");
// //   //   }

// //   //   const result = await response.json();
// //   //   console.log("Ad data saved successfully:", result);
// //   // } catch (error) {
// //   //   console.error("Error saving ad data:", error);
// //   // }
// // };
// const handleSaveAd = async (
//   adElement: Element,
//   selectedFolder: SelectedFile[]
// ) => {
//   try {
//     const adData = extractCardDetails(adElement);
//     if (!adData) {
//       console.log("No ad data found for this element.");
//       return;
//     }

//     const token = await getTokenFromExtension();
//     if (!token) {
//       console.error("Token not available, cannot proceed with API call.");
//       return;
//     }

//     adData.selectedFolder = selectedFolder;

//     const response = await handleSaveAdAPICall(
//       {
//         platformId: "765b58a7-f277-4969-82e8-c830ac49cea9",
//         ...adData,
//       },
//       token
//     );

//     console.log("API Response after saving ad:", response);
//   } catch (error) {
//     console.error("Error in handleSaveAd:", error);
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

//old working code 04/10/2024

import React from "react";
import { createRoot } from "react-dom/client";
import SaveToLibrary, { SelectedFile } from "./SaveToLibrary";
import { getAccessToken } from "./tokenUtils";
import { handleSaveAdAPICall } from "./api";

console.log("Script is running on Facebook Ads Library page");

type CardData = {
  logoUrl?: string;
  pageUrl?: string;
  brandName?: string;
  adDescription?: string;
  mediaUrls?: string[];
  adFormat?: "image" | "imageCarousel" | "video" | "videoCarousel";
  selectedFolder?: SelectedFile[]; // New field to store the user-selected folder
};

//new code start 18/10/2024 Time: 1:30
const getUserId = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_USER_ID" }, (response) => {
      resolve(response.userId);
    });
  });
};

// Example usage in content script
const checkUserAccess = async () => {
  console.log("Checking user access Content Script...");
  const userId = await getUserId();
  if (!userId) {
    console.log("User ID not found or expired");
    return;
  }

  // Use the userId for your operations
  console.log("Current user ID from content script is :", userId);
};

// new code end

// Function to extract ad details from the page
const extractCardDetails = (card: Element): CardData | null => {
  const cardData: CardData = {};

  // Extract the logo image URL
  const imageElement = card.querySelector("div._3qn7 img");
  if (imageElement instanceof HTMLImageElement) {
    cardData.logoUrl = imageElement.src;
  }

  // Extract the URL
  const linkElement = card.querySelector("a.xt0psk2");
  if (linkElement instanceof HTMLAnchorElement) {
    cardData.pageUrl = linkElement.href;
  }

  // Extract the name (title)
  const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
  if (nameElement) {
    cardData.brandName = nameElement.textContent || "";
  }

  // Extract the description from the correct div/span structure
  const descriptionElement = card.querySelector("div._7jyr span");
  if (
    descriptionElement &&
    !descriptionElement.closest("div")?.textContent?.includes("Sponsored")
  ) {
    cardData.adDescription = descriptionElement.textContent || "";
  } else {
    cardData.adDescription = "No description available";
  }

  // Extract media URLs and determine ad type
  const mediaUrls: string[] = [];

  // Check for single image
  const singleImageElement = card.querySelector(
    "img.x1ll5gia.x19kjcj4.xh8yej3"
  );
  if (singleImageElement instanceof HTMLImageElement) {
    mediaUrls.push(singleImageElement.src);
    cardData.adFormat = "image";
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
    cardData.adFormat = "imageCarousel";
  }

  // Check for video
  const videoElement = card.querySelector("div.x78zum5 video");
  if (videoElement instanceof HTMLVideoElement) {
    const posterUrl = videoElement.poster;
    const videoUrl =
      videoElement.src || videoElement.querySelector("source")?.src;

    if (posterUrl) mediaUrls.push(posterUrl);
    if (videoUrl) mediaUrls.push(videoUrl);

    cardData.adFormat = "video";
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

const renderedElements = new Set<Element>();
let lastExecutionTime = 0;
const throttleTime = 200; // Throttle interval in ms

function addCustomElement() {
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
      root.render(
        <SaveToLibrary onSave={(folder) => handleSaveAd(adElement, folder)} />
      );

      // Mark the element as processed
      renderedElements.add(targetSpan);
    });

    // Mark the parent ad element as processed
    renderedElements.add(adElement);
    (adElement as HTMLElement).classList.add("rendered-by-script"); // Add class to avoid processing it again
  });
}

// Function to handle "Save Ad" button click and store the folder

const handleSaveAd = async (
  adElement: Element,
  selectedFolder: SelectedFile[]
) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.error("User ID not found or expired");
      return;
    }
    checkUserAccess();
    // const result = await chrome.storage.local.get(["accessToken"]);
    // const token = result.accessToken;
    console.log("the page userId new and ok:", userId);

    const adData = extractCardDetails(adElement);
    if (!adData) {
      console.error("Failed to extract ad data");
      return;
    }

    adData.selectedFolder = selectedFolder;

    const response = await handleSaveAdAPICall(
      {
        platformId: "765b58a7-f277-4969-82e8-c830ac49cea9",
        ...adData,
      },
      userId
    );

    if (response?.success) {
      console.log("Ad saved successfully:", response.data);
    } else {
      console.error("Failed to save ad:", response?.message);
    }
  } catch (error) {
    console.error("Error in handleSaveAd:", error);
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

// content_script.ts

// import React from "react";
// import { createRoot } from "react-dom/client";
// import SaveToLibrary, { SelectedFile } from "./SaveToLibrary";
// import { handleSaveAdAPICall } from "./api";

// console.log("Script is running on Facebook Ads Library page");

// interface CardData {
//   logoUrl?: string;
//   pageUrl?: string;
//   brandName?: string;
//   adDescription?: string;
//   mediaUrls?: string[];
//   adFormat?: "image" | "imageCarousel" | "video" | "videoCarousel";
//   selectedFolder?: SelectedFile[];
// }

// const getTokenFromExtension = async (): Promise<string | null> => {
//   try {
//     return new Promise((resolve) => {
//       chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
//         if (chrome.runtime.lastError) {
//           console.error("Runtime error:", chrome.runtime.lastError);
//           resolve(null);
//           return;
//         }
//         resolve(response?.token || null);
//       });
//     });
//   } catch (error) {
//     console.error("Error getting token:", error);
//     return null;
//   }
// };

// const extractCardDetails = (card: Element): CardData | null => {
//   const cardData: CardData = {};

//   try {
//     // Extract the logo image URL
//     const imageElement = card.querySelector("div._3qn7 img");
//     if (imageElement instanceof HTMLImageElement) {
//       cardData.logoUrl = imageElement.src;
//     }

//     // Extract the URL
//     const linkElement = card.querySelector("a.xt0psk2");
//     if (linkElement instanceof HTMLAnchorElement) {
//       cardData.pageUrl = linkElement.href;
//     }

//     // Extract the name (title)
//     const nameElement = card.querySelector("a.xt0psk2 span.x8t9es0");
//     if (nameElement) {
//       cardData.brandName = nameElement.textContent || "";
//     }

//     // Extract the description
//     const descriptionElement = card.querySelector("div._7jyr span");
//     if (
//       descriptionElement &&
//       !descriptionElement.closest("div")?.textContent?.includes("Sponsored")
//     ) {
//       cardData.adDescription = descriptionElement.textContent || "";
//     } else {
//       cardData.adDescription = "No description available";
//     }

//     // Extract media URLs and determine ad type
//     const mediaUrls: string[] = [];

//     // Check for single image
//     const singleImageElement = card.querySelector(
//       "img.x1ll5gia.x19kjcj4.xh8yej3"
//     );
//     if (singleImageElement instanceof HTMLImageElement) {
//       mediaUrls.push(singleImageElement.src);
//       cardData.adFormat = "image";
//     }

//     // Check for image carousel
//     const carouselImageElements = card.querySelectorAll(
//       "div.x78zum5.x1iyjqo2.x1n2onr6.x1q0g3np img"
//     );
//     if (carouselImageElements.length > 1) {
//       carouselImageElements.forEach((imgElement) => {
//         if (imgElement instanceof HTMLImageElement) {
//           mediaUrls.push(imgElement.src);
//         }
//       });
//       cardData.adFormat = "imageCarousel";
//     }

//     // Check for video
//     const videoElement = card.querySelector("div.x78zum5 video");
//     if (videoElement instanceof HTMLVideoElement) {
//       const posterUrl = videoElement.poster;
//       const videoUrl =
//         videoElement.src || videoElement.querySelector("source")?.src;

//       if (posterUrl) mediaUrls.push(posterUrl);
//       if (videoUrl) mediaUrls.push(videoUrl);

//       cardData.adFormat = "video";
//     }

//     if (mediaUrls.length > 0) {
//       cardData.mediaUrls = mediaUrls;
//     }

//     return Object.keys(cardData).length > 0 ? cardData : null;
//   } catch (error) {
//     console.error("Error extracting card details:", error);
//     return null;
//   }
// };

// const handleSaveAd = async (
//   adElement: Element,
//   selectedFolder: SelectedFile[]
// ) => {
//   try {
//     const token = await getTokenFromExtension();
//     if (!token) {
//       console.error("No token available. Please log in first.");
//       // You might want to trigger a login flow here
//       return;
//     }

//     const adData = extractCardDetails(adElement);
//     if (!adData) {
//       console.error("Failed to extract ad data");
//       return;
//     }

//     adData.selectedFolder = selectedFolder;

//     const response = await handleSaveAdAPICall(
//       {
//         platformId: "765b58a7-f277-4969-82e8-c830ac49cea9",
//         ...adData,
//       },
//       token
//     );

//     if (response?.success) {
//       console.log("Ad saved successfully:", response.data);
//     } else {
//       console.error("Failed to save ad:", response?.message);
//     }
//   } catch (error) {
//     console.error("Error in handleSaveAd:", error);
//   }
// };

// const renderedElements = new Set<Element>();
// let lastExecutionTime = 0;
// const throttleTime = 200;

// function addCustomElement() {
//   const targetAds = document.querySelectorAll(
//     "div._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
//   );

//   targetAds.forEach((adElement) => {
//     if (
//       renderedElements.has(adElement) ||
//       (adElement as HTMLElement).classList.contains("rendered-by-script")
//     ) {
//       return;
//     }

//     const targetSpans = adElement.querySelectorAll(
//       "div.x193iq5w.xxymvpz.x78zum5.x1iyjqo2.xs83m0k.x1d52u69.xktsk01.x1yztbdb"
//     );

//     targetSpans.forEach((targetSpan) => {
//       if (renderedElements.has(targetSpan)) {
//         return;
//       }

//       const containerDiv = document.createElement("div");
//       targetSpan.insertAdjacentElement("afterend", containerDiv);

//       const root = createRoot(containerDiv);
//       root.render(
//         <SaveToLibrary onSave={(folder) => handleSaveAd(adElement, folder)} />
//       );

//       renderedElements.add(targetSpan);
//     });

//     renderedElements.add(adElement);
//     (adElement as HTMLElement).classList.add("rendered-by-script");
//   });
// }

// function throttledAddCustomElement() {
//   const currentTime = Date.now();
//   if (currentTime - lastExecutionTime >= throttleTime) {
//     addCustomElement();
//     lastExecutionTime = currentTime;
//   }
// }

// const observer = new MutationObserver((mutations) => {
//   for (const mutation of mutations) {
//     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//       throttledAddCustomElement();
//       break;
//     }
//   }
// });

// observer.observe(document.body, {
//   childList: true,
//   subtree: true,
// });

// addCustomElement();

// export default addCustomElement;
