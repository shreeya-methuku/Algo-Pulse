
import { GoogleGenAI, Type } from "@google/genai";
import { Problem, UserStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCoachInsights(problems: Problem[], stats: UserStats) {
  try {
    const prompt = `
      Act as a high-level competitive programming coach. 
      Analyze the user's DSA progress and provide a concise, motivating summary.
      
      User Stats:
      - Level: ${stats.level}
      - Total Problems: ${stats.totalSolved}
      - Current Streak: ${stats.streak}
      
      Problems Logged (JSON):
      ${JSON.stringify(problems.slice(-10))}

      Provide your analysis in the following JSON format:
      {
        "motivation": "A 1-sentence encouraging quote or remark.",
        "focusArea": "The specific topic they should focus on next (e.g., 'Dynamic Programming').",
        "rationale": "Why they should focus on that area.",
        "tip": "A technical tip related to their recent problems."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            motivation: { type: Type.STRING },
            focusArea: { type: Type.STRING },
            rationale: { type: Type.STRING },
            tip: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      motivation: "Keep pushing, every problem is a step towards mastery!",
      focusArea: "General Practice",
      rationale: "Data analysis currently unavailable.",
      tip: "Focus on understanding the space and time complexity of every solution."
    };
  }
}
