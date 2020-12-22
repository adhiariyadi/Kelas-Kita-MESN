const multer = require("multer");
const path = require("path");

const storageStudent = multer.diskStorage({
  destination: "public/images/students",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadStudent = multer({
  storage: storageStudent,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

const storageArticle = multer.diskStorage({
  destination: "public/images/articles",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadArticle = multer({
  storage: storageArticle,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    tcb("Error: Images Only !!!");
  }
}

module.exports = { uploadStudent, uploadArticle };
