const express = require('express')
const router = express.Router()
const controller = require('./users.controller')
const upload = require('../middlewares/uploads.middleware')

router.get('/users', controller.getUsers)
router.post('/create', upload.single('Img_rute'), controller.createUser)
router.put('/:id', upload.single('Img_rute'), controller.updateUser)
router.delete('/:id', controller.deleteUser)

module.exports = router
