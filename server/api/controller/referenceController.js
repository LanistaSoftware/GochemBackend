const exprees = require('express');
const router = exprees.Router();
const multer = require('../middleware/multer')
var fs = require('fs')
const reference = require('../models/referencesSchema');

router.get('/', async (req, res) => {
    try {
        const references = await reference.find({});
        res.status(200).json({
            references
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/',async (req, res) => {
    const addreference = new reference({
        referenceName:req.body.referenceName,
        referenceUrl:req.body.referenceUrl,
        imageUrl:req.body.referenceImage
    })
    console.log(req.body)
    try {
        
        addreference.save()
                 res.status(201).json({
                    addreference
                 });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.put('/:id/:dltimg',async (req, res) => {
    
    console.log(req.body)
    try {
        await reference.updateOne({_id:req.params.id},{
            $set:{
                referenceName:req.body.referenceName,
                referenceUrl:req.body.referenceUrl,
                imageUrl:req.body.imageUrl
            }
        })
 
        fs.unlink('public/img/'+req.params.dltimg, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 
        res.status(200).json({});
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.put('/:id',async (req, res) => {
    
    console.log(req.body)
    try {
        await reference.updateOne({_id:req.params.id},{
            $set:{
                referenceName:req.body.referenceName,
                referenceUrl:req.body.referenceUrl,
                imageUrl:req.body.imageUrl
            }
        })
 
        res.status(200).json({});
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.delete('/:id',async (req,res)=>{
    try{
        const item = await reference.findOne({_id:req.params.id})
        fs.unlink('src/assets/upload/'+item.imageUrl, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 
       const deleteref = await reference.deleteOne({_id:req.params.id})
       
        res.status(200).json({deleteref})

    }
    catch(err){
        console.log(err)
    }
})
router.post('/image',multer.saveToUploadsReference,async (req, res) => {
    try {
    
     res.status(201).json(res)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
module.exports = router