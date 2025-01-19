export default class Message {
  constructor(public text: string[], public sent: boolean) {}

  public add_text(text: string) {
    this.text.push(text);
  }
}
