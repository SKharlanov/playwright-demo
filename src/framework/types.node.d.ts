declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      CI: string;
    }
  }
}

export {};
