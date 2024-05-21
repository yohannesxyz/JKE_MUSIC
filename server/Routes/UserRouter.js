const express = require('express');
const router = express.Router();
const userController =require('../Controllers/UserController');

router.post('/create-user',userController.saveUser);
router.get('/login',userController.login);
router.get('/logout',userController.logout);


module.exports=router;