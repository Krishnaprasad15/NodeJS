const express= require('express');
const userRouters= require('./routes/user')
const {connectMongoDB} = require('./connection')

const app = express();

// Middleware to get the body -- :) 
app.use(express.urlencoded({extended:false}));

// Connecting to Database
connectMongoDB('mongodb://127.0.0.1:27017/myProject-1');

// Routes
app.use('/api/users',userRouters);

app.listen(5000,()=> console.log('Server Started!'));