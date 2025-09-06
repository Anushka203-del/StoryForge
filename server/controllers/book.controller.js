const Books = require("../models/books.model");
const Chapter = require("../models/chapter.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/async_handler");

const getBookDetails = asyncHandler(async (req, res) => {
    const bookId = req.params.bookid;

    const book = await Books.findById(bookId);

    const data = {
        ...book,
        chapterList: book.canon_chapters.map(async (chapterId) => {
            const chapterObject = await Chapter.findById(chapterId)
            return {
                _id: chapterId,
                title: chapterObject.title,
                user_id: chapterObject.user_id,
                votes: chapterObject.votes
            }
        })
    }

    const response = new ApiResponse(200, data)
    return res.status(200).json(response)

})

module.exports = { getBookDetails }

