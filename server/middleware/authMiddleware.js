

const JWT = require('jsonwebtoken')

const authMiddleware = async(req, res, next) =>{
    

    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'missing or malformed authentication header.'

        })
    }

    const token  = authHeader.split(' ')[1];

    JWT.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) =>{
        if(err){
            return res.status(401).json({
            success: false,
            message: 'missing or malformed authentication header.'

           })
        }

        req.user = user;
        next()
    })
}

module.exports = {
    authMiddleware
}