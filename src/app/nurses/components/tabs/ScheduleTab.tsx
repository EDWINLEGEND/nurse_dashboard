import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Task {
  id: string;
  title: string;
  patientId: string;
  patientName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'Medication' | 'Assessment' | 'Treatment' | 'Follow-up' | 'Documentation';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Canceled';
}

export default function ScheduleTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [patientFilter, setPatientFilter] = useState('All');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [viewTask, setViewTask] = useState<string | null>(null);

  const [newTask, setNewTask] = useState<Task>({
    id: '',
    title: '',
    patientId: '',
    patientName: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'Assessment',
    priority: 'Medium',
    status: 'Upcoming',
  });

  // Sample patients data
  const patients = [
    { id: 'PT001', name: 'John Smith' },
    { id: 'PT002', name: 'Emily Johnson' },
    { id: 'PT003', name: 'Michael Brown' },
    { id: 'PT004', name: 'Amanda Garcia' },
    { id: 'PT005', name: 'David Lee' }
  ];

  // Sample tasks data
  const tasks: Task[] = [
    {
      id: 'TSK001',
      title: 'Blood Pressure Check',
      patientId: 'PT001',
      patientName: 'John Smith',
      description: 'Routine blood pressure monitoring',
      date: '2023-03-23',
      startTime: '08:00',
      endTime: '08:15',
      type: 'Assessment',
      priority: 'Medium',
      status: 'Upcoming'
    },
    {
      id: 'TSK002',
      title: 'Medication Administration',
      patientId: 'PT002',
      patientName: 'Emily Johnson',
      description: 'Administer Lisinopril 10mg oral',
      date: '2023-03-23',
      startTime: '09:00',
      endTime: '09:15',
      type: 'Medication',
      priority: 'High',
      status: 'Upcoming'
    },
    {
      id: 'TSK003',
      title: 'Wound Dressing Change',
      patientId: 'PT003',
      patientName: 'Michael Brown',
      description: 'Post-surgical wound assessment and dressing change',
      date: '2023-03-23',
      startTime: '10:30',
      endTime: '11:00',
      type: 'Treatment',
      priority: 'High',
      status: 'Upcoming'
    },
    {
      id: 'TSK004',
      title: 'Patient Discharge Planning',
      patientId: 'PT001',
      patientName: 'John Smith',
      description: 'Discuss discharge instructions and follow-up care',
      date: '2023-03-23',
      startTime: '13:00',
      endTime: '13:30',
      type: 'Documentation',
      priority: 'Medium',
      status: 'Upcoming'
    },
    {
      id: 'TSK005',
      title: 'Pain Assessment',
      patientId: 'PT005',
      patientName: 'David Lee',
      description: 'Evaluate pain level and effectiveness of current pain management',
      date: '2023-03-23',
      startTime: '14:00',
      endTime: '14:15',
      type: 'Assessment',
      priority: 'Urgent',
      status: 'Upcoming'
    },
    {
      id: 'TSK006',
      title: 'Insulin Administration',
      patientId: 'PT004',
      patientName: 'Amanda Garcia',
      description: 'Administer sliding scale insulin based on blood glucose reading',
      date: '2023-03-23',
      startTime: '16:00',
      endTime: '16:15',
      type: 'Medication',
      priority: 'High',
      status: 'Upcoming'
    }
  ];

  // Group tasks by time of day
  const groupTasksByTime = (tasks: Task[]) => {
    const morning = tasks.filter(task => {
      const hour = parseInt(task.startTime.split(':')[0]);
      return hour >= 6 && hour < 12;
    });
    
    const afternoon = tasks.filter(task => {
      const hour = parseInt(task.startTime.split(':')[0]);
      return hour >= 12 && hour < 18;
    });
    
    const evening = tasks.filter(task => {
      const hour = parseInt(task.startTime.split(':')[0]);
      return hour >= 18 || hour < 6;
    });
    
    return { morning, afternoon, evening };
  };

  // Filter tasks by search term, date, and patient
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter === '' || task.date === dateFilter;
    const matchesPatient = patientFilter === 'All' || task.patientId === patientFilter;
    
    return matchesSearch && matchesDate && matchesPatient;
  });

  const { morning, afternoon, evening } = groupTasksByTime(filteredTasks);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'Low': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-blue-700 bg-blue-100';
      case 'High': return 'text-orange-700 bg-orange-100';
      case 'Urgent': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed': return 'text-green-700 bg-green-100';
      case 'In Progress': return 'text-blue-700 bg-blue-100';
      case 'Upcoming': return 'text-yellow-700 bg-yellow-100';
      case 'Overdue': return 'text-red-700 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'Medication':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'Assessment':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Treatment':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'Follow-up':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'Documentation':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTaskTypeChange = (value: string) => {
    setNewTask(prev => ({
      ...prev,
      type: value as Task['type']
    }));
  };

  const handlePriorityChange = (value: string) => {
    setNewTask(prev => ({
      ...prev,
      priority: value as Task['priority']
    }));
  };

  const handlePatientSelect = (value: string) => {
    const patient = patients.find(p => p.id === value);
    
    setNewTask(prev => ({
      ...prev,
      patientId: value,
      patientName: patient ? patient.name : ''
    }));
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New task scheduled:', newTask);
    setIsTaskModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-gray-800">Schedule</h3>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-9 text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Select value={patientFilter} onValueChange={setPatientFilter}>
              <SelectTrigger className="text-sm h-9">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Patients</SelectItem>
                {patients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-grow max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex-shrink-0"
            >
              Schedule Task
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {/* Task Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Morning Schedule */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h4 className="font-medium">Morning Shift</h4>
                <span className="text-gray-700 text-sm">8:00 AM - 12:00 PM</span>
              </div>
              <div className="p-4 space-y-3">
                {morning.length > 0 ? (
                  morning.map(task => (
                    <div key={task.id} className="bg-white rounded-md shadow-sm border border-gray-200 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="text-gray-700 text-sm mr-2">{task.startTime} - {task.endTime}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          {getTypeIcon(task.type)}
                        </div>
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1">{task.title}</h5>
                      <p className="text-sm text-gray-700 mb-2">{task.patientName}</p>
                      
                      <button 
                        onClick={() => setViewTask(viewTask === task.id ? null : task.id)} 
                        className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                      >
                        {viewTask === task.id ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {viewTask === task.id && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-700">{task.description}</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs border border-blue-200">
                              Complete
                            </button>
                            <button className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-gray-200">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">No morning tasks scheduled</div>
                )}
              </div>
            </div>
            
            {/* Afternoon Schedule */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                <h4 className="font-medium text-blue-800">Afternoon (12 PM - 6 PM)</h4>
              </div>
              <div className="p-4 space-y-3">
                {afternoon.length > 0 ? (
                  afternoon.map(task => (
                    <div key={task.id} className="bg-white rounded-md shadow-sm border border-gray-200 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="text-gray-700 text-sm mr-2">{task.startTime} - {task.endTime}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          {getTypeIcon(task.type)}
                        </div>
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1">{task.title}</h5>
                      <p className="text-sm text-gray-700 mb-2">{task.patientName}</p>
                      
                      <button 
                        onClick={() => setViewTask(viewTask === task.id ? null : task.id)} 
                        className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                      >
                        {viewTask === task.id ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {viewTask === task.id && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-700">{task.description}</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs border border-blue-200">
                              Complete
                            </button>
                            <button className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-gray-200">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">No afternoon tasks scheduled</div>
                )}
              </div>
            </div>
            
            {/* Evening Schedule */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100">
                <h4 className="font-medium text-indigo-800">Evening (6 PM - 6 AM)</h4>
              </div>
              <div className="p-4 space-y-3">
                {evening.length > 0 ? (
                  evening.map(task => (
                    <div key={task.id} className="bg-white rounded-md shadow-sm border border-gray-200 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="text-gray-700 text-sm mr-2">{task.startTime} - {task.endTime}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          {getTypeIcon(task.type)}
                        </div>
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1">{task.title}</h5>
                      <p className="text-sm text-gray-700 mb-2">{task.patientName}</p>
                      
                      <button 
                        onClick={() => setViewTask(viewTask === task.id ? null : task.id)} 
                        className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                      >
                        {viewTask === task.id ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {viewTask === task.id && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-700">{task.description}</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs border border-blue-200">
                              Complete
                            </button>
                            <button className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-gray-200">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">No evening tasks scheduled</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Task Scheduling Modal */}
          {isTaskModalOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                          Schedule New Task
                        </h3>
                        <form onSubmit={handleTaskSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Task Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={newTask.title}
                              onChange={handleTaskChange}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                              Patient
                            </label>
                            <Select value={newTask.patientId} onValueChange={handlePatientSelect}>
                              <SelectTrigger className="w-full h-9 text-sm">
                                <SelectValue placeholder="Select Patient" />
                              </SelectTrigger>
                              <SelectContent>
                                {patients.map(patient => (
                                  <SelectItem key={patient.id} value={patient.id}>
                                    {patient.name} ({patient.id})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                              Task Type
                            </label>
                            <Select value={newTask.type} onValueChange={handleTaskTypeChange}>
                              <SelectTrigger className="w-full h-9 text-sm">
                                <SelectValue placeholder="Select Task Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Assessment">Assessment</SelectItem>
                                <SelectItem value="Medication">Medication</SelectItem>
                                <SelectItem value="Treatment">Treatment</SelectItem>
                                <SelectItem value="Follow-up">Follow-up</SelectItem>
                                <SelectItem value="Documentation">Documentation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={newTask.description}
                              onChange={handleTaskChange}
                              rows={3}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                            ></textarea>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                              </label>
                              <input
                                type="date"
                                id="date"
                                name="date"
                                value={newTask.date}
                                onChange={handleTaskChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                              </label>
                              <Select value={newTask.priority} onValueChange={handlePriorityChange}>
                                <SelectTrigger className="w-full h-9 text-sm">
                                  <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Urgent">Urgent</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time
                              </label>
                              <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={newTask.startTime}
                                onChange={handleTaskChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                                End Time
                              </label>
                              <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={newTask.endTime}
                                onChange={handleTaskChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                                required
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={handleTaskSubmit}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Schedule Task
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTaskModalOpen(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 