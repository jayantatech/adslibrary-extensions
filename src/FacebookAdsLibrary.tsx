// import React, { useEffect, useState } from "react";
// import SaveToLibrary from "./SaveToLibrary";

// type CardData = {
//   image?: string;
//   url?: string;
//   name?: string;
//   description?: string;
// };

// // Function to extract card details (image, URL, name, description)
// const extractCardDetails = (card: Element): CardData => {
//   const cardData: CardData = {};

//   // Extract the image URL
//   const imageElement = card.querySelector("img");
//   if (imageElement instanceof HTMLImageElement) {
//     cardData.image = imageElement.src;
//   }

//   // Extract the URL
//   const linkElement = card.querySelector("a");
//   if (linkElement instanceof HTMLAnchorElement) {
//     cardData.url = linkElement.href;
//   }

//   // Extract the name (title)
//   const nameElement = card.querySelector(
//     "span.x8t9es0.x1fvot60.xxio538.x108nfp6.xq9mrsl.x1h4wwuj.x117nqv4.xeuugli"
//   );
//   if (nameElement) {
//     cardData.name = nameElement.textContent || "";
//   }

//   // Extract the description
//   const descriptionElement = card.querySelector("div._4ik4._4ik5 span");
//   if (descriptionElement) {
//     cardData.description = descriptionElement.textContent || "";
//   }

//   return cardData;
// };

// // Main component for Facebook Ads Library
// const FacebookAdsLibrary = () => {
//   const [cards, setCards] = useState<Element[]>([]); // State to hold extracted card elements

//   // Extract all card elements and store them in state
//   const fetchCardElements = () => {
//     const cardElements = document.querySelectorAll(
//       "div._3qn7._61-0._2fyi._3qng"
//     );
//     setCards(Array.from(cardElements));
//   };

//   // Function triggered by the Save Ad button click
//   const handleSaveAd = (card: Element) => {
//     const cardData = extractCardDetails(card);
//     console.log("Extracted Card Data:", cardData);
//   };

//   useEffect(() => {
//     fetchCardElements(); // Fetch the card elements on component mount
//   }, []);

//   return (
//     <div>
//       {cards.map((card, index) => (
//         <SaveToLibrary
//           key={index}
//           card={card}
//           handleSaveAd={() => handleSaveAd(card)}
//         />
//       ))}
//     </div>
//   );
// };

// export default FacebookAdsLibrary;
