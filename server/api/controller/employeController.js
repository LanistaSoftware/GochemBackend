const exprees = require('express');
const router = exprees.Router();
const multer = require('../middleware/multer')
var fs = require('fs')
const employe = require('../models/employeSchema');

router.get('/', async (req, res) => {
    try {
        const employes = await employe.find({});
        res.status(200).json({
            employes
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/',async (req, res) => {
    const addemploye = new employe({
        name:req.body.name,
        task:req.body.task,
        order:req.body.order,
        imgUrl:req.body.imgUrl
    })
    try {
        
        addemploye.save()
                 res.status(201).json({
                    addemploye
                 });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.put('/:id/:dltimg',async (req, res) => {
    
    try {
        await employe.updateOne({_id:req.params.id},{
            $set:{
                name:req.body.name,
                task:req.body.task,
                order:req.body.order,
                imgUrl:req.body.imgUrl
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

    try {
        await employe.updateOne({_id:req.params.id},{
            $set:{
                name:req.body.name,
                task:req.body.task,
                order:req.body.order,
                imgUrl:req.body.imgUrl
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
        const item = await employe.findOne({_id:req.params.id})
        fs.unlink('src/assets/upload/'+item.imgUrl, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 
       const deleteref = await employe.deleteOne({_id:req.params.id})
       
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