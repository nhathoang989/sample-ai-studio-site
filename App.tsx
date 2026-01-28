
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ArticleCard from './components/ArticleCard';
import AIAssistant from './components/AIAssistant';
import GitHubStats from './components/GitHubStats';
import { Post, NavigationTab } from './types';
import { BLOG_POSTS } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.HOME);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setActiveTab(NavigationTab.POST);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (selectedPost && activeTab === NavigationTab.POST) {
      setSummary(null);
      const getSummary = async () => {
        setLoadingSummary(true);
        const result = await geminiService.summarizePost(selectedPost.content);
        setSummary(result);
        setLoadingSummary(false);
      };
      getSummary();
    }
  }, [selectedPost, activeTab]);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === NavigationTab.HOME && (
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="relative bg-slate-900 py-24 text-white overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                  Xây dựng hệ thống hiện đại với <span className="text-indigo-400">Mixcore CMS</span>
                </h1>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Mixcore CMS là nền tảng quản trị nội dung mã nguồn mở, hiệu năng cao, xây dựng trên .NET Core. Linh hoạt, bảo mật và cực kỳ dễ mở rộng.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab(NavigationTab.BLOG)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-600/30"
                  >
                    Khám phá bài viết
                  </button>
                  <a 
                    href="https://github.com/mixcore/mix.core" target="_blank"
                    className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-full font-bold transition-all border border-slate-700"
                  >
                    GitHub Project
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* GitHub Stats Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
            <GitHubStats />
          </section>

          {/* Featured Posts */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Bài viết nổi bật</h2>
                <p className="text-slate-500 mt-2">Cập nhật tin tức và hướng dẫn mới nhất về Mixcore.</p>
              </div>
              <button 
                onClick={() => setActiveTab(NavigationTab.BLOG)}
                className="text-indigo-600 font-bold flex items-center hover:underline"
              >
                Xem tất cả <i className="fas fa-chevron-right ml-2 text-sm"></i>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map(post => (
                <ArticleCard key={post.id} post={post} onClick={handlePostClick} />
              ))}
            </div>
          </section>

          {/* AI Assistant Promo */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <AIAssistant />
          </section>
        </div>
      )}

      {activeTab === NavigationTab.BLOG && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Tất cả bài viết</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Chia sẻ kiến thức về lập trình, thiết kế hệ thống và marketing sử dụng Mixcore CMS.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <ArticleCard key={post.id} post={post} onClick={handlePostClick} />
            ))}
          </div>
        </section>
      )}

      {activeTab === NavigationTab.ABOUT && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Về Mixcore CMS</h2>
          <div className="prose prose-indigo max-w-none text-slate-600 space-y-6 leading-relaxed">
            <p className="text-lg">
              Mixcore CMS được tạo ra với sứ mệnh mang đến một giải pháp CMS mạnh mẽ cho cộng đồng .NET Core. Khác với các hệ thống cồng kềnh truyền thống, Mixcore tập trung vào hiệu năng, sự linh hoạt của nhà phát triển và khả năng mở rộng không giới hạn.
            </p>
            
            <div className="my-10">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Tình trạng dự án thực tế</h4>
              <GitHubStats />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
               <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-indigo-600 mb-2">Đa nền tảng</h4>
                  <p className="text-sm">Chạy mượt mà trên Windows, Linux và macOS nhờ sức mạnh của ASP.NET Core.</p>
               </div>
               <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-indigo-600 mb-2">Bảo mật vượt trội</h4>
                  <p className="text-sm">Hệ thống phân quyền chi tiết, mã hóa dữ liệu và tích hợp các tiêu chuẩn bảo mật hiện đại.</p>
               </div>
            </div>
            <p>
              Mixcore không chỉ là một CMS, nó còn là một framework giúp bạn xây dựng bất kỳ loại ứng dụng web nào: từ blog cá nhân, website doanh nghiệp cho đến các sàn thương mại điện tử phức tạp.
            </p>
          </div>
        </section>
      )}

      {activeTab === NavigationTab.POST && selectedPost && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <button 
            onClick={() => setActiveTab(NavigationTab.BLOG)}
            className="text-slate-500 hover:text-indigo-600 mb-8 flex items-center transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i> Quay lại danh sách
          </button>
          
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            className="w-full h-[400px] object-cover rounded-3xl mb-8 shadow-lg"
          />
          
          <div className="mb-10">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4 block">
              {selectedPost.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex items-center text-slate-500 space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                <span className="font-medium text-slate-900">{selectedPost.author}</span>
              </div>
              <span className="text-slate-300">|</span>
              <span>{selectedPost.date}</span>
              <span className="text-slate-300">|</span>
              <span>{selectedPost.readTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3 prose prose-indigo max-w-none text-slate-700">
               {selectedPost.content.split('\n').map((para, i) => (
                 <p key={i} className="mb-4 leading-relaxed">{para}</p>
               ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                  <i className="fas fa-magic text-indigo-500 mr-2"></i> Tóm tắt bởi AI
                </h4>
                {loadingSummary ? (
                  <div className="flex flex-col items-center py-4 space-y-2">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-slate-500">Đang tóm tắt...</span>
                  </div>
                ) : (
                  <div className="text-sm text-slate-600 leading-relaxed">
                    {summary}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default App;
