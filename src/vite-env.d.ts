/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string,unknown>, Record<string,unknown>, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_SERVER_URL: string
  readonly VITE_GAME_SERVER_URL: string
  readonly VITE_MOBAGE_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
