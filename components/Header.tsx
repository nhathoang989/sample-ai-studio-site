
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center border-b border-yellow-900/30">
      <h1 className="text-4xl md:text-6xl font-heading gold-text font-bold mb-2 tracking-widest uppercase">
        Tử Vi Đại Việt
      </h1>
      <p className="text-gray-400 text-sm md:text-base tracking-widest italic font-light">
        Khám Phá Vận Mệnh - Thấu Hiểu Nhân Sinh
      </p>
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        <div className="w-2 h-2 rounded-full border border-yellow-600 transform rotate-45"></div>
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent via-yellow-600 to-transparent"></div>
      </div>
    </header>
  );
};

export default Header;
