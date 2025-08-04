import User from "./User";

/**
 * 애플리케이션의 채팅 메시지를 나타냅니다.
 */
export default class Message {
  /**
   * `Message` 클래스의 인스턴스를 생성합니다.
   *
   * @param owner - 메시지의 소유자인 사용자.
   * @param text - 메시지 내용을 나타내는 문자열 배열.
   * @param is_system - 메시지가 시스템 메시지인지 여부를 나타냅니다. 기본값은 `false`입니다.
   * @param created_at - 메시지가 생성된 타임스탬프. 기본값은 현재 날짜와 시간입니다.
   */
  constructor(
    public owner: User,
    public text: string[],
    public is_system: boolean = false,
    public created_at: Date = new Date(),
  ) {}

  /**
   * 메시지 소유자의 이름을 가져옵니다.
   *
   * @returns 메시지 소유자인 사용자의 이름.
   */
  get name() {
    return this.owner.name;
  }

  /**
   * 메시지에 새 텍스트 세그먼트를 추가합니다.
   *
   * @param text - 추가할 텍스트 세그먼트.
   */
  public add_text(text: string) {
    this.text.push(text);
  }

  /**
   * 메시지에 특정 텍스트 세그먼트가 포함되어 있는지 확인합니다.
   *
   * @param text - 검색할 텍스트 세그먼트.
   * @returns 텍스트 세그먼트가 메시지에 포함되어 있으면 `true`, 그렇지 않으면 `false`.
   */
  public include(text: string) {
    return this.text.some((t) => t.includes(text));
  }
}
