
import React from 'react';

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = React.useState(0);
  const messages = [
    "Khởi động DeepSeek-Reasoner Engine...",
    "Thiết lập ma trận Can Chi đa tầng...",
    "Chain-of-Thought: Đang phân tích các cung số...",
    "Đang giải mã sự hội tụ của các chính tinh...",
    "Kết xuất dữ liệu giải đoán từ lõi suy luận..."
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 bg-oriental z-50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
      <div className="relative w-40 h-40 mb-10">
        <div className="absolute inset-0 border border-yellow-600/10 rounded-full scale-150 animate-pulse"></div>
        <div className="absolute inset-0 border-t-2 border-yellow-500 rounded-full animate-spin duration-[3s]"></div>
        <div className="absolute inset-4 bg-slate-900/80 rounded-full border border-yellow-900/50 flex items-center justify-center shadow-[inset_0_0_20px_rgba(202,138,4,0.2)]">
          <div className="flex flex-col items-center">
             <div className="w-10 h-10 bg-yellow-600 transform rotate-45 shadow-[0_0_30px_rgba(202,138,4,0.6)] mb-2"></div>
             <span className="text-[10px] text-yellow-500 font-black tracking-widest">REASONER</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-heading gold-text animate-pulse duration-[2s] uppercase tracking-[0.3em] font-black italic">
          Thinking...
        </h2>
        <p className="text-slate-400 tracking-[0.1em] italic text-sm font-light min-h-[1.5rem]">
          {messages[messageIndex]}
        </p>
      </div>

      <div className="absolute bottom-12 opacity-30">
         <div className="text-[9px] text-slate-500 tracking-[0.5em] uppercase font-bold">DeepSeek Logic v1.0</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
