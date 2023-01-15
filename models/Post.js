const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  mood: {
    type: Array,
    required: true,
  },
  grateful_text: {
    type: String,
  },
  looking_forward_text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name
module.exports = mongoose.model('Post', PostSchema);
