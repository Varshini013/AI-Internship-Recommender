const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: true
    },
    requiredSkills: {
      type: [String],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    duration: {
      type: String
    },
    description: {
      type: String
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", InternshipSchema);
