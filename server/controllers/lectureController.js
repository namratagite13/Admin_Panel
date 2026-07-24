
const Lecture = require('../models/Lecture')


const createLecture = async(req, res) =>{
    try{
        const {name, level, description} = req.body;

        if(!name || !level || !description){
            return res.status(400).json({
                success: false,
                message: 'All Fields are required.'
            })
        }

        const lectureName = await Lecture.findOne({name})

        if(lectureName){
            return res.status(400).json({
                success: false,
                message: 'Lecture already exists with this name!'
            })
        }

        const lecture = await Lecture.create({
            name,
            level,
            description,
        
        })

        return res.status(200).json({
            success: true,
            message: 'Lecture created successfully.',
            Lecture: lecture
        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
    }
}


const getLectures = async(req, res) =>{
    try{

        const lectures = await Lecture.find();

        if(!lectures){
            return res.status(404).json({
                success: false,
                message: 'No lecture found' || []
            
            })

        }

        return res.status(200).json({
            success: true,
            message: 'Lectures as follows:',
            Lectures: lectures
        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error.',
            
        })
        
    }
}


const getLectureById = async(req, res) =>{
    try{

        const {id} = req.params;

        const lecture = await Lecture.findById(id);

        if(!lecture){
            return res.status(404).json({
                success: false,
                message: 'No lecture found' || []
            
            })
        }

        return res.status(200).json({
            success: true,
            message: 'lecture found with id',
            Lecture: lecture
            
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
    createLecture,
    getLectures,
    getLectureById 



}