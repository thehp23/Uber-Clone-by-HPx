const express = require('express');
const router = express.Router();
const { body } = require('express-validator');//testing purpose
const userController = require('../controllers/user.controller')

router.post('/register',[ //here testing perform
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('FirstName must be atleast 3 characters'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
],userController.registerUser ) //user register






module.exports = router;