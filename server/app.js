const express = require('express');
const UserRouter=require('./Routes/UserRouter');
const MusicRouter=require('./Routes/MusicRouter');
const userData = require('./Database/Users');
const path = require("path");
const cors = require('cors');
const app = express();


app.use(cors());


app.use(express.json());

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
            res.status(404).json({status:"error", message: "Not found"});
        }
    } catch (error) {
        res.status(404).json({status:"error", message: "Not found"});

    }
});


app.use('/dashboard', (req,res,next) => {
    res.sendFile(path.join(__dirname,'..','client','html','dashboard.html'))
})

app.use('/css', express.static(path.join(__dirname,'..','client','css')))
app.use('/js', express.static(path.join(__dirname,'..','client','js')))
app.use('/images', express.static(path.join(__dirname,'..','client','images')))
app.use('/songs', express.static(path.join(__dirname,'resources','songs')))
app.use('/user',UserRouter);
app.use('/music',MusicRouter);


app.use((req,res,next)=>{
    res.end('404 page here');
})
app.use((error, req, res, next) => {
    if (error.message.startsWith('There')) {
        res.status(400).json({ success: false, message: error.message });
    } else {
        res.status(500).json({success:false,message:error.message});
    }
});

app.listen(3000,()=>"listning on 3000...");