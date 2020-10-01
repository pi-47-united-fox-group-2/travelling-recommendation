const { route } = require('./listFoodRouter')

const router = require('express').Router()
const listFoodRouter = require('./listFoodRouter')
const UserController = require("../controllers/userController")
const RecommendedController = require("../controllers/recommendedController")

router.use('/food',listFoodRouter)


// home
router.get('/', UserController.homeHandler)

// register
router.post('/register', UserController.register)

// login
router.post('/login', UserController.login)

router.get('/recommended', RecommendedController.searchRecommended)

module.exports = router
