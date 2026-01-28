
import React from 'react';
import { HoroscopeData } from '../types';

interface HoroscopeDisplayProps {
  data: HoroscopeData;
}

const HoroscopeDisplay: React.FC<HoroscopeDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = React.useState('general');

  const tabs = [
    { id: 'general', label: 'Tổng Quan' },
    { id: 'palaces', label: '12 Cung Số' },
    { id: 'aspects', label: 'Các Khía Cạnh' },
    { id: 'yearly', label: 'Dự Báo Sắp Tới' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-yellow-900/20 text-center">
                <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Âm Lịch</p>
                <p className="text-xl font-bold text-white">{data.summary.lunarDate}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-yellow-900/20 text-center">
                <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Bản Mệnh</p>
                <p className="text-xl font-bold text-white">{data.summary.destinyElement}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-yellow-900/20 text-center">
                <p className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Cầm Tinh</p>
                <p className="text-xl font-bold text-white">Tuổi {data.summary.zodiacAnimal}</p>
              </div>
            </div>
            <div className="bg-slate-800/30 p-8 rounded-2xl border border-yellow-900/10">
              <h3 className="font-heading text-2xl gold-text mb-4">Nhận Định Chung</h3>
              <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{data.summary.generalComment}</p>
            </div>
          </div>
        );
      case 'palaces':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {data.palaces.map((palace, idx) => (
              <div key={idx} className="bg-slate-800/40 p-6 rounded-xl border border-yellow-900/20 hover:border-yellow-600/40 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading text-xl text-yellow-500 group-hover:text-yellow-400 transition-colors">{palace.name}</h4>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest border border-slate-700 px-2 py-1 rounded">{palace.meaning}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{palace.description}</p>
              </div>
            ))}
          </div>
        );
      case 'aspects':
        const aspects = [
          { title: 'Sự Nghiệp & Công Danh', content: data.career, icon: '💼' },
          { title: 'Tài Lộc & Điền Trạch', content: data.wealth, icon: '💰' },
          { title: 'Tình Duyên & Gia Đạo', content: data.love, icon: '❤️' },
          { title: 'Sức Khỏe & Tai Ương', content: data.health, icon: '🌿' },
        ];
        return (
          <div className="space-y-6 animate-fadeIn">
            {aspects.map((aspect, idx) => (
              <div key={idx} className="bg-slate-800/40 p-8 rounded-2xl border border-yellow-900/20">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{aspect.icon}</span>
                  <h3 className="font-heading text-2xl gold-text">{aspect.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{aspect.content}</p>
              </div>
            ))}
          </div>
        );
      case 'yearly':
        return (
          <div className="bg-slate-800/30 p-8 rounded-2xl border border-yellow-900/30 animate-fadeIn relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="gold" strokeWidth="0.5" />
                   <path d="M50 5 L50 95 M5 50 L95 50" stroke="gold" strokeWidth="0.5" />
                </svg>
             </div>
            <h3 className="font-heading text-2xl gold-text mb-6">Dự Báo Vận Hạn Sắp Tới</h3>
            <p className="text-slate-200 leading-relaxed text-xl whitespace-pre-wrap font-light italic">
               "{data.currentYearForecast}"
            </p>
            <div className="mt-8 p-4 bg-yellow-900/20 border-l-4 border-yellow-600 text-yellow-500/80 text-sm">
               * Lưu ý: Mọi sự tại nhân, tử vi chỉ mang tính chất tham khảo để định hướng và rèn luyện tâm tính.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-20 px-4">
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-slate-800 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full font-heading text-sm tracking-widest transition-all ${
              activeTab === tab.id
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {renderContent()}
      </div>

      <div className="mt-16 flex justify-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-yellow-600 text-sm uppercase tracking-widest flex items-center space-x-2 hover:text-yellow-400 transition-colors"
        >
          <span>Lên Đầu Trang</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HoroscopeDisplay;
