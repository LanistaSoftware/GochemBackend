const exprees = require('express');
const router = exprees.Router();
const Blog = require('../models/makaleschema');



router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            blogs
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const blogs = await Blog.deleteOne({
            _id: req.params.id
        })
        res.json({
            blogs
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/'  ,async (req, res) => {
    console.log(req.body)
    const blog = await new Blog({
       
        content: req.body[0],
    })
    try {
        const blogadd = await blog.save();
        res.status(201).json({
            blogadd
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
router.put('/:id', async (req, res) => {
    try {
       
        const blog = await Blog.updateOne({
            _id: req.params.id
        }, {
            $set: {
                
                content: req.body.content,
               
            }
        })
        res.json({
            blog
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = router