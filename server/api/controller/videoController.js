const exprees = require('express');
const router = exprees.Router();
const video = require('../models/videoSchema');

router.get('/', async (req, res) => {
    try {
        const sliders = await video.find({});
        res.status(200).json({
            sliders
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
router.post('/', async (req, res) => {
    const addvideo = new video({
        videopath:req.body.videopath
    })
    const videos = video.find({})
    console.log(req.body)
    try {
        if ((await videos).length>0) {
            await video.deleteMany({}).then(()=>{
                addvideo.save()
                 res.status(201).json({
                     addvideo
                 });
             })
        }else{
            addvideo.save()
                 res.status(201).json({
                     addvideo
                 });
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
module.exports = router