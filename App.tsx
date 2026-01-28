
import React from 'react';
import Header from './components/Header';
import FormInput from './components/FormInput';
import HoroscopeDisplay from './components/HoroscopeDisplay';
import LoadingScreen from './components/LoadingScreen';
import { UserInput, HoroscopeData, LoadingStatus } from './types';
import { generateHoroscope } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = React.useState<LoadingStatus>(LoadingStatus.IDLE);
  const [horoscopeData, setHoroscopeData] = React.useState<HoroscopeData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFormSubmit = async (data: UserInput) => {
    setStatus(LoadingStatus.LOADING);
    setError(null);
    try {
      const result = await generateHoroscope(data);
      setHoroscopeData(result);
      setStatus(LoadingStatus.SUCCESS);
      // Scroll to result after a small delay to allow for rendering
      setTimeout(() => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Đã có lỗi xảy ra khi kết nối với tinh tú. Vui lòng thử lại sau.');
      setStatus(LoadingStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(LoadingStatus.IDLE);
    setHoroscopeData(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 mt-8">
        {status === LoadingStatus.LOADING && <LoadingScreen />}

        <div className={`${horoscopeData ? 'hidden md:block opacity-50 pointer-events-none' : ''}`}>
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <p className="text-slate-400 text-lg">
              Nhập thông tin ngày giờ sinh chính xác để trí tuệ nhân tạo giải đoán chi tiết lá số tử vi của bạn.
            </p>
          </div>
          <FormInput onSubmit={handleFormSubmit} isLoading={status === LoadingStatus.LOADING} />
        </div>

        {status === LoadingStatus.ERROR && (
          <div className="max-w-xl mx-auto mt-8 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-center">
            {error}
            <button 
              onClick={() => setStatus(LoadingStatus.IDLE)} 
              className="block mx-auto mt-4 text-sm underline opacity-80"
            >
              Thử Lại
            </button>
          </div>
        )}

        {horoscopeData && status === LoadingStatus.SUCCESS && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mt-12">
               <button 
                 onClick={handleReset}
                 className="flex items-center space-x-2 bg-slate-800 border border-slate-700 hover:border-yellow-600 px-6 py-2 rounded-full text-slate-300 transition-all"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
                 <span>XEM CHO NGƯỜI KHÁC</span>
               </button>
            </div>
            <HoroscopeDisplay data={horoscopeData} />
          </div>
        )}
      </main>

      <footer className="text-center mt-20 text-slate-600 text-xs tracking-[0.2em] pb-8 uppercase">
        &copy; {new Date().getFullYear()} TỬ VI ĐẠI VIỆT - PHÁT TRIỂN BỞI MIXCORE TEAM
      </footer>
    </div>
  );
};

export default App;
