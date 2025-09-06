const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const abstractGenerator = require("../utils/Abs_generator")
const async_handler = require("../utils/async_handler")
const Abstract = require("../models/abstract.model")
const Books = require("../models/books.model")

const abstractGeneratorController = async_handler(async (req, res) => {
    var abstracts_ai = await abstractGenerator();
    const abstract = await Abstract.create({
        abs_title: abstracts_ai.stories[0].title,
        abs_text: abstracts_ai.stories[0].text,
        ai_id: abstracts_ai.Ai_used,
    })
    const diff_texts = []
    abstracts_ai.stories.shift();
    console.log(abstracts_ai.stories);
    for (var x of abstracts_ai.stories) {

        diff_texts.push({
            base_abstract_id: abstract._id,                                //the _id created by mongodb during creation at line 10
            abstract_text: x.text,
            genre: x.genre,
            title: x.title,
            total_chapters: x.total_chapters,
        })
    }
    const books = await Books.create(diff_texts);
    const response = new ApiResponse(200, {}, message = "different genres abstracts added in the abstract and book");                      //data humesha object me bhejte h
    return res.status(200).json(response);
})

const getAbstracts = async_handler(async (req, res) => {
    const abstracts = await Abstract.find().sort({ created_at: -1 }).limit(5)
    const booksPerAbstracts = abstracts.map(async (abstract) => {
        const books = await Books.find({
            base_abstract_id: abstract._id
        })
        return {
            ...abstract,
            book: books
        }
    })
    const data = booksPerAbstracts
    const response = new ApiResponse(200, data)
    return res.status(200).json(response)
})

module.exports = {
    abstractGeneratorController,
    getAbstracts
};