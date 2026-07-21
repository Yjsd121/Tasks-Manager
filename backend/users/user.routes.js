import express from 'express'
import * as controller from './users.controller.js'
import upload from '../middlewares/uploads.middleware.js'

const router = express.Router()


router.get('/users', controller.getUsers)
router.get('/userid',controller.getuserIDS)
router.post('/create', upload.single('Img_rute'), controller.createUser)
router.put('/:id', upload.single('Img_rute'), controller.updateUser)
router.delete('/:id', controller.deleteUser)


export default router