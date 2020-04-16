const exprees = require('express');
const router = exprees.Router();
const multer = require('../middleware/multer')
const fs = require('fs')
const sector = require('../models/sectorSchema');
const sectorGalery = require('../models/sectorGalery')
router.get('/', async (req, res) => {
    try {
        const sectors= await sector.find({})
        res.status(200).json({sectors})
    } catch (error) {
        console.log(error)
    }
  
})
router.get('/:id', async (req, res) => {
    try {
        const sectorone= await sector.findOne({_id:req.params.id})
        res.status(200).json({sectorone})
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res) => {
    const newsector = new sector({
        sectorname:req.body.sectorname,
        sectordescription:req.body.sectordescription
    })
    try {
        newsector.save();
        res.status(201).json({newsector})
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    
  
    try {
        const updateSector = await sector.updateOne({_id:req.params.id},{
            $set:{
                sectorname:req.body.sectorname,
                sectordescription:req.body.sectordescription
            }
        })
        res.status(200).json({updateSector})
    } catch (error) {
        console.log(error)
    }
})
router.delete('/:id', async (req, res) => {
    try {

        const sectors = await sector.deleteOne({
            _id: req.params.id
        })
        res.json({
            sectors
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
  
})
router.post('/galery',async (req,res)=>{
   const newgalery = await new sectorGalery({
    imgUrl:req.body.imgUrl
   })
    try {
        const add=  await newgalery.save()
        res.status(201).json({add})

    } catch (error) {
        console.log(error)
    }
})
router.get('/galery',async (req,res)=>{
    try {
        const sectorImages= await sectorGalery.find({})
        res.status(200).json({sectorImages})
    } catch (error) {
        console.log(error)
    }
})
router.delete('/galery/:id/:img',async (req,res)=>{
    try {
        fs.unlink('public/img/'+req.params.img, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 
       const deleteimage= await sectorGalery.deleteOne({_id:req.params.id})
        res.status(200).json({deleteimage})
    } catch (error) {
        console.log(error)
    }
})
router.post('/galery/image',multer.saveToUploadsReference,async (req,res)=>{
   
     try {
        
        res.status(201).json('OK')
     } catch (error) {
         console.log(error)
     }
 })
module.exports = router