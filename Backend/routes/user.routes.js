const express = require('express');
const router = express.Router();
const { body } = require('express-validator');//testing purpose
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[ //here testing perform
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('FirstName must be atleast 3 characters'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
],userController.registerUser ); //user register


router.post('/login',[
     body('email').isEmail().withMessage('Invalid Email'),
     body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
],userController.loginUser); //user login

router.get('/profile',authMiddleware.authUser,userController.getUserProfile); //user profile
router.post('/logout',authMiddleware.authUser,userController.logoutUser); //user logout


module.exports = router;