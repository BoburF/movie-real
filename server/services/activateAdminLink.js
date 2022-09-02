const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'changeitgo3@gmail.com',
        pass: process.env.NODEMAILER_SEND,
    },
});

module.exports = SendMail = async (email, activationLink) => {
   await transporter.sendMail({
    from: '"Real-Movie 👻" <Mendan>',
    to: email,
    subject: 'Hello from real-Movie',
    text: 'real-Movie',
    html: 'Activation link here ' + activationLink
    })
}