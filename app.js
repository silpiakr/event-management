// const dotENV = require("dotenv");
// dotENV.config();
// const express = require("express");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// const hpp = require("hpp");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const router = require("./src/routes/api");
// const eventRoutes = require("./src/routes/eventRoutes")

// const app = express();

// app.use(cookieParser());
// app.use(cors());
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(hpp());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb" }));


// // Database connect

// let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.anca8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// let option = {
//   user: process.env.DB_USER,
//   pass: process.env.DB_PASSWORD,
//   autoIndex: true,
//   serverSelectionTimeoutMS: 50000,
// };

// mongoose
//   .connect(url)
//   .then((res) => {
//     console.log("Database connected.");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// let limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   limit: 100,
// });

// app.use(limiter);

// // api end point tag
// app.use("/api/v1", router);

// app.use(express.static("client"));
// app.use("/api/v1/get-file", express.static("uploads"));
// app.use("/api/events", eventRoutes);

// module.exports = app;






const dotENV = require("dotenv");
dotENV.config();

const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const router = require("./src/routes/api");
const eventRoutes = require("./src/routes/eventRouts");

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database connect
let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.anca8.mongodb.net/event_management?retryWrites=true&w=majority&appName=Cluster0`;

let option = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  autoIndex: true,
  serverSelectionTimeoutMS: 50000,
};


mongoose
  .connect(url, option)
  .then(() => {
    console.log("✅ Database connected.");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// Rate limiter
let limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
});

app.use(limiter);

// Routes
app.use("/api/v1", router);
app.use("/api/events", eventRoutes);

// Static file serving
app.use(express.static("client"));
app.use("/api/v1/get-file", express.static("uploads"));

module.exports = app;
