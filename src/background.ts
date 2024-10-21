// background.ts
let currentUserId: string | null = null;
let userIdExpiration: number | null = null;

// Initialize user ID from storage when background script starts
const initializeUserId = async () => {
  const result = await chrome.storage.local.get(["userId", "userIdExpiration"]);
  console.log("the result is...", result);

  if (result.userId && result.userIdExpiration) {
    const now = new Date().getTime();
    if (now < result.userIdExpiration) {
      currentUserId = result.userId;
      userIdExpiration = result.userIdExpiration;
    } else {
      // Clear expired ID
      await chrome.storage.local.remove(["userId", "userIdExpiration"]);
      currentUserId = null;
      userIdExpiration = null;
    }
  }
};

// Run initialization
initializeUserId();

// Set up alarm for daily cleanup check
chrome.alarms.create("cleanupCheck", { periodInMinutes: 1440 }); // Once per day

// Listen for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "cleanupCheck") {
    initializeUserId(); // Re-check expiration
  }
});

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "USER_ID_UPDATED") {
    currentUserId = message.payload.userId;
    userIdExpiration = message.payload.expiration;
  }

  if (message.type === "GET_USER_ID") {
    const now = new Date().getTime();
    if (userIdExpiration && now < userIdExpiration) {
      sendResponse({ userId: currentUserId });
    } else {
      sendResponse({ userId: null });
    }
  }

  return true; // Required for async response
});

// content_script.tsx
