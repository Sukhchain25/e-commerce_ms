export const USER_CONSTANTS = {
  SEND_EMAIL_API: 'http://localhost:3001/api/user/sendEmail',
  emailVerificationMessage: (emailToken) =>  `<p>Click <a style="color: #007bff; text-decoration: none; font-weight: bold;" href="http://localhost:3000/api/user/verifyEmail/${emailToken}">here</a> to verify your email.</p>`,
};
