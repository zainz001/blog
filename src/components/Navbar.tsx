import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/auth/authSlice';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-indigo-600 text-white p-1 rounded-lg">
                {/* Simple Logo Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              </span>
              <span className="font-bold text-xl tracking-tight text-gray-900">DevBlog</span>
            </Link>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-gray-700">Welcome back,</span>
                  <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{user.name}</span>
                </div>
                <button 
                  onClick={() => dispatch(logout())}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md shadow-indigo-200 transition-all hover:shadow-lg">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;