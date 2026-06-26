require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const authmiddleware = require('./middlewares/Auth.middleware')

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/Auth', require('./Auth/Auth.routes'))
app.use(authmiddleware)
app.use('/tasksview', require('./tasks/tasks.routes'))
app.use('/Adminview', require('./users/user.routes'))
app.use('/Minichart', require('./charts/Minichart/minichart.routes'))

app.listen(port, () => {
  console.log(`Server listen in http://localhost:${port}`)
})