const user = require('../Models/UserModel');
const path = require('path');
const userData = require('../Database/Users')

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

    try {

        const token = req.headers.cookie.split('token=')[1].split(';')[0].trim();
       

        if (!token) {
            res.sendFile(path.join(__dirname,"..","..","client","html","index.html"))
        }

        let authUser = userData.find(user => user.token === token);

        if (authUser) {
            res.redirect('/dashboard')
        } else {
            
            res.sendFile(path.join(__dirname,"..",'..','client','html','index.html'));
        }

    } catch (error) {

        res.sendFile(path.join(__dirname,"..","..","client","html","index.html"))
        
    }
    
     res.sendFile(path.join(__dirname,"..","..","client","html","index.html"))
}