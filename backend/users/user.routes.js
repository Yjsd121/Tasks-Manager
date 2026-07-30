import express from 'express'
import * as controller from './users.controller.js'
import upload from '../middlewares/uploads.middleware.js'

const router = express.Router()

//Get
router.get('/users', controller.getUsers)
router.get('/userid', controller.getuserIDS)
router.get('/Me', controller.gettingMe)

// POST
router.post('/create', upload.single('Img_rute'), controller.createUser)

//PUT
router.put('/:id', upload.single('Img_rute'), controller.updateUser)

//DELETE
router.delete('/:id', controller.deleteUser)


export default router