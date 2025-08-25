const express = require("express");
const userController = require("../controllers/userController.js");
// const experienceController = require("../controllers/experienceController.js");
// const educationController = require("../controllers/educationController.js");
// const advantageController = require("../controllers/advantageController.js");
// const portfolioController = require("../controllers/portfolioController.js");
// const serviceController = require("../controllers/serviceController.js");
// const contactController = require("../controllers/contactController.js");
// const testimonialController = require("../controllers/testimonialController.js");
// const blogController = require("../controllers/blogController.js");
// const commentController = require("../controllers/commentController.js");
const middlewares = require("../middlewares/authVerification.js");
const fileUploads = require("../middlewares/fileUploads.js");
let router = express.Router();

//! User
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", middlewares, userController.user);
router.get("/logout", middlewares, userController.logout);
router.put("/update", middlewares, userController.update);


// file upload
router.post("/file-upload", middlewares, fileUploads.single('file'), userController.upload);


//! Experience
// router.post(
//   "/create-experience",
//   middlewares,
//   experienceController.createExperience
// );
// router.get("/all-experience", experienceController.allExperience);
// router.get("/single-experience/:id", experienceController.singleExperience);
// router.put(
//   "/update-experience/:id",
//   middlewares,
//   experienceController.updateExperience
// );
// router.delete(
//   "/delete-experience/:id",
//   middlewares,
//   experienceController.deleteExperience
// );

//! Education
// router.post(
//   "/create-education",
//   middlewares,
//   educationController.createEducation
// );
// router.get("/all-education", educationController.allEducation);
// router.get("/single-education/:id", educationController.singleEducation);
// router.put(
//   "/update-education/:id",
//   middlewares,
//   educationController.updateEducation
// );
// router.delete(
//   "/delete-education/:id",
//   middlewares,
//   educationController.deleteEducation
// );

//! advantage
// router.post(
//   "/create-advantage",
//   middlewares,
//   advantageController.createAdvantage
// );
// router.get("/all-advantage", advantageController.allAdvantage);
// router.get("/single-advantage/:id", advantageController.singleAdvantage);
// router.put(
//   "/update-advantage/:id",
//   middlewares,
//   advantageController.updateAdvantage
// );
// router.delete(
//   "/delete-advantage/:id",
//   middlewares,
//   advantageController.deleteAdvantage
// );

//! portfolio
// router.post(
//   "/create-portfolio",
//   middlewares,
//   portfolioController.createPortfolio
// );
// router.get("/all-portfolio", portfolioController.allPortfolio);

// router.get("/single-portfolio/:id", portfolioController.singlePortfolio);
// router.put(
//   "/update-portfolio/:id",
//   middlewares,
//   portfolioController.updatePortfolio
// );
// router.delete(
//   "/delete-portfolio/:id",
//   middlewares,
//   portfolioController.deletePortfolio
// );

//! service
// router.post("/create-service", middlewares, serviceController.createService);
// router.get("/all-service", serviceController.allService);

// router.get("/single-service/:id", serviceController.singleService);
// router.put("/update-service/:id", middlewares, serviceController.updateService);
// router.delete(
//   "/delete-service/:id",
//   middlewares,
//   serviceController.deleteService
// );

//! testimonial
// router.post(
//   "/create-testimonial",
//   middlewares,
//   testimonialController.createTestimonial
// );
// router.get("/all-testimonial", testimonialController.allTestimonial);

// router.get("/single-testimonial/:id", testimonialController.singleTestimonial);
// router.put(
//   "/update-testimonial/:id",
//   middlewares,
//   testimonialController.updateTestimonial
// );
// router.delete(
//   "/delete-testimonial/:id",
//   middlewares,
//   testimonialController.deleteTestimonial
// );

//! contact
// router.post("/create-contact", contactController.createContact);
// router.get("/all-contact", contactController.allContact);
// router.get("/single-contact/:id", contactController.singleContact);
// router.delete(
//   "/delete-contact/:id",
//   middlewares,
//   contactController.deleteContact
// );


//! blog
// router.post(
//   "/create-blog",
//   middlewares,
//   blogController.createBlog
// );
// router.get("/all-blog/:pageNo/:perPage", blogController.allBlog);

// router.get("/single-blog/:id", blogController.singleBlog);
// router.put(
//   "/update-blog/:id",
//   middlewares,
//   blogController.updateBlog
// );
// router.delete(
//   "/delete-blog/:id",
//   middlewares,
//   blogController.deleteBlog
// );

//! comment
// router.post(
//   "/create-comment",
//   commentController.createComment
// );
// router.get("/all-comment", commentController.allComment);

// router.get("/single-comment/:id", commentController.singleComment);
// router.delete(
//   "/delete-comment/:id",
//   middlewares,
//   commentController.deleteComment
// );

module.exports = router;
