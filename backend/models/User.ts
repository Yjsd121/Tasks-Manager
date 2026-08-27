export interface UserInput {
  userid?: string | null;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
  img?: string | null;
  first_login?: boolean;
  User_names?: string;
  User_lastnames?: string;
  User_email?: string;
  Password?: string;
  Role?: string;
  Img_rute?: string | null;
  First_login?: boolean;
}

type UserUpdateFields = Record<string, string | boolean | null>;

class User {
  userid: string | null;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
  img?: string | null;
  first_login: boolean;

  constructor({
    userid = null,
    name,
    lastname,
    email,
    password,
    role,
    img = null,
    first_login = true,

    User_names,
    User_lastnames,
    User_email,
    Password,
    Role,
    Img_rute,
    first_login: First_login,
  }: UserInput) {
    this.userid = userid;
    this.name = (name || User_names)?.trim();
    this.lastname = (lastname || User_lastnames)?.trim();
    this.email = (email || User_email)?.trim();
    this.password = password || Password;
    this.role = role || Role;
    this.img = img || Img_rute;
    this.first_login = first_login ?? First_login ?? true;
  }

  validate(): string[] {
    const err: string[] = [];

    if (!this.userid) err.push("Id err");
    if (!this.name) err.push("name field empty");
    if (!this.lastname) err.push("lastname field required");
    if (!this.email) err.push("email field empty");
    if (!this.password) err.push("password field empty");
    if (!this.role) err.push("role field empty");

    return err;
  }

  toCreateParams(): unknown[] {
    return [
      this.userid,
      this.name,
      this.lastname,
      this.email,
      this.password,
      this.role,
      this.img,
      this.first_login,
    ];
  }

  static buildUserId(name: string, lastname: string, number: number): string {
    const today = new Date();
    const year = today.getFullYear();
    const initials =
      `${name.trim()[0]}${lastname.trim()[0]}`.toUpperCase();

    return `${year}-${initials}-${String(number).padStart(4, "0")}`;
  }

  static getAllowedUpdateFields(): Record<keyof UserInput, string> {
    return {
      userid: "Client_id",
      name: "User_names",
      lastname: "User_lastnames",
      email: "User_email",
      password: "User_pass",
      role: "Role",
      img: "Img_rute",
      User_names: "User_names",
      User_lastnames: "User_lastnames",
      User_email: "User_email",
      Password: "User_pass",
      Role: "Role",
      Img_rute: "Img_rute",
      first_login: "first_login",
      First_login: "first_login",
    };
  }

  static buildUpdate(userData: UserInput): UserUpdateFields {
    const allowedFields = this.getAllowedUpdateFields();

    return (Object.keys(allowedFields) as (keyof UserInput)[]).reduce(
      (updates: UserUpdateFields, field) => {
        if (field === "userid") {
          return updates;
        }

        if (userData[field] !== undefined && userData[field] !== "") {
          const value = userData[field];
          updates[allowedFields[field]] =
            typeof value === "string" ? value.trim() : value;
        }

        return updates;
      },
      {},
    );
  }
}

export default User;
