const multer = require('multer');
const path = require('path')
const webp = require('webp-converter')

const diskStorageToUploads = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, "../../../assest/images"))
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDay() + '-' + '.jpg')

    }
});
const diskStorageToUploadsReference = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, path.join(__dirname, "../../../assest/images"))
        console.log(file)
        const name = file.originalname + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDay() + '-' + '.jpg'
        setTimeout(() => {
            webp.cwebp(`assest/images/${name}`, `assest/images/${name}.webp`, "-q 70", function (_res, _status, _error) {});
        }, 3000);
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDay() + '-' + '.jpg')

    }
});

const diskStorageToUploadsPdf = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, "../../../assest/file"))
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname)
    }
});

const saveToUploads = multer({
    storage: diskStorageToUploads
});
const saveToUploadsReference = multer({
    storage: diskStorageToUploadsReference
});
const pdfUpload = multer({
    storage: diskStorageToUploadsPdf
})
module.exports = {
    saveToUploads: saveToUploads.array('file'),
    saveToUploadsReference: saveToUploadsReference.single('file'),
    saveToUploadsPdf: pdfUpload.single('file')
}