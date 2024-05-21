const Express = require('express');
const UserRouter=require('./Routes/UserRouter');
const MusicRouter=require('./Routes/MusicRouter');
const app=Express();
app.use(Express.json());
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