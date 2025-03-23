import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Triage level types
type TriageLevel = 'All' | 'Critical' | 'Urgent' | 'Non-urgent';
type TriageSort = 'Newest' | 'Oldest' | 'Level: High to Low' | 'Level: Low to High';

// Triage case interface
interface TriageCase {
  id: string;
  patientId: string;
  patientName: string;
  level: 'Critical' | 'Urgent' | 'Non-urgent';
  chiefComplaint: string;
  vitalSigns: {
    temperature: string;
    heartRate: string;
    respiratoryRate: string;
    bloodPressure: string;
    oxygenSaturation: string;
  };
  painLevel: number;
  arrivalTime: string;
  status: 'Waiting' | 'In Assessment' | 'Completed';
  notes: string;
}

export default function TriageTab() {
  // State for filtering and sorting
  const [triageFilter, setTriageFilter] = useState<TriageLevel>('All');
  const [triageSort, setTriageSort] = useState<TriageSort>('Newest');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the triage assessment form
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessment, setAssessment] = useState({
    patientId: '',
    patientName: '',
    chiefComplaint: '',
    painLevel: 5,
    vitalSigns: {
      temperature: '',
      heartRate: '',
      respiratoryRate: '',
      bloodPressure: '',
      oxygenSaturation: '',
    },
    level: 'Urgent' as 'Critical' | 'Urgent' | 'Non-urgent',
    notes: ''
  });
  
  // Sample triage cases data
  const triageCases: TriageCase[] = [
    {
      id: 'TR001',
      patientId: 'PT001',
      patientName: 'John Smith',
      level: 'Urgent',
      chiefComplaint: 'Severe abdominal pain',
      vitalSigns: {
        temperature: '37.8°C',
        heartRate: '95 bpm',
        respiratoryRate: '18 breaths/min',
        bloodPressure: '140/90 mmHg',
        oxygenSaturation: '98%'
      },
      painLevel: 8,
      arrivalTime: '2023-03-23T08:45:00',
      status: 'In Assessment',
      notes: 'Patient reports pain started last night and has been increasing in severity'
    },
    {
      id: 'TR002',
      patientId: 'PT005',
      patientName: 'David Lee',
      level: 'Critical',
      chiefComplaint: 'Chest pain and shortness of breath',
      vitalSigns: {
        temperature: '37.2°C',
        heartRate: '110 bpm',
        respiratoryRate: '24 breaths/min',
        bloodPressure: '160/95 mmHg',
        oxygenSaturation: '93%'
      },
      painLevel: 9,
      arrivalTime: '2023-03-23T09:15:00',
      status: 'In Assessment',
      notes: 'Patient has history of hypertension and diabetes'
    },
    {
      id: 'TR003',
      patientId: 'PT003',
      patientName: 'Michael Brown',
      level: 'Non-urgent',
      chiefComplaint: 'Mild fever and sore throat',
      vitalSigns: {
        temperature: '38.1°C',
        heartRate: '82 bpm',
        respiratoryRate: '16 breaths/min',
        bloodPressure: '130/85 mmHg',
        oxygenSaturation: '99%'
      },
      painLevel: 3,
      arrivalTime: '2023-03-23T10:30:00',
      status: 'Waiting',
      notes: 'Symptoms began 2 days ago, no known exposures'
    },
    {
      id: 'TR004',
      patientId: 'PT004',
      patientName: 'Amanda Garcia',
      level: 'Urgent',
      chiefComplaint: 'Dizziness and nausea',
      vitalSigns: {
        temperature: '36.9°C',
        heartRate: '88 bpm',
        respiratoryRate: '17 breaths/min',
        bloodPressure: '100/70 mmHg',
        oxygenSaturation: '97%'
      },
      painLevel: 2,
      arrivalTime: '2023-03-23T11:20:00',
      status: 'Waiting',
      notes: 'Patient reports not having eaten since yesterday'
    }
  ];
  
  // Handle form input changes
  const handleAssessmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setAssessment(prev => {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: value
          }
        };
      }
      return { ...prev, [name]: value };
    });
  };
  
  // Handle select changes with shadcn UI
  const handleLevelChange = (value: string) => {
    setAssessment(prev => ({
      ...prev,
      level: value as 'Critical' | 'Urgent' | 'Non-urgent'
    }));
  };

  // Handle pain level change
  const handlePainLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssessment(prev => ({
      ...prev,
      painLevel: parseInt(e.target.value, 10)
    }));
  };
  
  // Handle submitting the triage assessment
  const handleSubmitTriage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted triage assessment:', assessment);
    setShowAssessment(false);
    // Here we would normally add the new triage case to the list
  };
  
  // Filter and sort cases
  const filteredCases = triageCases.filter(triageCase => {
    // Apply level filter
    if (triageFilter !== 'All' && triageCase.level !== triageFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        triageCase.patientName.toLowerCase().includes(searchLower) ||
        triageCase.patientId.toLowerCase().includes(searchLower) ||
        triageCase.chiefComplaint.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (triageSort) {
      case 'Newest':
        return new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime();
      case 'Oldest':
        return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
      case 'Level: High to Low':
        const levelOrder = { Critical: 3, Urgent: 2, 'Non-urgent': 1 };
        return levelOrder[b.level] - levelOrder[a.level];
      case 'Level: Low to High':
        const levelOrderReverse = { Critical: 3, Urgent: 2, 'Non-urgent': 1 };
        return levelOrderReverse[a.level] - levelOrderReverse[b.level];
      default:
        return 0;
    }
  });
  
  // Helper function to get the appropriate styling for triage level
  const getTriageLevelStyle = (level: TriageCase['level']) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Urgent':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Non-urgent':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Helper function to get the appropriate styling for triage status
  const getTriageStatusStyle = (status: TriageCase['status']) => {
    switch (status) {
      case 'Waiting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Assessment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Format date and time for display
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    // Use ISO format to avoid locale-specific date formatting issues
    return date.toISOString().split('T')[0] + ' ' + 
      date.toTimeString().split(' ')[0].substring(0, 5);
  };
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-gray-800">Triage Management</h3>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="w-full sm:w-auto">
              <Select value={triageFilter} onValueChange={(value) => setTriageFilter(value as TriageLevel)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Non-urgent">Non-urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <Select value={triageSort} onValueChange={(value) => setTriageSort(value as TriageSort)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Newest First</SelectItem>
                  <SelectItem value="Oldest">Oldest First</SelectItem>
                  <SelectItem value="Level: High to Low">Level: High to Low</SelectItem>
                  <SelectItem value="Level: Low to High">Level: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search patient or complaint..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAssessment(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex-shrink-0"
            >
              New Assessment
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {showAssessment ? (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">New Triage Assessment</h4>
              <form onSubmit={handleSubmitTriage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                      Patient ID
                    </label>
                    <input
                      type="text"
                      id="patientId"
                      name="patientId"
                      value={assessment.patientId}
                      onChange={handleAssessmentChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={assessment.patientName}
                      onChange={handleAssessmentChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="chiefComplaint" className="block text-sm font-medium text-gray-700 mb-1">
                    Chief Complaint
                  </label>
                  <input
                    type="text"
                    id="chiefComplaint"
                    name="chiefComplaint"
                    value={assessment.chiefComplaint}
                    onChange={handleAssessmentChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pain Level: {assessment.painLevel}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={assessment.painLevel}
                    onChange={handlePainLevelChange}
                    className="block w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 - No Pain</span>
                    <span>10 - Worst Pain</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="vitalSigns.temperature" className="block text-sm font-medium text-gray-700 mb-1">
                      Temperature
                    </label>
                    <input
                      type="text"
                      id="vitalSigns.temperature"
                      name="vitalSigns.temperature"
                      value={assessment.vitalSigns.temperature}
                      onChange={handleAssessmentChange}
                      placeholder="e.g., 37.0°C"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="vitalSigns.heartRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Heart Rate
                    </label>
                    <input
                      type="text"
                      id="vitalSigns.heartRate"
                      name="vitalSigns.heartRate"
                      value={assessment.vitalSigns.heartRate}
                      onChange={handleAssessmentChange}
                      placeholder="e.g., 72 bpm"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="vitalSigns.respiratoryRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Respiratory Rate
                    </label>
                    <input
                      type="text"
                      id="vitalSigns.respiratoryRate"
                      name="vitalSigns.respiratoryRate"
                      value={assessment.vitalSigns.respiratoryRate}
                      onChange={handleAssessmentChange}
                      placeholder="e.g., 16 breaths/min"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="vitalSigns.bloodPressure" className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      id="vitalSigns.bloodPressure"
                      name="vitalSigns.bloodPressure"
                      value={assessment.vitalSigns.bloodPressure}
                      onChange={handleAssessmentChange}
                      placeholder="e.g., 120/80 mmHg"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="vitalSigns.oxygenSaturation" className="block text-sm font-medium text-gray-700 mb-1">
                      Oxygen Saturation
                    </label>
                    <input
                      type="text"
                      id="vitalSigns.oxygenSaturation"
                      name="vitalSigns.oxygenSaturation"
                      value={assessment.vitalSigns.oxygenSaturation}
                      onChange={handleAssessmentChange}
                      placeholder="e.g., 98%"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                      Triage Level
                    </label>
                    <Select value={assessment.level} onValueChange={handleLevelChange}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Non-urgent">Non-urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={assessment.notes}
                    onChange={handleAssessmentChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAssessment(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Save Assessment
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chief Complaint
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Arrival Time
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCases.length > 0 ? (
                    filteredCases.map((triageCase) => (
                      <tr key={triageCase.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{triageCase.patientName}</div>
                              <div className="text-sm text-gray-500">{triageCase.patientId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getTriageLevelStyle(triageCase.level)}`}>
                            {triageCase.level}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">{triageCase.chiefComplaint}</div>
                          <div className="text-xs text-gray-500">
                            Pain Level: {triageCase.painLevel}/10
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDateTime(triageCase.arrivalTime)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getTriageStatusStyle(triageCase.status)}`}>
                            {triageCase.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Update</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                        No triage cases found with the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 