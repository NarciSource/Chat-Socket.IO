export default class Room {
  constructor(
    public id: string,
    public participants: string[],
    public is_new: boolean = true,
    public host?: string,
  ) {}
}
