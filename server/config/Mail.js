//Nodemailer is a module for Node.js applications to allow easy as cake email sending
const nodemailer = require('nodemailer');

let testAccount = nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.example.com",
    port: 465,
    secure: true,
    auth:{
       user: testAccount.user,
       pass: testAccount.pass
   }
});

/**
 * Mails to specified eMail address
 * @param {Object} options
 * @param {String} options.to
 * @param {String} options.subject
 * @param {String} options.html
 * @returns {<Promise>} Promise
 */
const mail = options => new Promise((resolve,reject) => {
    let o = {
        from: `Instagram <${MAIL}>`,
        ...options
    }

    transporter.sendMail(o,err => {
        err ? reject(err) : resolve('Mail Sent!!')
    })
});

module.exports = mail;

