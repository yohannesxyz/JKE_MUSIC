const user = require('../Models/UserModel');
const path = require('path')
exports.saveUser=(req,res,next)=>{
    const newUser= new user(null,req.body.username,req.body.password).save();
    res.status(201).json(newUser);
}

exports.login = (req,res,next)=>{
    res.status(200).json(user.login(req.body.username,req.body.password));
}
exports.logout=(req,res,next)=>{
    res.status(200).end(user.logout(req.body.id));
}

exports.getLoginPage = (req, res, next) => {

    res.sendFile(path.join(__dirname,"..","..","client","html","index.html"))
}