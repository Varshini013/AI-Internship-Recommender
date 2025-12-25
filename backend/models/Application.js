const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true
    },
    status: {
      type: String,
      enum: ["Applied", "In Progress", "Completed"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
