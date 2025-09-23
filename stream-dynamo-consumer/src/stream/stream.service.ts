import { IStreamParser, ParsedEvent } from "../parsers";

// 타입 정의
type XReadStreamEntry = [id: string, fields: string[]];
type XReadStream = [streamName: string, entries: XReadStreamEntry[]];
type XReadResult = XReadStream[] | null;

export default class StreamService<T> {
  constructor(private readonly parser: IStreamParser<T>) {}

  /**
   * xread 반환값 전체 파싱
   */
  public parseResult(result: XReadResult): Map<string, ParsedEvent<T>> {
    const map = new Map<string, ParsedEvent<T>>();
    if (!result) return map;

    for (const stream of result) {
      const entries = this.parseStream(stream);
      for (const [id, event] of entries) {
        map.set(id, event);
      }
    }
    return map;
  }

  /**
   * 개별 스트림 파싱
   */
  private parseStream([, entries]: XReadStream): Map<string, ParsedEvent<T>> {
    const map = new Map<string, ParsedEvent<T>>();
    for (const entry of entries) {
      const parsed = this.parseEntry(entry);
      if (parsed) map.set(parsed[0], parsed[1]);
    }
    return map;
  }

  /**
   * 단일 엔트리 파싱
   */
  private parseEntry([id, fields]: XReadStreamEntry):
    | [string, ParsedEvent<T>]
    | null {
    const record = this.parseFields(fields);

    const data = this.parser.parse(record);

    return data ? [id, data] : null;
  }

  /**
   * 필드 배열을 key-value 객체로 변환
   * ex. [ 'type', 'message', 'data', '{...}' ] → { type: 'message', data: '{...}' }
   */
  private parseFields(fields: string[]): Record<string, string> {
    const record: Record<string, string> = {};
    for (let i = 0; i < fields.length; i += 2) {
      record[fields[i]] = fields[i + 1];
    }
    return record;
  }
}
