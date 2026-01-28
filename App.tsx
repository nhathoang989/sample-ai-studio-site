
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
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Hệ thống đang bận xử lý dữ liệu tinh tú. Vui lòng thử lại sau.');
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
    <div className="min-h-screen pb-12 bg-oriental">
      <Header />
      
      <main className="container mx-auto px-4 mt-8">
        {status === LoadingStatus.LOADING && <LoadingScreen />}

        <div className={`${horoscopeData ? 'hidden md:block opacity-50 pointer-events-none' : ''}`}>
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-yellow-600/10 border border-yellow-600/20 px-3 py-1 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Gemini Pro Reasoning Active</span>
            </div>
            <p className="text-slate-400 text-lg">
              Giải mã chi tiết lá số tử vi của bạn bằng trí tuệ nhân tạo chuyên sâu.
            </p>
          </div>
          <FormInput onSubmit={handleFormSubmit} isLoading={status === LoadingStatus.LOADING} />
        </div>

        {status === LoadingStatus.ERROR && (
          <div className="max-w-xl mx-auto mt-8 p-6 bg-red-900/20 border border-red-500/30 text-red-400 rounded-xl text-center animate-fadeIn">
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => setStatus(LoadingStatus.IDLE)} 
              className="px-6 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-xs font-bold tracking-widest hover:bg-red-500/30 transition-all"
            >
              THỬ LẠI
            </button>
          </div>
        )}

        {horoscopeData && status === LoadingStatus.SUCCESS && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mt-12 mb-8">
               <button 
                 onClick={handleReset}
                 className="flex items-center space-x-2 bg-slate-800 border border-slate-700 hover:border-yellow-600 px-8 py-3 rounded-full text-slate-300 transition-all uppercase text-xs tracking-widest font-bold shadow-xl"
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

      <footer className="text-center mt-20 text-slate-600 text-[10px] tracking-[0.3em] pb-12 uppercase font-bold">
        &copy; {new Date().getFullYear()} TỬ VI ĐẠI VIỆT - PHÁT TRIỂN BỞI MIXCORE TEAM
      </footer>
    </div>
  );
};

export default App;
