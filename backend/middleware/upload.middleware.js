const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ===== ENSURE FOLDERS EXIST ===== */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir("uploads/profile-images");
ensureDir("uploads/resumes");

/* ===== IMAGE STORAGE ===== */
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile-images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}-profile${path.extname(file.originalname)}`
    );
  },
});

/* ===== RESUME STORAGE ===== */
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}-resume${path.extname(file.originalname)}`
    );
  },
});

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF allowed"));
  },
});

module.exports = { uploadImage, uploadResume };
