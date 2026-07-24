



const isAdmin = async (req, res, next) =>{

    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        return res.status(403).json({
            success: false,
            message: 'Access denied, You have no admin rights.'
        })
    }

}


module.exports = {
    isAdmin
}