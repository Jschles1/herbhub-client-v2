declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_DOMAIN: string;
    }
  }
}

export {};
