const exprees = require('express');
const router = exprees.Router();
const multer = require('../middleware/multer')
const fs = require('fs')
const sector = require('../models/sectorSchema');
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
module.exports = router