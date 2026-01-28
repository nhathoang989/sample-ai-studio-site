
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, HoroscopeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const HOROSCOPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        lunarDate: { type: Type.STRING, description: "Ngày âm lịch tương ứng" },
        destinyElement: { type: Type.STRING, description: "Mệnh (Kim, Mộc, Thủy, Hỏa, Thổ) kèm nạp âm" },
        zodiacAnimal: { type: Type.STRING, description: "Con giáp của tuổi" },
        generalComment: { type: Type.STRING, description: "Nhận định chung về bản mệnh" }
      },
      required: ["lunarDate", "destinyElement", "zodiacAnimal", "generalComment"]
    },
    palaces: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Tên cung (Mệnh, Phụ Mẫu, Phúc Đức...)" },
          meaning: { type: Type.STRING, description: "Ý nghĩa ngắn gọn của cung này" },
          description: { type: Type.STRING, description: "Luận giải chi tiết cho cung này dựa trên ngày giờ sinh" }
        },
        required: ["name", "meaning", "description"]
      }
    },
    career: { type: Type.STRING, description: "Luận giải về công danh sự nghiệp" },
    wealth: { type: Type.STRING, description: "Luận giải về tài lộc" },
    love: { type: Type.STRING, description: "Luận giải về tình duyên và gia đạo" },
    health: { type: Type.STRING, description: "Luận giải về sức khỏe" },
    currentYearForecast: { type: Type.STRING, description: "Dự đoán vận hạn chi tiết trong thời gian sắp tới (khoảng 6-12 tháng tới)" }
  },
  required: ["summary", "palaces", "career", "wealth", "love", "health", "currentYearForecast"]
};

export const generateHoroscope = async (input: UserInput): Promise<HoroscopeData> => {
  const prompt = `
    Bạn là một chuyên gia bậc thầy về Tử Vi Lý Số phương Đông với khả năng tư duy logic và suy luận chuyên sâu (Deep Reasoning).
    Hãy thực hiện quy trình phân tích đa tầng cho lá số sau:
    - Họ và tên: ${input.fullName}
    - Ngày sinh dương lịch: ${input.birthDate}
    - Giờ sinh: ${input.birthHour}
    - Giới tính: ${input.gender}

    Quy trình phân tích "Deep-Seek Style":
    1. Bước 1 (Cấu trúc): Xác định chính xác can chi của năm, tháng, ngày, giờ. Tìm Mệnh, Cục và các cung chức.
    2. Bước 2 (Tương quan): Phân tích tương quan Ngũ Hành giữa bản mệnh và cung an mệnh. Xem xét các bộ chính tinh và phụ tinh hội chiếu.
    3. Bước 3 (Luận giải): Giải đoán chi tiết 12 cung số, tập trung vào các cung quan trọng như Mệnh, Thân, Tài, Quan, Di.
    4. Bước 4 (Tổng hợp): Đưa ra nhận định tổng quát và dự báo vận hạn trong 12 tháng tới với độ chính xác cao nhất.

    Yêu cầu ngôn ngữ: Trang trọng, súc tích, mang tính triết lý sâu sắc nhưng vẫn dễ tiếp cận. Tránh các câu trả lời hời hợt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: HOROSCOPE_SCHEMA,
        thinkingConfig: { thinkingBudget: 32768 } // Sử dụng ngân sách suy luận tối đa để đạt chất lượng "Deep Analysis"
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result as HoroscopeData;
  } catch (error) {
    console.error("Error generating horoscope:", error);
    throw error;
  }
};
