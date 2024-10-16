import { getAccessToken } from "./tokenUtils";

const API_BASE_URL = "http://localhost:4000/api/v1";

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/extension-refresh-token `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    console.log("API Response after refreshing access token:", data);
    return data.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

// Add other API functions as needed

export const handleSaveAdAPICall = async (adData: any, token: string) => {
  // let token = localStorage.getItem("accessToken");
  // const token = await getAccessToken();
  console.log(
    "API Response after saving ad:",
    adData,
    "after new token",
    token
  );
  if (!token) {
    console.error("Token not available new way, cannot proceed with API call");
    return; // Exit early if token is null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ads/save-ads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
      body: JSON.stringify({
        adsData: adData,
      }),
    });
    console.log("API Response after saving ad:", response.json());
    if (!response.ok) {
      throw new Error("Failed to save ad");
    }

    const data = await response.json();
    console.log("API Response after saving ad:", data);
    return data;
  } catch (error) {
    console.error("Error saving ad:", error);
    return null;
  }
};
