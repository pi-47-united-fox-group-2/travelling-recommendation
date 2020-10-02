const { User } = require("../models/index")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static homeHandler(req, res,next) {
        res.send("Success")
    }

    static register(req, res) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(input)
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static async login(req, res, next) {
        const input = {
            email: req.body.email,
            password: req.body.password
        }
        // console.log(input)

        try {
            const user = await User.findOne({
                where: {
                    email: input.email
                }
            })

            if(!user) {
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            } else if(!comparePassword(input.password, user.password)) {
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token,userId:user.id,message:'berhasil login'
                })
            }

        } catch(err) {
            next(err)
        }

    }


    static googleLogin(req,res,next){
        console.log('masuk googlelogin controller')
        let emailGoogle
        const client = new OAuth2Client(process.env.CLIENT_ID);

        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(({payload})=>{
            console.log('masuk')
            console.log(payload)
            emailGoogle = payload.email
            return User.findOne({where:{email:emailGoogle}})
        })
        .then(resultuser=>{
            if(!resultuser){
                var userGoogle={
                    email:emailGoogle,
                    password:'123'
                }
                return User.create(userGoogle)
            }else{
                return resultuser
            }
        })
        .then(user=>{
            const access_token = signToken({id:user.id,email:user.email})
            return res.status(201).json({access_token,userId:user.id,message:'berhasil login'})
        })
        .catch(err=>{
            next(err)
        })
    }


}


module.exports = UserController