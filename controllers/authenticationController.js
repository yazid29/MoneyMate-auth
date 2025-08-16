const authService = require('../services/authService');
const {errorResponse, successResponse} = require('../middleware/responseHandler');
const constant = require('../utils/constant');
exports.registerUser = async (req, res) => {
    try {
        const body = req.body;
        const result = await authService.registerUser(body);
        console.log('result >> ',result);
        if(result.status == 0){
            let errMsg = result.message;
            console.log('Error Message !!',errMsg);
            // error(err, req, res, next)
            return errorResponse(result,req,res, 400);
        }
        return successResponse(result.data, res, 201);
    } catch (error) {
        console.log('Error Message !!',error);
        return errorResponse(error,req,res);
    }
    
}
// exports.loginUser = async (req, res) => {    
//     try {
//         const body = req.body;
//         const resultAccess = await authService.loginUser(body);
//         if(!resultAccess){
//             return errorResponse(res, 404, 'Username or Password is wrong');
//         }
//         return successResponse(res, 200, `Login Success`,resultAccess);
//     } catch (error) {
//         return errorResponse(res, 500, "Something went wrong", error.message);
//     }
// }
// exports.logout = async (req,res) => {
//     try {
//         const token = req.headers['authorization'].split(' ')[1]; 
//         const result = await authService.verifyTokenBearer(token);
//         const removeSession = await authService.logout(token,result);
//         if(removeSession == 0) return errorResponse(res, 400, 'Bad Request');
//         return successResponse(res, 200, 'Logout Success',result);
//     } catch (error) {
//         return errorResponse(res, 500, "Something went wrong", error.message);
//     }
// }

// exports.verifyToken = async (req,res,next) => {
//     try {
//         const token = req.headers['authorization']? req.headers['authorization'].split(' ')[1]:null;
//         if(!token) return errorResponse(res, 401, 'Access token required');
//         const result = await authService.verifyTokenBearer(token);
//         if(result == "expired"){
//             const refreshToken = await authService.refreshToken(token);
//             if(!refreshToken) return errorResponse(res, 403, 'Invalid or expired token');
//             res.setHeader('x-refresh-token', refreshToken);
//             // return successResponse(res, 200, 'Refresh Token Success',refreshToken);
//         }
//         next();
//         // return successResponse(res,200,"Token Valid");
//     } catch (error) {
//         return errorResponse(res,500,"Something went wrong",error.message);
//     }
// }
// exports.forgotPassword = async (req,res) => {
//     try {
//         const email = req.body.email;
//         const generateOtp = await authService.forgotMyPassword(email);
//         if(generateOtp == 0) return errorResponse(res,404,"Email not found");
//         return successResponse(res,200,"OTP Code Has Been Sent");
//     } catch (error) {
//         return errorResponse(res,500,"Something went wrong",error.message);
//     }
// }
// exports.validationOtp = async (req,res) => {
//     try {
//         const otp = req.body.otp.toString();
//         const email = req.body.email;
//         const result = await authService.validationOtp(otp,email);
//         if(result == 0) return errorResponse(res,404,"Email not found");
//         else if(result == constant.statusExp) return errorResponse(res,400,"Otp is expired");
//         else if(result == 2) return errorResponse(res,400,"Invalid Otp");
//         return successResponse(res,200,"Valid Otp Please Reset Password");
//     } catch (error) {
//         return errorResponse(res,500,"Something went wrong",error.message);
//     }
// }
// exports.resetPassword = async (req,res) => {
//     try {
//         const email = req.body.email;
//         const newPassword = req.body.new_password;
//         const confirmPassword = req.body.confirm_password;
//         const resetPassword = await authService.resetMyPassword(email,newPassword,confirmPassword);
//         if(resetPassword == 99) return errorResponse(res,400,"Password not match");
//         else if(resetPassword == 0) return errorResponse(res,404,"Email not found");
//         return successResponse(res,200,"Success","Password Reset Success");
//     }   catch (error) {
//         return errorResponse(res,500,"Something went wrong",error.message);
//     }
// }