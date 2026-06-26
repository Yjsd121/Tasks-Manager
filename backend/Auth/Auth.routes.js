const express = require('express')
const router = express.Router()
const controller = require('./Auth.controller')

router.post('/login', controller.authlogin)

module.exports = router