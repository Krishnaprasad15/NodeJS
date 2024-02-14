const express = require('express');
const app = express();
const mongoose= require('mongoose');

app.use(express.urlencoded({extended:false}))

// Connecting to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/project-1')
.then(()=> console.log('MongoDB connected!'))
.catch((err)=> console.log('Mongo Error',err));

// Creating a mongoDB schema
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
},{timestamps:true})

// Creating model with the above schema
const User= mongoose.model('user',userSchema);
app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('/users',async (req,res)=>{
    const db= await User.find({});
    const html= `
        <ul>
            ${db.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join('')}        
        </ul>
    `
    res.send(html);
})

app.get('/api/users',async (req,res)=>{
    const db= await User.find({});
    res.json(db);
})

app.post('/api/users',async (req,res)=>{
    const body = req.body;
    const data = await User.create({
        firstName:body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender,
    })
    // console.log(data);
    res.status(201).json({status:'Success'});
})

app.route('/api/users/:id')
.get(async(req,res)=>{
    const id= await User.findById(req.params.id);
    res.json(id);
})
.patch(async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName:'Kittu'});
    res.json({status:'Success'});
})
.delete(async (req,res)=>{
    const id= await User.findByIdAndDelete(req.params.id);
    console.log(id);
    res.json({status:"Success"});
})
app.listen('5000',()=> console.log("Server Started!"));