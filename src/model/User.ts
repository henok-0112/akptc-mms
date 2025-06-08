class User {
  public id?: number;
  public name?: string;
  public username?: string;
  public role?: string;

  constructor({ id, name, username, role }: User) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.role = role;
  }
}

export default User;
