class User {
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
    first_login: First_login
  }) {
    this.userid = userid
    this.name = (name || User_names)?.trim()
    this.lastname = (lastname || User_lastnames)?.trim()
    this.email = (email || User_email)?.trim()
    this.password = password || Password
    this.role = role || Role
    this.img = img || Img_rute
    this.first_login = first_login ?? First_login ?? true
  }

  validate() {
    const err = []

    if (!this.userid) err.push('Id err')
    if (!this.name) err.push('name field empty')
    if (!this.lastname) err.push('lastname field required')
    if (!this.email) err.push('email field empty')
    if (!this.password) err.push('password field empty')
    if (!this.role) err.push('role field empty')

    return err
  }

  toCreateParams() {
    return [
      this.userid,
      this.name,
      this.lastname,
      this.email,
      this.password,
      this.role,
      this.img,
      this.first_login
    ]
  }

  static buildUserId(name, lastname, number) {
    const today = new Date()
    const year = today.getFullYear()
    const initials =
      `${name.trim()[0]}${lastname.trim()[0]}`.toUpperCase()

    return `${year}-${initials}-${String(number).padStart(4, '0')}`
  }

  static getAllowedUpdateFields() {
    return {
      name: 'User_names',
      lastname: 'User_lastnames',
      email: 'User_email',
      password: 'User_pass',
      role: 'Role',
      img: 'Img_rute',
      User_names: 'User_names',
      User_lastnames: 'User_lastnames',
      User_email: 'User_email',
      Password: 'User_pass',
      Role: 'Role',
      Img_rute: 'Img_rute',
      first_login: "first_login",
      First_login: "first_login",
    }
  }

  static buildUpdate(userData) {
    const allowedFields = this.getAllowedUpdateFields()

    return Object.keys(allowedFields).reduce((updates, field) => {
      if (userData[field] !== undefined && userData[field] !== '') {
        updates[allowedFields[field]] =
          typeof userData[field] === 'string'
            ? userData[field].trim()
            : userData[field]
      }

      return updates
    }, {})
  }

}

export default User
