
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  pincode: { type: String, required: true },
  otp: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;
