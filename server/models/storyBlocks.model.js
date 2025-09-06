const mongoose = require("mongoose");
const storyBlock_schema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  block_text: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  block_type: {
    type: String,
    enum: ["characters", "settings", "plot-points", "conflicts", "themes", "custom"]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // combined_with: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "StoryBlock",
  //   },
  // ],
});

const StoryBlock = mongoose.model("StoryBlock", storyBlock_schema);
module.exports = StoryBlock;
