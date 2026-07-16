import { createConnection } from 'mysql2'

export const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

connection.connect(err => {
  if (err) {
    console.log(err)
  } else {
    console.log('MySQL connectiion is succesfully')
  }
})

