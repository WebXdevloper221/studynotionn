// const express = require("express");
// const router = express.Router();

// const { updateProfile, deleteAccount, getAllUserDetails , getEnrolledCourses } = require("../controllers/ProfileController");


// const { auth } = require("../middlewares/auth");

// router.put("/updateProfile", auth, updateProfile);
// router.delete("/deleteAccount", auth, deleteAccount);
// router.get("/getAllUserDetails", auth, getAllUserDetails);

// router.get("/getEnrolledCourses" , auth , )
// router.get("/getEnrolledCourses" , auth , getEnrolledCourses)

// module.exports = router;


const express = require("express")
const router = express.Router()

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")


// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth,  deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router