import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { fetchPostById, deletePost } from '../../store/posts/postThunks';
import { clearCurrentPost } from '../../store/posts/postSlice';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const post = useSelector((state: RootState) => state.posts.currentPost);
  const loading = useSelector((state: RootState) => state.posts.loading);

  const [mounted, setMounted] = useState(false);

  // Hydration safety
  useEffect(() => { setMounted(true); }, []);

  // Fetch post by ID
  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(fetchPostById(id));
    }
    return () => { dispatch(clearCurrentPost()); };
  }, [id, dispatch]);

  const deleteHandler = async () => {
    if (!id || typeof id !== 'string') return;
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

    await dispatch(deletePost(id));
    router.push('/');
  };

  // Loading State UI
  if (!mounted || loading || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === post.author_id;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-2"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to posts
        </Link>


        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Header Section */}
          <header className="px-6 py-8 sm:px-10 border-b border-gray-100">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              {/* Author Info */}
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {post.author_name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {post.author_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Published Author
                  </p>
                </div>
              </div>

              {/* Action Buttons (Only for Owner) */}
              {isOwner && (
                <div className="flex items-center gap-3">
                  <Link
                    href={`/posts/edit/${post.id}`}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Edit
                  </Link>
                  <button
                    onClick={deleteHandler}
                    className="flex items-center px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <div className="px-6 py-8 sm:px-10">
            {/* Tailwind Typography Plugin (prose) is essential here.
              It styles standard HTML tags (h1, p, ul, img) automatically.
            */}
            <div
              className="prose prose-indigo prose-lg max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

        </article>
      </main>
    </div>
  );
};

export default PostDetail;