const multer  = require('multer');
const path = require('path')

const diskStorageToUploads = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, "../../../dist/img"))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname+ '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDay() + '-'+'.jpg')
    }
});

const saveToUploads = multer({storage: diskStorageToUploads});

module.exports = {
    saveToUploads: saveToUploads.array('file'),
    saveToUploadsReference:saveToUploads.single('file'),
}