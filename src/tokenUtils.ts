import { refreshAccessToken } from "./api";

export const getAccessToken = async (): Promise<string | null> => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const refreshed = await refreshToken();
    if (!refreshed) {
      return null;
    }
    accessToken = localStorage.getItem("accessToken");
  }
  console.log("Access token:", accessToken);
  return accessToken;
};

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return false;
  }

  try {
    const newAccessToken = await refreshAccessToken(refreshToken);
    console.log("Refreshed access token is hear now:", newAccessToken);
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  return false;
};

export const getExtAccessToken = async (): Promise<string | null> => {
  try {
    // Get token from Chrome extension storage
    // const result = await chrome.storage.local.get(["accessToken"]);
    let accessToken = localStorage.getItem("accessToken");

    console.log("Extension storage result accessToken:", accessToken);
    // let accessToken = result.accessToken;

    // If no access token, try to refresh
    if (!accessToken) {
      const refreshed = await refreshToken();
      if (!refreshed) {
        return null;
      }
      // Get the new access token after refresh
      const newResult = await chrome.storage.local.get(["accessToken"]);
      accessToken = newResult.accessToken;
    }

    console.log("Access token retrieved from extension storage:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// tokenUtils.ts
// import { refreshAccessToken } from "./api";

// export const getAccessToken = async (): Promise<string | null> => {
//   try {
//     const result = await chrome.storage.local.get(["accessToken"]);
//     const accessToken = result.accessToken;

//     if (!accessToken) {
//       const refreshed = await refreshToken();
//       if (!refreshed) {
//         return null;
//       }
//       const newResult = await chrome.storage.local.get(["accessToken"]);
//       return newResult.accessToken;
//     }

//     console.log("Access token:", accessToken);
//     return accessToken;
//   } catch (error) {
//     console.error("Error getting access token:", error);
//     return null;
//   }
// };

// export const refreshToken = async (): Promise<boolean> => {
//   try {
//     const result = await chrome.storage.local.get(["refreshToken"]);
//     const refreshToken = result.refreshToken;

//     if (!refreshToken) {
//       return false;
//     }

//     const newAccessToken = await refreshAccessToken(refreshToken);
//     console.log("Refreshed access token:", newAccessToken);

//     if (newAccessToken) {
//       await chrome.storage.local.set({ accessToken: newAccessToken });
//       return true;
//     }
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     await chrome.storage.local.remove(["accessToken", "refreshToken"]);
//   }

//   return false;
// };
