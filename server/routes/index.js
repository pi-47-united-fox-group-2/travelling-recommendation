const router = require("express").Router()
const UserController = require("../controllers/userController")

// home
router.get('/', UserController.homeHandler)

// register
router.post('/register', UserController.register)

// login
router.post('/login', UserController.login)

module.exports = router

