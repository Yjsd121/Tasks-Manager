class User {
  constructor({
    userid = null,
    name,
    lastname,
    email,
    password,
    role
  }) {
    this.userid = userid
    this.name = name
    this.lastname = lastname
    this.email = email
    this.password = password
    this.role = role
  }

  validate() {
    const err = []

    if (!this.userid) err.push('Id err')
    if (!this.name) err.push('name field empty')
    if (!this.lastname) err.push('lastname field required')
    if (!this.email) err.push('email field empty')
    if (!this.password) err.push('password field empty')
    if (!this.role) err.push('role field empty')
  }

  toCreateParams() {
    return [
      this.userid,
      this.name,
      this.lastname,
      this.email,
      this.password,
      this.role
    ]
  }

  static bluidUserId(name, lastname, number) {
    const today = new Date()
    const year = today.getFullYear()
    const initials =
      `${name.trim()[0]}${lastname.trim()[0]}`.toUpperCase()

    return `${year}-${initials}-${String(number).padStart(3, '0')}`
  }

  static getAllowedUpdateFields() {
    return {
      name: 'User_names',
      lastname: 'User_lastnames',
      email: 'User_email',
      password: 'User_pass',
      role: 'Role'
    }
  }

  static buildUpdate(userData) {
    const allowedFields = this.getAllowedUpdateFields()

    return Object.keys(allowedFields).reduce((updates, field) => {
      if (userData[field] !== undefined && userData[field] !== '') {
        updates[`\`${allowedFields[field]}\``] =
          typeof userData[field] === 'string'
            ? userData[field].trim()
            : userData[field]
      }

      return updates
    }, {})
  }

}

module.exports = User