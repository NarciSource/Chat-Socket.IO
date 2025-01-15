/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_URL: string;
    readonly VITE_SERVER_PORT: number;
    readonly VITE_MF_TYPE: "application" | "parcel";
    readonly VITE_SOCKET_SERVER_URL: string;
    readonly VITE_SOCKET_EVENT_MESSAGE: string;
    readonly VITE_SOCKET_EVENT_RESPONSE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
