const express = require('express')
const router = express.Router()
const controller = require('../controllers/MinichartData.controller')

router.get('/', controller.MinichartTaskview)

module.exports = router