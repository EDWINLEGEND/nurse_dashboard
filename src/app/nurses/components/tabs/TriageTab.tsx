import React, { useState } from 'react';
import { TriageForm, TriageLevel, PatientTriageData } from '../types';
import { patientTriageData as mockPatientTriageData, defaultTriageForm } from '../data/mockData';

export default function TriageTab() {
  const [triageFilter, setTriageFilter] = useState('All Levels');
  const [triageSort, setTriageSort] = useState('Level');
  const [patientTriageData] = useState<PatientTriageData[]>(mockPatientTriageData);
  const [triageForm, setTriageForm] = useState<TriageForm>(defaultTriageForm);
  const [suggestedTriageLevel, setSuggestedTriageLevel] = useState<TriageLevel | null>(null);

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
    setTriageForm(defaultTriageForm);
    setSuggestedTriageLevel(null);
  };

  return (
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
  );
} 