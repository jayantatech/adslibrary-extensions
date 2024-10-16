// let accessToken: string | null = null;

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getToken") {
//     // Send response synchronously
//     sendResponse({ token: accessToken });
//     return true; // This is important! It tells Chrome to keep the message channel open
//   }

//   if (request.action === "setToken") {
//     accessToken = request.token;
//     sendResponse({ success: true });
//     return true;
//   }
// });

// // Optional: Handle token expiration
// chrome.alarms.create("tokenRefresh", { periodInMinutes: 55 }); // Refresh before 1 hour expiry

// chrome.alarms.onAlarm.addListener(async (alarm) => {
//   if (alarm.name === "tokenRefresh") {
//     // Implement token refresh logic here
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/v1/auth/extension-refresh-token",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             refreshToken: localStorage.getItem("refreshToken"),
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         accessToken = data.accessToken;
//       }
//     } catch (error) {
//       console.error("Token refresh failed:", error);
//     }
//   }
// });
