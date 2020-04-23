const exprees = require('express');
const router = exprees.Router();
const multer = require('../middleware/multer')
const fs = require('fs')
const sectorGaleries = require('../models/sectorGalery.js')
router.post('/',async (req,res)=>{
   const newgalery = await new sectorGaleries({
    imgUrl:req.body.imgUrl
   })
    try {
        const add=  await newgalery.save()
        res.status(201).json({add})

    } catch (error) {
        console.log(error)
    }
})
router.get('/',async (req,res)=>{
    try {
        const sectorImages= await sectorGaleries.find()
        res.status(200).json({sectorImages})
    } catch (error) {
        console.log(error)
    }
})
router.delete('/:id/:img',async (req,res)=>{
    try {
       const deleteimage= await sectorGaleries.deleteOne({_id:req.params.id})
        res.status(200).json({deleteimage})
    } catch (error) {
        console.log(error)
    }
})
router.post('/image',multer.saveToUploadsReference,async (req,res)=>{
   
     try {
        res.status(201).json('OK')
     } catch (error) {
         console.log(error)
     }
 })
module.exports = router