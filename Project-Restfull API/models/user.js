const mongoose = require('mongoose');

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

module.exports = User;