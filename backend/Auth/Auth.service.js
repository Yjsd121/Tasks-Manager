import { Query } from "../utils/Query.js"

export const getusers = async (email) => {
  return await Query('SELECT * FROM users WHERE "User_email" = $1 ', [email])
}