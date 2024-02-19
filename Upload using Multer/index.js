const express = require('express');
const path = require('path');
const multer  = require('multer');

const app = express();
const port= 5000;

// const upload = multer({ dest: 'uploads/' })
const storage= multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()} - ${file.originalname}`);
    }
})

const upload= multer({storage:storage});

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/profile', upload.single('profilePic'),(req,res,next)=>{
    // console.log(req.file);
    res.redirect('/')
} )

app.listen(port,()=>{
    console.log(`Server started at - http://localhost:${port}`);
})
