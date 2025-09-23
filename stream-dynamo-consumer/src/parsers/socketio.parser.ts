import { ChatMessage } from "../model";
import IStreamParser from "./interface";

export default class SocketIOParser implements IStreamParser<ChatMessage> {
  parse(raw: Record<string, string>) {
    if (!raw.data) return null;

    const { data, ...remains } = raw;

    try {
      const [eventName, payload] = JSON.parse(data).packet.data;

      return {
        eventName,
        payload,
        ...remains,
      };
    } catch (err) {
      console.error("[RedisStreamParser] Failed to parse record.data", err);
      return null;
    }
  }
}
