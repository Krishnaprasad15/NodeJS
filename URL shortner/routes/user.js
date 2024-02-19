const express= require('express');
const router= express.Router();

const {handleUserSignup, handleUserSignin} = require('../controllers/user')

router.post('/',handleUserSignup);
router.post('/signin',handleUserSignin);

module.exports= router;