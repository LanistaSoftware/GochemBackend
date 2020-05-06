const multer = require('multer');
const path = require('path')
const webp = require('webp-converter')

const diskStorageToUploads = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../../assest/images"))
        console.log(file)
        const name = file.originalname + '-'  + new Date().getUTCMonth() + '-' + new Date().getUTCDay() + '-' + '.jpg'
        webp.cwebp(`assest/images/${name}`,`assest/images/${name}.webp`,"-q 70",function(res,status,error)
          {
            console.log(res)
          	 //if conversion successful status will be '100'
          	//if conversion fails status will be '101'
          	console.log(status,error);	
          });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDay() + '-' + '.jpg')

    }
});
const diskStorageToUploadsPdf = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../../assest/file"))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const saveToUploads = multer({
    storage: diskStorageToUploads
});
const pdfUpload = multer({
    storage: diskStorageToUploadsPdf
})
module.exports = {
    saveToUploads: saveToUploads.array('file'),
    saveToUploadsReference: saveToUploads.single('file'),
    saveToUploadsPdf: pdfUpload.single('file')
}