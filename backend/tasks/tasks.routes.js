const express = require('express')
const router = express.Router()
const controller = require('./gettask.controller')

router.get('/:name', controller.gettasks)
router.post('/', controller.createtask)
router.put('/:id', controller.updatetask)
router.delete('/:id', controller.deletetask)

module.exports = router
