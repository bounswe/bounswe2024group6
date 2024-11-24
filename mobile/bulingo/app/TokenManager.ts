import * as SecureStore from "expo-secure-store";


const BASE_URL = "http://3.70.214.28:8000";

class TokenManager {
  private username: string | null;

  constructor() {
    this.username = null;
  }

  async saveTokens(accessToken: string, refreshToken: string){
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  };

  async getAccessToken(){
    return await SecureStore.getItemAsync("accessToken");
  };

  async refreshAccessToken(){
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
  
    if (!refreshToken) throw new Error("No refresh token found");
  
    const response = await fetch("http://3.70.214.28:8000/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  
    if (!response.ok) throw new Error("Token refresh failed");
  
    const { accessToken } = await response.json();
    await SecureStore.setItemAsync("accessToken", accessToken);
  
    return accessToken;
  };

  async autoLogin(){
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
  
    if (!accessToken || !refreshToken) return false;

    // Optionally, verify the token's validity by making an API call.
    return true;
  };

  setUsername(username: string|null): void {
    this.username = username;
  }

  getUsername(): string|null {
    return this.username;
  }

  // Method to clear tokens
  async clearTokens() {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  }

  async authenticatedFetch(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    let accessToken = await this.getAccessToken();
  
    if (!accessToken) {
      throw new Error("No access token found. User needs to log in again.");
    }
  
    const fetchWithToken = async (token: string) => {
      return await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    };
  
    let response = await fetchWithToken(accessToken);
  
    if (response.status === 401) {
      // Token might have expired, try refreshing it
      accessToken = await this.refreshAccessToken();
      if (!accessToken) {
        throw new Error("Unable to refresh access token.");
      }
  
      response = await fetchWithToken(accessToken);
    }
    return response;
  }
}

// Export a single instance of TokenManager
export default new TokenManager();
