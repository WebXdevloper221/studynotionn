//  const RatingAndReview = require("../models/RatingAndReview");
// const Course = require("../models/Course");

// exports.createRating = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const { courseId, rating, review } = req.body;

//     const courseDetails = await Course.findOne({
//       _id: courseId,
//       studentEnrolled: { $eleMatch: { $eq: userId } },
//     });

//     if (!courseDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Student is not enrolled in this course",
//       });
//     }

//     const alreadyReviewed = await RatingAndReview.findOne({
//       user: userId,
//       course: courseId,
//     });

//     if (!alreadyReviewed) {
//       return res.status(404).json({
//         success: false,
//         message: "course is already  reviewed by the user",
//       });
//     }

//     const ratingreview = await RatingAndReview.create({
//       rating,
//       review,
//       course: courseId,
//       user: userId,
//     });
//     const updateRating = await Course.findByIdAndUpdate(
//       { _id: courseId },
//       {
//         $push: {
//           ratingAndReviews: ratingreview._id,
//         },
//       },
//       { new: true }
//     );
//     console.log(updateRating);

//     return res.status(200).json({
//       success: true,
//       message: "rating and review created succecfully ",
//       ratingreview,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "error",
//     });
//   }
// };

// exports.getAverageRating = async (req, res) => {
//   try {
//     const courseId = req.body.courseId;
//     const result = await RatingAndReview.aggregate([
//       {
//         $match: {
//           course: new mongoose.Types.ObjectId(courseId),
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           averageRating: { $avg: "$rating" },
//         },
//       },
//     ]);

//     if (result.length > 0) {
//       return res.status(200).json({
//         succuss: true,
//         averageRating: result[0].averageRating,
//       });
//     }
//     return res.status(200).json({
//       succuss: true,
//       message: " average Rating is 0 , no rating given till now ",
//       averageRating: 0,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// exports.getAllRating = async (req, res) => {
//   try {
//     const allReview = await RatingAndReview.find({})
//       .sort({ rating: "desc" })
//       .populate({
//         path: "user",
//         select: "firstname ,lastname , email ,image",
//       })
//       .populate({
//         path: "course",
//         select: "courseNsme",
//       })
//       .exec();

//     return res.status(200).json({
//       succuss: true,
//       message: "All review are fetch successfully",
//       data: allReview,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };







const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAverageRating = async(req,res) => {

    try {
        const {courseId} = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course:courseId
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating : {$avg :rating}
                }
            }
        ])

        if (result.length>0) {
            return res.status(200).json({
                success:true,
                message:'Avg rating recived for the course',
                averageRating: result[0].averageRating
            })
        }
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    

}

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}