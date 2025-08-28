const mongoose = require("mongoose");
const books_schema = new mongoose.Schema(
    {
        base_abstract_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Abstract",
        },
        abstract_text: {
            type: String,
        },
        genre : {
            type: String,

        },
        title : {
            type : String,
        },
        // created_by : {
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref : "User",
        // },
        total_chapters : {
            type : Number,
        },
        current_chapter : {
            type : Number,
            default : 0,
        },
        status : {
            type : String,
            enum : ["Ongoing","Completed"],
        },

    }
);

const Books = mongoose.model("Books", books_schema);
module.exports = Books;
