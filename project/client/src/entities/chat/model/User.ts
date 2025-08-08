/**
 * 채팅 애플리케이션의 사용자를 나타냅니다.
 */
export default class User {
  /**
   * 사용자의 고유 식별자입니다.
   * 사용자의 이름에서 파생됩니다.
   */
  public id: string;

  /**
   * 새로운 User 인스턴스를 생성합니다.
   *
   * @param name - 사용자의 이름.
   * @param avatar_url - (선택 사항) 사용자의 아바타 URL.
   *                     제공되지 않은 경우 샘플 아바타 URL이 생성됩니다.
   */
  constructor(
    public name: string,
    public avatar_url?: string,
  ) {
    this.id = name;
    this.avatar_url = sample_avatar(name);
  }
}

const samples = ["user1", "user2", "user3", "user4", "user5", "user6"];
function sample_avatar(name: string) {
  if (samples.includes(name)) {
    return `https://cdn.quasar.dev/img/avatar${samples.indexOf(name) + 1}.jpg`;
  }
}

export const sample_users = samples.map((user) => new User(user, sample_avatar(user)));
