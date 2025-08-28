
const dotenv = require("dotenv")
const { GoogleGenAI } =  require("@google/genai");

dotenv.config();
const genres = ["Romantic","Thriller","Horror", "Fantasy"];

const prompt = ` 
Generate a short base story abstract (under 80 words) with an open-ended, intriguing premise that can be expanded across different genres.
make sure to Be intriguing and imaginative without any limits and Contain a strong hook to inspire authors to continue the story. also give 
a total number of chapters which each genre should have, the max limit of the chapters is 12.


Then, provide four variations of the same abstract — modified very slightly to match the tone and mood of the following genres:
${genres}
Each variation should maintain the core setting and idea but use genre-appropriate language and mood.

Return the response as a JSON object in the following format.

 [{
    title: "",
    text: "",
    genre: "",
    total_chapters: "",
 },...]
 where genre are base story, ${genres}
 `


const ai = new GoogleGenAI({});



async function abstractGenerator() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt 
  });
  var output = response.text;
  output = output.replace("```json","");
  output = output.replace("```","");
  output = JSON.parse(output);                          //converts string into a json object
  return {stories: output, Ai_used: "gemini-2.5-flash"};
}


module.exports = abstractGenerator;