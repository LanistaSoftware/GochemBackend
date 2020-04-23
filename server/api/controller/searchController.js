const exprees = require('express');
const router = exprees.Router();
const pigment = require('../models/pigmentsSchema');
const product = require('../models/productSchema')
const sector = require('../models/sectorSchema')
const blog = require('../models/makaleschema')
const document = require('../models/documentSchema')

router.post('/', async (req,res)=>{
    try {
    const pigmentdetail = await pigment.find({ prdoudctName: { $regex:req.body.searchitem, $options: "i" } })
    const proddetail = await product.find({ prdoudctName: { $regex:req.body.searchitem, $options: "i" } })
    const sectordetail = await sector.find({ sectorname: { $regex:req.body.searchitem, $options: "i" } })
    const blogdetail= await blog.find({content:{$regex:req.body.searchitem, $options: "i" }})
    const documentdetail= await document.find({name:{$regex:req.body.searchitem, $options: "i" }})
	res.status(200).json({pigmentdetail,proddetail,sectordetail,blogdetail,documentdetail}); 
    } catch (error) {
        console.log(error)
    }
    
})
module.exports = router