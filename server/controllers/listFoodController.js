const { ListFood } = require('../models')



class listFoodController{

    static getListFoodHandler(req,res){
        ListFood.findAll()
            .then(result=>{
                res.status(200).json({data:result})
            })
            .catch(err=>{
                res.status(500).json({message:err})
            })
    }

    static addListFoodHandler(req,res){
        // let userId = +req.userData.id
        const {name,imageUrl,location} = req.body

        const newListFood = {name,imageUrl,location,userId:1,note:'asd'}

        ListFood.create(newListFood)
            .then(result=>{
                res.status(201).json({id:result.id,name:result.name,imageUrl:result.imageUrl,location:result.location})
            })
            .catch(err=>{
                res.status(500).json({message:err})
            })
    }


    static editListFoodHandler(req,res){
        let id = +req.params.id
        let note = req.body.note

        ListFood.update({note},{where:{id}})
            .then(result=>{
                res.status(200).json({message:result})
            })
            .catch(err=>{
                res.status(500).json({message:err})
            })

    }


    static deleteListFoodHandler(req,res){
        let id = +req.params.id

        ListFood.destroy({where:{id}})
            .then(result=>{
                res.status(200).json({message:'delete successfully'})
            })
            .catch(err=>{
                res.status(500).json({message:err})
            })
    }


}


module.exports = {
    listFoodController
}