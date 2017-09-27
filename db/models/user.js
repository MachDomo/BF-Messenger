import mongoose from 'mongoose';
import db from '../config.js';

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema);

export default User;
