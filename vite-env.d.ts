interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // Add other environment variables as needed
  readonly VITE_APP_TITLE?: string
  readonly VITE_PORT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}