const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  mood: {
    happy: {
      type: String,
    },
    sad: {
      type: String,
    },
    angry: {
      type: String,
    },
    stressed: {
      type: String,
    },
    anxious: {
      type: String,
    },
    excited: {
      type: String,
    },
    neutral: {
      type: String,
    },
    tired: {
      type: String,
    },
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
