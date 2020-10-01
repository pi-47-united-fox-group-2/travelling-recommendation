const { ListFood } = require('../models')

class listFoodController{

    static getListFoodHandler(req,res,next){
        ListFood.findAll()
            .then(result=>{
                res.status(200).json({data:result})
            })
            .catch(err=>{
                next(err)
            })
    }

    static addListFoodHandler(req,res,next){
        // let userId = +req.userData.id
        const {name,imageUrl,location} = req.body

        const newListFood = {name,imageUrl,location,userId:1,note:'asd'}

        ListFood.create(newListFood)
            .then(result=>{
                res.status(201).json({id:result.id,name:result.name,imageUrl:result.imageUrl,location:result.location})
            })
            .catch(err=>{
                next(err)
            })
    }


    static editListFoodHandler(req,res,next){
        let id = +req.params.id
        let note = req.body.note

        ListFood.update({note},{where:{id}})
            .then(result=>{
                res.status(200).json({message:result})
            })
            .catch(err=>{
                next(err)
            })

    }


    static deleteListFoodHandler(req,res,next){
        let id = +req.params.id

        ListFood.destroy({where:{id}})
            .then(result=>{
                res.status(200).json({message:'delete successfully'})
            })
            .catch(err=>{
                next(err)
            })
    }


}


module.exports = {
    listFoodController
}