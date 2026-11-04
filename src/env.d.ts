interface ImportMetaEnv {
  /** Now-playing Worker URL (unset: the card stays hidden) */
  readonly PUBLIC_NOW_PLAYING_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
