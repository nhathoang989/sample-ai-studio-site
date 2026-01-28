
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askAboutMixcore(question: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user is asking a question about Mixcore CMS. 
        Context: Mixcore CMS is an open-source, decoupled CMS built on ASP.NET Core. It's fast, secure, and developer-friendly.
        
        Question: ${question}
        
        Provide a helpful, concise answer based on this context.`,
      });
      return response.text || "I'm sorry, I couldn't process that question right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Error: Unable to reach AI assistant. Please check your connection.";
    }
  }

  async summarizePost(content: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the following blog post about Mixcore CMS in 3 key bullet points: \n\n${content}`,
      });
      return response.text || "No summary available.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Summary unavailable.";
    }
  }
}

export const geminiService = new GeminiService();
