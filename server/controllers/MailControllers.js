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
    
    const resetLink = `http://localhost:4000/api/Auth/reset/${req.resetToken}`

    const resetPassMail = {
      from: 'mazumdarmrinmoy51@gmail.com',
      to: req.body.email,
      subject: 'Password Reset Request',
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Reset Your Password</title>
          <style>
            /* Fallback styles for email clients */
            body {
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 100%;
              table-layout: fixed;
              background-color: #f4f4f4;
              padding: 20px 0;
            }
            .main {
              background-color: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              border-radius: 8px;
              font-family: Arial, sans-serif;
            }
            .content {
              padding: 30px;
              text-align: center;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
            }
            .footer {
              font-size: 12px;
              color: #999999;
              text-align: center;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <table class="main" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="content">
                  <h1>Reset Your Password</h1>
                  <p>Hello,</p>
                  <p>We received a request to reset your password. Click the button below to set a new password.</p>
                  <a href= ${resetLink} id="Reset-Button" class="button">Reset Password</a>
                  <p>If you didn’t request a password reset, you can ignore this email.</p>
                </td>
              </tr>
            </table>
            <div class="footer">
              &copy; 2025 Your Company. All rights reserved.
            </div>
          </div>
        </body>
      </html> `

    };
    const SendMail = await transporter.sendMail(resetPassMail)
    

    return res.status(201).json({
        message: "mail sent successfully",
        token: req.resetToken
    })
}
export {MailSender}