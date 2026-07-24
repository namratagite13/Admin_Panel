

const express = require('express');
const router = express.Router();
const {scheduleLecture, getInstructorLectures, getAllLectures} = require('../controllers/scheduleController')
const {isAdmin} = require('../middleware/isAdmin')
const {authMiddleware} = require('../middleware/authMiddleware')



router.post('/add', authMiddleware, isAdmin, scheduleLecture)
router.get('/all', authMiddleware, getAllLectures )


router.get("/my-schedule", authMiddleware, getInstructorLectures)

module.exports = router;