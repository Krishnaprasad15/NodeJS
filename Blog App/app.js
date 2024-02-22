require('dotenv').config()

const express= require('express');
const path = require('path')
const userRoute = require('./routes/user')
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const blogRoute = require('./routes/blog');
const Blog= require('./models/blog');

const app= express();
const port= process.env.PORT;
app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve("./public")))

mongoose.connect('mongodb+srv://krishna:Krishna%4015@cluster0.kz9bkoi.mongodb.net/blogsphere?retryWrites=true&w=majority')
.then(()=> console.log("MongoDB connected!"))
.catch((err)=> console.log("mongoDb erroe",err));

app.get('/',async (req,res)=>{
    const allBlogs= await Blog.find({});
    res.render('home',{
        user: req.user,
        blogs:allBlogs,
    })
})

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(port,()=> console.log(`Server started at http://localhost:${port}`));