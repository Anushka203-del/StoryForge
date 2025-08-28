const mongoose = require("mongoose")
const comment_schema = new mongoose.Schema ( {
    chapter_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chapter",
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    text : {
        type : String,
    
    },
    likes : {
        type : Number,
    },
    reply_to : {
        type : String,
    },
    created_at : {
        type :Date,
        default : Date.now,
    },
})

const Comment = mongoose.model("Comment", comment_schema);
module.exports = Comment;

