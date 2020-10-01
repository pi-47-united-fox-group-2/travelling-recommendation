const { route } = require('./listFoodRouter')

const router = require('express').Router()
const listFoodRouter = require('./listFoodRouter')






router.use('/food',listFoodRouter)






module.exports = router