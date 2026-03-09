const Blog = require('../Models/Blog');//This line imports the Blog model.

const handleAddBlog = async (req, res) => {
    try {
        const { title, body } = req.body;//This extracts data from the submitted form.

        const image = `/uploads/blog/${req.file.filename}`;//This line stores the image path.From multer middleware (file upload).
        const blog = await Blog.create({
            title, image, body, createdBy: req.user._id//This creates a new blog document in MongoDB.
        })
        return res.redirect('/')//After blog is saved successfully, the user is redirected to:

    }
    catch (error) {
        return res.render('/blog/addBlog', { error })//The server renders the add blog page again.And sends the error to the view.
    }
}

module.exports = { handleAddBlog }//This exports the function so it can be used in routes.