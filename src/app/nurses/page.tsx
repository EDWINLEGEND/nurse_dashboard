"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useState } from 'react';

// Voice recognition hook
function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onstart = () => {
          setIsListening(true);
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        recognitionInstance.onerror = (event) => {
          setError(event.error);
          setIsListening(false);
        };
        
        recognitionInstance.onresult = (event) => {
          const currentTranscript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          setTranscript(currentTranscript);
        };
        
        setRecognition(recognitionInstance);
      } else {
        setError('Your browser does not support speech recognition');
      }
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript('');
      recognition.start();
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  // Format transcript for clinical use
  const formatTranscript = useCallback((rawTranscript) => {
    if (!rawTranscript) return '';
    
    // Split into sentences
    const sentences = rawTranscript.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    // Group by potential clinical categories
    const formattedText = {
      symptoms: [],
      observations: [],
      vitals: [],
      plans: []
    };
    
    // Simple rule-based categorization
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase().trim();
      
      if (lowerSentence.includes('complain') || 
          lowerSentence.includes('pain') || 
          lowerSentence.includes('report') ||
          lowerSentence.includes('symptom')) {
        formattedText.symptoms.push(sentence.trim());
      } else if (lowerSentence.includes('vital') || 
                lowerSentence.includes('bp') || 
                lowerSentence.includes('temperature') ||
                lowerSentence.includes('pulse') ||
                lowerSentence.includes('heart rate')) {
        formattedText.vitals.push(sentence.trim());
      } else if (lowerSentence.includes('plan') || 
                lowerSentence.includes('recommend') || 
                lowerSentence.includes('advised') ||
                lowerSentence.includes('should')) {
        formattedText.plans.push(sentence.trim());
      } else {
        formattedText.observations.push(sentence.trim());
      }
    });
    
    return formattedText;
  }, []);

  return { 
    isListening, 
    transcript, 
    error, 
    startListening, 
    stopListening,
    formatTranscript 
  };
}

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    patient: 'Patient 001',
    taskType: 'Medication',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '08:15',
  });
  
  // Patient data state
  const [patientData, setPatientData] = useState('');
  const [formattedData, setFormattedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('All Patients');
  const [patientFilter, setPatientFilter] = useState('All Patients');
  
  // Doctor chat state
  const [chatMessage, setChatMessage] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Wilson');
  const [selectedDoctorCategory, setSelectedDoctorCategory] = useState('Cardiology');
  const [mentionedPatient, setMentionedPatient] = useState('');
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [patientsList] = useState(['Patient 001', 'Patient 003', 'Patient 005']);
  const [doctorCategories] = useState([
    { category: 'Cardiology', doctors: ['Dr. Sarah Wilson', 'Dr. Neha Varma'] },
    { category: 'Endocrinology', doctors: ['Dr. Aakash Menon'] },
    { category: 'Neurology', doctors: ['Dr. James Thompson'] },
    { category: 'Oncology', doctors: ['Dr. Emily Chen'] }
  ]);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'doctor',
      name: 'Dr. Sarah Wilson',
      avatar: 'SW',
      text: 'Patient 001 needs to be monitored for elevated blood pressure. Please check every hour and administer prescribed medication if BP remains above 130/85.',
      time: '9:30 AM'
    },
    {
      sender: 'nurse',
      name: 'Nurse Jane',
      avatar: 'NJ',
      text: "I've administered the paracetamol as prescribed. The patient's temperature has dropped slightly to 38.5°C. Will continue to monitor.",
      time: '10:15 AM'
    },
    {
      sender: 'doctor',
      name: 'Dr. Sarah Wilson',
      avatar: 'SW',
      text: "Thank you. If temperature doesn't normalize within the next hour, we may need to consider additional measures. Please ensure patient stays well hydrated.",
      time: '10:22 AM'
    },
    {
      sender: 'system',
      text: 'New patient vitals recorded at 10:15 AM'
    },
    {
      sender: 'doctor',
      name: 'Dr. Sarah Wilson',
      avatar: 'SW',
      text: "I've reviewed the latest vitals. Please administer 500mg of acetaminophen and draw blood for additional testing.",
      time: 'Just now',
      suggestion: {
        text: 'Administer acetaminophen 500mg',
        action: 'Mark as Done'
      }
    }
  ]);
  
  // Voice recognition for patient data
  const { 
    isListening: isPatientRecording,
    transcript: patientTranscript, 
    startListening: startPatientRecording, 
    stopListening: stopPatientRecording,
    formatTranscript
  } = useVoiceRecognition();
  
  // Voice recognition for doctor chat
  const { 
    isListening: isChatRecording,
    transcript: chatTranscript, 
    startListening: startChatRecording, 
    stopListening: stopChatRecording
  } = useVoiceRecognition();
  
  // Chat scroll reference
  const chatContainerRef = useRef(null);
  
  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  // Update patient data from transcript
  useEffect(() => {
    if (patientTranscript) {
      setPatientData(patientTranscript);
    }
  }, [patientTranscript]);
  
  // Update chat message from transcript
  useEffect(() => {
    if (chatTranscript) {
      setChatMessage(chatTranscript);
    }
  }, [chatTranscript]);
  
  // Process patient data
  const processPatientData = () => {
    if (!patientData.trim()) return;
    
    setIsProcessing(true);
    
    // In a real app, you might send this to an API for processing
    // Here we'll just use our simple formatter
    setTimeout(() => {
      const formatted = formatTranscript(patientData);
      setFormattedData(formatted);
      setIsProcessing(false);
    }, 1000);
  };
  
  // Handle patient mention
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setChatMessage(value);
    
    // Check for @ symbol to trigger patient mention dropdown
    const lastAtSymbolIndex = value.lastIndexOf('@');
    if (lastAtSymbolIndex !== -1) {
      const textAfterAt = value.substring(lastAtSymbolIndex + 1).toLowerCase();
      if (textAfterAt.length === 0 || patientsList.some(patient => patient.toLowerCase().includes(textAfterAt))) {
        setShowMentionDropdown(true);
        setMentionedPatient(textAfterAt);
      } else {
        setShowMentionDropdown(false);
      }
    } else {
      setShowMentionDropdown(false);
    }
  };
  
  // Handle patient selection from dropdown
  const selectPatient = (patient) => {
    const lastAtSymbolIndex = chatMessage.lastIndexOf('@');
    const newMessage = chatMessage.substring(0, lastAtSymbolIndex) + '@' + patient + ' ';
    setChatMessage(newMessage);
    setShowMentionDropdown(false);
  };
  
  // Handle doctor category change
  const handleCategoryChange = (category) => {
    setSelectedDoctorCategory(category);
    // Set default doctor for the category
    const categoryDoctors = doctorCategories.find(c => c.category === category)?.doctors || [];
    if (categoryDoctors.length > 0) {
      setSelectedDoctor(categoryDoctors[0]);
    }
  };

  // Send chat message
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Create a new message object
    const newMessage = {
      sender: 'nurse',
      name: 'Nurse Jane',
      avatar: 'NJ',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Add the new message to the chat
    setChatMessages([...chatMessages, newMessage]);
    
    // Clear the input after sending
    setChatMessage('');
  };

  // Handle task form change
  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle task form submit
  const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    // Here you would add the task to your tasks list
    console.log('New task created:', newTask);
    // Close the modal
    setIsTaskModalOpen(false);
    // Reset form
    setNewTask({
      patient: 'Patient 001',
      taskType: 'Medication',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '08:15',
    });
  };

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
                    <select 
                      className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={patientFilter}
                      onChange={(e) => setPatientFilter(e.target.value)}
                    >
                      <option>All Patients</option>
                      <option>Active Patients</option>
                      <option>Completed</option>
                    </select>
                    <select 
                      className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                    >
                      <option value="All Patients">Select Patient</option>
                      {patientsList.map((patient) => (
                        <option key={patient} value={patient}>
                          {patient}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Voice-enabled Patient Input Card */}
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h4 className="text-md font-medium text-gray-700 mb-3">Record Patient Data</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button 
                        className={`flex items-center justify-center ${isPatientRecording ? 'bg-red-600' : 'bg-blue-600'} text-white px-4 py-2 rounded-md text-sm`}
                        onClick={isPatientRecording ? stopPatientRecording : startPatientRecording}
                      >
                        <svg className={`h-4 w-4 mr-1 ${isPatientRecording ? 'animate-pulse' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        {isPatientRecording ? 'Stop Recording' : 'Record Patient Data'}
                      </button>
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
                        onClick={processPatientData}
                        disabled={!patientData.trim() || isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Process Data'
                        )}
                      </button>
                    </div>
                    
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md text-sm h-24 bg-white"
                      placeholder="Speak or type patient information here..."
                      value={patientData}
                      onChange={e => setPatientData(e.target.value)}
                    />
                    
                    {formattedData && (
                      <div className="bg-white p-4 rounded-md border border-gray-200">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Processed Patient Data</h5>
                        
                        {formattedData.symptoms.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-600">Symptoms:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                              {formattedData.symptoms.map((symptom, i) => (
                                <li key={i}>{symptom}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {formattedData.vitals.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-600">Vitals:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                              {formattedData.vitals.map((vital, i) => (
                                <li key={i}>{vital}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {formattedData.observations.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-600">Observations:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                              {formattedData.observations.map((observation, i) => (
                                <li key={i}>{observation}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {formattedData.plans.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-600">Plan/Recommendations:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
                              {formattedData.plans.map((plan, i) => (
                                <li key={i}>{plan}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                            Save to Patient Record
                          </button>
                        </div>
                      </div>
                    )}
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
                  <h3 className="text-lg font-medium text-gray-700 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Doctor Chat
                  </h3>
                  <div className="flex space-x-2">
                    <div className="relative inline-block text-left">
                      <select 
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={selectedDoctorCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                      >
                        {doctorCategories.map((category) => (
                          <option key={category.category} value={category.category}>
                            {category.category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative inline-block text-left">
                      <select 
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                      >
                        {doctorCategories
                          .find(c => c.category === selectedDoctorCategory)?.doctors
                          .map((doctor) => (
                            <option key={doctor} value={doctor}>
                              {doctor}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-0 flex flex-col h-[600px] bg-gradient-to-b from-blue-50 to-white">
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4"
                  >
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div key={index}>
                          {msg.sender === 'doctor' && (
                            <div className="flex items-start">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-2 shadow-sm">
                                {msg.avatar}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-purple-700 font-medium mb-1">{msg.name}</span>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100 max-w-[75%]">
                                  <div className="text-sm text-gray-800">
                                    {msg.text.split(/@([A-Za-z0-9 ]+)/).map((part, i) => 
                                      i % 2 === 0 ? part : (
                                        <span key={i} className="bg-blue-100 text-blue-700 px-1 rounded">
                                          @{part}
                                        </span>
                                      )
                                    )}
                                  </div>
                                  {msg.suggestion && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mt-2">
                                      <div className="text-xs font-medium text-yellow-700">Suggested Action</div>
                                      <div className="text-sm text-gray-800">{msg.suggestion.text}</div>
                                      <button className="mt-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors">
                                        {msg.suggestion.action}
                                      </button>
                                    </div>
                                  )}
                                  <div className="text-xs text-gray-500 mt-1">
                                    {msg.time}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {msg.sender === 'nurse' && (
                            <div className="flex items-start justify-end">
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-blue-700 font-medium mb-1">{msg.name}</span>
                                <div className="bg-blue-50 rounded-lg p-3 shadow-sm border border-blue-100 max-w-[75%]">
                                  <div className="text-sm text-gray-800">
                                    {msg.text.split(/@([A-Za-z0-9 ]+)/).map((part, i) => 
                                      i % 2 === 0 ? part : (
                                        <span key={i} className="bg-blue-100 text-blue-700 px-1 rounded">
                                          @{part}
                                        </span>
                                      )
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {msg.time}
                                  </div>
                                </div>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold ml-2 shadow-sm">
                                {msg.avatar}
                              </div>
                            </div>
                          )}
                          
                          {msg.sender === 'system' && (
                            <div className="flex justify-center my-6">
                              <div className="bg-gray-200 rounded-full px-4 py-1 shadow-sm">
                                <span className="text-xs text-gray-600">{msg.text}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 p-4 bg-white">
                    <div className="flex flex-col space-y-2">
                      <div className="relative">
                        <textarea
                          className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2 h-20"
                          placeholder="Type your message... (use @ to mention a patient)"
                          value={chatMessage}
                          onChange={handleMessageChange}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendChatMessage();
                            }
                          }}
                        />
                        {showMentionDropdown && (
                          <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
                            {patientsList
                              .filter(patient => 
                                patient.toLowerCase().includes(mentionedPatient.toLowerCase())
                              )
                              .map(patient => (
                                <div 
                                  key={patient} 
                                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                  onClick={() => selectPatient(patient)}
                                >
                                  {patient}
                                </div>
                              ))
                            }
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className={`flex items-center justify-center ${isChatRecording ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-4 py-2 rounded-md text-sm flex-none transition-colors shadow-sm`}
                          onClick={isChatRecording ? stopChatRecording : startChatRecording}
                        >
                          <svg className={`h-4 w-4 mr-1 ${isChatRecording ? 'animate-pulse' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                          {isChatRecording ? 'Stop' : 'Record'}
                        </button>
                        <button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-sm flex items-center justify-center"
                          onClick={sendChatMessage}
                          disabled={!chatMessage.trim()}
                        >
                          <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send
                        </button>
                      </div>
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
                    <button 
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md"
                      onClick={() => setIsTaskModalOpen(true)}
                    >
                      + Add Task
                    </button>
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
      
      {/* Task scheduling modal */}
      {isTaskModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsTaskModalOpen(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Schedule New Task</h3>
                <button 
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsTaskModalOpen(false)}
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleTaskFormSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                    <select 
                      name="patient"
                      value={newTask.patient}
                      onChange={handleTaskFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2"
                    >
                      {patientsList.map((patient) => (
                        <option key={patient} value={patient}>
                          {patient}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
                    <select 
                      name="taskType"
                      value={newTask.taskType}
                      onChange={handleTaskFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2"
                    >
                      <option value="Medication">Medication</option>
                      <option value="Vital Check">Vital Check</option>
                      <option value="Assessment">Assessment</option>
                      <option value="Doctor Visit">Doctor Visit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      name="description"
                      value={newTask.description}
                      onChange={handleTaskFormChange}
                      placeholder="Enter task details..."
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2 h-20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date"
                      name="date"
                      value={newTask.date}
                      onChange={handleTaskFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input 
                        type="time"
                        name="startTime"
                        value={newTask.startTime}
                        onChange={handleTaskFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input 
                        type="time"
                        name="endTime"
                        value={newTask.endTime}
                        onChange={handleTaskFormChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setIsTaskModalOpen(false)}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    Schedule Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      
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