// const JWT = require("jsonwebtoken");
// const User = require("../Model/UserLoginSignUp");
// require("dotenv").config();

// // General Auth Middleware
// exports.auth = async (req, res, next) => {
//     try {
//         const token =
//             req.cookies.token ||
//             req.body.token ||
//             req.header("Authorization")?.replace("Bearer ", "");

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Missing token. Please log in.",
//             });
//         }

//         try {
//             const decoded = JWT.verify(token, process.env.JWT_SECRET);
//             const user = await User.findById(decoded.id);

//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "User not found.",
//                 });
//             }

//             req.user = user; // Attach full user object to request
//             next(); // Go to next middleware or route
//         } catch (error) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid or expired token.",
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong in authentication.",
//         });
//     }
// };
