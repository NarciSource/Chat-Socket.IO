import User from "./User";

/**
 * 채팅 애플리케이션의 채팅 방을 나타냅니다.
 */
export default class Room {
  /**
   * Room 클래스의 인스턴스를 생성합니다.
   *
   * @param id - 방의 고유 식별자.
   * @param participants - 방에 참여하는 사용자 목록.
   * @param is_new - 방이 새로 생성되었는지 여부를 나타냅니다. 기본값은 `true`입니다.
   * @param host - (선택 사항) 방을 호스팅하는 사용자.
   * @param name - (선택 사항) 방의 이름. 제공되지 않은 경우, 참가자의 이름을 연결하여 생성됩니다.
   */
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
