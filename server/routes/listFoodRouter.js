const { route } = require('.')

const router = require('express').Router()
const {listFoodController} = require('../controllers')


//authentication
router.get('/', listFoodController.getListFoodHandler)
router.post('/', listFoodController.addListFoodHandler)

//authorization
router.patch('/:id', listFoodController.editListFoodHandler)
router.delete('/:id', listFoodController.deleteListFoodHandler)




module.exports = router