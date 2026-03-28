const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller')
const { body } = require('express-validator');//testing purpose


router.post('/register',[ //here testing perform
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('FirstName must be atleast 3 characters'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle','auto']).withMessage('Invalid vehicle type')

],captainController.registerCaptain ); //user register









module.exports = router;