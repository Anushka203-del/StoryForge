const asyncHandler = require("./async_handler");
const Chapter = require("../models/chapter.model");
const Books = require("../models/books.model");

const is_canon = async () => {
    const book_id = "6889f27452e9615b27005be4"
    const chapter_number = 0
    const chapters = await Chapter.find({
        book_id,
        chapter_number
    }).sort({ votes: -1 })
    var canon_chapter = chapters[0]
    canon_chapter.is_canon = true;
    canon_chapter.save();
    const book = await Books.findById(book_id);
    book.current_chapter = chapter_number + 1;
    book.canon_chapters.push(canon_chapter.id)
    book.save();
    //new_chapter

}

//is_canon("6889f27452e9615b27005be4", 0);

module.exports = is_canon;