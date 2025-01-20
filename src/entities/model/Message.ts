export default class Message {
  constructor(
    public name: string,
    public text: string[],
    public sent: boolean,
    public is_system: boolean = false,
  ) {}

  public add_text(text: string) {
    this.text.push(text);
  }

  public include(text: string) {
    return this.text.some((t) => t.includes(text));
  }
}
