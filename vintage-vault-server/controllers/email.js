const nodemailer = require('nodemailer');
require('dotenv').config();
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2

class Email {

    async register(req,res) {
        const createTransporter = async () => {
            try {
                const oauth2Client = new OAuth2(
                    process.env.CLIENT_ID,
                    process.env.CLIENT_SECRET,
                    "http://developers.google.com/oauthplayground"
                )

                oauth2Client.setCredentials({
                    refresh_token: process.env.REFRESH_TOKEN
                })

                const accessToken = await new Promise((resolve,reject) => {
                   oauth2Client.getAccessToken((err,token) => {
                      if (err) {
                        console.log("Error: ", err)
                        reject("Failed to create access token.")
                    }
                    resolve(token)
                   })
                })

                const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth: {
                        type: "OAuth2",
                        user: process.env.USER_EMAIL,
                        accessToken,
                        clientId: process.env.CLIENT_ID,
                        clientSecret: process.env.CLIENT_SECRET,
                        refreshToken: process.env.REFRESH_TOKEN
                    }
                })

                return transporter;

            } catch (err) {
                console.log("Error in createTransporter:", err);
                return null;
            }
        }

        const { email } = req.body

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Vintage Vault',
            html: `<h1>Welcome to Vintage Vault! Thank you for creating your account.</h1>`
        }
    
        let emailTransporter = await createTransporter()

        emailTransporter ? emailTransporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error sending email", err);
                res.send("Failed to send email"); 
            } else {
                console.log("Email sent", info.response);
                res.send("Email sent successfully");
            }
        })
        :
        res.send("Failed to send email");
    }
}

module.exports = new Email();
