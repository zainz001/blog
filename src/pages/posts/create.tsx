import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/posts/postThunks';
import { AppDispatch } from '../../store';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(createPost({ title, content }));
    setIsSubmitting(false);
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* Header Section */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate tracking-tight">
                Create a new story
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Share your thoughts, ideas, and expertise with the community.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <form onSubmit={submitHandler} className="p-6 sm:p-8 space-y-8">
              
              {/* Title Input */}
              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Article Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-shadow"
                  placeholder="Enter a captivating title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <div className="prose prose-indigo max-w-none">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <ReactQuill 
                      theme="snow"
                      value={content} 
                      onChange={setContent} 
                      placeholder="Start writing your story here..."
                      className="h-64 mb-12 sm:mb-10" 
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}],
                          ['link'],
                          ['clean']
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Publishing...
                    </span>
                  ) : 'Publish Post'}
                </button>
              </div>

            </form>
          </div>
        </div>  
      </div>
    </ProtectedRoute>
  );
};

export default CreatePost;