const express = require("express");
const { isAuthenticated } = require("../middlewares/authVerification");
const uploadFile = require("../middlewares/fileUploads");
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

const router = express.Router();

router.post("/", isAuthenticated, uploadFile.single("eventBanner"), createEvent);
router.put("/:id", isAuthenticated, uploadFile.single("eventBanner"), updateEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.delete("/:id", isAuthenticated, deleteEvent);

module.exports = router;
