const resetPasswordEmailTemplate = (resetLink, name = "User") => {
  return `
  <div style="font-family:Arial;background:#f4f6f8;padding:30px">
    <div style="max-width:500px;margin:auto;background:#fff;padding:25px;border-radius:8px">
      
      <h2>Password Reset Request</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>You requested to reset your password. Click the button below:</p>

      <a href="${resetLink}"
         style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;
         text-decoration:none;border-radius:6px;margin:15px 0">
         Reset Password
      </a>

      <p>This link is valid for <b>15 minutes</b>.</p>

      <p>If you did not request this, ignore this email.</p>

      <hr/>

      <p style="font-size:14px;color:#777">
        Regards,<br/>
        Harsh Foujdar
      </p>
    </div>
  </div>
  `;
};

module.exports = resetPasswordEmailTemplate;
