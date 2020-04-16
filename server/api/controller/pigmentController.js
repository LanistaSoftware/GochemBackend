const exprees = require('express');
const router = exprees.Router();
const pigment = require('../models/pigmentsSchema');

router.get('/', async (req, res) => {
    try {
        const pigments = await pigment.find({});
        res.status(200).json({
            pigments
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/search', async (req,res)=>{
	console.log(req.body)
    const detail = await pigment.find({ prdoudctName: { $regex:req.body.searchitem, $options: "i" } })
	res.status(200).json(detail); 
})
router.post('/',async (req, res) => {
    const addpigment = new pigment({
        prdoudctName:req.body.prdoudctName,
        color:req.body.color,
        migrationFastness:req.body.migrationFastness,
        heatFastness:req.body.heatFastness,
        lightFastness:req.body.lightFastness
    })
    try {
        
        addpigment.save()
                 res.status(201).json({
                    addpigment
                 });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),

router.put('/:id',async (req, res) => {
    
    console.log(req.body)
    try {
        await pigment.updateOne({_id:req.params.id},{
            $set:{
                prdoudctName:req.body.prdoudctName,
                color:req.body.color,
                migrationFastness:req.body.migrationFastness,
                heatFastness:req.body.heatFastness,
                lightFastness:req.body.lightFastness
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
       
       const deleteref = await pigment.deleteOne({_id:req.params.id})
        res.status(200).json({deleteref})

    }
    catch(err){
        console.log(err)
    }
})

module.exports = router