const router = require('express').Router()
const listFoodRouter = require('./listFoodRouter')

const UserController = require("../controllers/userController")
const RecommendedController = require("../controllers/recommendedController")

const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/', UserController.homeHandler)

router.use('/food',listFoodRouter)

router.get('/recommended', RecommendedController.searchRecommended)

module.exports = router
