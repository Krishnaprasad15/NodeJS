const express= require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://127.0.0.1:27017/myProject-1')
.then(()=>console.log('MongoDB Connected!'))
.catch((err)=> console.log('MongoDb error',err));

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

const User= mongoose.model('user',userSchema);

app.get('/',(req,res)=>{
    res.send('HELLO FROM HOMEPAGE');
})

app.get('/users',async (req,res)=>{
    const db= await User.find({})
    const html= `
        <ul>
            ${db.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join('')}
        </ul>
    `
    res.send(html);
})

app.get('/api/users', async (req,res)=>{
    const db = await User.find({});
    res.json(db); 
})

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

app.route('/api/users/:id')
.get(async (req,res)=>{
    const id = await User.findById(req.params.id);
    res.json(id);
})
.patch( async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName: 'Chikky'})
    res.json({status:'SUCCESS'});
})
.delete(async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({status:"SUCCESSFULLY DELETED!"})
})

app.listen(5000,()=> console.log('Server Started!'));