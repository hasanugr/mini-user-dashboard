import "./globals.css";
import Link from "next/link";
import ToasterClient from "@/components/ToasterClient";
import { UsersProvider } from "@/context/UsersProvider";

export const metadata = {
  title: "Mini User Dashboard",
  description: "Modern user management dashboard",
};

/**
 * Root layout component for the application
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element}
 */
export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <ToasterClient />

        {/* Header/Navbar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    User Dashboard
                  </h1>
                  <p className="text-xs text-slate-500">
                    Manage your users efficiently
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UsersProvider initialUsers={[]}>{children}</UsersProvider>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-sm text-slate-500">
          <p>© 2025 User Dashboard. Built with Next.js & Tailwind CSS</p>
        </footer>
      </body>
    </html>
  );
}
