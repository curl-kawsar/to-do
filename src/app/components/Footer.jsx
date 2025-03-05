import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TodoApp
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TodoApp. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="mailto:contact@todoapp.com"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 