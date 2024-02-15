const express= require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to get the body -- :) 
app.use(express.urlencoded({extended:false}));

// Connecting to Database
mongoose.connect('mongodb://127.0.0.1:27017/myProject-1')
.then(()=>console.log('MongoDB Connected!'))
.catch((err)=> console.log('MongoDb error',err));

// Defining a structure - Schema
const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type:String,
    }

},{timestamps: true});

// Creating a model using the above schema
const User= mongoose.model('user',userSchema);


// home route
app.get('/',(req,res)=>{
    res.send('HELLO FROM HOMEPAGE');
})

// users route
app.get('/users',async (req,res)=>{
    const db= await User.find({})
    const html= `
        <ul>
            ${db.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join('')}
        </ul>
    `
    res.send(html);
})

// route for users api 
app.get('/api/users', async (req,res)=>{
    const db = await User.find({});
    res.json(db); 
})

// post req to db for inserting the data
app.post('/api/users', async (req,res)=>{
    const body = req.body;

    await User.create({
        firstName : body.fname,
        lastName: body.lname,
        email: body.email,
        jobTitle: body.job,
        gender: body.gender,
    })

    res.status(201).json({status:'Created'});
})

// Route is used to combine the methods with same path -> get,patch,delete
// api/users/:id route is same for get,patch and del so we combined with route 
app.route('/api/users/:id')
.get(async (req,res)=>{
    const id = await User.findById(req.params.id);
    res.json(id);
})
.patch( async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName: 'Krishna'})
    res.json({status:'SUCCESS'});
})
.delete(async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({status:"SUCCESSFULLY DELETED!"})
})

app.listen(5000,()=> console.log('Server Started!'));