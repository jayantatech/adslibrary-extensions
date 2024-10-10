// background.ts
console.log("Background script is running");
// Function to refresh the access token using the refresh token
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token found.");
    return null;
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/auth/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

// Function to check if the access token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return tokenPayload.exp < currentTime;
  } catch (error) {
    console.error("Invalid access token:", error);
    return true;
  }
};

// Wrapper function to ensure access token is valid
const ensureValidAccessToken = async (): Promise<string | null> => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken || isTokenExpired(accessToken)) {
    console.log("Access token expired or not available, refreshing...");
    accessToken = await refreshAccessToken();
  }

  return accessToken;
};

// Example usage for making API requests
const makeAuthenticatedRequest = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const accessToken = await ensureValidAccessToken();

  if (!accessToken) {
    throw new Error("Unable to get a valid access token");
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

// Example API call using the authenticated request
const exampleApiCall = async () => {
  try {
    const response = await makeAuthenticatedRequest(
      "http://localhost:4000/api/v1/some-endpoint"
    );
    const data = await response.json();
    console.log("API response:", data);
  } catch (error) {
    console.error("Error making API call:", error);
  }
};

// Event listener or interval to trigger token check
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "performApiCall") {
    exampleApiCall();
  }
});

// Optionally, set an interval to refresh token periodically
setInterval(async () => {
  await ensureValidAccessToken();
}, 5 * 60 * 1000); // Every 10 minutes
