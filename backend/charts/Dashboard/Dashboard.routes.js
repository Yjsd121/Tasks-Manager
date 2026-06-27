const express = require('express')
const router = express.Router()
const controller = require('./Dashboard.controller')

router.get('/Totaltask', controller.TotalTasks)
router.get('/Usertask', controller.UsersTaks)

module.exports = router