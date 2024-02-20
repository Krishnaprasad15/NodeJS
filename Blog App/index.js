const express= require('express');
const path = require('path')
const userRoute = require('./routes/user')
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app= express();
const port= 5000;
app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=> console.log("MongoDB connected!"))
.catch((err)=> console.log("mongoDb erroe",err));

app.get('/',(req,res)=>{
    res.render('home',{
        user: req.user,
    })
})

app.use('/user',userRoute);
app.listen(port,()=> console.log(`Server started at http://localhost:${port}`));