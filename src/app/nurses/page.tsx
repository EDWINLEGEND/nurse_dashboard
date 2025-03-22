"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white py-3 border-b">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-bold text-black text-xl">Medusa</span>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search for patients, medications, records..." />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">N</div>
              <div>
                <div className="text-sm font-medium">Nurse Jane</div>
                <div className="text-xs text-gray-500">Nurse</div>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Logout</a>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Good morning, Nurse Jane!</h1>
            <p className="text-blue-100">Saturday, March 22, 2025</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="py-4 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white p-1 flex items-center overflow-x-auto shadow-sm rounded-lg">
            <nav className="flex w-full">
              <button 
                className={`flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'dashboard' ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Dashboard</span>
              </button>
              
              <button 
                className={`flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'patient-records' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('patient-records')}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'patient-records' ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Patient Records</span>
              </button>
              
              <button 
                className={`flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'medications' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('medications')}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'medications' ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span>Medications</span>
              </button>
              
              <button 
                className={`flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'vitals' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('vitals')}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'vitals' ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <span>Vitals</span>
              </button>
              
              <button 
                className={`flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'doctor-chat' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('doctor-chat')}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'doctor-chat' ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Doctor Chat</span>
              </button>
              
              <button 
                className={`flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out ${activeTab === 'schedule' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('schedule')}
              >
                <svg className={`h-5 w-5 mr-2 ${activeTab === 'schedule' ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Schedule</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="flex-1 py-6">
        <div className="container mx-auto px-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center">
                  <h3 className="text-lg font-medium text-gray-700">Dashboard Overview</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button 
                        className="bg-white border border-gray-200 rounded-lg p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                        onClick={() => setActiveTab('patient-records')}
                      >
                        <svg className="h-6 w-6 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Patient Records
                      </button>
                      <button 
                        className="bg-white border border-gray-200 rounded-lg p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                        onClick={() => setActiveTab('medications')}
                      >
                        <svg className="h-6 w-6 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        Medications
                      </button>
                      <button 
                        className="bg-white border border-gray-200 rounded-lg p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                        onClick={() => setActiveTab('vitals')}
                      >
                        <svg className="h-6 w-6 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        Vitals
                      </button>
                      <button 
                        className="bg-white border border-gray-200 rounded-lg p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                        onClick={() => setActiveTab('doctor-chat')}
                      >
                        <svg className="h-6 w-6 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Doctor Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patient-records' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Patient Records</h3>
                  <div className="flex space-x-2">
                    <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      <option>All Patients</option>
                      <option>Active Patients</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
                <div className="p-4">
                  <div className="divide-y divide-gray-200">
                    {/* Patient 001 */}
                    <div className="py-4 first:pt-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">P1</div>
                          <div>
                            <h4 className="text-lg font-medium text-gray-800">Patient 001</h4>
                            <span className="inline-flex rounded-full bg-blue-100 text-blue-700 text-xs px-2 py-1">In Progress</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">Last updated: 10:15 AM</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h5>
                            <p className="text-sm text-gray-600">Fever, cough</p>
                            
                            <h5 className="text-sm font-medium text-gray-700 mt-3 mb-2">Observations</h5>
                            <p className="text-sm text-gray-600">Elevated temperature</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Vitals</h5>
                            <div className="flex space-x-4">
                              <div className="text-sm">
                                <span className="text-gray-600">BP: </span>
                                <span className="font-medium">130/85</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">HR: </span>
                                <span className="font-medium">98</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">Temp: </span>
                                <span className="font-medium">38.5°C</span>
                              </div>
                            </div>
                            
                            <h5 className="text-sm font-medium text-gray-700 mt-3 mb-2">Recommendations</h5>
                            <p className="text-sm text-gray-600">Rest, fluids</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Full Record</button>
                      </div>
                    </div>
                    
                    {/* Patient 003 */}
                    <div className="py-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold mr-3">P3</div>
                          <div>
                            <h4 className="text-lg font-medium text-gray-800">Patient 003</h4>
                            <span className="inline-flex rounded-full bg-yellow-100 text-yellow-700 text-xs px-2 py-1">Waiting</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">Last updated: 11:30 AM</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h5>
                            <p className="text-sm text-gray-600">Headache, dizziness</p>
                            
                            <h5 className="text-sm font-medium text-gray-700 mt-3 mb-2">Observations</h5>
                            <p className="text-sm text-gray-600">Mild dehydration</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Vitals</h5>
                            <div className="flex space-x-4">
                              <div className="text-sm">
                                <span className="text-gray-600">BP: </span>
                                <span className="font-medium">120/80</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">HR: </span>
                                <span className="font-medium">82</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">Temp: </span>
                                <span className="font-medium">37.2°C</span>
                              </div>
                            </div>
                            
                            <h5 className="text-sm font-medium text-gray-700 mt-3 mb-2">Recommendations</h5>
                            <p className="text-sm text-gray-600">Hydration, rest</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Full Record</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Medications</h3>
                  <div className="flex space-x-2">
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md">Add Medication</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Patient 001</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Paracetamol</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500mg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Every 6 hours</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              In Progress
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900">Mark Complete</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Patient 001</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Amoxicillin</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">250mg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Every 8 hours</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900">Administer</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Patient 003</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ibuprofen</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">200mg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Every 4 hours as needed</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-400">Completed at 9:45 AM</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Patient Vitals</h3>
                  <div className="flex space-x-2">
                    <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      <option>Patient 001</option>
                      <option>Patient 003</option>
                      <option>Patient 005</option>
                    </select>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-gray-700">Current Vitals</h4>
                      <span className="text-xs text-gray-500">Last updated: 10:15 AM</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Blood Pressure</h5>
                        <div className="text-xl font-bold text-blue-600">130/85</div>
                        <span className="mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">High</span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Heart Rate</h5>
                        <div className="text-xl font-bold text-blue-600">98 bpm</div>
                        <span className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Elevated</span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Temperature</h5>
                        <div className="text-xl font-bold text-blue-600">38.5°C</div>
                        <span className="mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Fever</span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Oxygen Saturation</h5>
                        <div className="text-xl font-bold text-blue-600">95%</div>
                        <span className="mt-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Normal</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-gray-700">Vitals History</h4>
                      <div>
                        <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Record New Vitals</button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O2</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recorded By</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">10:15 AM</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">130/85</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">98 bpm</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">38.5°C</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">95%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nurse Jane</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">9:00 AM</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">135/90</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">102 bpm</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">38.9°C</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">94%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nurse Mike</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Yesterday, 8:30 PM</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">128/82</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">95 bpm</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">38.2°C</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">96%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nurse Sarah</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'doctor-chat' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Doctor Chat</h3>
                  <div className="flex space-x-2">
                    <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      <option>Dr. Sarah Wilson (Cardiology)</option>
                      <option>Dr. Neha Varma (Cardiology)</option>
                      <option>Dr. Aakash Menon (Endocrinology)</option>
                    </select>
                  </div>
                </div>
                <div className="p-0 flex flex-col h-[600px]">
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {/* Doctor Message */}
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-2">
                          SW
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 max-w-[75%]">
                          <div className="text-sm text-gray-800">
                            Patient 001 needs to be monitored for elevated blood pressure. Please check every hour and administer prescribed medication if BP remains above 130/85.
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            9:30 AM - Dr. Sarah Wilson
                          </div>
                        </div>
                      </div>
                      
                      {/* Nurse Message */}
                      <div className="flex items-start justify-end">
                        <div className="bg-blue-50 rounded-lg p-3 max-w-[75%]">
                          <div className="text-sm text-gray-800">
                            I've administered the paracetamol as prescribed. The patient's temperature has dropped slightly to 38.5°C. Will continue to monitor.
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            10:15 AM - Nurse Jane
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold ml-2">
                          NJ
                        </div>
                      </div>
                      
                      {/* Doctor Message */}
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-2">
                          SW
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 max-w-[75%]">
                          <div className="text-sm text-gray-800">
                            Thank you. If temperature doesn't normalize within the next hour, we may need to consider additional measures. Please ensure patient stays well hydrated.
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            10:22 AM - Dr. Sarah Wilson
                          </div>
                        </div>
                      </div>
                      
                      {/* System Message */}
                      <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-full px-3 py-1">
                          <span className="text-xs text-gray-500">New patient vitals recorded at 10:15 AM</span>
                        </div>
                      </div>
                      
                      {/* Doctor Message with Suggestion */}
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-2">
                          SW
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 max-w-[75%]">
                          <div className="text-sm text-gray-800">
                            I've reviewed the latest vitals. Please administer 500mg of acetaminophen and draw blood for additional testing.
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mt-2">
                            <div className="text-xs font-medium text-yellow-700">Suggested Action</div>
                            <div className="text-sm text-gray-800">Administer acetaminophen 500mg</div>
                            <button className="mt-1 text-xs bg-blue-600 text-white px-2 py-1 rounded">Mark as Done</button>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Just now - Dr. Sarah Wilson
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex space-x-2">
                      <input type="text" className="flex-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2" placeholder="Type your message..." />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">Schedule</h3>
                  <div className="flex space-x-2">
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md">+ Add Task</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-700 mb-4">Today's Schedule</h4>
                    <div className="space-y-4">
                      {/* Current Task */}
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-800">Patient 001 - Medication</h5>
                            <p className="text-xs text-gray-600 mt-1">Administer paracetamol 500mg</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-blue-600 font-medium">In Progress</span>
                            <span className="text-xs text-gray-500 mt-1">10:15 AM - 10:30 AM</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Upcoming Task */}
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-800">Patient 001 - Vital Check</h5>
                            <p className="text-xs text-gray-600 mt-1">Monitor temperature and blood pressure</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-600 font-medium">Upcoming</span>
                            <span className="text-xs text-gray-500 mt-1">11:00 AM - 11:15 AM</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Upcoming Task */}
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-800">Patient 003 - Initial Assessment</h5>
                            <p className="text-xs text-gray-600 mt-1">Complete initial assessment and vital check</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-600 font-medium">Scheduled</span>
                            <span className="text-xs text-gray-500 mt-1">11:30 AM - 12:00 PM</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Completed Task */}
                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg opacity-75">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-800 line-through">Patient 001 - Morning Check</h5>
                            <p className="text-xs text-gray-600 mt-1">Initial vital signs and medication</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-green-600 font-medium">Completed</span>
                            <span className="text-xs text-gray-500 mt-1">9:00 AM - 9:30 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-4">Upcoming Appointments</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Patient 001</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Dr. Sarah Wilson</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Today, 2:00 PM</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Follow-up</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Confirmed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Patient 005</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Dr. Aakash Menon</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Today, 2:00 PM</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Initial Consultation</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Patient Prep Needed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Patient 003</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Dr. Neha Varma</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Tomorrow, 10:00 AM</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Test Results</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Scheduled
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Notification popup */}
      <div className="fixed top-16 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg z-20 flex items-center">
        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm">Doctor suggestion received</p>
      </div>
    </div>
  );
} 