import jwt from 'jsonwebtoken';
import { sendOTP } from '../services/otpServices.js'; // Ensure correct path to service file
import User from '../models/User.js';

// Format Phone Number
const formatPhoneNumber = (phone) => {
  if (!phone.startsWith('+')) {
    return '+91' + phone; // Add your default country code here
  }
  return phone;
};

// Register User (Send OTP)
export const registerUser = async (req, res) => {
  const { phone, fullname, pincode } = req.body;

  try {
    const formattedPhone = formatPhoneNumber(phone);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    // Send OTP via Twilio service
    const otpSent = await sendOTP(formattedPhone, otp);
    if (!otpSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    // Check if user already exists
    let user = await User.findOne({ phone: formattedPhone });
    if (user) {
      // Update OTP for existing user
      user.otp = otp;
      await user.save();
    } else {
      // Create a new user record
      user = new User({ phone: formattedPhone, fullname, pincode, otp });
      await user.save();
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

// Verify OTP and Generate JWT Token
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const formattedPhone = formatPhoneNumber(phone);

    // Find user by phone number
    const user = await User.findOne({ phone: formattedPhone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear OTP after successful verification
    user.otp = null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'User verified successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during OTP verification', error: error.message });
  }
};
