import { ChatMessage } from "@shared/models";
import IStreamParser from "./interface";

export default class BasicParser implements IStreamParser<ChatMessage> {
  parse(raw: Record<string, string>) {
    if (!raw.message) return null;

    const { message, ...remains } = raw;

    try {
      const payload = JSON.parse(message);

      return {
        eventName: "receive_message",
        payload,
        ...remains,
      };
    } catch (err) {
      console.error("[RedisStreamParser] Failed to parse record.message", err);
      return null;
    }
  }
}
