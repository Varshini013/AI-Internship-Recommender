const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static("uploads"));

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   ROUTES
======================= */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/mentor", require("./routes/mentor.routes"));
app.use("/api/student", require("./routes/student.routes"));

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).send("PM Internship Backend Running Successfully");
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
