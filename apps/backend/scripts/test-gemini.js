"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load env vars
const envPath = path_1.default.resolve(__dirname, "../../../.env");
dotenv_1.default.config({ path: envPath });
console.log("Loading .env from:", envPath);
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found!");
    process.exit(1);
}
console.log("✅ API Key found (starts with):", apiKey.substring(0, 5) + "...");
function testGemini() {
    return __awaiter(this, void 0, void 0, function* () {
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        // Testing user specific model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        try {
            console.log("🤖 Sending test prompt to Gemini...");
            const result = yield model.generateContent("Hello! Are you working correctly? Reply with 'Yes, Safe Haven AI is online.'");
            const response = yield result.response;
            const text = response.text();
            console.log("✅ Response received:");
            console.log(text);
        }
        catch (error) {
            console.error("❌ Error communicating with Gemini:", error);
        }
    });
}
testGemini();
