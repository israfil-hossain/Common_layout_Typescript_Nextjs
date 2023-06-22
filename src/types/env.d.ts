namespace NodeJS {
  /**
   * Augmented process.env. Add environmental
   * variables here with proper typing to support
   * them in typescript sources
   */
  export interface ProcessEnv {
    NODE_ENV?: "development" | "production";
    NEXTAUTH_SECRET?: string;
    NEXTAUTH_URL?: string;
    DEMO_API_JWT_SECRET?: string;
  }
}
