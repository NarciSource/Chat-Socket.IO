export default class CreatedRoomEvent {
  constructor(
    public readonly roomId: string,
    public readonly members: string[],
  ) {}
}
