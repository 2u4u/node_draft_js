const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  topic: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Post = mongoose.model("Post", postSchema);
