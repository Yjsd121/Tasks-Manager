import express from 'express'
import * as controller from './gettask.controller.js'

const router = express.Router()

router.get('/', controller.gettasks)
router.post('/', controller.createtask)
router.put('/:id', controller.updatetask)
router.delete('/:id', controller.deletetask)



export default router
