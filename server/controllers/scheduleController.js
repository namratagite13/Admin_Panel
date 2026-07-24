
const Schedule = require('../models/Schedule')
const Lecture = require('../models/Lecture')
const User = require('../models/User')


const scheduleLecture = async(req, res) =>{
    try{

        const {lecture, instructor, date} = req.body;

        const instructorId = instructor || req.user_id

        //const findInstructor = await User.findById(instructorId);

        let findInstructor;

        if(instructorId.match(/^[0-9a-fA-F]{24}$/)){
            findInstructor = await User.findById(instructorId)
        }else{
            findInstructor = await User.findOne({name: instructorId })
        }

        if(!findInstructor){
            return res.status(404).json({
                success: false,
                message: 'No instructor found with this id.'
            })
        }

        const existingLectureWithInstructor = await Schedule.findOne({
         
            instructor: findInstructor._id,
            date: date
        })

        if(existingLectureWithInstructor){
            return res.status(400).json({
                success: false,
                message: 'Lecture already exist for this instructor for the date.',

            })
        }


        const schedule = await Schedule.create({
            lecture,   
            instructor: findInstructor._id ,
            date
        })

        return res.status(200).json({
            success: true,
            message: 'Schedule assign for the lecture and instructor ', 
            Schedule: schedule
        }) 

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })

    }
}


const getInstructorLectures = async(req, res) =>{
    try{

        

        const instructorId = req.user_id || req.user?._id || req.user?.id

        const allLecturesForInstructor = await Schedule.find({instructor: instructorId}).populate('lecture').populate('instructor', 'name email');

        return res.status(200).json({
            success: true,
            message: 'All lectures assign to instructor as follows',
            all : allLecturesForInstructor
        }) 

       
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
        
    }
}

const getAllLectures = async(req, res) =>{
    try{

        const {id} = req.params
        const allLectures = await Schedule.find()

        if(!allLectures){
            return res.status(404).json({
                success: false,
                message: 'No lectures found, for this instructor' || [],
            }) 
        }

        return res.status(200).json({
            success: true,
            message: 'All lectures as follows:',
            allLectures: allLectures
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
    scheduleLecture,
    getInstructorLectures,
    getAllLectures

}