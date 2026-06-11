const express = require('express')
const router = express.Router()
const controller = require('../controllers/gettask.controller')

router.get('/', controller.gettasks)
router.post('/', controller.createtask)
router.put('/:id', controller.updatetask)
router.delete('/:id', controller.deletetask)

module.exports = router
