/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
