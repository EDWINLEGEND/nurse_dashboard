import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="ml-2 text-xl sm:text-2xl font-bold text-gray-800">Medusa Health</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden sm:block text-blue-600 hover:text-blue-800 font-medium text-sm">Log In</Link>
            <Link href="/contact" className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700">
              Contact Us
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-12 sm:mb-20">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Modern Healthcare Management
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
              Streamlined solutions for hospitals and healthcare providers. Improve patient care with our integrated dashboard system.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/nurses" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 text-center">
                Nurse Dashboard
              </Link>
              <Link href="/admin" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-50 text-center">
                Admin Dashboard
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <div className="absolute inset-0 bg-blue-100 rounded-xl transform rotate-3"></div>
              <div className="relative rounded-xl shadow-lg z-10 bg-white p-4 flex items-center justify-center h-full">
                <Image
                  src="/next.svg"
                  alt="Dashboard Preview"
                  width={300}
                  height={225}
                  className="dark:invert max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Patient Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">Efficiently track and manage patient information, medical records, and care plans.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Medication Tracking</h3>
              <p className="text-gray-600 text-sm sm:text-base">Monitor medication schedules, dosages, and administration with built-in safety checks.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Doctor Communication</h3>
              <p className="text-gray-600 text-sm sm:text-base">Seamless and secure messaging between healthcare providers for better coordination.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-4">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Scheduling</h3>
              <p className="text-gray-600 text-sm sm:text-base">Organize nurse shifts, patient appointments, and tasks with intuitive calendar tools.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Triage Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">Efficiently prioritize patient care based on severity with our triage system.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Security & Compliance</h3>
              <p className="text-gray-600 text-sm sm:text-base">Built with HIPAA compliance and data security as top priorities to protect information.</p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-blue-50 rounded-xl p-6 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to transform your healthcare management?</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who are already using our platform to improve patient care and streamline operations.
          </p>
          <Link href="/demo" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700">
            Request a Demo
          </Link>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 sm:py-12 mt-12 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Medusa Health</h3>
              <p className="text-gray-400 text-sm">
                Advanced healthcare management solutions designed for modern hospitals and clinics.
              </p>
            </div>
            
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/nurses" className="text-gray-400 hover:text-white">Nurse Dashboard</Link></li>
                <li><Link href="/admin" className="text-gray-400 hover:text-white">Admin Portal</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Patient Management</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">HIPAA Compliance</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm">© 2024 Medusa Health. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
