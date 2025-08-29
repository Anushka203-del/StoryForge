const mongoose = require("mongoose");
const minibites_schema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  },
  chapter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // user or author
  quote: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const MiniBites = mongoose.model("MiniBites", minibites_schema);
module.exports = MiniBites;
