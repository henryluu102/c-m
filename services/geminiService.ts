
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    category: { type: Type.STRING },
    prepTime: { type: Type.STRING },
    cookTime: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    servings: { type: Type.NUMBER },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          amount: { type: Type.STRING }
        },
        required: ["name", "amount"]
      }
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    nutrition: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.NUMBER },
        protein: { type: Type.STRING },
        carbs: { type: Type.STRING },
        fat: { type: Type.STRING }
      }
    }
  },
  required: ["title", "description", "category", "ingredients", "instructions"]
};

export const geminiService = {
  async suggestMeal(ingredientsInFridge: string): Promise<Recipe> {
    const prompt = `Tôi có những nguyên liệu này trong tủ lạnh: ${ingredientsInFridge}. Hãy gợi ý cho tôi 1 món ăn Việt Nam truyền thống hoặc hiện đại có thể nấu từ các nguyên liệu này (có thể thêm gia vị cơ bản). Hãy trả về thông tin chi tiết món ăn theo định dạng JSON.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema
      }
    });

    const data = JSON.parse(response.text);
    return {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(data.title)}/800/600`
    };
  },

  async askChef(query: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là một chuyên gia ẩm thực Việt Nam mang tên "Mẹ Bếp". Hãy trả lời câu hỏi sau một cách ấm áp, gần gũi và chuyên nghiệp: ${query}`,
      config: {
        systemInstruction: "Bạn là Mẹ Bếp, một người mẹ Việt Nam hiền hậu, giỏi nấu nướng và rất am hiểu về văn hóa ẩm thực gia đình Việt. Cách nói chuyện của bạn cần phải truyền cảm hứng, khuyến khích mọi người vào bếp."
      }
    });
    return response.text;
  }
};
