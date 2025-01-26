import User from "./User";

export default class Room {
  constructor(
    public id: string,
    public participants: User[],
    public is_new: boolean = true,
    public host?: User,
    public name?: string,
  ) {
    this.name = this.participants.map((p) => p.name).join(", ");
  }
}
