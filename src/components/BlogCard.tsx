import Link from 'next/link';
import { Post } from '../types';

export default function BlogCard({ post }: { post: Post }) {
  // Safe check for author name. If missing, default to "Unknown" and "U"
  const authorName = post.author_name || "Unknown";
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
             {/* THE FIX: We use the safe variable we created above */}
             {initial}
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {authorName}
          </p>
        </div>

        <h2 className="font-bold text-xl text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
           {/* If you want to show a preview of content, you'd strip HTML tags here, 
               but for now we just show a static message or the raw text if it's plain text */}
           Click below to read the full story...
        </p>

        <Link 
          href={`/posts/${post.id}`} 
          className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Read Article
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}