import React from 'react';

interface DashboardTabProps {
  setActiveTab: (tabId: string) => void;
}

export default function DashboardTab({ setActiveTab }: DashboardTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center">
          <h3 className="text-lg font-medium text-gray-700">Dashboard Overview</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Active Patients Card */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-blue-700">Active Patients</h4>
                <span className="text-2xl font-bold text-blue-700">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">In Progress</span>
                <span className="text-blue-600">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600">Waiting</span>
                <span className="text-yellow-600">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-orange-600">Scheduled</span>
                <span className="text-orange-600">1</span>
              </div>
            </div>
            
            {/* Pending Tasks Card */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-yellow-700">Pending Tasks</h4>
                <span className="text-2xl font-bold text-yellow-700">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600">Medications</span>
                <span className="text-yellow-600">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600">Vital Checks</span>
                <span className="text-yellow-600">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600">Other Tasks</span>
                <span className="text-yellow-600">1</span>
              </div>
            </div>
            
            {/* Critical Alerts Card */}
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-red-700">Critical Alerts</h4>
                <span className="text-2xl font-bold text-red-700">1</span>
              </div>
              <div className="p-2 bg-white rounded-md border border-red-200 mb-2">
                <div className="text-sm font-medium text-red-600">Abnormal Vitals</div>
                <div className="text-xs text-gray-600">Patient 001 - High BP</div>
              </div>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                onClick={() => setActiveTab('patient-records')}
              >
                <svg className="h-5 w-5 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-center">Patient Records</span>
              </button>
              <button 
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                onClick={() => setActiveTab('medications')}
              >
                <svg className="h-5 w-5 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span className="text-center">Medications</span>
              </button>
              <button 
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                onClick={() => setActiveTab('vitals')}
              >
                <svg className="h-5 w-5 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <span className="text-center">Vitals</span>
              </button>
              <button 
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                onClick={() => setActiveTab('doctor-chat')}
              >
                <svg className="h-5 w-5 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-center">Doctor Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 