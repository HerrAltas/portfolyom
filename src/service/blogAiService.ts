import { GoogleGenAI, Type } from "@google/genai";

export interface GeneratedArticle {
  title: string;
  excerpt: string;
  category: string;
  content: string[];
  imageSearchTerm: string;
}

export const generateArticleWithAI = async (keywords: string[]): Promise<GeneratedArticle> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  
  const prompt = `Write a professional, engaging, and high-quality tech blog article based on these keywords: ${keywords.join(', ')}.
  The article should be insightful and sound like it's written by a senior software engineer.
  
  Return the response in JSON format with the following structure:
  {
    "title": "A catchy and click-worthy title",
    "excerpt": "A short 2-sentence hook for the article",
    "category": "The most relevant tech category (e.g., AI, Frontend, Career, Architecture)",
    "content": ["paragraph 1", "paragraph 2", "paragraph 3", "paragraph 4", "paragraph 5"],
    "imageSearchTerm": "A single simple English word related to the topic for an image search (e.g. 'code', 'robot', 'server', 'laptop')"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            category: { type: Type.STRING },
            content: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            imageSearchTerm: { type: Type.STRING }
          },
          required: ["title", "excerpt", "category", "content", "imageSearchTerm"]
        }
      }
    });

    if (!response.text) {
  throw new Error("AI response text is empty");
}

const result = JSON.parse(response.text);
return result;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};
