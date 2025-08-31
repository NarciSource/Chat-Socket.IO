/* eslint-disable @typescript-eslint/no-explicit-any */
import { subscribe_on } from "@/entities/chat/service/socketService";

type Callback = (data: any) => void;

// 채팅방 생성 후
export const get_users = (callback: Callback) => subscribe_on("get_users", callback);
