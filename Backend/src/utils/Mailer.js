import nodemailer from 'nodemailer'

async function mailer(receiverEmail, fileSenderEmail, downloadLink, fileName) {
  // Create transporter with Gmail configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "shivamsinghyadavssy888@gmail.com",
      pass: process.env.PASS
    }
  });

  // HTML email template
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .content {
            line-height: 1.6;
            color: #333;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>New File Shared with You</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have received a new file from <strong>${fileSenderEmail}</strong>.</p>
            ${fileName ? `<p>File Name: <strong>${fileName}</strong></p>` : ''}
            <p>Click the button below to download your file:</p>
            <a href="${downloadLink}" class="button">Download File</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all;">${downloadLink}</p>
          </div>
          <div class="footer">
            <p>This is an automated message from ShareNest. Please do not reply to this email.</p>
            <p>If you didn't expect this file, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Email configuration
  const mailOptions = {
    from: {
      name: "ShareNest",
      address: "shivamsinghyadavssy888@gmail.com"
    },
    to: receiverEmail,
    subject: "New File Shared with You - ShareNest",
    text: `
      You received a new file from ${fileSenderEmail}
      
      Download your file here: ${downloadLink}
      
      If you didn't expect this file, please ignore this email.
    `,
    html: htmlTemplate
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent successfully!");
    console.log("Message ID:", info.messageId);
    
    if (process.env.NODE_ENV === 'development') {
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export {mailer}