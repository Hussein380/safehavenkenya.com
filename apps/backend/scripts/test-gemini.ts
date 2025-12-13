import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

// Load env vars
const envPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envPath });

console.log("Loading .env from:", envPath);
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found!");
    process.exit(1);
}

console.log("✅ API Key found (starts with):", apiKey.substring(0, 5) + "...");

async function testGemini() {
    const genAI = new GoogleGenerativeAI(apiKey!);
    // Testing user specific model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    try {
        console.log("🤖 Sending test prompt to Gemini...");
        const result = await model.generateContent("Hello! Are you working correctly? Reply with 'Yes, Safe Haven AI is online.'");
        const response = await result.response;
        const text = response.text();
        console.log("✅ Response received:");
        console.log(text);
    } catch (error) {
        console.error("❌ Error communicating with Gemini:", error);
    }
}

testGemini();
