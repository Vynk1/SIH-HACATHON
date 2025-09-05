//external modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//internal modules
const authRouter = require("./routes/auth.route");
const alumniRouter = require("./routes/alumni.route");
const adminRouter = require("./routes/admin.route");
const eventRouter = require("./routes/event.route");
const donationRouter = require("./routes/donation.route");
const mentorRouter = require("./routes/mentor.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// health
app.get("/", (_req, res) => res.send("API running"));

//actual routing
app.use("/auth", authRouter);
app.use("/alumni", alumniRouter);
app.use("/admin", adminRouter);
app.use("/events", eventRouter);
app.use("/donations", donationRouter);
app.use("/mentorships", mentorRouter);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB || "alumniDB",
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
