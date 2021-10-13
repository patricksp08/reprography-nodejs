const multer = require('multer');
const DIR = 'uploads/anexos';

//UPLOAD DE IMAGENS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, './uploads/');
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.toLowerCase().split(' ').join("-"));
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

const uploadFile = multer({
    storage: storage,
    // limits: {
    //     fileSize: 2048 * 2048 * 5
    // },
    // fileFilter: fileFilter
});

module.exports = uploadFile;