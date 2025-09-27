import { Client } from "@elastic/elasticsearch";

export default class ESWriter<T> {
  private client: Client;
  private index: string;

  constructor() {
    const host = process.env.ES_HOST;
    const port = process.env.ES_PORT;
    const username = process.env.ES_USERNAME;
    const password = process.env.ES_PASSWORD;

    this.index = process.env.ES_INDEX;
    this.client = new Client({
      node: `http://${host}:${port}`,
      auth: { username, password },
    });
  }

  async updateChatMessage(eventId: string, content: T & { createdAt?: Date }) {
    try {
      await this.client.update({
        index: this.index,
        id: eventId,
        doc: content,
        doc_as_upsert: true,
      });
    } catch (error) {
      console.error("Error updating ES message:", error);
    }
  }
}
