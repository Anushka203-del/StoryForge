const Chapter = require("../models/chapter.model");
const asyncHandler = require("../utils/async_handler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const Books = require("../models/books.model");
const User = require("../models/users.model");
const { default: mongoose } = require("mongoose");


const ChapterAddition = asyncHandler( async(req,res) => {
    const { book_id, title, content } = req.body; 
    const user_id = req.user._id;
    //if(book_id == ""|| user_id == "" || chapter_number == "" || title == "" ||content == ""){
    if([ book_id, title, content ].some(field => field?.trim() === "")){
        throw new ApiError(400,"data is missing");
    }
    const book = await Books.findById(book_id);
    const chapter_number = book.current_chapter;
    
    const new_chapter = await Chapter.create({ book_id, user_id, chapter_number, title, content });

    const response = new ApiResponse(200,{new_chapter}, message = "new chapter added");
    return res.status(200).json(response);

})


const voteChapter = asyncHandler( async( req, res) => {
    // chapter_id
    // user_id from middleware

    const { chapter_id } = req.body;
    const user_id = req.user._id;

    if(chapter_id?.trim() === ""){
        throw new ApiError(400, "chapter id not found")
    }

    const chapter = await Chapter.findById(chapter_id);
    const user = await User.findById(user_id);
    var message;

  

    if(!user.liked_chapters.find(liked_chapter => liked_chapter.equals(chapter._id))){
        chapter.votes = chapter.votes + 1;
        user.liked_chapters.push(chapter_id);
        message = "liked";
    }
    else{
        chapter.votes = chapter.votes - 1;
        const chapter_index = user.liked_chapters.indexOf(chapter_id);
        user.liked_chapters.splice(chapter_index);
        message = "disliked";
    }
    user.save();
    chapter.save();

    return res.status(200).json(new ApiResponse(200, {},message));
    

})



module.exports = {ChapterAddition,voteChapter};