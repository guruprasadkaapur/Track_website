import twilio from 'twilio';


// Twilio credentials from .env
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Function to send OTP via SMS using Twilio
export const sendOTP = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
  const message = `Your OTP code is: ${otp}`;

  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phone,
    });
    return otp;  // Return OTP for saving in DB and later comparison
  } catch (error) {
    throw new Error('Twilio SMS sending failed');
  }
};
