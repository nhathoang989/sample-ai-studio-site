
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, HoroscopeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const HOROSCOPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        lunarDate: { type: Type.STRING },
        destinyElement: { type: Type.STRING },
        zodiacAnimal: { type: Type.STRING },
        generalComment: { type: Type.STRING }
      },
      required: ["lunarDate", "destinyElement", "zodiacAnimal", "generalComment"]
    },
    palaces: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          meaning: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["name", "meaning", "description"]
      }
    },
    career: { type: Type.STRING },
    wealth: { type: Type.STRING },
    love: { type: Type.STRING },
    health: { type: Type.STRING },
    currentYearForecast: { type: Type.STRING }
  },
  required: ["summary", "palaces", "career", "wealth", "love", "health", "currentYearForecast"]
};

export const analyzeWithDeepSeek = async (input: UserInput): Promise<HoroscopeData> => {
  // Sử dụng gemini-3-pro-preview với thinkingBudget tối đa để mô phỏng DeepSeek Reasoner
  const prompt = `
    [MODE: DEEPSEEK-REASONER-ASTROLOGY]
    Bạn là một thực thể trí tuệ nhân tạo cấp cao chuyên giải đoán Tử Vi phương Đông. 
    Hãy sử dụng quy trình suy luận logic (Chain-of-Thought) để phân tích lá số cho:
    - Họ tên: ${input.fullName}
    - Giới tính: ${input.gender}
    - Ngày sinh (Dương): ${input.birthDate}
    - Giờ sinh: ${input.birthHour}

    QUY TRÌNH PHÂN TÍCH:
    1. Thiết lập bản đồ Can Chi, xác định Mệnh, Cục, Thân.
    2. Giải đoán 12 cung số dựa trên sự hội tụ của chính tinh và phụ tinh.
    3. Phân tích các mối quan hệ Ngũ Hành tương sinh tương khắc.
    4. Đưa ra dự báo vận hạn chi tiết và lời khuyên tu thân.

    Yêu cầu: Kết quả trả về phải cực kỳ chi tiết, mang tính triết lý và độ chính xác cao.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: HOROSCOPE_SCHEMA,
        thinkingConfig: { thinkingBudget: 32768 }
      },
    });

    return JSON.parse(response.text || '{}') as HoroscopeData;
  } catch (error) {
    console.error("DeepSeek Reasoner Analysis Error:", error);
    throw error;
  }
};
