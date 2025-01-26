export default class User {
  public id: string;

  constructor(public name: string, public avatar_url?: string) {
    this.id = name;

    // 샘플 user면 avatar url
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
