export default class EmitEvent {
  constructor(
    public readonly eventName: string,
    public readonly target: string,
    public readonly data,
  ) {}
}
