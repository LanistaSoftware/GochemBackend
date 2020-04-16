const exprees = require('express');
const router = exprees.Router();
const slider = require('../models/slidersSchema');
const multer = require('../middleware/multer')

router.get('/', async (req, res) => {
    try {
        const sliders = await slider.find({});
        res.status(200).json({
            sliders
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const sliders = await slider.findOne({
            _id: req.params.id
        });
        res.status(200).json({
            sliders
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.delete('/:id', async (req, res) => {
    try {

        const sliders = await slider.deleteOne({
            _id: req.params.id
        })
        res.json({
            sliders
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/active/:id', async (req, res) => {
    try {
        await slider.findOneAndUpdate({
            active: true
        }, {
            $set: {
                active: false
            }
        })
        await slider.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                active: true
            }
        })

        res.status(200).json({})
    } catch (error) {
        console.log(error)
    }
})
router.get('/active/slide', async (req,res) => {
    try {
        const slide = await slider.find({active:true})
        res.status(200).json({slide})    
    } catch (error) {
        console.log(error)
    }

})
router.post('/', multer.saveToUploads, async (req, res) => {
    const sliders = await new slider({
        sliderName: req.body.sliderName,
        SliderOne: {
            imageurlOne: req.body.SliderOne.imageurlOne,
            titleOne: req.body.SliderOne.titleOne,
            descriptionOne: req.body.SliderOne.descriptionOne
        },
        SliderTwo: {
            imageurlTwo: req.body.SliderTwo.imageurlTwo,
            titleTwo: req.body.SliderTwo.titleTwo,
            descriptionTwo: req.body.SliderTwo.descriptionTwo
        },
        SliderThree: {
            imageurlThree: req.body.SliderThree.imageurlThree,
            titleThree: req.body.SliderThree.titleThree,
            descriptionThree: req.body.SliderThree.descriptionThree
        },
    })
    try {
        const slideradd = await sliders.save();
        res.status(201).json({
            slideradd
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
router.post('/image', multer.saveToUploads, async (req, res) => {
    try {
        res.status(200).json({
            res
        })
    } catch (error) {
        res.json({
            error
        })
    }
})
router.put('/:id', async (req, res) => {
    try {
        const sliders = await slider.updateOne({
            _id: req.params.id
        }, {
            $set: {
                sliderName: req.body.sliderName,
                SliderOne: {
                    imageurlOne: req.body.SliderOne.imageurlOne,
                    titleOne: req.body.SliderOne.titleOne,
                    descriptionOne: req.body.SliderOne.descriptionOne
                },
                SliderTwo: {
                    imageurlTwo: req.body.SliderTwo.imageurlTwo,
                    titleTwo: req.body.SliderTwo.titleTwo,
                    descriptionTwo: req.body.SliderTwo.descriptionTwo
                },
                SliderThree: {
                    imageurlThree: req.body.SliderThree.imageurlThree,
                    titleThree: req.body.SliderThree.titleThree,
                    descriptionThree: req.body.SliderThree.descriptionThree
                },
            }
        })
        res.json({
            sliders
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = router