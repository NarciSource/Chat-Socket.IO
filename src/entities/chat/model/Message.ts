import User from "./User";

export default class Message {
  constructor(public owner: User, public text: string[], public is_system: boolean = false) {}

  get name() {
    return this.owner.name;
  }

  public add_text(text: string) {
    this.text.push(text);
  }

  public include(text: string) {
    return this.text.some((t) => t.includes(text));
  }
}
