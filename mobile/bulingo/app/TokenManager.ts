// TokenManager.ts

// Define an interface for the tokens
interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

class TokenManager {
  private tokens: Tokens;
  private username: string | null;

  constructor() {
    this.tokens = {
      accessToken: null,
      refreshToken: null,
    };
    this.username = null;
  }

  // Method to set tokens
  setTokens(tokens: Tokens): void {
    this.tokens = tokens;
  }

  // Method to get tokens
  getTokens(): Tokens {
    return this.tokens;
  }

  setUsername(username: string|null): void {
    this.username = username;
  }

  getUsername(): string|null {
    return this.username;
  }

  // Method to clear tokens
  clearTokens(): void {
    this.tokens = {
      accessToken: null,
      refreshToken: null,
    };
  }
}

// Export a single instance of TokenManager
export default new TokenManager();
