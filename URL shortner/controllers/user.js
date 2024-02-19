const User = require('../models/user')

async function handleUserSignup(req,res){
    const {name,email,password}= req.body;
    await User.create({
        name,email,password,
    })

    return res.redirect("/");
}
async function handleUserSignin(req,res){
    const {email,password}= req.body;
    const user= await User.findOne({
        email,password,
    })
    if(!user) return res.render('signin',{
        error: "Invalid username or password!",
    })
    return res.redirect("/");
}

module.exports ={
    handleUserSignup,
    handleUserSignin,
}