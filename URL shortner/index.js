const express = require('express');
const {connectMongoDB} = require('./connection')
const path= require('path')
const  urlRouter = require('./routes/url')
const ejs = require('ejs')

const app = express();
const PORT= 5000;
// connecting to db
connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.use('view engine','ejs');

app.use('views',path.resolve())

//middleware
app.use(express.json());

// Routes
app.use('/url',urlRouter);

app.listen(PORT,()=> console.log(`server started at http://localhost:${PORT}`));