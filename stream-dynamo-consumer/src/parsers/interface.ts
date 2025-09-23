export interface ParsedEvent<T> {
  eventName: string;
  payload: string | T;
  type?: string;
  nsp?: string;
  uid?: string;
}

export default interface IStreamParser<T> {
  parse(raw: Record<string, string>): ParsedEvent<T>;
}
