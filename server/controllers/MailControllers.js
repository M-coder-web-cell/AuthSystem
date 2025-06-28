import nodemailer from 'nodemailer'
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mazumdarmrinmoy51@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});


const MailSender = async (req, res) =>{
    
    const resetLink = `http://localhost:5173/users/forgotpassword/${req.resetToken}`

    const resetPassMail = {
      from: 'mazumdarmrinmoy51@gmail.com',
      to: req.body.email,
      subject: 'Password Reset Request',
      html: `
        <head>
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800"
          />
          <title>Stitch Design</title>
          <style>
            body {
              margin: 0;
              background-color: #f8fafc;
              font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;
            }

            .container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              overflow-x: hidden;
            }

            .layout {
              display: flex;
              flex: 1;
              justify-content: center;
              padding: 4vh 8vw; /* vertical and horizontal padding */
            }

            .content {
              width: 100%;
              max-width: 80vw;
              padding: 4vh 0;
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            h2 {
              color: #0e161b;
              font-size: 2.5vh;
              font-weight: bold;
              text-align: center;
              padding: 2vh 2vw 1.5vh 2vw;
              margin: 0;
            }

            p {
              color: #0e161b;
              font-size: 2vh;
              font-weight: normal;
              text-align: center;
              padding: 1vh 2vw;
              margin: 0;
            }

            .button-container {
              display: flex;
              justify-content: center;
              padding: 2vh 2vw;
            }

            .button {
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 20vw;
              max-width: 60vw;
              height: 5vh;
              padding: 0 3vw;
              background-color: #1993e5;
              color: #f8fafc;
              font-size: 1.8vh;
              font-weight: bold;
              border: none;
              border-radius: 1vh;
              cursor: pointer;
              text-decoration: none;
            }

            .button span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .text-muted {
              color: #4e7a97;
              font-size: 1.5vh;
              text-align: center;
              padding: 1vh 2vw;
            }

            .underline {
              text-decoration: underline;
            }

            .spacer {
              height: 4vh;
              width: 100%;
            }
          </style>
        </head>

        <body>
          <div class="container">
            <div class="layout">
              <div class="content">
                <div class="spacer"></div>
                <h2>Welcome back, Alex</h2>
                <p>You recently requested to reset your password. Click the button below to proceed.</p>
                <div class="button-container">
                  <a href="#" class="button">
                    <span>Reset Password</span>
                  </a>
                </div>
                <p class="text-muted">If you didn't request a password reset, please ignore this email or contact support.</p>
                <p class="text-muted underline">Contact Support</p>
                <div class="spacer"></div>
              </div>
            </div>
          </div>
        </body>


      `
    };
    const SendMail = await transporter.sendMail(resetPassMail)
    

    return res.status(201).json({
        message: "mail sent successfully",
        token: req.resetToken
    })
}
export {MailSender}