import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, DoctorCategory } from '../types';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { chatMessages as mockChatMessages, doctorCategories, patientsList } from '../data/mockData';

export default function DoctorChatTab() {
  const [selectedDoctorCategory, setSelectedDoctorCategory] = useState('Cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Wilson');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [chatMessage, setChatMessage] = useState('');
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionedPatient, setMentionedPatient] = useState('');
  
  // Chat scroll reference
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Voice recognition hooks
  const {
    isListening: isChatRecording,
    transcript: chatTranscript,
    startListening: startChatRecording,
    stopListening: stopChatRecording
  } = useVoiceRecognition();
  
  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  // Update chat message from transcript
  useEffect(() => {
    if (chatTranscript) {
      setChatMessage(chatTranscript);
    }
  }, [chatTranscript]);
  
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
      sender: 'nurse' as const,
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

  return (
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
  );
} 