const functions = require('firebase-functions');
const admin = require('firebase-admin')
// const nodemailer = require('nodemailer');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=>{
    // if(context.auth ===undefined){
    //   return{error:"only admins can add admins"}
    // }
    // if(context.auth.token.admin!==true){
    //     return {error:"only admins can add admins"}
    // }
return admin.auth().getUserByEmail(data.email).then(user=>{
    return admin.auth().setCustomUserClaims(user.uid, {
        admin:true,
        checker:true
    });
}).then(()=>{
    return {message:`success ${data.email} is now a admin`};
}).catch(err=>{
    return err;
});
});

exports.addCheckerRole = functions.https.onCall((data,context)=>{
  if(context.auth ===undefined){
    return{error:"only admins can add Checkers"}
  }
  if(context.auth.token.admin!==true){
      return {error:"only admins can add admins"}
  }
return admin.auth().getUserByEmail(data.email).then(user=>{
  return admin.auth().setCustomUserClaims(user.uid, {
      checker:true,
      admin:false
  });
}).then(()=>{
  return {message:`success ${data.email} is now a Checker`};
}).catch(err=>{
  return err;
});
});

exports.removeCheckerRole = functions.https.onCall((data,context)=>{
  if(context.auth ===undefined){
    return{error:"only admins can add Checkers"}
  }
  if(context.auth.token.admin!==true){
      return {error:"only admins can add admins"}
  }
return admin.auth().getUserByEmail(data.email).then(user=>{
  return admin.auth().setCustomUserClaims(user.uid, {
      admin:false,
      checker:false
  });
}).then(()=>{
  return {message:`success ${data.email} has been removed as a checker`};
}).catch(err=>{
  return err;
});
});

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
// const mailTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
// });

// // Your company name to include in the emails
// // TODO: Change this to your app or company name to customize the email sent.
// const APP_NAME = 'Engineering Tickets';

// // creates firebase cloud functions that creats a function that watches a firebase table and when it detects a change it
// // calls the function send Eamil
//   exports.createSendEmailFunctionOnWriteNewTable = functions.database
//   .ref('/Tickets/{pushId}')
//   .onWrite((change,context) => {
//       const ticket = change.after.val();
//       const email = ticket.Email // The email of the user.
//       const name = ticket.FirstName + " "+ ticket.LastName
//       const pdfFIleLocation = ticket.PDFLocation
//       return sendEmail(email, name,pdfFIleLocation);
//   });


// // Send Email from the change that happened in the Firebase table using the child that changed
// async function sendEmail(email, displayName,pdfFIleLocation) {
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email,
//     attachments:
//     {
//             filename: displayName+'.pdf',
//             path: pdfFIleLocation
//     },
//   };

//   // Format the Email to be sent
//   mailOptions.subject = `Welcome to ${APP_NAME}!`;
//   mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.
//   If you ordered more than one Ticket download or print more then one`;
//   await mailTransport.sendMail(mailOptions);
//   console.log('New welcome email sent to:', email);
//   return null;
// }

















// const mailTransport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'usuengineeringoffice@gmail.com',
//       pass: ''
//     },
//   });
  
//   exports.sendSurveysEmail = functions.firestore
//   .document('sendSurveys/{sendSurveysId}')
//   .onCreate((snap, context) => {
//     const req = snap.data();
  
//     const email = req.email;
//     const fullName = req.fullName;
//     const output = `
//     <p>Hi ${fullName}</p>
//     <p>Thank for filling out the Tutoring Center Feedback Survey. Here is your survey link:</p>
//     <p><a href="https://usu.co1.qualtrics.com/jfe/form/SV_eWO2j0tCFRqU9OB">https://usu.co1.qualtrics.com/jfe/form/SV_eWO2j0tCFRqU9OB</a></p>
//     <p>As a reminder, <strong>your survey responses will remain completely anonymous,</strong> and you may be completely truthful with your comments. As compensation for your time, you may choose to <strong>enter a drawing to win a $25 gift card!</strong> Drawings are <strong>held every two weeks,</strong> and <strong>each day you submit a response will increase your chances of winning cash!</strong> If you enter, you will be asked for the <strong>date of your tutoring session, name, and email address.</strong> Your information is collected using a separate link and stored independent from your response to keep your feedback anonymous. <strong>Drawing winners will be notified via email.</strong></p>
//     <p>Thank for choosing the Tutoring Center! Please come again!</p>
//     <p>Student Relations Team</p>
//     <p>Engineering Tutoring Center</p>
//     `;
//   const subject = `USU Tutoring Center Survey`;
  
//   return sendEmail(output, subject,email);
  
//   })
  
//   async function sendEmail(output, subject,email) {
//     let mailOptions = {
//       from: '"Engineering Tutoring Center" <usuengineeringoffice@gmail.com>', // sender address
//       to: email, // list of receivers comma seperate list
//       subject: subject, // Subject line
//       text: "", // plain text body
//       html: output // html body
//     };
  
//     await mailTransport.sendMail(mailOptions, (error, info) => {
//       if(error) {
//         return cosole.log(error);
//       }
  
//      console.log("Message sent: %s", info.messageId);
//      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     });
//   console.log("New email was sent");
//     return null;
//   }
