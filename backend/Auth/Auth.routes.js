const express = require('express')
const router = express.Router()
const controller = require('./Auth.controller')

router.post('/login', controller.authlogin)
router.get('/verify', controller.verify)

module.exports = router