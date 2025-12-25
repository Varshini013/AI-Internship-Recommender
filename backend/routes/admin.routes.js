const express = require("express");
const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* =========================
   ADD INTERNSHIP
========================= */
router.post("/internship", auth(["admin"]), async (req, res) => {
  const internship = new Internship(req.body);
  await internship.save();
  res.json({ message: "Internship added successfully" });
});

/* =========================
   ASSIGN MENTOR TO INTERNSHIP
========================= */
router.put("/assign-mentor/:id", auth(["admin"]), async (req, res) => {
  await Internship.findByIdAndUpdate(req.params.id, {
    mentorId: req.body.mentorId
  });
  res.json({ message: "Mentor assigned successfully" });
});

/* =========================
   VIEW ALL USERS
========================= */
router.get("/users", auth(["admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* =========================
   DELETE STUDENT OR MENTOR
========================= */
router.delete("/user/:id", auth(["admin"]), async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete student applications
  await Application.deleteMany({ studentId: req.params.id });

  // If mentor deleted, remove mentor mapping from internships
  if (user.role === "mentor") {
    await Internship.updateMany(
      { mentorId: req.params.id },
      { $unset: { mentorId: "" } }
    );
  }

  await user.deleteOne();

  res.json({ message: "User deleted successfully" });
});

module.exports = router;
