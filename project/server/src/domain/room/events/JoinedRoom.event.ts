export default class JoinedRoomEvent {
  constructor(
    public readonly roomId: string,
    public readonly userId: string,
    public readonly members: string[],
  ) {}
}
