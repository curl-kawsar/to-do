'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTasks, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        setUser(null);
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-3 group">
              <FaTasks className="text-3xl text-blue-600 group-hover:text-blue-700 transition-colors" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TodoApp
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {loading ? (
              <div className="animate-pulse flex space-x-4 items-center">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="text-2xl text-gray-600" />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 