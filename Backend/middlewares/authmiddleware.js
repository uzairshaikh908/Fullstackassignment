import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'

var checkUserAuth = async(req, res, next)=>{
    let token
    const { authorization } = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            // Get Token from header
            token = authorization.split(' ')[1]
            // console.log("Token", token)

            // Verify Token
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // Get User from Token
            req.user = await UserModel.findById(userID).select('-password')
              next()
        } catch (error) {
            console.log(error)
            res.status(401).send({"status":"failed", "message":"Unauthorized User"})
        }
    }
    if(!token) {
        res.status(401).send({"status":"failed", "message":"UNauthorized User, No Token"})
    }
}


export default checkUserAuth