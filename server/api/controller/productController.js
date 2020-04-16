const exprees = require('express');
const router = exprees.Router();
const product = require('../models/productSchema');

router.get('/', async (req, res) => {
    try {
        const products = await product.find({});
        res.status(200).json({
            products
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/',async (req, res) => {
    const addProduct = new product({
        prdoudctName:req.body.prdoudctName,
        prdoudctGroup:req.body.prdoudctGroup,
        productDesc:req.body.productDesc,
        productMoreDesc:req.body.productMoreDesc
    })
    try {
        
        addProduct.save()
                 res.status(201).json({
                    addProduct
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
        await product.updateOne({_id:req.params.id},{
            $set:{
                prdoudctName:req.body.prdoudctName,
                prdoudctGroup:req.body.prdoudctGroup,
                productDesc:req.body.productDesc,
                productMoreDesc:req.body.productMoreDesc
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
       
       const deleteref = await product.deleteOne({_id:req.params.id})
        res.status(200).json({deleteref})

    }
    catch(err){
        console.log(err)
    }
})

module.exports = router