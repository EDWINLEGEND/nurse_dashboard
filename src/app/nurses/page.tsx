"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useState } from 'react';

// Define types for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  0: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Extend Window interface to include SpeechRecognition
interface WindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

// Define structured data type for formatted transcript
interface FormattedData {
  symptoms: string[];
  observations: string[];
  vitals: string[];
  plans: string[];
}

// Define triage level type
interface TriageLevel {
  level: number;
  text: string;
  color: string;
}

// Define tab type
interface Tab {
  id: string;
  name: string;
  icon: string;
}

// Voice recognition hook
function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if browser supports SpeechRecognition
      const windowWithSpeech = window as WindowWithSpeech;
      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onstart = () => {
          setIsListening(true);
          setError('');
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        recognitionInstance.onerror = (event: SpeechRecognitionEvent) => {
          setError(event.error);
          setIsListening(false);
        };
        
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const currentTranscript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          setTranscript(prev => prev + ' ' + currentTranscript);
        };
        
        setRecognition(recognitionInstance);
      } else {
        setError('Browser does not support speech recognition.');
      }
    }
  }, []);
  
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);
  
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
  const formatTranscript = useCallback((rawTranscript: string): FormattedData => {
    if (!rawTranscript) return {
      symptoms: [],
      observations: [],
      vitals: [],
      plans: []
    };
    
    // Split into sentences
    const sentences = rawTranscript.split(/[.!?]+/).filter((sentence: string) => sentence.trim().length > 0);
    
    // Group by potential clinical categories
    const formattedText: FormattedData = {
      symptoms: [],
      observations: [],
      vitals: [],
      plans: []
    };
    
    // Simple rule-based categorization
    sentences.forEach((sentence: string) => {
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
  const [isRecording, setIsRecording] = useState(false);
  const [patientNotes, setPatientNotes] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [formattedData, setFormattedData] = useState<FormattedData | null>(null);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionedPatient, setMentionedPatient] = useState('');
  const [selectedDoctorCategory, setSelectedDoctorCategory] = useState('Cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Wilson');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    patient: 'Patient 001',
    taskType: 'Medication',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '08:15'
  });
  const [newMedication, setNewMedication] = useState({
    name: '',
    patient: 'Patient 001',
    dosage: '',
    schedule: '',
    route: 'Oral',
    startDate: new Date().toISOString().split('T')[0]
  });
  const [selectedPatient, setSelectedPatient] = useState('All Patients');
  const [triageFilter, setTriageFilter] = useState('All Levels');
  const [triageSort, setTriageSort] = useState('Level');
  
  // Patient data state
  const [patientData, setPatientData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [patientFilter, setPatientFilter] = useState('All Patients');
  
  // Doctor chat state
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
  
  // Add triage state
  const [patientTriageData] = useState([
    { 
      id: 'Patient 001', 
      level: 1, 
      levelText: 'Immediate', 
      description: 'Resuscitation needed', 
      color: 'red', 
      complaint: 'Chest pain, difficulty breathing', 
      vitals: 'BP 90/60, HR 130, O2 88%',
      time: '10:15 AM',
      status: 'Waiting'
    },
    { 
      id: 'Patient 003', 
      level: 2, 
      levelText: 'Urgent', 
      description: 'Severe pain', 
      color: 'orange', 
      complaint: 'Abdominal pain, vomiting', 
      vitals: 'BP 140/90, HR 110, O2 96%',
      time: '10:30 AM',
      status: 'In Progress'
    },
    { 
      id: 'Patient 005', 
      level: 3, 
      levelText: 'Less Urgent', 
      description: 'Stable, needs monitoring', 
      color: 'yellow', 
      complaint: 'Sprained ankle, moderate pain', 
      vitals: 'BP 120/80, HR 85, O2 99%',
      time: '10:45 AM',
      status: 'Waiting'
    },
    { 
      id: 'Patient 008', 
      level: 4, 
      levelText: 'Non-Urgent', 
      description: 'Minor injury', 
      color: 'green', 
      complaint: 'Small laceration on hand', 
      vitals: 'BP 118/78, HR 72, O2 100%',
      time: '11:00 AM',
      status: 'Waiting'
    },
    { 
      id: 'Patient 010', 
      level: 5, 
      levelText: 'Routine', 
      description: 'Follow-up', 
      color: 'blue', 
      complaint: 'Medication adjustment', 
      vitals: 'BP 122/76, HR 68, O2 99%',
      time: '11:15 AM',
      status: 'In Progress'
    }
  ]);
  
  const [triageForm, setTriageForm] = useState({
    patientId: '',
    chiefComplaint: '',
    painLevel: '5',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiration: '',
    oxygenSaturation: '',
  });
  
  const [suggestedTriageLevel, setSuggestedTriageLevel] = useState<TriageLevel | null>(null);
  
  // Voice recognition hooks for different contexts
  const {
    isListening: isPatientRecording,
    transcript: patientTranscript,
    startListening: startPatientRecording,
    stopListening: stopPatientRecording,
    formatTranscript: formatPatientTranscript
  } = useVoiceRecognition();
  
  const {
    isListening: isChatRecording,
    transcript: chatTranscript,
    startListening: startChatRecording,
    stopListening: stopChatRecording
  } = useVoiceRecognition();
  
  // Chat scroll reference
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
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
    setIsProcessing(true);
    
    setTimeout(() => {
      const formatted = formatPatientTranscript(patientData);
      setFormattedData(formatted);
      setIsProcessing(false);
    }, 1000);
  };
  
  // Handle message change for patient mention
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  const selectPatient = (patient: string) => {
    const lastAtSymbolIndex = chatMessage.lastIndexOf('@');
    const newMessage = chatMessage.substring(0, lastAtSymbolIndex) + '@' + patient + ' ';
    setChatMessage(newMessage);
    setShowMentionDropdown(false);
  };
  
  // Handle doctor category change
  const handleCategoryChange = (category: string) => {
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
    // Here you would add the new task to your tasks list
    console.log('New task:', newTask);
    // Close the modal
    setIsTaskModalOpen(false);
    // Reset the form
    setNewTask({
      patient: 'Patient 001',
      taskType: 'Medication',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '08:15'
    });
  };
  
  // Handle triage form change
  const handleTriageFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTriageForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Simple logic to suggest triage level based on pain level
    // In real application, this would be more complex AI-based
    if (name === 'painLevel') {
      const pain = parseInt(value);
      if (pain >= 9) {
        setSuggestedTriageLevel({ level: 1, text: 'Immediate', color: 'red' });
      } else if (pain >= 7) {
        setSuggestedTriageLevel({ level: 2, text: 'Urgent', color: 'orange' });
      } else if (pain >= 5) {
        setSuggestedTriageLevel({ level: 3, text: 'Less Urgent', color: 'yellow' });
      } else if (pain >= 3) {
        setSuggestedTriageLevel({ level: 4, text: 'Non-Urgent', color: 'green' });
      } else {
        setSuggestedTriageLevel({ level: 5, text: 'Routine', color: 'blue' });
      }
    }
  };
  
  // Handle triage form submit
  const handleTriageFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Triage assessment submitted:', triageForm, suggestedTriageLevel);
    // Reset form
    setTriageForm({
      patientId: '',
      chiefComplaint: '',
      painLevel: '5',
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      respiration: '',
      oxygenSaturation: '',
    });
    setSuggestedTriageLevel(null);
  };

  // Navigation tabs with corresponding icons
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { id: 'patient-records', name: 'Patient Records', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'medications', name: 'Medications', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'vitals', name: 'Vitals', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'doctor-chat', name: 'Doctor Chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'schedule', name: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'triage', name: 'Triage', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

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
    // Here you would add the new medication to your medications list
    console.log('New medication:', newMedication);
    // Close the modal
    setIsMedicationModalOpen(false);
    // Reset the form
    setNewMedication({
      name: '',
      patient: 'Patient 001',
      dosage: '',
      schedule: '',
      route: 'Oral',
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white py-3 border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <div className="text-blue-600 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-black text-xl">Medusa</span>
            </div>
            
            <div className="flex-1 max-w-2xl mx-0 sm:mx-8 w-full">
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
                <div className="hidden sm:block">
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
              <a href="#" className="hidden sm:block text-gray-500 hover:text-gray-700 text-sm">Logout</a>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-blue-600 text-white py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Good morning, Nurse Jane!</h1>
            <p className="text-blue-100">Saturday, March 22, 2025</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="py-3 sm:py-4 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white p-1 sm:p-1.5 shadow-sm rounded-lg">
            <nav className="flex flex-wrap w-full">
              {tabs.map((tab: Tab) => (
                <button 
                  key={tab.id}
                  className={`flex items-center justify-center rounded-md px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out m-0.5 ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <svg className={`h-4 sm:h-4.5 w-4 sm:w-4.5 mr-1 sm:mr-1.5 ${activeTab === tab.id ? 'text-white' : 'text-blue-600'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="flex-1 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          {activeTab === 'dashboard' && (
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
          )}

          {activeTab === 'patient-records' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-700">Patient Records</h3>
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-1 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <svg className="h-4 w-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  {/* Table for larger screens only - hidden on small screens */}
                  <div className="hidden md:block">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">P-001</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">45</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Today, 10:30 AM</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                            <a href="#" className="text-blue-600 hover:text-blue-900">Edit</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">P-002</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Waiting</span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Today, 09:15 AM</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                            <a href="#" className="text-blue-600 hover:text-blue-900">Edit</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">P-003</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Robert Johnson</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">67</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yesterday, 4:45 PM</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                            <a href="#" className="text-blue-600 hover:text-blue-900">Edit</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Card layout for small screens - visible only on small screens */}
                  <div className="md:hidden space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">P-001</span>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </div>
                        <span className="text-xs text-gray-500">Today, 10:30 AM</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Name:</span>
                            <span className="text-sm text-gray-900">John Doe</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Age:</span>
                            <span className="text-sm text-gray-900">45</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Room:</span>
                            <span className="text-sm text-gray-900">203-A</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Condition:</span>
                            <span className="text-sm text-gray-900">Stable</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">View</a>
                          <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">P-002</span>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Waiting</span>
                        </div>
                        <span className="text-xs text-gray-500">Today, 09:15 AM</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Name:</span>
                            <span className="text-sm text-gray-900">Jane Smith</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Age:</span>
                            <span className="text-sm text-gray-900">32</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Room:</span>
                            <span className="text-sm text-gray-900">105-B</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Condition:</span>
                            <span className="text-sm text-gray-900">Moderate</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">View</a>
                          <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">P-003</span>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>
                        </div>
                        <span className="text-xs text-gray-500">Yesterday, 4:45 PM</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Name:</span>
                            <span className="text-sm text-gray-900">Robert Johnson</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Age:</span>
                            <span className="text-sm text-gray-900">67</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Room:</span>
                            <span className="text-sm text-gray-900">301-C</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Condition:</span>
                            <span className="text-sm text-gray-900">Critical</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">View</a>
                          <a href="#" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-700">Medication Management</h3>
                  <div className="flex flex-col xs:flex-row w-full sm:w-auto space-y-2 xs:space-y-0 xs:space-x-2">
                    <select className="w-full text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      <option>All Patients</option>
                      <option>Patient 001</option>
                      <option>Patient 002</option>
                      <option>Patient 003</option>
                    </select>
                    <button 
                      onClick={() => setIsMedicationModalOpen(true)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm whitespace-nowrap"
                    >
                      + Add Medication
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  {/* Table for larger screens only - hidden on small screens */}
                  <div className="hidden md:block">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amoxicillin</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Patient 001</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">500mg</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">3x daily</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Administered</span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Log</button>
                            <button className="text-blue-600 hover:text-blue-900">Details</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lisinopril</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Patient 002</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">10mg</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Daily morning</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Scheduled</span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Administer</button>
                            <button className="text-blue-600 hover:text-blue-900">Details</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Metformin</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">Patient 003</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">850mg</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">2x daily with meals</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Missed</span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Resolve</button>
                            <button className="text-blue-600 hover:text-blue-900">Details</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Card layout for small screens - visible only on small screens */}
                  <div className="md:hidden space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Amoxicillin</span>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Administered</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Patient:</span>
                            <span className="text-sm text-gray-900">Patient 001</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Dosage:</span>
                            <span className="text-sm text-gray-900">500mg</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Schedule:</span>
                            <span className="text-sm text-gray-900">3x daily</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Last Admin:</span>
                            <span className="text-sm text-gray-900">Today, 10:30 AM</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Log</button>
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Details</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Lisinopril</span>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Scheduled</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Patient:</span>
                            <span className="text-sm text-gray-900">Patient 002</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Dosage:</span>
                            <span className="text-sm text-gray-900">10mg</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Schedule:</span>
                            <span className="text-sm text-gray-900">Daily morning</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Due Time:</span>
                            <span className="text-sm text-gray-900">Today, 8:00 AM</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium">Administer</button>
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Details</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Metformin</span>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Missed</span>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Patient:</span>
                            <span className="text-sm text-gray-900">Patient 003</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Dosage:</span>
                            <span className="text-sm text-gray-900">850mg</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Schedule:</span>
                            <span className="text-sm text-gray-900">2x daily with meals</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-gray-500 w-24">Missed Time:</span>
                            <span className="text-sm text-gray-900">Today, 1:00 PM</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <button className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium">Resolve</button>
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">Patient Vitals</h3>
                  <div className="flex space-x-2">
                    <select className="text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      <option>Patient 001</option>
                      <option>Patient 002</option>
                      <option>Patient 003</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-base sm:text-lg font-medium text-gray-700">Current Vitals</h4>
                      <span className="text-xs text-gray-500">Last updated: 10:15 AM</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Blood Pressure</h5>
                        <div className="text-lg sm:text-xl font-bold text-blue-600">130/85</div>
                        <span className="mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">High</span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Heart Rate</h5>
                        <div className="text-lg sm:text-xl font-bold text-blue-600">98 bpm</div>
                        <span className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Elevated</span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Temperature</h5>
                        <div className="text-lg sm:text-xl font-bold text-blue-600">38.5°C</div>
                        <span className="mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Fever</span>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col items-center">
                        <h5 className="text-xs text-gray-500 mb-1">Oxygen Saturation</h5>
                        <div className="text-lg sm:text-xl font-bold text-blue-600">95%</div>
                        <span className="mt-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Normal</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-base sm:text-lg font-medium text-gray-700">Vitals History</h4>
                      <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Record New Vitals</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O2</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recorded By</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">10:15 AM</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">130/85</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">98 bpm</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">38.5°C</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">95%</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Nurse Jane</td>
                          </tr>
                          <tr>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">9:00 AM</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">135/90</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">102 bpm</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">38.9°C</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">94%</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Nurse Mike</td>
                          </tr>
                          <tr>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Yesterday, 8:30 PM</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">128/82</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">95 bpm</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">38.2°C</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">96%</td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">Nurse Sarah</td>
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
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-700">Doctor Chat</h3>
                  <div className="flex flex-col xs:flex-row w-full sm:w-auto space-y-2 xs:space-y-0 xs:space-x-2">
                    <select 
                      className="text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={selectedDoctorCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      {doctorCategories.map(cat => (
                        <option key={cat.category} value={cat.category}>{cat.category}</option>
                      ))}
                    </select>
                    <select 
                      className="text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                      {doctorCategories.find(c => c.category === selectedDoctorCategory)?.doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col h-[600px] max-h-[70vh]">
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-3" ref={chatContainerRef}>
                    <div className="space-y-3">
                      {chatMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'nurse' ? 'justify-end' : message.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
                          {message.sender === 'system' ? (
                            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600">
                              {message.text}
                            </div>
                          ) : (
                            <div className={`max-w-[85%] sm:max-w-[75%] ${message.sender === 'nurse' ? 'bg-blue-100 text-blue-900' : 'bg-white border border-gray-200 text-gray-800'} rounded-lg px-3 py-2 shadow-sm`}>
                              <div className="flex items-center mb-1">
                                {message.sender === 'doctor' && (
                                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-semibold mr-2">
                                    {message.avatar}
                                  </div>
                                )}
                                <p className="text-xs font-medium">{message.name}</p>
                                <span className="ml-2 text-xs text-gray-500">{message.time}</span>
                              </div>
                              <p className="text-sm break-words">{message.text}</p>
                              
                              {message.suggestion && (
                                <div className="mt-2 bg-blue-50 p-2 rounded border border-blue-100 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                                  <span className="text-xs text-blue-800">{message.suggestion.text}</span>
                                  <button className="text-xs bg-white border border-blue-300 hover:bg-blue-50 text-blue-600 px-2 py-1 rounded-md transition-colors">
                                    {message.suggestion.action}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Input area */}
                  <div className="relative border rounded-lg">
                    <textarea
                      value={chatMessage}
                      onChange={handleMessageChange}
                      className="w-full min-h-[80px] p-3 text-sm border-0 rounded-lg focus:ring-0 resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                    
                    {/* Patient mention dropdown */}
                    {showMentionDropdown && (
                      <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto z-10">
                        {patientsList.filter(patient => patient.toLowerCase().includes(mentionedPatient.toLowerCase())).map((patient, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                            onClick={() => selectPatient(patient)}
                          >
                            {patient}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="px-3 py-2 border-t flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button 
                          onClick={isChatRecording ? stopChatRecording : startChatRecording}
                          className={`p-1.5 rounded-full ${isChatRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                        >
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </button>
                        <button className="p-1.5 rounded-full bg-gray-100 text-gray-600">
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={sendChatMessage}
                        disabled={!chatMessage.trim()}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${chatMessage.trim() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-700">Schedule</h3>
                  <div className="flex flex-col xs:flex-row w-full sm:w-auto space-y-2 xs:space-y-0 xs:space-x-2">
                    <select 
                      className="text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                    >
                      <option value="All Patients">All Patients</option>
                      <option value="Patient 001">Patient 001</option>
                      <option value="Patient 003">Patient 003</option>
                      <option value="Patient 005">Patient 005</option>
                    </select>
                    <button 
                      onClick={() => setIsTaskModalOpen(true)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
                    >
                      + Add Task
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-6">
                    {/* Time slots */}
                    <div className="bg-gray-50 rounded-lg p-3 overflow-hidden">
                      <h4 className="text-base font-medium text-gray-700 mb-3">Today's Schedule</h4>
                      <div className="space-y-3">
                        {/* Morning block */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Morning</h5>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">8:00 AM - 8:15 AM</span>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Medication</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Administer Amoxicillin to Patient 001</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                  <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    Details
                                  </button>
                                  <button className="text-xs bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded">
                                    Complete
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mr-2">9:00 AM - 9:30 AM</span>
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Vital Check</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Record vitals for Patient 003</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                  <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    Details
                                  </button>
                                  <button className="text-xs bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded">
                                    Complete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Afternoon block */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Afternoon</h5>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">1:00 PM - 1:15 PM</span>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Medication</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Administer Insulin to Patient 005</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                  <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    Details
                                  </button>
                                  <button className="text-xs bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded">
                                    Complete
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-0.5 rounded mr-2">2:30 PM - 3:00 PM</span>
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Procedure</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Change dressing for Patient 001</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                  <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    Details
                                  </button>
                                  <button className="text-xs bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded">
                                    Complete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Evening block */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Evening</h5>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">6:00 PM - 6:15 PM</span>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Medication</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Administer Amoxicillin to Patient 001</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                  <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    Details
                                  </button>
                                  <button className="text-xs bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded">
                                    Complete
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mr-2">8:00 PM - 8:30 PM</span>
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Vital Check</span>
                                  </div>
                                  <p className="text-sm text-gray-700">Record vitals for all patients</p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                  <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    Details
                                  </button>
                                  <button className="text-xs bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded">
                                    Complete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Upcoming Tasks */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-base font-medium text-gray-700 mb-3">Tomorrow's Tasks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center mb-1">
                                <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded mr-2">9:00 AM</span>
                                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Meeting</span>
                              </div>
                              <p className="text-sm text-gray-700">Team briefing with Head Nurse</p>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button className="text-xs bg-white text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded border border-indigo-200">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center mb-1">
                                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">10:30 AM</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Medication</span>
                              </div>
                              <p className="text-sm text-gray-700">Administer new medication for Patient 003</p>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button className="text-xs bg-white text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'triage' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-700">Triage</h3>
                  <div className="flex flex-col xs:flex-row w-full sm:w-auto space-y-2 xs:space-y-0 xs:space-x-2">
                    <select
                      value={triageFilter}
                      onChange={(e) => setTriageFilter(e.target.value)}
                      className="text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="All Levels">All Levels</option>
                      <option value="Level 1">Level 1 - Immediate</option>
                      <option value="Level 2">Level 2 - Urgent</option>
                      <option value="Level 3">Level 3 - Less Urgent</option>
                      <option value="Level 4">Level 4 - Non-Urgent</option>
                      <option value="Level 5">Level 5 - Routine</option>
                    </select>
                    <select
                      value={triageSort}
                      onChange={(e) => setTriageSort(e.target.value)}
                      className="text-xs sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="Level">Sort by Level</option>
                      <option value="Time">Sort by Time</option>
                      <option value="Status">Sort by Status</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-700 mb-3">Active Triage Cases</h4>
                      <div className="space-y-3">
                        {patientTriageData
                          .filter(patient => triageFilter === 'All Levels' || 
                                    `Level ${patient.level}` === triageFilter)
                          .sort((a, b) => {
                            if (triageSort === 'Level') return a.level - b.level;
                            if (triageSort === 'Time') return a.time.localeCompare(b.time);
                            return a.status.localeCompare(b.status);
                          })
                          .map(patient => (
                            <div 
                              key={patient.id} 
                              className="border rounded-lg overflow-hidden shadow-sm"
                            >
                              <div 
                                className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                                style={{ backgroundColor: patient.level === 1 ? '#FEE2E2' : 
                                                        patient.level === 2 ? '#FFEDD5' : 
                                                        patient.level === 3 ? '#FEF3C7' : 
                                                        patient.level === 4 ? '#D1FAE5' : 
                                                        '#DBEAFE' }}
                              >
                                <div className="flex items-center">
                                  <div 
                                    className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2"
                                    style={{ backgroundColor: patient.level === 1 ? '#EF4444' : 
                                                            patient.level === 2 ? '#F97316' : 
                                                            patient.level === 3 ? '#EAB308' : 
                                                            patient.level === 4 ? '#10B981' : 
                                                            '#3B82F6' }}
                                  >
                                    {patient.level}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">{patient.id}</div>
                                    <div className="text-xs">{patient.levelText} - {patient.time}</div>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                                  patient.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {patient.status}
                                </span>
                              </div>
                              <div className="p-3 bg-white">
                                <div className="grid grid-cols-1 gap-2">
                                  <div>
                                    <div className="text-xs text-gray-500">Chief Complaint</div>
                                    <div className="text-sm">{patient.complaint}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500">Vitals</div>
                                    <div className="text-sm">{patient.vitals}</div>
                                  </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                                  <button className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded border border-gray-200">
                                    View Details
                                  </button>
                                  <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                                    {patient.status === 'Waiting' ? 'Start Assessment' : 'Update Status'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-base font-medium text-blue-800 mb-3">New Triage Assessment</h4>
                      <form onSubmit={handleTriageFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                            <input 
                              type="text" 
                              name="patientId" 
                              value={triageForm.patientId} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="Enter patient ID" 
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint</label>
                            <textarea 
                              name="chiefComplaint" 
                              value={triageForm.chiefComplaint} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="Enter chief complaint" 
                              rows={2}
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pain Level (1-10)</label>
                            <input 
                              type="range" 
                              name="painLevel" 
                              value={triageForm.painLevel} 
                              onChange={handleTriageFormChange}
                              min="1" 
                              max="10" 
                              className="w-full" 
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>No pain (1)</span>
                              <span>Worst pain (10)</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                            <input 
                              type="text" 
                              name="temperature" 
                              value={triageForm.temperature} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="e.g. 98.6 F" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                            <input 
                              type="text" 
                              name="bloodPressure" 
                              value={triageForm.bloodPressure} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="e.g. 120/80" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
                            <input 
                              type="text" 
                              name="heartRate" 
                              value={triageForm.heartRate} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="e.g. 72 bpm" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Respiration Rate</label>
                            <input 
                              type="text" 
                              name="respiration" 
                              value={triageForm.respiration} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="e.g. 16/min" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation</label>
                            <input 
                              type="text" 
                              name="oxygenSaturation" 
                              value={triageForm.oxygenSaturation} 
                              onChange={handleTriageFormChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                              placeholder="e.g. 98%" 
                            />
                          </div>
                        </div>
                        
                        {suggestedTriageLevel && (
                          <div className="mt-4 p-3 rounded-lg border" style={{ backgroundColor: `${suggestedTriageLevel.level === 1 ? '#FEE2E2' : suggestedTriageLevel.level === 2 ? '#FFEDD5' : suggestedTriageLevel.level === 3 ? '#FEF3C7' : suggestedTriageLevel.level === 4 ? '#D1FAE5' : '#DBEAFE'}` }}>
                            <div className="flex items-center mb-2">
                              <div 
                                className="h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                                style={{ backgroundColor: `${suggestedTriageLevel.level === 1 ? '#EF4444' : suggestedTriageLevel.level === 2 ? '#F97316' : suggestedTriageLevel.level === 3 ? '#EAB308' : suggestedTriageLevel.level === 4 ? '#10B981' : '#3B82F6'}` }}
                              >
                                {suggestedTriageLevel.level}
                              </div>
                              <div className="text-sm font-medium">
                                Suggested Triage: Level {suggestedTriageLevel.level} - {suggestedTriageLevel.text}
                              </div>
                            </div>
                            <p className="text-xs text-gray-700">Based on the pain level and symptoms provided</p>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                            Submit Assessment
                          </button>
                        </div>
                      </form>
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-sm">Doctor suggestion received</p>
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Add New Task</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleTaskFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select 
                    name="patient" 
                    value={newTask.patient} 
                    onChange={handleTaskFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    <option value="Patient 001">Patient 001</option>
                    <option value="Patient 002">Patient 002</option>
                    <option value="Patient 003">Patient 003</option>
                    <option value="Patient 005">Patient 005</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
                  <select 
                    name="taskType" 
                    value={newTask.taskType} 
                    onChange={handleTaskFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    <option value="Medication">Medication</option>
                    <option value="Vital Check">Vital Check</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={newTask.description} 
                    onChange={handleTaskFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                    rows={3}
                    placeholder="Enter task description..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      name="date" 
                      value={newTask.date} 
                      onChange={handleTaskFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input 
                      type="time" 
                      name="startTime" 
                      value={newTask.startTime} 
                      onChange={handleTaskFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input 
                      type="time" 
                      name="endTime" 
                      value={newTask.endTime} 
                      onChange={handleTaskFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-3">
                  <button 
                    type="button" 
                    onClick={() => setIsTaskModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Medication Modal */}
      {isMedicationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Add New Medication</h3>
              <button onClick={() => setIsMedicationModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleMedicationFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={newMedication.name} 
                    onChange={handleMedicationFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                    placeholder="Medication name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select 
                    name="patient" 
                    value={newMedication.patient} 
                    onChange={handleMedicationFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    <option value="Patient 001">Patient 001</option>
                    <option value="Patient 002">Patient 002</option>
                    <option value="Patient 003">Patient 003</option>
                    <option value="Patient 005">Patient 005</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input 
                    type="text" 
                    name="dosage" 
                    value={newMedication.dosage} 
                    onChange={handleMedicationFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                    placeholder="e.g. 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                  <input 
                    type="text" 
                    name="schedule" 
                    value={newMedication.schedule} 
                    onChange={handleMedicationFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                    placeholder="e.g. 3x daily"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <select 
                    name="route" 
                    value={newMedication.route} 
                    onChange={handleMedicationFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    <option value="Oral">Oral</option>
                    <option value="Intravenous">Intravenous</option>
                    <option value="Intramuscular">Intramuscular</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Topical">Topical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={newMedication.startDate} 
                    onChange={handleMedicationFormChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-3">
                  <button 
                    type="button" 
                    onClick={() => setIsMedicationModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add Medication
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}