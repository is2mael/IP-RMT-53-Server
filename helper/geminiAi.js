require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (art1, art2) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    
}

module.exports = gemini;
