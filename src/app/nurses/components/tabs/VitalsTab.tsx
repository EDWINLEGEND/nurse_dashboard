import React, { useState } from 'react';

interface VitalSign {
  id: string;
  patientId: string;
  patientName: string;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  respiration: string;
  oxygenSaturation: string;
  painLevel: string;
  recordedAt: string;
  recordedBy: string;
}

export default function VitalsTab() {
  const [selectedPatient, setSelectedPatient] = useState('All Patients');
  const [isRecordingVitals, setIsRecordingVitals] = useState(false);
  const [vitalForm, setVitalForm] = useState({
    patientId: '',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiration: '',
    oxygenSaturation: '',
    painLevel: '0',
    notes: ''
  });

  const patients = [
    { id: 'PT001', name: 'John Smith' },
    { id: 'PT002', name: 'Emily Johnson' },
    { id: 'PT003', name: 'Michael Brown' },
    { id: 'PT004', name: 'Amanda Garcia' },
    { id: 'PT005', name: 'David Lee' }
  ];

  const vitalSigns: VitalSign[] = [
    {
      id: 'V001',
      patientId: 'PT001',
      patientName: 'John Smith',
      temperature: '98.6°F',
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      respiration: '16/min',
      oxygenSaturation: '98%',
      painLevel: '2',
      recordedAt: '2023-03-23 08:00 AM',
      recordedBy: 'Nurse Jane'
    },
    {
      id: 'V002',
      patientId: 'PT002',
      patientName: 'Emily Johnson',
      temperature: '99.1°F',
      bloodPressure: '118/75 mmHg',
      heartRate: '78 bpm',
      respiration: '18/min',
      oxygenSaturation: '97%',
      painLevel: '3',
      recordedAt: '2023-03-23 08:15 AM',
      recordedBy: 'Nurse Jane'
    },
    {
      id: 'V003',
      patientId: 'PT003',
      patientName: 'Michael Brown',
      temperature: '98.8°F',
      bloodPressure: '135/85 mmHg',
      heartRate: '80 bpm',
      respiration: '17/min',
      oxygenSaturation: '96%',
      painLevel: '1',
      recordedAt: '2023-03-23 08:30 AM',
      recordedBy: 'Nurse Jane'
    },
    {
      id: 'V004',
      patientId: 'PT001',
      patientName: 'John Smith',
      temperature: '98.8°F',
      bloodPressure: '125/82 mmHg',
      heartRate: '75 bpm',
      respiration: '16/min',
      oxygenSaturation: '98%',
      painLevel: '1',
      recordedAt: '2023-03-22 08:00 AM',
      recordedBy: 'Nurse Jane'
    }
  ];

  const filteredVitals = selectedPatient === 'All Patients' 
    ? vitalSigns 
    : vitalSigns.filter(vital => vital.patientId === selectedPatient);
  
  // Handle vital form changes
  const handleVitalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVitalForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle vital form submission
  const handleVitalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New vital signs recorded:', vitalForm);
    setIsRecordingVitals(false);
    setVitalForm({
      patientId: '',
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      respiration: '',
      oxygenSaturation: '',
      painLevel: '0',
      notes: ''
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-gray-800">Vitals Monitoring</h3>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <select
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="All Patients">All Patients</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} ({patient.id})
                </option>
              ))}
            </select>
            <button 
              onClick={() => setIsRecordingVitals(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex-shrink-0"
            >
              Record Vitals
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {isRecordingVitals ? (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="text-base font-medium text-blue-800 mb-3">Record New Vital Signs</h4>
              <form onSubmit={handleVitalFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-800 mb-1">Patient</label>
                    <select 
                      name="patientId" 
                      value={vitalForm.patientId} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Temperature</label>
                    <input 
                      type="text" 
                      name="temperature" 
                      value={vitalForm.temperature} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      placeholder="e.g. 98.6°F" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Blood Pressure</label>
                    <input 
                      type="text" 
                      name="bloodPressure" 
                      value={vitalForm.bloodPressure} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      placeholder="e.g. 120/80 mmHg" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Heart Rate</label>
                    <input 
                      type="text" 
                      name="heartRate" 
                      value={vitalForm.heartRate} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      placeholder="e.g. 72 bpm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Respiration Rate</label>
                    <input 
                      type="text" 
                      name="respiration" 
                      value={vitalForm.respiration} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      placeholder="e.g. 16/min" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Oxygen Saturation</label>
                    <input 
                      type="text" 
                      name="oxygenSaturation" 
                      value={vitalForm.oxygenSaturation} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      placeholder="e.g. 98%" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Pain Level (0-10)</label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        name="painLevel" 
                        value={vitalForm.painLevel} 
                        onChange={handleVitalFormChange}
                        min="0" 
                        max="10" 
                        className="w-full" 
                      />
                      <span className="ml-2 w-6 text-center">{vitalForm.painLevel}</span>
                    </div>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-800 mb-1">Notes</label>
                    <textarea 
                      name="notes" 
                      value={vitalForm.notes} 
                      onChange={handleVitalFormChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      rows={3}
                      placeholder="Any additional observations..."
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setIsRecordingVitals(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save Vitals
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          <h4 className="text-base font-medium text-gray-800 mb-3">Vital Signs History</h4>
          
          {/* Table for medium-large screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Temp</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">BP</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">HR</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">RR</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">O2</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pain</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVitals.map((vital) => (
                  <tr key={vital.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{vital.patientName}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{vital.recordedAt}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{vital.temperature}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{vital.bloodPressure}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{vital.heartRate}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{vital.respiration}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{vital.oxygenSaturation}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded-full mr-2"></div>
                        <span>{vital.painLevel}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile/small screens */}
          <div className="md:hidden space-y-4">
            {filteredVitals.map((vital) => (
              <div key={vital.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex justify-between items-center">
                  <span className="font-medium text-gray-900">{vital.patientName}</span>
                  <span className="text-xs text-gray-700">{vital.recordedAt}</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-xs text-gray-700">Temp</span>
                      <p className="text-gray-800">{vital.temperature}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">BP</span>
                      <p className="text-gray-800">{vital.bloodPressure}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">HR</span>
                      <p className="text-gray-800">{vital.heartRate}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">RR</span>
                      <p className="text-gray-800">{vital.respiration}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">O2</span>
                      <p className="text-gray-800">{vital.oxygenSaturation}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">Pain</span>
                      <div className="flex items-center">
                        <div className="w-6 h-3 bg-gradient-to-r from-green-500 to-red-500 rounded-full mr-1"></div>
                        <p className="text-gray-800">{vital.painLevel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                    <button className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 