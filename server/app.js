const express = require('express');
const UserRouter=require('./Routes/UserRouter');
const MusicRouter=require('./Routes/MusicRouter');
const userData = require('./Database/Users');
const path = require("path");
const cors = require('cors');
const app = express();

// Allow cross origins
app.use(cors());

app.use(express.json());

// check authentication
app.use('/music', (req, res, next) => {
  
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(404).json({status:"error", message: "Not found"});
        }

        let authUser = userData.find(user => user.token === token);

        if (authUser) {
            next();
        } else {
            
            res.sendFile(path.join(__dirname,'..','client','html','dashboard.html'));
        }
    } catch (error) {
        res.status(404).json({status:"error", message: "Not found"});

    }
});


// root page redirect to login
app.get('/', (req,res,next) => {
    res.redirect('/user/login')
})


// get dashboard
app.use('/dashboard', (req,res,next) => {

    
    try {
        const token = req.headers.cookie.split('token=')[1].split(';')[0].trim();

        if (!token) {
            res.redirect('/');
        }

        let authUser = userData.find(user => user.token === token);

        if (authUser) {
            res.sendFile(path.join(__dirname,'..','client','html','dashboard.html'))
        } else {
            
          res.redirect('/');
        }
    } catch (error) {
         res.redirect('/');

    }
   
    
    res.sendFile(path.join(__dirname,'..','client','html','dashboard.html'))
})


//  serving static files
app.use('/css', express.static(path.join(__dirname,'..','client','css')))
app.use('/js', express.static(path.join(__dirname,'..','client','js')))
app.use('/images', express.static(path.join(__dirname,'..','client','images')))
app.use('/songs', express.static(path.join(__dirname,'resources','songs')))

// user and music routes
app.use('/user',UserRouter);
app.use('/music',MusicRouter);


// handling 404
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','client','html','404.html'))
})


// error handler
app.use((error, req, res, next) => {

    if (error.message.startsWith('There')) {

        res.status(400).json({ success: false, message: error.message });
    } else {
        res.status(500).json({success:false,message:error.message});
    }

});

// server bootup
app.listen(3000, () => console.log("listening on 3000..."));