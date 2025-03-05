import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'TodoApp - Modern Task Management',
  description: 'A modern, beautiful todo application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col min-h-screen backdrop-blur-sm">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
