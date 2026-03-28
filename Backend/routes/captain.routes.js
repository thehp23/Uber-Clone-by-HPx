const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller')
const { body } = require('express-validator');//testing purpose
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register',[ //here testing perform
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('FirstName must be atleast 3 characters'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle','auto']).withMessage('Invalid vehicle type')

],captainController.registerCaptain ); //user register



router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters')
],captainController.loginCaptain); //captain login

router.post('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile) //captain profile
router.post('/logout',authMiddleware.authCaptain,captainController.logoutCaptain); //captain logout



module.exports = router;