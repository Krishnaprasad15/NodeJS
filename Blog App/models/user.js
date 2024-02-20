const {Schema,model} = require('mongoose')
const {createHmac, randomBytes} = require('crypto');
const { error } = require('console');
const userSchema = Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:'../public/images/default.jpg'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},{timestamps: true});

userSchema.pre("save", function(next){
    const user= this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword= createHmac("sha256",salt)
                            .update(user.password)
                            .digest("hex");

    this.password= hashedPassword;
    this.salt= salt
    next();
})

userSchema.static('matchPassword', async function(email,password){
     const user= await this.findOne({email});
     if(!user) throw new Error('User not found');

     const salt= user.salt;
     const hashedPassword= user.password;

     const userProvided = createHmac("sha256",salt)
     .update(password)
     .digest("hex");

     if(hashedPassword!=userProvided) throw new Error('Incorrect Password!');

     return user;
})

const User = model("user",userSchema);

module.exports= User