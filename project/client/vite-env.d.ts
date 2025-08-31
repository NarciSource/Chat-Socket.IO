/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_SERVER_PORT: number;
  readonly VITE_MF_TYPE: "application" | "parcel";
  readonly VITE_STANDALONE: boolean;
  readonly VITE_LAYOUT_WIDTH: string;
  readonly VITE_LAYOUT_HEIGHT: string;
  readonly VITE_SOCKET_SERVER_URL: string;
  readonly VITE_SOCKET_ON_USERS: string;
  readonly VITE_SOCKET_ON_SYSTEM: string;
  readonly VITE_SOCKET_ON_MESSAGE: string;
  readonly VITE_SOCKET_ON_ROOM_CREATED: string;
  readonly VITE_SOCKET_ON_TYPING: string;
  readonly VITE_SOCKET_EMIT_REGISTER: string;
  readonly VITE_SOCKET_EMIT_MESSAGE: string;
  readonly VITE_SOCKET_EMIT_CREATE_ROOM: string;
  readonly VITE_SOCKET_EMIT_LEAVE_ROOM: string;
  readonly VITE_SOCKET_EMIT_INVITE_ROOM: string;
  readonly VITE_SOCKET_EMIT_TYPING: string;
  readonly VITE_AUTH_PARCEL_URL: string;
  readonly VITE_MANUAL_USER_SET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
