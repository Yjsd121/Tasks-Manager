class User {
  constructor({
    userid = null,
    name,
    lastname,
    email,
    password,
    role,
    img = null,
    User_names,
    User_lastnames,
    User_email,
    Password,
    Role,
    Img_rute
  }) {
    this.userid = userid
    this.name = (name || User_names)?.trim()
    this.lastname = (lastname || User_lastnames)?.trim()
    this.email = (email || User_email)?.trim()
    this.password = password || Password
    this.role = role || Role
    this.img = img || Img_rute
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
      this.img
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
      Img_rute: 'Img_rute'
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
