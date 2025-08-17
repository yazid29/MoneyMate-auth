// const logger = require('../config/logger');
// const UserAccount = require('../models/accountModel');
const accountModel = require('../models/accountModel');
const encryption = require('../utils/hashPassword');
const jwt = require("jsonwebtoken");
// const constant = require("../utils/constant");
// const crypto = require("crypto");
// const nodemailer = require('nodemailer');
// const emailService = require('../services/emailService');
const generateToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "15m" });
    return token;
}
const generateRefreshToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "7d" });
    return token;
}

exports.registerUser = async (data) => {
    try {
        let usernameData = data.username;
        let emailData = data.email;
        const existingUser = await accountModel.checkExistingUser(usernameData, emailData);
        
        if (existingUser) {
            if (existingUser.username === usernameData) {
                return {
                    status: 0,
                    message: "Username already exists."
                };
            }
            if (existingUser.email === emailData) {
                return {
                    status: 0,
                    message: "Email already exists."
                };
            }
        }

        const hashedPassword = await encryption.hashPassword(data.password);
        // const checkPassword = await encryption.checkPassword(data.password, hashedPassword);
        const newAccount = {
            username: usernameData,
            email: emailData,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            // createdAt: Date.now()
        };
        const resultUser = await accountModel.insertData(newAccount);
        return resultUser;
    } catch (error) {
        throw error;
    }
}
exports.loginUser = async (data) => {
    try {
        let usernameData = data.username;
        const resultUser = await accountModel.getUserByUsername(usernameData);
        
        if (resultUser) {
            const checkPassword = await encryption.checkPassword(data.password, resultUser.password);
            if (checkPassword) {
                let dataUser = {
                    username: resultUser.username,
                    email: resultUser.email
                }
                let token = generateToken(dataUser);
                let refreshToken = {
                    refresh_token: generateRefreshToken(dataUser),
                    updated_at: new Date()
                };
                const resultUpdate = await accountModel.updateByUsername(usernameData,refreshToken);
                console.log("Update Successfuly",resultUpdate);
                return {token: token};
            } else {
                return false;
            }
        }
        return false;
    } catch (error) {
        throw error;
    }
}

// exports.loginUser = async (data) => {
//     try {
//         const querySelect = {
//             status : 0,
//             is_deleted : 0,
//             createdAt:0,
//             updatedAt:0,
//             __v:0
//         }
//         const resultUser = await accountModel.findOne({ username: data.username, is_deleted: false }).select(querySelect);
//         if (resultUser) {
//             const checkPassword = await encryption.checkPassword(data.password, resultUser.password);

//             if (checkPassword) {
//                 let data = {
//                     username: resultUser.username,
//                     email: resultUser.email
//                 }
//                 let token = generateToken(data);
//                 const cek = await accountModel.updateOne({ _id: resultUser._id }, { 
//                     $set: {
//                     "authentication.role": resultUser.authentication.role,
//                     "authentication.jwt": token,
//                     "authentication.valid_session": true,
//                     }
//                 });
//                 return {token: token};
//             } else {
//                 return false;
//             }
//         } 
//         return false;
//     } catch (error) {
//         throw error;
//     }
// }

// exports.verifyTokenBearer = async(token)=>{
//     try {
//         const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//         return decodedToken
//     } catch (error) {
//         if(error.name === 'TokenExpiredError'){
//             return constant.statusExp
//         }else{
//             throw error
//         }
//     }
// }
// exports.refreshToken = async (token) => {
//     try {
//         const decoded = jwt.decode(token);
//         const newData = {
//             username: decoded.username,
//             email: decoded.email
//         }
//         const getValidSession = await accountModel.findOne({ 
//             username: newData.username, 
//             "authentication.jwt": token,
//             "authentication.valid_session": true 
//         });
//         if (getValidSession) {
//             let token = generateToken(newData);
//             const cek = await accountModel.updateOne({ _id: getValidSession._id }, { $set: {
//                 "authentication.jwt": token,
//                 "authentication.valid_session": true,
//             }});
//             return token;
//         }
//         return false;
//     } catch (error) {
//         throw error;
//     }
// }
// exports.logout = async (token,validToken) => {
//     try {
//         const decoded = jwt.decode(token);
//         const getUser = await accountModel.findOne({ 
//             username: decoded.username, 
//             "authentication.jwt": token, 
//             "authentication.valid_session": true
//         });
//         if(getUser){
//             const cek = await accountModel.updateOne({ _id: getUser._id }, { $set: {
//                 "authentication.jwt": "",
//                 "authentication.valid_session": false,
//             }});
//             return 1;
//         }
//         return 0;
//     } catch (error) {
//         throw error;
//     }
// }

// exports.forgotMyPassword = async(email) => {
//     try {
//         const tempDestination = "ventdra29@gmail.com";
//         let lengthOtp = 6;
//         const generateOtp = crypto.randomInt(10 ** (lengthOtp - 1), 10 ** lengthOtp).toString();
//         const expiredOtp = new Date(Date.now() + 10 * 60 * 1000);
//         const getUser = await accountModel.findOne({ 
//             email: email,
//         });
//         if(getUser){
//             const updateOtp = await accountModel.updateOne({_id: getUser._id}, { 
//                 $set: {
//                     "authentication.otp": generateOtp,
//                     "authentication.valid_otp": expiredOtp
//                 }
//             });
//             let dataBinding = {
//                 user:"Ventdra",
//                 body: generateOtp,
//             }
//             const sendEmail = await emailService.sendToEmail("Code OTP",tempDestination,dataBinding,"sendOtp");
//             return generateOtp;
//         }
//         return 0;
//     } catch (error) {
//         throw error
//     }
// }

// exports.validationOtp = async(codeOtp,email) => {
//     try {
//         const getUser = await accountModel.findOne({ 
//             email: email
//         });
//         if(getUser){
//             if(getUser.authentication.otp == codeOtp){
//                 if(Date.now() > getUser.authentication.valid_otp){
//                     return constant.statusExp;
//                 }
//                 const updateOtp = await accountModel.updateOne({_id: getUser._id}, {
//                     $set: {
//                         "authentication.otp": "",
//                         "authentication.valid_otp": ""
//                     }
//                 })
//                 return 1;
//             }
//             return 2;
//         }
//         return 0;
//     } catch (error) {
//         throw error;
//     }
// }

// exports.resetMyPassword = async (email,password,confirmPassword) => {
//     try {
//         if(password != confirmPassword){
//             return 99;
//         }
//         const getUser = await accountModel.findOne({ 
//             email: email
//         });
//         if(getUser){
//             const hashedPassowrd = await encryption.hashPassword(password);
//             const updateOtp = await accountModel.updateOne({_id: getUser._id}, {
//                 $set: {
//                     "password": hashedPassowrd
//                 }
//             })
//             return 1;
//         }
//         return 0;
//     } catch (error) {
//         throw error;
//     }
// }