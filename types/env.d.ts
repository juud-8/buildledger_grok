interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  // Add other VITE_ vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}