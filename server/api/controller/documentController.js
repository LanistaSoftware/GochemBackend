const exprees = require('express');
const router = exprees.Router();
const document = require('../models/documentSchema');
const multer = require('../middleware/multer')
router.get('/', async (req, res) => {
    try {
        const documents = await document.find({});
        res.status(200).json({
            documents
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const documentone = await document.findOne({_id:req.params.id});
        res.status(200).json({
            documentone
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/',async (req, res) => {
    const adddocument = new document({
       name: req.body.name,
       path: req.body.path
    })
    try {
        adddocument.save()
                 res.status(201).json({
                    adddocument
                 });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.post('/file',multer.saveToUploadsPdf,async(req,res)=>{

})
router.put('/:id',async (req, res) => {
    try {
        await document.updateOne({_id:req.params.id},{
            $set:{
                name: req.body.name,
                path: req.body.path
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
       
       const deleteref = await document.deleteOne({_id:req.params.id})
        res.status(200).json({deleteref})

    }
    catch(err){
        console.log(err)
    }
})

module.exports = router