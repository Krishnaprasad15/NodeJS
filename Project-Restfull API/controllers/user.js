const User = require('../models/user')

async function handleGetAllUsers(req,res){
    const db = await User.find({});
    res.json(db); 
}
async function handleCreateNewUsers(req,res){
    const body = req.body;

    const result =await User.create({
        firstName : body.fname,
        lastName: body.lname,
        email: body.email,
        jobTitle: body.job,
        gender: body.gender,
    })

    res.status(201).json({status:'Created',id: result._id});
}
async function handelGetUserById(req,res){
    const id = await User.findById(req.params.id);
    res.json(id); 
}
async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName: 'Krishna'})
    res.json({status:'SUCCESS'});
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    res.json({status:"SUCCESSFULLY DELETED!"}) 
}

// async function 

module.exports={
    handleGetAllUsers,
    handleCreateNewUsers,
    handelGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}