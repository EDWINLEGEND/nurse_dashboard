"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Define tab type
interface Tab {
  id: string;
  name: string;
  icon: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Define admin tabs
  const tabs: Tab[] = [
    { id: 'dashboard', name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'users', name: 'User Management', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'system', name: 'System Monitoring', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'content', name: 'Content Management', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'settings', name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'reports', name: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'security', name: 'Security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        {/* Top navigation bar */}
        <div className="px-4 sm:px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center">
            <div className="text-xl font-bold flex items-center">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              Medusa
            </div>
          </div>
          
          {/* Search bar */}
          <div className="hidden md:block flex-1 mx-4 sm:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-white bg-opacity-25 text-white placeholder-gray-200 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm" 
                placeholder="Search for users, settings, reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Mobile search button */}
          <button className="md:hidden p-1 rounded-full text-white hover:bg-blue-500 focus:outline-none">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Right side navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-1 rounded-full text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs">2</span>
              <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-medium">A</div>
              </button>
              <span className="ml-2 hidden md:block">Admin</span>
            </div>
            
            <button className="p-1 rounded-full text-white hover:bg-blue-500 focus:outline-none">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <button className="hidden md:block p-1 rounded-full text-white hover:bg-blue-500 focus:outline-none">
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Banner */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-blue-100">Welcome back, Admin. Manage your hospital system here.</p>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-3 sm:px-6 py-2 flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium mr-1 sm:mr-2 mb-2 rounded-md ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span className="truncate">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <h2 className="text-lg font-medium text-gray-700 mb-3 sm:mb-4">Dashboard Overview</h2>
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                  <h3 className="text-blue-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Total Users</h3>
                  <div className="flex items-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-800">145</div>
                    <div className="ml-2 text-xs text-green-600 flex items-center">
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>12% this month</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
                  <h3 className="text-yellow-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">System Health</h3>
                  <div className="flex items-center">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-800">98%</div>
                    <div className="ml-2 text-xs text-yellow-600">Uptime</div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
                  <h3 className="text-green-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Active Nurses</h3>
                  <div className="flex items-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-800">42</div>
                    <div className="ml-2 text-xs text-green-600 flex items-center">
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>3 new today</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <h3 className="text-sm sm:text-md font-medium text-gray-700 mb-2 sm:mb-3">Recent Activity</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-3 sm:px-4 py-2 sm:py-3 bg-white">
                    <div className="flex items-start sm:items-center justify-between">
                      <div className="flex items-start sm:items-center">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0">
                          <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">New user registered</p>
                          <p className="text-xs text-gray-500">Dr. Emily Chen joined the system</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 sm:mt-0 ml-2 sm:ml-0">10 min ago</div>
                    </div>
                  </li>
                  <li className="px-3 sm:px-4 py-2 sm:py-3 bg-white">
                    <div className="flex items-start sm:items-center justify-between">
                      <div className="flex items-start sm:items-center">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 flex-shrink-0">
                          <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">System Alert</p>
                          <p className="text-xs text-gray-500">Database backup completed successfully</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 sm:mt-0 ml-2 sm:ml-0">1 hour ago</div>
                    </div>
                  </li>
                  <li className="px-3 sm:px-4 py-2 sm:py-3 bg-white">
                    <div className="flex items-start sm:items-center justify-between">
                      <div className="flex items-start sm:items-center">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 flex-shrink-0">
                          <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">Content Updated</p>
                          <p className="text-xs text-gray-500">Nurse protocol guidelines updated</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 sm:mt-0 ml-2 sm:ml-0">3 hours ago</div>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Quick Actions */}
              <h3 className="text-sm sm:text-md font-medium text-gray-700 mt-4 sm:mt-6 mb-2 sm:mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                <button className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-1">
                    <svg className="h-3 w-3 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Add User</span>
                </button>
                
                <button className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-1">
                    <svg className="h-3 w-3 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">New Report</span>
                </button>
                
                <button className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mb-1">
                    <svg className="h-3 w-3 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">System Config</span>
                </button>
                
                <button className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex flex-col items-center">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-1">
                    <svg className="h-3 w-3 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Alerts</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-2 sm:mb-0">User Management</h2>
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New User
                </button>
              </div>
              
              {/* Filters and Search */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search users..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All Roles</option>
                      <option value="admin">Administrator</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="receptionist">Receptionist</option>
                    </select>
                    <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Users Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* User 1 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">JD</div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">John Doe</div>
                            <div className="text-xs text-gray-500">Joined: May 26, 2023</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        john.doe@example.com
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Administrator
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Disable</button>
                      </td>
                    </tr>
                    {/* User 2 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">JS</div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Jane Smith</div>
                            <div className="text-xs text-gray-500">Joined: April 12, 2023</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        jane.smith@example.com
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Doctor
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Disable</button>
                      </td>
                    </tr>
                    {/* User 3 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">RJ</div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Robert Johnson</div>
                            <div className="text-xs text-gray-500">Joined: June 3, 2023</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        robert.j@example.com
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Nurse
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactive
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-green-600 hover:text-green-900">Enable</button>
                      </td>
                    </tr>
                    {/* User 4 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-medium">EC</div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Emily Chen</div>
                            <div className="text-xs text-gray-500">Joined: Today</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        emily.chen@example.com
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Doctor
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-green-600 hover:text-green-900">Activate</button>
                      </td>
                    </tr>
                    {/* User 5 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-medium">SW</div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Sarah Wilson</div>
                            <div className="text-xs text-gray-500">Joined: July 15, 2023</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        sarah.w@example.com
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Receptionist
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Disable</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs sm:text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">42</span> users
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-blue-50 text-blue-700 border-blue-300">
                    1
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* System Monitoring Tab */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-2 sm:mb-0">System Monitoring</h2>
                <div className="flex items-center space-x-2">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    All Systems Operational
                  </span>
                  <button className="bg-blue-600 text-white hover:bg-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium">
                    Refresh
                  </button>
                </div>
              </div>

              {/* System Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg className="h-4 w-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                      Server Status
                    </h3>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">CPU Load</span>
                      <span className="text-xs font-medium text-gray-700">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2 mt-3">
                      <span className="text-xs text-gray-500">Memory Usage</span>
                      <span className="text-xs font-medium text-gray-700">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2 mt-3">
                      <span className="text-xs text-gray-500">Disk Space</span>
                      <span className="text-xs font-medium text-gray-700">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Uptime
                    </h3>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-1">99.98%</div>
                      <div className="text-xs text-gray-500">Last 30 days</div>
                      
                      <div className="mt-3 grid grid-cols-7 gap-1">
                        {Array(28).fill(0).map((_, i) => (
                          <div key={i} className={`h-1.5 rounded-sm ${i === 15 ? 'bg-red-400' : 'bg-green-400'}`}></div>
                        ))}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-600">
                        <div className="flex items-center justify-center">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-sm mr-1"></span>
                          <span>1 outage (May 15, 2024)</span>
                        </div>
                        <div className="mt-1">Total downtime: 12 minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg className="h-4 w-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      Active Users
                    </h3>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-1">86</div>
                      <div className="text-xs text-gray-500">Current users online</div>
                      
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="p-1 sm:p-2 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-700">42</div>
                          <div className="text-[10px] sm:text-xs text-blue-500">Staff</div>
                        </div>
                        <div className="p-1 sm:p-2 bg-green-50 rounded-lg">
                          <div className="text-sm font-medium text-green-700">28</div>
                          <div className="text-[10px] sm:text-xs text-green-500">Doctors</div>
                        </div>
                        <div className="p-1 sm:p-2 bg-purple-50 rounded-lg">
                          <div className="text-sm font-medium text-purple-700">16</div>
                          <div className="text-[10px] sm:text-xs text-purple-500">Nurses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg className="h-4 w-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                      </svg>
                      System Alerts
                    </h3>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">High Memory Usage</span>
                        <span className="ml-auto text-[10px] text-gray-400">5m ago</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Database Connections</span>
                        <span className="ml-auto text-[10px] text-gray-400">23m ago</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Log Rotation Complete</span>
                        <span className="ml-auto text-[10px] text-gray-400">1h ago</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Backup Successful</span>
                        <span className="ml-auto text-[10px] text-gray-400">3h ago</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        View all alerts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 sm:mb-6">
                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Performance Metrics</h3>
                  <div className="flex space-x-2">
                    <select className="text-xs border-gray-300 rounded-md">
                      <option>Last 24 Hours</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4">
                  {/* Chart Placeholder - in a real application, you would use a chart library */}
                  <div className="bg-gray-50 rounded-lg h-64 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500 font-medium">Performance chart visualization</p>
                        <p className="text-xs text-gray-400">CPU, Memory, and Network usage over time</p>
                      </div>
                    </div>
                    
                    {/* Simulated Chart Lines */}
                    <div className="absolute bottom-8 left-0 right-0">
                      <div className="h-32 w-full flex items-end px-2">
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-3/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-full w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-3/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-2/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-3/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-3/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-full w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-2/3 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-1/2 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                        <div className="h-3/4 w-1 mx-0.5 bg-blue-500 opacity-70"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-blue-700 mb-1">Avg. Response Time</div>
                      <div className="text-sm sm:text-lg font-semibold text-blue-900">237 ms</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-green-700 mb-1">Requests / Second</div>
                      <div className="text-sm sm:text-lg font-semibold text-green-900">156</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-purple-700 mb-1">Successful Logins</div>
                      <div className="text-sm sm:text-lg font-semibold text-purple-900">1,284</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-2 sm:p-3">
                      <div className="text-xs text-yellow-700 mb-1">Error Rate</div>
                      <div className="text-sm sm:text-lg font-semibold text-yellow-900">0.05%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent System Events */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Recent System Events</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    View All
                  </button>
                </div>
                
                <div className="p-0">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                        <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                          System backup completed
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          2 hours ago
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                          Database optimization
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          4 hours ago
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                          Security patch installation
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          6 hours ago
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                          Network connectivity check
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          8 hours ago
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                          Failed login attempt detected
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Alert
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          12 hours ago
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-2 sm:mb-0">Content Management</h2>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Content
                  </button>
                </div>
              </div>
              
              {/* Content Navigation Tabs */}
              <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <nav className="-mb-px flex space-x-4 sm:space-x-6 overflow-x-auto">
                  <button className="py-2 px-1 border-b-2 border-blue-500 font-medium text-xs sm:text-sm text-blue-600">
                    Documents
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Policies
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Patient Education
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Forms
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Media
                  </button>
                </nav>
              </div>
              
              {/* Search and Filter Bar */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search documents..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All Categories</option>
                      <option value="clinical">Clinical</option>
                      <option value="administrative">Administrative</option>
                      <option value="legal">Legal</option>
                      <option value="educational">Educational</option>
                    </select>
                    <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="review">Under Review</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Document List */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4 sm:mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated
                      </th>
                      <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Document 1 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Nurse Protocol Guidelines</div>
                            <div className="text-xs text-gray-500">8 pages · PDF</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Clinical
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        3 hours ago
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                    
                    {/* Document 2 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Patient Consent Form</div>
                            <div className="text-xs text-gray-500">2 pages · DOCX</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Legal
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        2 days ago
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                    
                    {/* Document 3 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Diabetes Management Guide</div>
                            <div className="text-xs text-gray-500">12 pages · PDF</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Educational
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Under Review
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        1 week ago
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                    
                    {/* Document 4 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded bg-gray-100 flex items-center justify-center text-gray-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Infection Control Policy</div>
                            <div className="text-xs text-gray-500">6 pages · PDF</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Clinical
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Draft
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        2 weeks ago
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                    
                    {/* Document 5 */}
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded bg-red-100 flex items-center justify-center text-red-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">Emergency Response Protocol</div>
                            <div className="text-xs text-gray-500">15 pages · PDF</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Emergency
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        1 month ago
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">28</span> documents
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-blue-50 text-blue-700 border-blue-300">
                    1
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
              
              {/* Document Upload Area */}
              <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 sm:p-6 flex flex-col items-center justify-center">
                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3-3m0 0l3 3m-3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-600 font-medium">Drag and drop files here or</p>
                <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-blue-700">
                  Browse Files
                </button>
                <p className="mt-2 text-xs text-gray-500">Supported file types: PDF, DOCX, XLSX, JPG, PNG (max 10MB)</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-700">Settings</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your system preferences and configuration</p>
                </div>
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium">
                  Save Changes
                </button>
              </div>
              
              {/* Settings Navigation */}
              <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <nav className="-mb-px flex flex-wrap gap-3 sm:gap-4">
                  <button className="py-2 px-1 border-b-2 border-blue-500 font-medium text-xs sm:text-sm text-blue-600 whitespace-nowrap">
                    General
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Appearance
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Notifications
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Security
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    API & Integrations
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Advanced
                  </button>
                </nav>
              </div>
              
              {/* General Settings */}
              <div className="space-y-4 sm:space-y-6">
                {/* Hospital Information */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Hospital Information</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div>
                      <label htmlFor="hospital-name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Hospital Name
                      </label>
                      <input
                        type="text"
                        id="hospital-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="Medusa Health Medical Center"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="admin-email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          id="admin-email"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="admin@medusa.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        id="address"
                        rows={2}
                        className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="123 Medical Center Drive, Healthcare City, HC 12345"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Regional Settings */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Regional Settings</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="language" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <select
                          id="language"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="en">English (US)</option>
                          <option value="en-gb">English (UK)</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Time Zone
                        </label>
                        <select
                          id="timezone"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="utc-8">Pacific Time (UTC-8)</option>
                          <option value="utc-7">Mountain Time (UTC-7)</option>
                          <option value="utc-6">Central Time (UTC-6)</option>
                          <option value="utc-5">Eastern Time (UTC-5)</option>
                          <option value="utc">Universal Time (UTC)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="date-format" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Date Format
                        </label>
                        <select
                          id="date-format"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* System Settings */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">System Settings</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Automatic Logout</h4>
                        <p className="text-xs text-gray-500">Automatically log out inactive users</p>
                      </div>
                      <div className="flex items-center">
                        <select
                          className="mr-2 block w-24 border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="15">15 min</option>
                          <option value="30">30 min</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="never">Never</option>
                        </select>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="auto-logout" defaultChecked className="sr-only peer" />
                          <div className="h-4 w-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-3 after:w-3 after:rounded-full after:transition-all"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Maintenance Mode</h4>
                        <p className="text-xs text-gray-500">Temporarily disable access for non-admin users</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="maintenance-mode" className="sr-only peer" />
                        <div className="h-4 w-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-3 after:w-3 after:rounded-full after:transition-all"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Enable User Registration</h4>
                        <p className="text-xs text-gray-500">Allow new users to register for accounts</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="user-registration" defaultChecked className="sr-only peer" />
                        <div className="h-4 w-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-3 after:w-3 after:rounded-full after:transition-all"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Require Email Verification</h4>
                        <p className="text-xs text-gray-500">Verify user email addresses before granting access</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="email-verification" defaultChecked className="sr-only peer" />
                        <div className="h-4 w-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-3 after:w-3 after:rounded-full after:transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backup & Data Settings */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Backup & Data Settings</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Automatic Backups</h4>
                        <p className="text-xs text-gray-500">System automatically backs up all data</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <select
                          className="block w-full sm:w-auto border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                        <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          Backup Now
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Recent Backups</h4>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-gray-700">Full System Backup</span>
                          </div>
                          <span className="text-xs text-gray-500">Today, 03:45 AM</span>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-gray-700">Full System Backup</span>
                          </div>
                          <span className="text-xs text-gray-500">Yesterday, 03:45 AM</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-gray-700">Full System Backup</span>
                          </div>
                          <span className="text-xs text-gray-500">May 23, 2024, 03:45 AM</span>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          View All Backups
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-700 mb-2 sm:mb-0">Reports & Analytics</h2>
                  <p className="text-xs sm:text-sm text-gray-500">View and generate insightful reports for your hospital</p>
                </div>
                <div className="flex space-x-2">
                  <select
                    className="block py-1.5 px-3 border border-gray-300 bg-white rounded-md text-xs sm:text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="last7days">Last 7 days</option>
                    <option value="last30days">Last 30 days</option>
                    <option value="last3months">Last 3 months</option>
                    <option value="last12months">Last 12 months</option>
                    <option value="custom">Custom range</option>
                  </select>
                  <button className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
              
              {/* Report Navigation Tabs */}
              <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <nav className="-mb-px flex flex-wrap gap-3 sm:gap-4">
                  <button className="py-2 px-1 border-b-2 border-blue-500 font-medium text-xs sm:text-sm text-blue-600 whitespace-nowrap">
                    Dashboard
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Patient Analytics
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Staff Performance
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Financial
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent font-medium text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Clinical Outcomes
                  </button>
                </nav>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-blue-50 rounded-lg border border-blue-100 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs sm:text-sm font-medium text-blue-700">Total Patients</h3>
                    <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-xl sm:text-2xl font-bold text-blue-800">1,248</div>
                    <div className="ml-2 text-xs text-blue-600 flex items-center">
                      <svg className="h-3 w-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>8.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg border border-green-100 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs sm:text-sm font-medium text-green-700">Appointments</h3>
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-xl sm:text-2xl font-bold text-green-800">243</div>
                    <div className="ml-2 text-xs text-green-600 flex items-center">
                      <svg className="h-3 w-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>12.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg border border-purple-100 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs sm:text-sm font-medium text-purple-700">Staff Members</h3>
                    <svg className="h-4 w-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-xl sm:text-2xl font-bold text-purple-800">74</div>
                    <div className="ml-2 text-xs text-purple-600 flex items-center">
                      <svg className="h-3 w-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>3.4%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg border border-yellow-100 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs sm:text-sm font-medium text-yellow-700">Average Wait Time</h3>
                    <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-800">18.5m</div>
                    <div className="ml-2 text-xs text-green-600 flex items-center">
                      <svg className="h-3 w-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>5.3%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Patient Trends Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Patient Trends</h3>
                    <select className="text-xs border-gray-300 rounded-md">
                      <option>All Departments</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                      <option>Orthopedics</option>
                    </select>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    {/* Chart Placeholder - in a real application, you would use a chart library */}
                    <div className="bg-gray-50 rounded-lg h-64 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500 font-medium">Patient visits trend visualization</p>
                          <p className="text-xs text-gray-400">Monthly data for the last 12 months</p>
                        </div>
                      </div>
                      
                      {/* Simulated Chart */}
                      <div className="absolute bottom-8 left-0 right-0">
                        <div className="h-32 w-full flex items-end justify-between px-4">
                          <div style={{ height: '40%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '60%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '45%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '55%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '65%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '70%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '85%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '75%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '80%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '70%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '90%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                          <div style={{ height: '75%' }} className="w-4 bg-blue-500 opacity-70 rounded-t"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center">
                        <div className="text-xs text-blue-700 mb-1">New Patients</div>
                        <div className="text-sm sm:text-base font-semibold text-blue-900">124</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center">
                        <div className="text-xs text-blue-700 mb-1">Returning</div>
                        <div className="text-sm sm:text-base font-semibold text-blue-900">876</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center">
                        <div className="text-xs text-blue-700 mb-1">Avg. Visits</div>
                        <div className="text-sm sm:text-base font-semibold text-blue-900">3.2</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Department Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Department Distribution</h3>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    {/* Donut Chart Placeholder */}
                    <div className="bg-gray-50 rounded-lg aspect-square relative overflow-hidden mb-3">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative h-32 w-32">
                          {/* Simulated donut chart */}
                          <div className="absolute inset-0 rounded-full border-8 border-blue-500 opacity-20"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 border-b-blue-500"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 rotate-[115deg]"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500 border-r-purple-500 rotate-[190deg]"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-500 rotate-[300deg]"></div>
                          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
                            367
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">Cardiology</span>
                        </div>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">Orthopedics</span>
                        </div>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">Neurology</span>
                        </div>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">Pediatrics</span>
                        </div>
                        <span className="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Reports & Saved Reports */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Recent Reports */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Recent Reports</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">Monthly Patient Summary</p>
                        <p className="text-xs text-gray-500">Generated 2 days ago</p>
                      </div>
                      <button className="ml-auto text-xs text-blue-600 hover:text-blue-800 font-medium">Download</button>
                    </div>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">Staff Performance Report</p>
                        <p className="text-xs text-gray-500">Generated 1 week ago</p>
                      </div>
                      <button className="ml-auto text-xs text-blue-600 hover:text-blue-800 font-medium">Download</button>
                    </div>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">Quarterly Financial Report</p>
                        <p className="text-xs text-gray-500">Generated 1 month ago</p>
                      </div>
                      <button className="ml-auto text-xs text-blue-600 hover:text-blue-800 font-medium">Download</button>
                    </div>
                  </div>
                </div>
                
                {/* Create New Report */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Create New Report</h3>
                  </div>
                  
                  <div className="p-3 sm:p-4 space-y-3">
                    <div>
                      <label htmlFor="report-type" className="block text-xs font-medium text-gray-700 mb-1">
                        Report Type
                      </label>
                      <select
                        id="report-type"
                        className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select report type</option>
                        <option value="patient">Patient Analytics</option>
                        <option value="staff">Staff Performance</option>
                        <option value="financial">Financial Report</option>
                        <option value="clinical">Clinical Outcomes</option>
                        <option value="custom">Custom Report</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="date-range-start" className="block text-xs font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="date-range-start"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="date-range-end" className="block text-xs font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          id="date-range-end"
                          className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="report-format" className="block text-xs font-medium text-gray-700 mb-1">
                        Format
                      </label>
                      <select
                        id="report-format"
                        className="block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="pdf">PDF Document</option>
                        <option value="excel">Excel Spreadsheet</option>
                        <option value="csv">CSV File</option>
                      </select>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="include-charts"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-2 text-xs">
                          <label htmlFor="include-charts" className="font-medium text-gray-700">Include charts and graphs</label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="save-template"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-2 text-xs">
                          <label htmlFor="save-template" className="font-medium text-gray-700">Save as template</label>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-2 px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-blue-700">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Security Management</h2>
              
              {/* Security Navigation */}
              <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
                <div className="flex space-x-2 sm:space-x-4">
                  <button className="px-2 sm:px-3 py-2 border-b-2 border-blue-500 text-xs sm:text-sm font-medium text-blue-600 whitespace-nowrap">
                    Access Control
                  </button>
                  <button className="px-2 sm:px-3 py-2 border-b-2 border-transparent text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Authentication
                  </button>
                  <button className="px-2 sm:px-3 py-2 border-b-2 border-transparent text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Audit Logs
                  </button>
                  <button className="px-2 sm:px-3 py-2 border-b-2 border-transparent text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                    Data Protection
                  </button>
                </div>
              </div>
              
              {/* Access Control Section */}
              <div className="space-y-4 sm:space-y-6">
                {/* Roles & Permissions */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700 mb-1 sm:mb-0">Roles & Permissions</h3>
                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">Add New Role</button>
                  </div>
                  <div className="p-3 sm:p-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                          <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                          <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Level</th>
                          <th scope="col" className="px-2 sm:px-3 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Administrator</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">5 users</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Full Access</span>
                          </td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-blue-600 hover:text-blue-900 font-medium mr-1 sm:mr-3">Edit</button>
                            <button className="text-blue-600 hover:text-blue-900 font-medium">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Doctor</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">24 users</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Clinical</span>
                          </td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-blue-600 hover:text-blue-900 font-medium mr-1 sm:mr-3">Edit</button>
                            <button className="text-blue-600 hover:text-blue-900 font-medium">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Nurse</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">42 users</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Clinical</span>
                          </td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-blue-600 hover:text-blue-900 font-medium mr-1 sm:mr-3">Edit</button>
                            <button className="text-blue-600 hover:text-blue-900 font-medium">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Receptionist</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">8 users</td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap">
                            <span className="px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Limited</span>
                          </td>
                          <td className="px-2 sm:px-3 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                            <button className="text-blue-600 hover:text-blue-900 font-medium mr-1 sm:mr-3">Edit</button>
                            <button className="text-blue-600 hover:text-blue-900 font-medium">View</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Permission Matrix for Selected Role */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700">Administrator Role Permissions</h3>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                          User Management
                        </div>
                        <div className="p-2 sm:p-4 space-y-1.5 sm:space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">View Users</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Create Users</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Edit Users</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Delete Users</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                          Patient Records
                        </div>
                        <div className="p-2 sm:p-4 space-y-1.5 sm:space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">View Records</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Create Records</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Edit Records</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Delete Records</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                          System Settings
                        </div>
                        <div className="p-2 sm:p-4 space-y-1.5 sm:space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">View Settings</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Edit Settings</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Manage Integrations</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Backup/Restore</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                          Reports
                        </div>
                        <div className="p-2 sm:p-4 space-y-1.5 sm:space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">View Reports</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Generate Reports</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Schedule Reports</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4" defaultChecked />
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">Export Data</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 flex justify-end">
                      <button className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Security Events */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700 mb-1 sm:mb-0">Recent Security Events</h3>
                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">View All Logs</button>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">Failed login attempt for user 'john.smith'</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">30 minutes ago from IP 192.168.1.45</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">User 'emily.chen' updated permissions for role 'Nurse'</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">2 hours ago</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">New user 'sarah.wilson' created with role 'Doctor'</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">1 day ago</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">System detected unusual access pattern from IP 203.45.67.89</div>
                          <div className="text-[10px] sm:text-xs text-gray-500">2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Security Settings */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700">Security Settings</h3>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-700">Password Policy</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500">Define password requirements for all users</p>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                        </div>
                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                            <div className="flex items-center">
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-[10px] sm:text-xs">Minimum 8 characters</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-[10px] sm:text-xs">Require uppercase letters</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-[10px] sm:text-xs">Require numbers</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-[10px] sm:text-xs">Require special characters</span>
                            </div>
                          </div>
                          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-600">
                            Password expires after 90 days
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-700">Two-Factor Authentication</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500">Enhance login security with additional verification</p>
                          </div>
                          <div className="flex items-center">
                            <span className="px-1.5 sm:px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-1 sm:mr-2">Enabled</span>
                            <button className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-800 font-medium">Configure</button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-[10px] sm:text-xs text-gray-600">
                          Two-factor authentication is currently required for all administrative users.
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-700">Session Management</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500">Control user session behavior</p>
                          </div>
                          <button className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                        </div>
                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-[10px] sm:text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] sm:text-xs text-gray-700">Session timeout:</span>
                            <span className="text-[10px] sm:text-xs font-medium">30 minutes</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs text-gray-700">Concurrent sessions:</span>
                            <span className="text-[10px] sm:text-xs font-medium">Allowed (max 3)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authentication Settings */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700">Authentication Settings</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Two-Factor Authentication</h4>
                        <p className="text-xs text-gray-500">Require 2FA for all users</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="two-factor" defaultChecked className="sr-only peer" />
                        <div className="h-4 w-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-3 after:w-3 after:rounded-full after:transition-all"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">Password Requirements</h4>
                        <p className="text-xs text-gray-500">Set minimum requirements for passwords</p>
                      </div>
                      <div className="flex">
                        <button className="bg-blue-600 text-white hover:bg-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium">
                          Configure
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Current Password Policy</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center text-xs text-gray-600">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Minimum length: 10 characters
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Require uppercase letters
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Require numbers
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Require special characters
                        </li>
                        <li className="flex items-center text-xs text-gray-600">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Password expiry: 90 days
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-700">SSO Integration</h4>
                        <p className="text-xs text-gray-500">Enable single sign-on with other systems</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="sso-integration" className="sr-only peer" />
                        <div className="h-4 w-8 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-3 after:w-3 after:rounded-full after:transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit Logs */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700">Security Audit Logs</h3>
                    <div className="flex space-x-2">
                      <select className="text-xs border-gray-300 rounded-md">
                        <option>All Events</option>
                        <option>Login Attempts</option>
                        <option>Data Access</option>
                        <option>System Changes</option>
                      </select>
                      <button className="bg-blue-600 text-white hover:bg-blue-700 px-2 py-1 rounded-md text-xs">
                        Export
                      </button>
                    </div>
                  </div>
                  <div className="p-0">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                          <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            Login
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            admin@medusa.com
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            192.168.1.102
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            Just now
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Success
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            Permission Change
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            admin@medusa.com
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            192.168.1.102
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            2 hours ago
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Success
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            Login
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            john.doe@example.com
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            203.0.113.45
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            5 hours ago
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Failed
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            Patient Record Access
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            dr.smith@example.com
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            192.168.1.105
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            6 hours ago
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Authorized
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            Password Change
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            nurse.johnson@example.com
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            192.168.1.110
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-xs text-gray-700">
                            1 day ago
                          </td>
                          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Success
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs text-gray-600">Showing 5 of 235 events</span>
                    <div className="flex space-x-1">
                      <button className="px-2 py-1 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
                        Previous
                      </button>
                      <button className="px-2 py-1 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                {/* Data Protection */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm sm:text-md font-medium text-gray-700">Data Protection</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium text-blue-800">HIPAA Compliance Status</h4>
                          <p className="text-xs text-blue-700 mt-1">Your system is currently compliant with HIPAA regulations.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-3 py-2 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                          Data Encryption
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Database Encryption</span>
                            <span className="text-xs font-medium text-green-600">Enabled</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">File Storage Encryption</span>
                            <span className="text-xs font-medium text-green-600">Enabled</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Data in Transit (TLS)</span>
                            <span className="text-xs font-medium text-green-600">Enabled</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Encryption Standard</span>
                            <span className="text-xs font-medium text-gray-700">AES-256</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-3 py-2 bg-gray-50 border-b font-medium text-xs sm:text-sm text-gray-700">
                          Data Retention Policy
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Patient Records</span>
                            <span className="text-xs font-medium text-gray-700">7 years</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Audit Logs</span>
                            <span className="text-xs font-medium text-gray-700">2 years</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">System Backups</span>
                            <span className="text-xs font-medium text-gray-700">90 days</span>
                          </div>
                          <div className="flex justify-end mt-1">
                            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                              Edit Policy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-3">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Data Breach Response Plan</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-1.5">
                              <span className="text-xs font-bold">1</span>
                            </div>
                            <span className="text-xs font-medium text-gray-700">Detection & Assessment</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-1.5">
                              <span className="text-xs font-bold">2</span>
                            </div>
                            <span className="text-xs font-medium text-gray-700">Containment & Recovery</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-1.5">
                              <span className="text-xs font-bold">3</span>
                            </div>
                            <span className="text-xs font-medium text-gray-700">Notification & Reporting</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          View Complete Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Notification popup */}
      <div className="fixed top-12 sm:top-16 right-2 sm:right-4 bg-blue-600 text-white p-2 sm:p-3 rounded-lg shadow-lg z-20 flex items-center">
        <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-xs sm:text-sm">System update completed</p>
      </div>
    </div>
  );
}
