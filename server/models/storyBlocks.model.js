const mongoose = require("mongoose");
const storyBlock_schema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  block_text: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  combined_with: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoryBlock",
    },
  ], // references to other blocks (AI recombination)
});

const StoryBlock = mongoose.model("StoryBlock", storyBlock_schema);
module.exports = StoryBlock;
