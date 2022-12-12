const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller') 

router.post('/user', userController.createUser)
router.get('/user:id', userController.getOneUser)
router.get('/users', userController.getUsers)
router.put('/update', userController.updateUser)

module.exports = router