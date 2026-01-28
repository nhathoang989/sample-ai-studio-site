
import React from 'react';
import { Post } from '../types';

interface ArticleCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, onClick }) => {
  return (
    <article 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group cursor-pointer"
      onClick={() => onClick(post)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-xs text-slate-500 mb-3 space-x-2">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 border-dashed">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-200 rounded-full mr-2"></div>
            <span className="text-xs font-medium text-slate-700">{post.author}</span>
          </div>
          <span className="text-indigo-600 text-xs font-bold flex items-center group-hover:translate-x-1 transition-transform">
            Xem thêm <i className="fas fa-arrow-right ml-1"></i>
          </span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
