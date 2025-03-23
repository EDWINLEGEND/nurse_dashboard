import React from 'react';
import { Tab } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  // Navigation tabs with corresponding icons
  const tabs: Tab[] = [
    { id: 'dashboard', name: 'Dashboard', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { id: 'patient-records', name: 'Patient Records', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'medications', name: 'Medications', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'vitals', name: 'Vitals', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'doctor-chat', name: 'Doctor Chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'schedule', name: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'triage', name: 'Triage', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

  return (
    <div className="py-3 sm:py-4 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white p-1.5 sm:p-2 shadow-sm rounded-lg">
          <nav className="flex flex-wrap w-full">
            {tabs.map((tab: Tab) => (
              <button 
                key={tab.id}
                className={`flex items-center justify-center rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out m-0.5 ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <svg className={`h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 ${activeTab === tab.id ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
} 