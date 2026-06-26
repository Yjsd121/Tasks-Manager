const express = require('express')
const router = express.Router()
const controller = require('./MinichartData.controller')

router.get('/:name', controller.MinichartTaskview)

module.exports = router