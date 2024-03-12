interface ImportMetaEnv {
    readonly VITE_API_KEY: string,
    readonly VITE_TIMESTAMP: string,
    readonly VITE_HASH: string,
    readonly VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}