
import React, { useEffect, useState, useCallback } from 'react';
import { fetchMixcoreStats, GithubRepoData } from '../services/githubService';

const GitHubStats: React.FC = () => {
  const [stats, setStats] = useState<GithubRepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMixcoreStats();
      if (data) {
        setStats(data);
      } else {
        setError("Không thể lấy dữ liệu từ GitHub.");
      }
    } catch (err) {
      setError("Lỗi kết nối API GitHub.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (loading) return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-center items-center space-x-4 animate-pulse">
      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-slate-500 font-medium text-sm">Đang đồng bộ dữ liệu Mixcore từ GitHub...</span>
    </div>
  );

  if (error) return (
    <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-exclamation-triangle text-red-500"></i>
        </div>
        <div className="text-left">
          <p className="text-slate-900 font-bold text-sm">Lỗi kết nối GitHub</p>
          <p className="text-slate-500 text-xs">{error} (Có thể do giới hạn API)</p>
        </div>
      </div>
      <button 
        onClick={loadStats}
        className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-indigo-600 transition-colors flex items-center"
      >
        <i className="fas fa-sync-alt mr-2"></i> Thử lại
      </button>
    </div>
  );

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      <StatItem icon="fa-star" label="Stars" value={stats.stars.toLocaleString()} color="text-yellow-500" />
      <StatItem icon="fa-code-branch" label="Forks" value={stats.forks.toLocaleString()} color="text-indigo-500" />
      <StatItem icon="fa-exclamation-circle" label="Issues" value={stats.openIssues.toLocaleString()} color="text-red-500" />
      <StatItem icon="fa-history" label="Cập nhật" value={stats.lastUpdate} color="text-green-500" />
    </div>
  );
};

const StatItem = ({ icon, label, value, color }: { icon: string, label: string, value: string, color: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
    <div className={`text-2xl mb-2 ${color} group-hover:scale-110 transition-transform`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{label}</div>
  </div>
);

export default GitHubStats;
