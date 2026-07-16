import { connection } from './bdConnection.js'

export function Query(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}
