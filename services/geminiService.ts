import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateContent = async (prompt: string, type: 'thank_you' | 'project_update'): Promise<string> => {
  try {
    let systemInstruction = "";
    if (type === 'thank_you') {
      systemInstruction = "You are a warm, empathetic communications officer for a non-profit organization called 'Lev HaKehila'. Write in Hebrew. Keep it professional yet touching.";
    } else {
      systemInstruction = "You are a marketing manager for a non-profit. Write an exciting project update in Hebrew suitable for social media.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "לא ניתן היה לייצר תוכן כרגע. אנא נסה שוב.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "שגיאה בתקשורת עם ה-AI. אנא בדוק את מפתח ה-API שלך.";
  }
};