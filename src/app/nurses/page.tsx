"use client";

import React, { useState } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import DashboardTab from './components/tabs/DashboardTab';
import PatientRecordsTab from './components/tabs/PatientRecordsTab';
import MedicationsTab from './components/tabs/MedicationsTab';
import VitalsTab from './components/tabs/VitalsTab';
import DoctorChatTab from './components/tabs/DoctorChatTab';
import ScheduleTab from './components/tabs/ScheduleTab';
import TriageTab from './components/tabs/TriageTab';
import TaskModal from './components/modals/TaskModal';
import MedicationModal from './components/modals/MedicationModal';
import { defaultTask, defaultMedication } from './components/data/mockData';

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  
  // Form states
  const [newTask, setNewTask] = useState(defaultTask);
  const [newMedication, setNewMedication] = useState(defaultMedication);
  
  // Handle task form change
  const handleTaskFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle task form submit
  const handleTaskFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New task:', newTask);
    setIsTaskModalOpen(false);
    setNewTask(defaultTask);
  };
  
  // Handle medication form changes
  const handleMedicationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle medication form submission
  const handleMedicationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New medication:', newMedication);
    setIsMedicationModalOpen(false);
    setNewMedication(defaultMedication);
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab setActiveTab={setActiveTab} />;
      case 'patient-records':
        return <PatientRecordsTab />;
      case 'medications':
        return <MedicationsTab />;
      case 'vitals':
        return <VitalsTab />;
      case 'doctor-chat':
        return <DoctorChatTab />;
      case 'schedule':
        return <ScheduleTab />;
      case 'triage':
        return <TriageTab />;
      default:
        return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Banner */}
      <div className="bg-blue-700 text-white py-4 sm:py-6 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Nurse Dashboard</h1>
              <p className="text-blue-100 mt-1">Welcome back, Nurse Jane</p>
            </div>
            <div className="mt-3 sm:mt-0 flex items-center text-sm">
              <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded-full mr-2 flex items-center">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-1"></span>
                Online
              </span>
              <span>Today: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {renderTabContent()}
      </main>
      
      {/* Notification popup */}
      <div className="fixed top-16 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg z-20 flex items-center">
        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-sm">Doctor suggestion received</p>
      </div>

      {/* Modals */}
      <TaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={newTask}
        onChange={handleTaskFormChange}
        onSubmit={handleTaskFormSubmit}
      />

      <MedicationModal 
        isOpen={isMedicationModalOpen}
        onClose={() => setIsMedicationModalOpen(false)}
        medication={newMedication}
        onChange={handleMedicationFormChange}
        onSubmit={handleMedicationFormSubmit}
      />
    </div>
  );
}