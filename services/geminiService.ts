import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, HoroscopeData } from "../types";

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

export const generateHoroscope = async (input: UserInput): Promise<HoroscopeData> => {
  // Access the API key injected by Vite's define block
  const apiKey = process.env.API_KEY;
  
  // Validation to ensure the key exists before initializing the SDK
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    throw new Error("Không tìm thấy Thiên Cơ (API Key). Vui lòng đảm bảo API_KEY đã được cấu hình trong GitHub Secrets và truyền vào quá trình build.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    [SYSTEM: DEEP REASONING ASTROLOGY ENGINE]
    Bạn là một bậc thầy Tử Vi phương Đông. Hãy thực hiện quy trình suy luận logic để giải đoán lá số chi tiết cho người sau:
    - Họ tên: ${input.fullName}
    - Giới tính: ${input.gender}
    - Ngày sinh (Dương lịch): ${input.birthDate}
    - Giờ sinh: ${input.birthHour}

    YÊU CẦU PHÂN TÍCH:
    1. Chuyển đổi sang ngày Âm lịch tương ứng (năm, tháng, ngày, giờ).
    2. Xác định Mệnh, Cục, ngũ hành bản mệnh và sự tương sinh tương khắc.
    3. Giải đoán chi tiết 12 cung số: Mệnh, Phụ mẫu, Phúc đức, Điền trạch, Quan lộc, Nô bộc, Thiên di, Tật ách, Tài bạch, Tử tức, Phu thê, Huynh đệ.
    4. Phân tích chi tiết về Sự nghiệp, Tài lộc, Tình duyên và Sức khỏe dựa trên các sao chính và phụ tinh.
    5. Đưa ra dự báo tổng quan cho năm hiện tại.

    Yêu cầu: Ngôn từ mang tính triết lý sâu sắc, chuyên môn cao nhưng dễ hiểu. Kết quả trả về phải là JSON theo đúng cấu trúc schema đã định nghĩa.
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

    if (!response.text) {
      throw new Error("Hệ thống tinh tú không phản hồi. Vui lòng thử lại sau.");
    }

    return JSON.parse(response.text) as HoroscopeData;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};