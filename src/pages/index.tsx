import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { fetchPosts } from '../store/posts/postThunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Post } from '@/types';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { posts, loading } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.auth.user);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    dispatch(fetchPosts());
  }, [mounted, dispatch]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <header className="bg-white border-b border-gray-200 py-12 md:py-20 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Welcome to the <span className="text-indigo-600">Community Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          
          {user && (
            <div className="mt-8">
              <button
                onClick={() => router.push('/posts/create')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Write a Story
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
        
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
             <h3 className="mt-2 text-xl font-medium text-gray-900">No posts found</h3>
             <p className="mt-1 text-gray-500">Get started by creating a new post.</p>
          </div>
        )}
      </main>
    </div>
  );
}