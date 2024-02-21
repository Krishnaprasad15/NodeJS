const {Router} = require('express')
const path = require('path');
const multer  = require('multer');
const router= Router();
const Blog = require('../models/blog')
const Comment= require('../models/comments')

const storage= multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./public/uploads')
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()} - ${file.originalname}`);
    }
})

const upload= multer({storage:storage});


router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user: req.user,
    })
})

router.get('/:id',async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comment= await Comment.find({blogId:req.params.id}).populate('createBy')
    // console.log("comments",comment)
    return res.render('blog',{
        user:req.user,
        blog,
        comment,
    })
})

router.post('/',upload.single('coverImage'),(req,res)=>{
    const {title,body} = req.body
    const blog=Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`blog/${blog._id}`)
})

router.post('/comment/:blogId', async (req,res)=>{
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createBy: req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`);
})

module.exports= router;