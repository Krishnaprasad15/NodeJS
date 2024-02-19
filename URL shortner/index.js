const express = require('express');
const {connectMongoDB} = require('./connection')
const path= require('path')
const  urlRouter = require('./routes/url')
const ejs = require('ejs')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

const app = express();
const PORT= 5000;
// connecting to db
connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.set("view engine","ejs");

app.set('views',path.resolve('./views'))

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Routes
app.use('/url',urlRouter);
app.use('/',staticRoute);
app.use('/user',userRoute);

app.listen(PORT,()=> console.log(`server started at http://localhost:${PORT}`));