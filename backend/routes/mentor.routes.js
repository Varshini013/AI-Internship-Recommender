const express = require("express");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* =========================
   VIEW ASSIGNED INTERNSHIPS
========================= */
router.get("/internships", auth(["mentor"]), async (req, res) => {
  const internships = await Internship.find({ mentorId: req.user.id });
  res.json(internships);
});

/* =========================
   VIEW STUDENTS + PROGRESS
========================= */
router.get("/students", auth(["mentor"]), async (req, res) => {
  const students = await Application.find()
    .populate("studentId")
    .populate("internshipId");

  res.json(students);
});

/* =========================
   UPDATE STUDENT PROGRESS
========================= */
router.put(
  "/update-status/:applicationId",
  auth(["mentor"]),
  async (req, res) => {
    const { status } = req.body;

    // Allowed statuses
    const allowedStatus = ["Applied", "In Progress", "Completed"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await Application.findByIdAndUpdate(req.params.applicationId, {
      status
    });

    res.json({ message: "Student progress updated successfully" });
  }
);

module.exports = router;
