const { GoogleGenerativeAI } = require("@google/generative-ai");
const Books = require('../models/books.model');
const StoryBlock = require('../models/storyBlocks.model'); // You will need to create this model

// Initialize the Gemini AI client with your API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Helper function to build the detailed prompt for the Gemini API.
 * This function is not exported; it's used internally by the main controller.
 *
 * @param {string} bookId - The ID of the book being written for.
 * @param {Array<string>} blockIds - An array of IDs for predefined story blocks.
 * @param {Array<Object>} customBlocks - An array of user-defined custom blocks.
 * @param {string} textSoFar - The chapter text generated so far.
 * @returns {Promise<string>} A fully constructed prompt.
 */
async function buildGenerationPrompt(bookId, blockIds, customBlocks, textSoFar = "") {
    // --- Step 1: Fetch all required data from the database ---
    const book = await Books.findById(bookId).populate('canon_chapters');
    if (!book) {
        throw new Error("Book not found. Cannot generate chapter context.");
    }

    const lastCanonChapter = book.canon_chapters[book.canon_chapters.length - 1];
    const previousChapterSummary = lastCanonChapter
        ? `The story last left off with this: In the chapter titled "${lastCanonChapter.title}", ${lastCanonChapter.content.substring(0, 200)}...`
        : "This is the very first chapter of the story. You are setting the opening scene.";

    const selectedBlocks = (blockIds && blockIds.length > 0)
        ? await StoryBlock.find({ '_id': { $in: blockIds } })
        : [];

    // --- Step 2: Categorize all blocks (predefined and custom) ---
    const categorizedBlocks = {
        'Characters': [],
        'Setting': [],
        'Plot Points': [],
        'Central Conflict': [],
        'Overarching Theme': [],
        'Custom Instructions': [] // For user-defined elements
    };

    selectedBlocks.forEach(block => {
        // Fallback to 'Custom Instructions' if category is unknown
        const category = categorizedBlocks[block.category] ? block.category : 'Custom Instructions';
        categorizedBlocks[category].push(
            `- **${block.title}:** ${block.description}. (Tags: ${block.tags.join(", ")})`
        );
    });

    if (customBlocks && customBlocks.length > 0) {
        customBlocks.forEach(customBlock => {
            categorizedBlocks['Custom Instructions'].push(
                `- **${customBlock.title}:** ${customBlock.description}. (Tags: ${(customBlock.tags || []).join(", ")})`
            );
        });
    }

    // --- Step 3: Assemble the CORE ELEMENTS section of the prompt ---
    let coreElementsPrompt = `# CORE ELEMENTS FOR THIS CHAPTER:\nYou must creatively weave these elements into the narrative:\n`;
    for (const category in categorizedBlocks) {
        if (categorizedBlocks[category].length > 0) {
            coreElementsPrompt += `\n## ${category}:\n${categorizedBlocks[category].join('\n')}\n`;
        }
    }

    // --- Step 4: Construct the final prompt based on whether it's a start or continuation ---
    let finalPrompt;

    if (textSoFar.trim() === "") {
        // This is the INITIAL generation request
        finalPrompt = `
# INSTRUCTIONS:
You are a world-class novelist. Your task is to write the **beginning** of a new chapter (around 150-200 words). It must be based on the provided story elements and seamlessly continue from the previous chapter's summary. Your writing should be vivid, descriptive, and end at a natural pause that invites continuation.

${coreElementsPrompt}

# PREVIOUS CHAPTER SUMMARY:
${previousChapterSummary}

# START WRITING THE NEW CHAPTER HERE:
`;
    } else {
        // This is a CONTINUATION request
        finalPrompt = `
# INSTRUCTIONS:
You are a world-class novelist continuing a chapter you have already started. Your task is to write the **next section** of the story (around 150-200 words). It must flow perfectly from the text provided below and continue to adhere to the original core elements. Do NOT repeat any part of what has already been written. End at a natural pause.

${coreElementsPrompt}

# CHAPTER WRITTEN SO FAR:
---
${textSoFar}
---

# CONTINUE THE STORY SEAMLESSLY FROM HERE:
`;
    }

    return finalPrompt;
}

/**
 * @description Controller to generate or continue a chapter segment.
 * @route POST /api/creator/generate
 * @access Private
 */


module.exports = {
    buildGenerationPrompt
};
