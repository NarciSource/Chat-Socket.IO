export default class SyncEvent {
  constructor(
    public readonly eventName: string,
    public readonly roomId: string,
    public readonly socketIds: string[],
  ) {}
}
