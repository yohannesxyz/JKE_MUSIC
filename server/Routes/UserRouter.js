const express = require('express');
const router = express.Router();
const userController =require('../Controllers/UserController');

router.post('/create-user',userController.saveUser);
router.post('/login',userController.login);
router.get('/login',userController.getLoginPage);
router.post('/logout',userController.logout);


module.exports=router;