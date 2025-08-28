const mongoose = require("mongoose");
const chapter_schema = new mongoose.Schema({
    book_id : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : "Books",
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    chapter_number : {
        type : Number,
    },
    title : {
        type : String,
    },
    content : {
        type : String,
    },
    is_canon : {
        type : Boolean,
        default: false
    },
    created_at : {
        type : Date,
        default : Date.now,
    },
    alt_rank : {
        type : Number,
    },
    votes: {
        type: Number,
        default: 0
    }
});

const Chapter = mongoose.model("Chapter", chapter_schema);
module.exports = Chapter;