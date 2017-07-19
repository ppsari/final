const nodemailer = require('nodemailer');
const https = require('https');

require('dotenv').config
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (user,message) => {
  if (typeof user.email !== 'undefined') {
    let mailOptions = {
        from: '"TES 👻" <noreply@tes.com>', // sender address
        to: `${user.email}`,//`${user.email}`, // list of receivers
        subject: `${message.subject}`,
        text: `Hi ${user.username}, ${message.body}`,
        html: `Hi <b>${user.username}, ${message.body}` // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

}

const sendSMS = (user,message) => {
  if (typeof user.phone !== 'undefined') {
    // console.log('-------------------------2');
    // console.log(user)
    let data = JSON.stringify({
      api_key: process.env.NEXMO_KEY,
      api_secret: process.env.NEXMO_SECRET,
      to: user.phone,
      from: 'home360',
      text: (message.subject).toUpperCase()+'\n'+message.body
    });
    let options = {
     host: 'rest.nexmo.com',
     path: '/sms/json',
     port: 443,
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Content-Length': Buffer.byteLength(data)
     }
    };
    let req = https.request(options);
    req.write(data);
    req.end();
    let responseData = '';
    req.on('response', (res) => {
      res.on('data', (chunk) => { responseData += chunk;});
      res.on('end', () => { console.log(JSON.parse(responseData)); });
    });
  }

}

const contact = (user,message) =>{
  sendEmail(user,message);
  sendSMS(user,message);
}

module.exports = {
  contact
}