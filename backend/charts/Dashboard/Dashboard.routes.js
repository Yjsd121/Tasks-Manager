const express = require('express')
const router = express.Router()
const controller = require('./Dashboard.controller')

router.get('/Totaltask', controller.TotalTasks)
router.get('/Usertask', controller.UsersTaks)
router.get('/Mini', controller.minicards)

module.exports = router