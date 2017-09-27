import mongoose from 'mongoose';
import db from '../config.js';

var messageSchema = mongoose.Schema({
  username: String,
  message: String
});

var Message = mongoose.model('Message', messageSchema);

export default Message;
