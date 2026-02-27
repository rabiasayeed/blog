const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../Models/Blog');

const {handleAddBlog} = require('../Controllers/blogController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('uploads/blog'));
  },
  filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.get('/addBlog',(req, res)=>{
    if(!req.user){
        return res.redirect('/',{user: null})
    }
    return res.render('addBlog',{user: req.user});
});

router.post('/addBlog',upload.single('image'),handleAddBlog);

router.get('/readBlog/:blogId',async (req, res)=>{
  const blogId = req.params.blogId;
  const blog = await Blog.findOne({_id: blogId});
  return res.render('blog.ejs',{blog})
})

module.exports = router;