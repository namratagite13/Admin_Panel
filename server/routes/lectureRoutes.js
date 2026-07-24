

const express = require('express');
const router = express.Router();
const {createLecture, getLectureById, getLectures} = require('../controllers/lectureController')
const {isAdmin} = require('../middleware/isAdmin')
const {authMiddleware} = require('../middleware/authMiddleware')





router.post('/create', authMiddleware, isAdmin , createLecture)
router.get('/all', authMiddleware,  getLectures)



router.get('/:id', authMiddleware, getLectureById)


module.exports = router;