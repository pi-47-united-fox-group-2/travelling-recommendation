const router = require('express').Router()
const {listFoodController} = require('../controllers')

// const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

// router.use(authentication)

router.get('/', listFoodController.getListFoodHandler)
router.post('/', listFoodController.addListFoodHandler)

router.patch('/:id', authorization, listFoodController.editListFoodHandler)
router.delete('/:id', authorization, listFoodController.deleteListFoodHandler)




module.exports = router