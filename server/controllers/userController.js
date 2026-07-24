
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const register = async(req, res) =>{
    try{

        const {name, email, password, role} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({
                success: false,
                message: 'All Fields are required.'
            })
        }

        const isExists = await User.findOne({email})

        if(isExists){
            return res.status(400).json({
                success: false,
                message: 'User already exists, please login!'
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword= await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role
        })

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            User: newUser
        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
        
    }
}

const login = async(req, res) =>{
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'All Fields are required.'
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'No user found with this email.'
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(400).json({
                success: false,
                message: 'Password does not matched.'
            })
        }

        const accessToken = JWT.sign(
            {id: user._id, name: user.name, role: user.role}, process.env.SECRET_ACCESS_KEY, {expiresIn : '1d'}
        )

        


        return res.status(200).json({
            success: true,
            message: 'User logged in successfully.' ,
            User: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                
            },
            token: accessToken

        })
      

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
    }
}




const getProfile = async(req, res) =>{
    try{

        const userId = req.params.id;

        const findUser = await User.findById(userId).select('-password');

        if(!findUser){
            return res.status(404).json({
                success: false,
                message: 'No user found!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User details as follows:',
            User: findUser
        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
    }
}

const getInstructors = async(req, res) =>{
    try{


        const instructors = await User.find({role: 'instructor'}).select('-password')

        if(!instructors){
            return res.status(404).json({
                success: false,
                message: 'No instructor found!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Instructors list as follows:',
            Instructors: instructors
        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
    }
}


module.exports = {
    register,
    login,
    getProfile,
    getInstructors

}
