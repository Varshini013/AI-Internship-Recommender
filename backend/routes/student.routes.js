const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const recommend = require("../utils/recommender");

const router = express.Router();

/* =======================
   UPLOAD CONFIG
======================= */
const resumeDir = path.join(__dirname, "..", "uploads", "resumes");

if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeDir),
  filename: (req, file, cb) =>
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

/* =======================
   PROFILE APIs
======================= */

// Get student profile
router.get("/profile", auth(["student"]), async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Update student profile
router.put("/profile", auth(["student"]), async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  res.json({ message: "Profile updated successfully" });
});

// Delete account
router.delete("/profile", auth(["student"]), async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "Account deleted successfully" });
});

/* =======================
   RESUME UPLOAD
======================= */
router.post(
  "/upload-resume",
  auth(["student"]),
  upload.single("resume"),
  async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, {
      resume: `/uploads/resumes/${req.file.filename}`,
    });

    res.json({ message: "Resume uploaded successfully" });
  }
);

/* =======================
   DASHBOARD STATS
======================= */
router.get("/dashboard-stats", auth(["student"]), async (req, res) => {
  const studentId = req.user.id;

  const applied = await Application.countDocuments({ studentId });
  const selected = await Application.countDocuments({
    studentId,
    status: "selected",
  });
  const rejected = await Application.countDocuments({
    studentId,
    status: "rejected",
  });
  const inProgress = await Application.countDocuments({
    studentId,
    status: "applied",
  });
  const completed = await Application.countDocuments({
    studentId,
    status: "completed",
  });

  res.json({ applied, selected, rejected, inProgress, completed });
});

/* =======================
   INTERNSHIP ACTIONS
======================= */

// Apply internship
router.post("/apply", auth(["student"]), async (req, res) => {
  await new Application({
    studentId: req.user.id,
    internshipId: req.body.internshipId,
    status: "applied",
  }).save();

  res.json({ message: "Internship applied successfully" });
});

// AI recommendations
router.get("/recommend", auth(["student"]), async (req, res) => {
  const student = await User.findById(req.user.id);
  const internships = await Internship.find();
  const result = recommend(student, internships);
  res.json(result);
});

module.exports = router;
