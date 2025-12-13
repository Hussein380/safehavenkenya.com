import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const scoreSchema = z.object({
    score: z.number().min(0),
    testName: z.string().optional(),
    maxScore: z.number().optional(),
    testId: z.string().optional(),
});

export const analyzeMentalState = async (req: Request, res: Response) => {
    try {
        const { score, testName, maxScore } = scoreSchema.parse(req.body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY is not set in environment variables.");
            return res.status(500).json({
                error: 'Server configuration error',
                message: "We are currently updating our AI service. You seem okay! Please remember to practice self-care."
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Generate dynamic label based on score ratio if maxScore is present
        let label = "Assessment Complete";
        if (maxScore) {
            const ratio = score / maxScore;
            // WHO-5 Logic: High is good
            if (testName?.includes("WHO-5")) {
                if (ratio > 0.5) label = "Well-being is Good";
                else if (ratio > 0.3) label = "Reduced Well-being";
                else label = "Low Well-being";
            } else {
                // Standard Logic: Low is good
                if (ratio < 0.25) label = "Likely Minimal Symptoms";
                else if (ratio < 0.50) label = "Possible Mild Symptoms";
                else if (ratio < 0.75) label = "Possible Moderate Symptoms";
                else label = "Possible Severe Symptoms";
            }
        }

        const prompt = `
      You are a compassionate mental health assistant for "Safe Haven Consultancy".
      The user just completed the following assessment: "${testName || 'Mental Health Screen'}".
      
      Score Scored: ${score} / ${maxScore || 'Unknown Max'}
      Preliminary Label: "${label}"

      TASK:
      Generate a warm, human, empathetic, and supportive response (150-200 words).
      
      CONTEXT:
      - If this is WHO-5, remember HIGHER scores are GOOD. < 50% (Score < 13) indicates poor well-being.
      - If this is PHQ-9/GAD-7/K10/DASS-21, HIGHER scores are BAD (more distress).

      RULES:
      1. NEVER diagnose (no medical terms like "disorder", "illness", "clinical").
      2. Validating their feelings based on the score level and specific test context.
      3. For "Severe" or "Low Well-being" ranges, STRONGLY encourage professional support.
      4. Offer 2-3 simple, actionable coping tips.
      5. Use paragraph breaks for readability.

      MANDATORY INCLUSIONS (if score suggests risk/distress):
      You MUST include this EXACT text if they seem distressed or at risk: "Please reach out to our mental health expert for confidential support on WhatsApp: 0729 875 368"

      Tone: Gentle, safe, non-judgmental.
    `;

        // Model Fallback Strategy
        const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
        let text = "";
        let usedModel = "";

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to generate with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                text = response.text();
                usedModel = modelName;
                break; // Success!
            } catch (err: any) {
                console.warn(`Failed with model ${modelName}:`, err.message);
                // Continue to next model
            }
        }

        if (!text) {
            throw new Error("All AI models failed to generate a response.");
        }

        res.json({
            score,
            label,
            message: text,
            model: usedModel // Optional: let frontend know which model worked
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        console.error('Gemini API Error:', error);

        res.status(503).json({
            score: req.body.score || 0,
            label: "Analysis Unavailable",
            message: "Thank you for checking in. We couldn't reach our AI specialist right now, but please remember to take care of yourself. If you feel overwhelmed, please use the WhatsApp button below.",
            error: "AI Service temporarily unavailable"
        });
    }
};
