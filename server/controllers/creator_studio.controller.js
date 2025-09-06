const StoryBlock = require("../models/storyBlocks.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/async_handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildGenerationPrompt } = require("../utils/generate_AI_chapter");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



const getAllBlocks = asyncHandler(async (req, res) => {
    const user_id = req.user._id;
    const story_blocks = await StoryBlock.find({
        author_id: user_id
    })
    const response = new ApiResponse(200, story_blocks)
    return res.status(200).json(response)
})

const addBlock = asyncHandler(async (req, res) => {
    const { tags, block_text, title, block_type } = req.body;
    const user_id = req.user._id;

    const storyBlockObject = await StoryBlock.create({
        author_id: user_id,
        tags: tags,
        title: title,
        block_text: block_text,
        block_type: block_type
    })

    storyBlockObject.save()

    return res.status(201).json(new ApiResponse(201, {}, "Block successfully added"))
})




const generateChapterSegment = asyncHandler(async (req, res) => {
    const { bookId, blockIds, customBlocks, textSoFar } = req.body;

    if (!bookId) {
        throw new ApiError(400, "A Book ID is required to generate a chapter.");
    }

    try {
        // 1. Build the dynamic prompt using our helper function
        const prompt = await buildGenerationPrompt(bookId, blockIds, customBlocks, textSoFar);

        // 2. Call the Gemini API to get the next part of the story
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const newTextChunk = response.text();

        // 3. Send the newly generated text back to the frontend
        return res.status(200).json(new ApiResponse(
            200,
            {
                newChunk: newTextChunk,
                fullText: (textSoFar || "") + newTextChunk
            },
            "Chapter segment generated successfully."
        ));

    } catch (error) {
        console.error("Error during chapter generation:", error);
        // If the error is a known type (like 'Book not found'), pass its message
        const errorMessage = error instanceof Error ? error.message : "Failed to generate chapter segment due to a server error.";
        throw new ApiError(500, errorMessage);
    }
});

module.exports = {
    getAllBlocks,
    addBlock,
    generateChapterSegment
}