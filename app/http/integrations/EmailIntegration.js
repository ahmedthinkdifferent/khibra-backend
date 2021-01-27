const nodemailer = require('nodemailer');
const ServerException = require('../exceptions/ServerException');

class EmailIntegration {


    static async send(receiver, subject, content) {
        const transporter = await EmailIntegration.initTransporter();
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: receiver, // list of receivers
            subject: subject, // Subject line
            html: content, // html body
        });
        if (!info.messageId) {
            throw new ServerException(info.response);
        }
    }


    static async sendVerificationCodeEmail(receiver, code) {
        try {
            let content = `
        <div>
        <h4>Reset Password</h4>
        <p>reset password code :- ${code}</p>
        </div>
       
        `;
            await EmailIntegration.send(receiver, "Reset Password", content)
        } catch (e) {
            throw new ServerException(e.message);
        }

    }

    static async sendRegisterWelcomeMail(receiver) {
        try {
            let content = `
        <div>
        <h4>Thank you for registering to khibra</h4>
        </div>
        `;
            await EmailIntegration.send(receiver, "Welcome to khibra", content)
        } catch (e) {
            throw new ServerException(e.message);
        }

    }

    static async initTransporter() {
        return nodemailer.createTransport({
            /* host: "Gmail",*/
            service: 'Gmail',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'freelancetestmail@gmail.com', // generated ethereal user
                pass: 'ahmed@123', // generated ethereal password
            },
        });

    }

}

module.exports = EmailIntegration;