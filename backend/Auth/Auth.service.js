import { Query } from "../utils/Query.js"

export const getusers = async (email) => {
  return await Query('SELECT * FROM todoapp.users WHERE User_email = ? ', [email])
}