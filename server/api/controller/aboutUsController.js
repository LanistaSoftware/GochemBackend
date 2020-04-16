const exprees = require('express');
const router = exprees.Router();
const multer = require('../middleware/multer')
const aboutUs = require('../models/aboutUsSchema')
router.get('/',async (req,res)=>{
    try {
        const aboutUsContent = await aboutUs.find({})
        res.status(200).json({aboutUsContent})
    } catch (error) {
        console.log(error)
    }
})
router.post('/',async (req,res)=>{
    try { 
            await aboutUs.deleteMany({})
            
            const add =await new aboutUs({
                content:req.body.aboutcontent,
                imgUrl:req.body.imgUrl
            })
            await add.save()
            res.status(201).json({add})      
    } catch (error) {
        console.log(error)
    }
})
router.post('/image',multer.saveToUploadsReference,async (req,res)=>{
    try {
        res.status(201).json('Ok')
    } catch (error) {
        console.log(error)
    }
})
module.exports = router