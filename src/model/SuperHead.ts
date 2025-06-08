class SuperHead {
  public id?: number;
  public full_name?: string;
  public username?: string;
  public gender?: string;
  public department?: number;
  public password?: string;
  public role?: string = "superHead";
  public securityQuestion?: number;
  public securityAnswer?: string;

  constructor({
    id,
    full_name,
    username,
    gender,
    department,
    password,
    securityQuestion,
    securityAnswer,
  }: SuperHead) {
    this.id = id;
    this.full_name = full_name;
    this.username = username;
    this.gender = gender;
    this.department = department;
    this.password = password;
    this.securityQuestion = securityQuestion;
    this.securityAnswer = securityAnswer;
  }
}

export default SuperHead;
