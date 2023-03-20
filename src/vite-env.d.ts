// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 标题
  readonly VITE_APP_TITLE: string;
  // API地址
  readonly VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
