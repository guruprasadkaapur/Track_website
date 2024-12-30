import { sendOTP } from './services/otpServices.js';

sendOTP('+917019616255') 
  .then(() => console.log('Test complete'))
  .catch(err => console.error(err));
