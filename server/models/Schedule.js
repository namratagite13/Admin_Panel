
const mongoose = require('mongoose');



const scheduleSchema = new mongoose.Schema({

    lecture: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Lecture',
        required: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true
    }

}, {timestamps : true})


module.exports = mongoose.model('Schedule', scheduleSchema)