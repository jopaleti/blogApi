var blog = require('../models/blog.js');
const {blogValidation} = require('../routes/validate.js');

const addBlog = async(req, res) => {
    console.log(req.body)
    const {error} = blogValidation(req.body);
    if(error) return res.status(400).json({Error: error.details[0].message})

    const newBlog = new blog(req.body);
    try {
        await newBlog.save().then(result=>{
            console.log(result)
            res.render('../views/blog.ejs', {blog: [result]})
        })
    } catch (err) {
        console.log(err);
        res.status(401).send(`An error occur, ${err}`);
    }
}

const displayBlog = async (req, res) => {
    console.log(blog);
    await blog.find().sort({time: -1}).then(result => res.render('blog.ejs', {blog: result}));
    // res.render('blog.ejs', {blog: blog})
}

const readMore = async (req, res) => {
    const post = await blog.findOne({slug: req.params.slug});
    if (!post) return res.status(401).send('Error occur the id does not match our database collections.')
    res.render('post.ejs', {blog: post})
}

const deleteBlog = async(req, res) => {
    await blog.findByIdAndDelete(req.params.id);
    res.redirect('/blog/posts');
}
const editBlog = async(req, res) => {
    let userBlog = await blog.findOne({slug: req.params.slug})
    if (req.body.name) {
        try{
            await blog.updateOne({_id: userBlog._id}, 
                    {$set: req.body}
                )
            res.status(200).redirect('/blog/posts')
        } catch (err){
            res.send(err)
        }
    } else {
        res.render('edit.ejs', {blog: userBlog})
    }
}

// const editBlog = async(req, res) => {
//     let userBlog = await blog.findOne({slug: req.params.slug})
//     res.render('edit.ejs', {blog: userBlog})
// }

module.exports = {addBlog, displayBlog, readMore, deleteBlog, editBlog}