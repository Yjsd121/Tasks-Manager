import { use } from "react";

class User {
  constructor({
    userid = null,
    name,
    email,
    password,
    role
  }) {
    this.userid = userid
    this.name = name
    this.email = email
    this.password = password
    this.role = role
  }

  validate() {
    const err = []

    if (!this.userid) err.push('Id err')
    if (!this.name) err.push('name field empty')
    if (!this.email) err.push('email field empty')
    if (!this.password) err.push('password field empty')
    if (!this.role) err.push('role field empty')
  }

  toCreateParams() {
    return [
      this.userid,
      this.name,
      this.email,
      this.password,
      this.role
    ]
  }

  static bluidUserId(number) {
    const today = new Date()
    const year = today.getFullYear()
    return `${year}-${da}-${String(number).padStart(3, '0')}`
  }
}
