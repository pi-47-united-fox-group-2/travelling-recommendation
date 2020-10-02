const { ListFood } = require('../models')

const authorization = (req,res,next) => {
    ListFood.findByPk(req.params.id)
    .then(ListFood => {
        if(!ListFood) {
            res.status(404).json({message: 'Not Found'})
        } else if (req.userData.id !== ListFood.userId) {
            res.status(401).json({message: 'You are not Authorized'})
        } else {
            next()
        }
    })
}

module.exports = authorization