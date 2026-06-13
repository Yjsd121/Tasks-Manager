require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const authmiddleware = require('./middlewares/Auth.middleware')

app.use(cors())
app.use(express.json())

app.use('/Auth', require('./Routes/Auth.routes'))
app.use(authmiddleware)
app.use('/tasksview', require('./Routes/tasks.routes'))
app.use('/Adminview', require('./Routes/user.routes'))

app.listen(port, () => {
  console.log(`Server listen in http://localhost:${port}`)
})