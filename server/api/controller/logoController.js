const exprees = require('express');
const router = exprees.Router();
const logo = require('../models/companyLogo')
const multer = require('../middleware/multer')

router.post('/',async (req, res) => {
    try {
        
        const logolenght = await logo.find({})
        const addlogo = new logo({
            Logoname:req.body.Logoname,
        })
        if ( logolenght.length>0) {
            logo.deleteMany({}).then(()=>{
              addlogo.save()
            res.status(201).json({
                addlogo
           })
           })
          
        }else{
            addlogo.save()
            res.status(201).json({
                addlogo
            });
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.get('/', async (req, res) => {
    try {
        const CompanyLogo = await logo.find({});
        res.status(200).json({
            CompanyLogo
        });
    } catch (error) {
        res.json({
            message: error.message
        })
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