const nodeMailer = require ("nodemailer")
require ("dotenv").config()

const sendMail =async (options)=>{
const transporter = await nodeMailer.createTransport(
    {    
      host: 'smtp.gmail.com',
     secure: true,
      service :  process.env.service,
     
 auth: {
         user:process.env.mail_ID ,
          pass:process.env.mail_Password ,
        },
      })
let mailOptions = {
    from: process.env.mail_ID,
    to: options.email,
    subject: options.subject,
    // text: options.message
  html:options.html
//   
}
await transporter.sendMail(mailOptions)}
module.exports = sendMail