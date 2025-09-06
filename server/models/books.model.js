const mongoose = require("mongoose");
const books_schema = new mongoose.Schema(
    {
        base_abstract_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Abstract",
        },
        abstract_text: {
            type: String,
        },
        genre: {
            type: String,

        },
        title: {
            type: String,
        },
        image: {
            type: String
        },
        // created_by : {
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref : "User",
        // },
        total_contributers: {
            type: Number,
            default: 0
        },
        total_chapters: {
            type: Number,
            default: 0
        },
        current_chapter: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["Ongoing", "Completed"],
        },
        canon_chapters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }]

    }
);

const Books = mongoose.model("Books", books_schema);
module.exports = Books;
