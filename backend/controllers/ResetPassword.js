
// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const bcrypt = require("bcrypt");

// exports.resetPasswordToken = async (req, res) => {
//   try {
//         

//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(403).json({
//         success: false,
//         message: "your email is not registered please try again",
//       });
//     }
//     const token = crypto.randomUUID();

//     const updateDetails = await User.findOneAndUpdate(
//       { email: email },
//       {
//         token: token,
//         resetPasswordExpirse: Date.now() + 5 * 60 * 1000,
//       },
//       { new: true }
//     );

//     const url = `http://localhost:3000/update-password/${token}`;

//     await mailSender(
//       email,
//       "Password reset link",
//       `password reset link : ${url}`
//     );
//     res.json({
//       success: true,
//       message:
//         "email send successfully , please chack email and change password ",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: " Something went to wronge while sending reset password mail",
//     });
//   }
// };

// // reset password handler

// exports.resetPassword = async (req, res) => {
//   try {
//     const { password, confimPassword, token } = req.body;

//     if (password !== confimPassword) {
//       return res.json({
//         success: false,
//         message: "password not matching",
//       });
//     }
//     const userDetails = await User.findOne({ token: token });
//     if (!userDetails) {
//       return res.json({
//         success: false,
//         message: "token is invalid",
//       });
//     }
//     if (userDetails.resetPasswordExpirse < Date.now()) {
//       return res.json({
//         success: false,
//         message: "token is expired  please regenerete token",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.findOneAndUpdate(
//       { token: token },
//       { password: hashedPassword },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "password reset successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "Something went to wronge while sending reset password mail",
//     });
//   }
// };



const User = require("../models/User")
const crypto = require('crypto')
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async (req,res) => {

   try {
       const {email} = req.body;

       if(!email){
           return res.status(400).json({
               success:false,
               message:"Email is empty"
           })
       }
   
       const existingUser = await User.findOne({email})
   
       if(!existingUser){
           return res.status(400).json({
               success:false,
               message:"Email doesn't exist"
           })
       }
   
       const token = crypto.randomUUID()
   
       const updatedUser = await User.findOneAndUpdate({email},
                                                    {
                                                    token:token,
                                                    resetPasswordExpires: Date.now() + 5*60*1000
                                                    },
                                                    {new:true}) 

       const url = `http://localhost:3000/update-password/${token}`

       await mailSender(email, "Password Reset Link", `Password reset link: ${url}`);

       return res.status(200).json({
           success:true,
           message:'Reset link sent'
       })
   } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
   }
}

exports.resetPassword = async (req,res) => {

    try {
        const {token, password, confirmPassword} = req.body;     

        if(!token||!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Enter all details"
            })
        }

        const existingUser = await User.findOne({token:token});
        if(!existingUser) {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }

        if(existingUser.resetPasswordExpires<Date.now()){
            return res.status(500).json({
                success:false,
                message:"Token is no longer valid"
            })
        }

        if (password!==confirmPassword) {
            return res.status(500).json({
                success:false,
                message:"Password Don't match"
            })
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const updatedUser = await User.findOneAndUpdate({token},{
            password:hashedPwd
        },{new:true})
        console.log("Updated user after password change is", updatedUser)
        return res.status(200).json({
            success:true,
            message:"Password Changed successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reseting password'
        })
    }
}