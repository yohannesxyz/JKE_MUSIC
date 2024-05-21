const Express = require('express');
const UserRouter=require('./Routes/UserRouter');
const MusicRouter=require('./Routes/MusicRouter');
const app=Express();
app.use(Express.json());
app.use('/user',UserRouter);
app.use('/music',MusicRouter);




app.listen(3000,()=>"listning on 3000...");