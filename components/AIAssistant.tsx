
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);
    const result = await geminiService.askAboutMixcore(question);
    setAnswer(result);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <i className="fas fa-robot"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold">Hỏi về Mixcore CMS?</h3>
            <p className="text-indigo-200 text-sm">Trợ lý AI Gemini luôn sẵn sàng trả lời.</p>
          </div>
        </div>

        <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ví dụ: Mixcore có hỗ trợ đa ngôn ngữ không?"
            className="flex-grow bg-indigo-800/50 border border-indigo-700 rounded-xl px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-indigo-900 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Hỏi AI'}
          </button>
        </form>

        {answer && (
          <div className="mt-6 p-4 bg-indigo-800/50 rounded-xl border border-indigo-700 animate-fadeIn">
            <p className="text-indigo-50 leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
