
import React from 'react';
import { NavigationTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => onTabChange(NavigationTab.HOME)}>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 shadow-md">
                M
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Mixcore <span className="text-indigo-600">Blog</span></span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {[
                { label: 'Trang chủ', id: NavigationTab.HOME },
                { label: 'Bài viết', id: NavigationTab.BLOG },
                { label: 'Giới thiệu', id: NavigationTab.ABOUT },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === item.id ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
               <a href="https://github.com/mixcore/mix.core" target="_blank" className="text-slate-500 hover:text-slate-900 transition-colors">
                  <i className="fab fa-github text-2xl"></i>
               </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center text-white font-bold text-xl mb-4">
                Mixcore CMS
              </div>
              <p className="max-w-xs mb-4">
                Hệ quản trị nội dung .NET Core mã nguồn mở hỗ trợ chuyển đổi số cho doanh nghiệp.
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Live on GitHub Pages
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tài nguyên</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://docs.mixcore.org" className="hover:text-white transition-colors">Tài liệu</a></li>
                <li><a href="https://github.com/mixcore/mix.core" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://mixcore.org" className="hover:text-white transition-colors">Cộng đồng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Theo dõi</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            &copy; {new Date().getFullYear()} Mixcore CMS Community. Built with Gemini AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
