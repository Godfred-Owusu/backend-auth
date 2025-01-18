export const verificationCode = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verification Token</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #2f88d0;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .token {
        font-size: 24px;
        font-weight: bold;
        color: #2f88d0;
        text-align: center;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        color: #888888;
        font-size: 12px;
        padding: 10px;
        background-color: #f9f9f9;
        border-top: 1px solid #eeeeee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Account Verification</h1>
      </div>
      <div class="content">
        <p>Dear User,</p>
        <p>
          Thank you for signing up! Please use the verification token below to
          complete your account setup.
        </p>
        <div class="token">{{token}}</div>
        <p>If you didn’t request this, please ignore this email.</p>
        <p>
          Best regards,
          <br />
          Intern Connect Team
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Intern Connect. All rights reserved.</p>
        <p>
          Need help? Contact us at
          <a href="mailto:support@yourcompany.com">support@internconnect.com</a>
        </p>
      </div>
    </div>
  </body>
</html>
`;

// passwordResetEmail
export const passwordResetEmail = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #2f88d0;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .reset-link {
        color: #2f88d0;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        color: #888888;
        font-size: 12px;
        padding: 10px;
        background-color: #f9f9f9;
        border-top: 1px solid #eeeeee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Dear User,</p>
        <p>
          You recently requested to reset your password. Click the link below to
          reset it:
        </p>
        <h3>
          <a href="{{resetToken}}" class="reset-link">Reset Password</a>
        </h3>
        <p>
          If you didn’t request a password reset, please ignore this email or
          contact support if you have concerns.
        </p>
        <p>
          Best regards,
          <br />
          Intern Connect Team
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Intern Connect. All rights reserved.</p>
        <p>
          Need help? Contact us at
          <a href="mailto:support@yourcompany.com">support@internconnect.com</a>
        </p>
      </div>
    </div>
  </body>
</html>
`;

export const passwordResetSuccessEmail = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Success</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #2f88d0;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 20px;
        color: #333333;
      }
      .footer {
        text-align: center;
        color: #888888;
        font-size: 12px;
        padding: 10px;
        background-color: #f9f9f9;
        border-top: 1px solid #eeeeee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Successful</h1>
      </div>
      <div class="content">
        <h3>Hello, {{name}}</h3>
        <p>
          Your password has been reset successfully. You can now log in to your
          account using your new password.
        </p>
        <p>If you didn’t perform this action, please contact our support team immediately.</p>
        <p>
          Best regards,
          <br />
          Intern Connect Team
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Intern Connect. All rights reserved.</p>
        <p>
          Need help? Contact us at
          <a href="mailto:support@yourcompany.com">support@internconnect.com</a>
        </p>
      </div>
    </div>
  </body>
</html>
`;
