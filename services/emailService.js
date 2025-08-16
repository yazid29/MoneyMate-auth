// const path = require('path');
// const nodemailer = require("nodemailer");
// // const nodemailerExpressHandlebars = require("nodemailer-express-handlebars");
// const logger = require('../config/logger');
// const moment = require("moment");
// // exports.trasporterGmail = () => {
    
// //     return transporter;
// // }
// // exports.mailOption = (subject,destinationEmail,body,templatePath) =>{
    
// // },
// // exports.handlebarsOptions = () => {
    
// //     return options
// // }
// exports.sendToEmail = async (subjectEmail, destinationEmail, body, templateEmail) => {
//     try {
//         // https://ethereal.email/messages
//         let transporter = nodemailer.createTransport({
//             service: "ethereal.email",
//             port: 587,
//             host: "smtp.ethereal.email",
//             auth: {
//                 user: "katherine.effertz11@ethereal.email", 
//                 pass: "VUE3FU2MChh4nr9GXj"
//             }
//         });
//         // let transporter = nodemailer.createTransport({
//         //     service: "gmail",
//         //     port: 465,
//         //     host: "smtp.gmail.com",
//         //     secure: true,
//         //     auth: {
//         //       user: "testnodemailer198@gmail.com",
//         //       pass: "tjjdrjbkjonkbabg",
//         //     },
//         // });
//         let mailOptions = {
//             from: "NODEMAILER",
//             to: destinationEmail,
//             subject: `${subjectEmail+" - "+ moment().format("DDMMYYYY HH:mm")}`,
//             template: templateEmail,
//             context:body
//         };
//         const { default: nodemailerExpressHandlebars } = await import('nodemailer-express-handlebars');
//         const handlebarOptions = {
//             viewEngine: {
//               extName: '.handlebars',
//               partialsDir: path.resolve(__dirname, '../emailNotification'),
//               defaultLayout: false,
//             },
//             viewPath: path.resolve(__dirname, '../emailNotification'),
//             extName: '.handlebars',
//         };
        
//         // const transporter = this.trasporterGmail();
//         // const handlebarOptions = this.handlebarsOptions();
//         transporter.use("compile", nodemailerExpressHandlebars(handlebarOptions));
//         // let mailOptions = this.mailOption(
//         //     subjectEmail,
//         //     destinationEmail,
//         //     body,
//         //     templateEmail
//         // );
//         transporter.sendMail(mailOptions).catch(error=>{
//             logger.error(error);
//         })
//     } catch (error) {
//         throw error;
//     }
// }