



const express = require('express');
const router = express.Router();
const {register, login, getProfile, getInstructors} = require('../controllers/userController')
const {authMiddleware} = require('../middleware/authMiddleware')



router.post('/register', register)
router.post('/login', login)
router.get('/instructor', authMiddleware , getInstructors)


router.get('/:id', authMiddleware , getProfile)




module.exports = router;