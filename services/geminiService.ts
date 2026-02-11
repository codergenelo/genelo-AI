
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIMode, Language, Message } from "../types";
import { SYSTEM_PROMPTS } from "../constants";

export const geminiService = {
  generateResponse: async (
    history: Message[],
    mode: AIMode,
    language: Language,
    onChunk: (chunk: string) => void
  ) => {
    // Initialize AI with the API key from environment variables as per guidelines.
    // The apiKey must be obtained exclusively from process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct system instruction based on mode and language requirements.
    let systemInstruction = SYSTEM_PROMPTS[mode];
    if (language === Language.SWAHILI) {
      systemInstruction += " IMPORTANT: Respond only in Swahili (Kiswahili).";
    } else if (language === Language.ENGLISH) {
      systemInstruction += " IMPORTANT: Respond only in English.";
    } else {
      systemInstruction += " Detect the user's language and respond in the same language (primarily Swahili or English).";
    }

    // Select the model based on the task complexity as per guidelines.
    // Complex tasks like Coding and Research use the Pro model.
    const modelName = (mode === AIMode.CODE || mode === AIMode.RESEARCH) 
      ? "gemini-3-pro-preview" 
      : "gemini-3-flash-preview";

    // Fix: generateContentStream returns a Promise, so we must await it before iteration to avoid Symbol.asyncIterator error.
    const stream = await ai.models.generateContentStream({
      model: modelName,
      contents: history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    let fullText = "";
    try {
      // Correctly iterate over the stream now that it has been awaited.
      for await (const chunk of stream) {
        // chunk is of type GenerateContentResponse, access .text property directly.
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text;
        if (textChunk) {
          fullText += textChunk;
          onChunk(textChunk);
        }
      }
      return fullText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
};
