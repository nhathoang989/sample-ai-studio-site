
export class GeminiService {
  constructor() {}

  async askAboutMixcore(question: string) {
    return "Tính năng AI hiện đang tạm tắt.";
  }

  async summarizePost(content: string) {
    return "Bản tóm tắt bài viết.";
  }
}

export const geminiService = new GeminiService();
