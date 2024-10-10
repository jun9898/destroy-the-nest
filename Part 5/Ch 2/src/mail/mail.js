const mailer = require('nodemailer')
const welcome = require("./welcome_template");
const goodbye = require("./goodbye_template");
require('dotenv').config();

const getEmailData = (to, name, template) => {
    let data = null;
    switch (template) {
        case "welcome":
            data = {
                from: "보내는 사람 이름 <userId@gmail.com>",
                to: to,
                subject: `Hello ${name}`,
                html: welcome()
            }
            break
        case "goodbye":
            data = {
                from: "보내는 사람 이름 <userId@gmail.com>",
                to: to,
                subject: `Goodbye ${name}`,
                html: goodbye()
            }
            break
        default:
            data;
    }
    return data;
}

const sendMail = (to, name, type) => {
    const transporter = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GOOGLE_ID,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    });

    const mail = getEmailData(to, name, type);

    transporter.sendMail(mail, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('email sent successfully');
        }
        transporter.close();
    })
}

module.exports = sendMail;
