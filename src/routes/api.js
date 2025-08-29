const express = require("express");
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authVerification");
const fileUploads = require("../middlewares/fileUploads");

const router = express.Router();

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", isAuthenticated, userController.profile); // use profile, not user
router.get("/logout", isAuthenticated, userController.logout);
router.put("/update", isAuthenticated, userController.update);

// File upload
router.post("/file-upload", isAuthenticated, fileUploads.single("file"), userController.upload);

module.exports = router;
