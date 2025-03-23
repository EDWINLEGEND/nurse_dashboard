"use client";

import React, { useState } from 'react';
import { Header, Banner, Navigation } from './components/layout';
import DashboardTab from './components/tabs/DashboardTab';
import TriageTab from './components/tabs/TriageTab';
import DoctorChatTab from './components/tabs/DoctorChatTab';
import { PatientRecordsTab, MedicationsTab, VitalsTab, ScheduleTab } from './components/tabs';
import TaskModal from './components/modals/TaskModal';
import MedicationModal from './components/modals/MedicationModal';
import { defaultTask, defaultMedication } from './components/data/mockData';

export default function NurseDashboard() {
  // Tab state
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Banner */}
      <Banner />

      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content container */}
      <div className="flex-1 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Render the active tab */}
          {activeTab === 'dashboard' && <DashboardTab setActiveTab={setActiveTab} />}
          {activeTab === 'triage' && <TriageTab />}
          {activeTab === 'doctor-chat' && <DoctorChatTab />}
          {activeTab === 'patient-records' && <PatientRecordsTab />}
          {activeTab === 'medications' && <MedicationsTab />}
          {activeTab === 'vitals' && <VitalsTab />}
          {activeTab === 'schedule' && <ScheduleTab />}
        </div>
      </div>
      
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