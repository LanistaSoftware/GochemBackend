const exprees = require('express');
const router = exprees.Router();
const contact = require('../models/contactSchema');
const logo = require('../models/companyLogo')
const multer = require('../middleware/multer')
router.get('/', async (req, res) => {
    try {
        const contacts = await contact.find({});
        res.status(200).json({
            contacts
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/',async (req, res) => {
    const contactlength = await contact.find({})
    const addcontact = new contact({
        name:req.body.name,
        email:req.body.email,
        telephone:req.body.telephone,
        fax:req.body.fax,
        adress:req.body.adress
    })
    try {
        if (contactlength.length>0) {
           await contact.deleteMany({}).then(()=>{
            addcontact.save()
            res.status(201).json({
               addcontact
            });
           })
         
        }else{
            addcontact.save()
            res.status(201).json({
               addcontact
            });
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),
router.post('/logo',async (req, res) => {
  
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
router.get('/logo', async (req, res) => {
    try {
        const logos = await logo.find({});
        res.status(200).json({
            logos
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

router.post('/logo/image',multer.saveToUploadsReference,async (req, res) => {
    try {
     res.status(201).json(res)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}),

module.exports = router