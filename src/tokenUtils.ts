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
