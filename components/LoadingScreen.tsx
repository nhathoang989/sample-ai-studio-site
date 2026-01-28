
import React from 'react';

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = React.useState(0);
  const messages = [
    "Đang kích hoạt hệ thống phân tích chuyên sâu (Deep Reasoning)...",
    "Đang xoay chuyển bánh xe số phận và hội tụ các tinh tú...",
    "Đang giải mã Thiên Can Địa Chi bằng thuật toán tối ưu...",
    "Đang luận giải Ngũ Hành tương sinh đa tầng...",
    "Đang khai mở cuốn sổ sinh mệnh với trí tuệ nhân tạo..."
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 bg-oriental z-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-yellow-600/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-yellow-600 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-2 border-yellow-900/40 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 bg-yellow-600 transform rotate-45 shadow-[0_0_20px_rgba(202,138,4,0.6)]"></div>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-600 text-[8px] text-white px-2 py-0.5 rounded font-bold tracking-tighter">
          DEEP LOGIC
        </div>
      </div>
      <h2 className="text-2xl font-heading gold-text animate-pulse duration-1000 mb-2 uppercase tracking-widest">
        Deep Reasoning Analysis
      </h2>
      <p className="text-gray-400 tracking-widest italic text-sm max-w-md">{messages[messageIndex]}</p>
    </div>
  );
};

export default LoadingScreen;
