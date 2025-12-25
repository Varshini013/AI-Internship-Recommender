const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    /* ================= COMMON FIELDS ================= */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "mentor", "student"],
      required: true,
    },

    /* ================= STUDENT PROFILE ================= */

    rollNumber: {
      type: String,
      default: "",
    },

    year: {
      type: String, // 1,2,3,4
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    section: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },

    address: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "", // /uploads/profile-images/xxx.jpg
    },

    resume: {
      type: String,
      default: "", // /uploads/resumes/xxx.pdf
    },

    /* ================= AI INPUT FIELDS ================= */

    education: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      default: "",
    },

    projects: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
