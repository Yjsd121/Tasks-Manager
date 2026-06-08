const connection = require('./dbConnection.js')

function Query (sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

module.exports = Query
