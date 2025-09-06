const Chapter = require("../models/chapter.model");
const asyncHandler = require("../utils/async_handler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const Books = require("../models/books.model");
const User = require("../models/users.model");


const ChapterAddition = asyncHandler(async (req, res) => {
    // --- 1. DESTRUCTURE AND VALIDATE INPUT ---
    const { book_id, title, content, draftId } = req.body; // Added draftId for draft deletion
    const user_id = req.user._id;

    if ([book_id, title, content].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "Book ID, title, and content are required.");
    }

    // --- 2. FIND THE BOOK AND SET CHAPTER NUMBER ---
    const book = await Books.findById(book_id);
    if (!book) {
        throw new ApiError(404, "The book you are trying to write for does not exist.");
    }
    // Set the chapter number for this submission round
    const chapter_number = book.current_chapter + 1;

    // --- 3. CREATE THE NEW CHAPTER ---
    const new_chapter = await Chapter.create({
        book_id,
        user_id,
        chapter_number,
        title,
        content
    });

    if (!new_chapter) {
        throw new ApiError(500, "Something went wrong while creating the chapter.");
    }

    // --- 4. UPDATE BOOK AND USER STATISTICS (COMBINED FOR EFFICIENCY) ---

    // Update the book's contributor count
    book.total_contributers += 1;
    await book.save();

    // Prepare the update query for the user
    const userUpdateQuery = {
        $inc: { "stats.chapters_written": 1 }
    };

    // If a draftId was passed from the frontend, pull it from the user's drafts array
    if (draftId) {
        userUpdateQuery.$pull = { writing_drafts: { _id: draftId } };
    }

    // Update the user's stats and remove the draft
    await User.findByIdAndUpdate(user_id, userUpdateQuery);

    // --- 5. SEND THE RESPONSE ---
    const response = new ApiResponse(
        201, // 201 Created is more appropriate here
        { new_chapter },
        "New chapter submitted successfully for review."
    );

    return res.status(201).json(response);
});

// const ChapterAddition = asyncHandler(async (req, res) => {
//     const { book_id, title, content } = req.body;
//     const user_id = req.user._id;
//     //if(book_id == ""|| user_id == "" || chapter_number == "" || title == "" ||content == ""){
//     if ([book_id, title, content].some(field => field?.trim() === "")) {
//         throw new ApiError(400, "data is missing");
//     }
//     const book = await Books.findById(book_id);
//     const chapter_number = book.current_chapter;

//     const new_chapter = await Chapter.create({ book_id, user_id, chapter_number, title, content });

//     book.total_contributers = book.total_contributers + 1;
//     book.save()

//     const response = new ApiResponse(200, { new_chapter }, message = "new chapter added");
//     return res.status(200).json(response);

// })


const voteChapter = asyncHandler(async (req, res) => {
    // chapter_id
    // user_id from middleware

    const { chapter_id } = req.body;
    const user_id = req.user._id;

    if (chapter_id?.trim() === "") {
        throw new ApiError(400, "chapter id not found")
    }

    const chapter = await Chapter.findById(chapter_id);
    const user = await User.findById(user_id);
    var message;



    if (!user.liked_chapters.find(liked_chapter => liked_chapter.equals(chapter._id))) {
        chapter.votes = chapter.votes + 1;
        user.liked_chapters.push(chapter_id);
        message = "liked";
    }
    else {
        chapter.votes = chapter.votes - 1;
        const chapter_index = user.liked_chapters.indexOf(chapter_id);
        user.liked_chapters.splice(chapter_index);
        message = "disliked";
    }
    user.save();
    chapter.save();

    return res.status(200).json(new ApiResponse(200, {}, message));


})


const getChapter = asyncHandler(async (req, res) => {
    const chapterId = req.params.chapterid;

    const chapter = await Chapter.findById(chapterId);
    const book = await Books.findById(chapter.book_id);
    if (chapter.chapter_number == book.total_chapters && book.status == "Ongoing") {
        return res.status(200).json(new ApiResponse(200, { nextChapterAvailable: false }))
    }
    const nextChapter = await Chapter.find({
        book_id: book._id,
        chapter_number: chapter.chapter_number + 1
    })

    const data = {
        ...chapter,
        ...nextChapter,
        book_image: book.image,
        nextChapterAvailable: true
    }
    const response = new ApiResponse(200, data)

    return res.status(200).json(response)
})

const editorData = asyncHandler(async (req, res) => {
    const bookid = req.params.bookid
})


module.exports = { ChapterAddition, voteChapter, getChapter };