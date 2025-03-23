import React, { useState } from 'react';

interface Medication {
  id: string;
  name: string;
  patientId: string;
  patientName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Discontinued';
}

export default function MedicationsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [isAdministeringMed, setIsAdministeringMed] = useState(false);
  const [administeringMedId, setAdministeringMedId] = useState<string | null>(null);

  // Sample medications data
  const medications: Medication[] = [
    {
      id: 'MED001',
      name: 'Amoxicillin',
      patientId: 'PT001',
      patientName: 'John Smith',
      dosage: '500mg',
      frequency: 'Every 8 hours',
      startDate: '2023-03-20',
      endDate: '2023-03-27',
      instructions: 'Take with food to avoid stomach upset',
      status: 'Active'
    },
    {
      id: 'MED002',
      name: 'Lisinopril',
      patientId: 'PT002',
      patientName: 'Emily Johnson',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2023-03-15',
      endDate: '2023-06-15',
      instructions: 'Take in the morning',
      status: 'Active'
    },
    {
      id: 'MED003',
      name: 'Ibuprofen',
      patientId: 'PT003',
      patientName: 'Michael Brown',
      dosage: '400mg',
      frequency: 'Every 6 hours as needed for pain',
      startDate: '2023-03-22',
      endDate: '2023-03-29',
      instructions: 'Take with food to avoid stomach upset',
      status: 'Active'
    },
    {
      id: 'MED004',
      name: 'Aspirin',
      patientId: 'PT001',
      patientName: 'John Smith',
      dosage: '81mg',
      frequency: 'Once daily',
      startDate: '2023-03-20',
      endDate: '2023-09-20',
      instructions: 'Take with food to avoid stomach upset',
      status: 'Active'
    },
    {
      id: 'MED005',
      name: 'Prednisone',
      patientId: 'PT005',
      patientName: 'David Lee',
      dosage: '20mg',
      frequency: 'Once daily, tapering dose',
      startDate: '2023-03-19',
      endDate: '2023-03-26',
      instructions: 'Take in the morning with food',
      status: 'Active'
    }
  ];

  // Filter medications by search term and status
  const filteredMedications = medications.filter(med => {
    const matchesSearch = 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      med.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || med.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Medication['status']) => {
    switch (status) {
      case 'Active': return 'text-green-700 bg-green-100';
      case 'Completed': return 'text-blue-700 bg-blue-100';
      case 'On Hold': return 'text-yellow-700 bg-yellow-100';
      case 'Discontinued': return 'text-red-700 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const handleSelectMedication = (medId: string) => {
    setSelectedMedication(selectedMedication === medId ? null : medId);
  };

  const handleAdministerClick = (medId: string) => {
    setIsAdministeringMed(true);
    setAdministeringMedId(medId);
  };

  const handleAdministerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Medication administered', administeringMedId);
    setIsAdministeringMed(false);
    setAdministeringMedId(null);
  };

  const administeringMed = administeringMedId ? medications.find(m => m.id === administeringMedId) : null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-gray-800">Medications Management</h3>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-grow max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex-shrink-0"
            >
              Add Medication
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {isAdministeringMed && administeringMed && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-base font-medium text-blue-800">Administer Medication</h4>
                <button 
                  onClick={() => setIsAdministeringMed(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Close
                </button>
              </div>
              
              <form onSubmit={handleAdministerSubmit} className="space-y-4">
                <div className="bg-white p-3 rounded border border-blue-200 mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-gray-700 block">Patient</span>
                      <p className="font-medium">{administeringMed.patientName}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700 block">Medication</span>
                      <p className="font-medium">{administeringMed.name}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700 block">Dosage</span>
                      <p className="font-medium">{administeringMed.dosage}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700 block">Frequency</span>
                      <p className="font-medium">{administeringMed.frequency}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Date & Time Administered</label>
                    <input 
                      type="datetime-local" 
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Administered By</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      defaultValue="Nurse Jane" 
                      required 
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-800 mb-1">Notes</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                      rows={3}
                      placeholder="Enter any observations or side effects..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAdministeringMed(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Confirm Administration
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table for medium-large screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Medication</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Dosage</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Frequency</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Dates</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedications.map((med) => (
                  <tr key={med.id} className={selectedMedication === med.id ? 'bg-blue-50' : ''}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{med.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {med.patientName} <span className="text-xs text-gray-700">({med.patientId})</span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{med.dosage}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{med.frequency}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{med.startDate} - {med.endDate}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(med.status)}`}>
                        {med.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleAdministerClick(med.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Administer
                        </button>
                        <button 
                          onClick={() => handleSelectMedication(med.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedMedication === med.id ? 'Hide' : 'View'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile/small screens */}
          <div className="md:hidden space-y-4">
            {filteredMedications.map((med) => (
              <div key={med.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900">{med.name}</span>
                    <span className="ml-2 text-xs text-gray-700">{med.dosage}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(med.status)}`}>
                    {med.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="col-span-2">
                      <span className="text-xs text-gray-700">Patient</span>
                      <p className="text-gray-800">{med.patientName} ({med.patientId})</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-gray-700">Frequency</span>
                      <p className="text-gray-800">{med.frequency}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">Start Date</span>
                      <p className="text-gray-800">{med.startDate}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-700">End Date</span>
                      <p className="text-gray-800">{med.endDate}</p>
                    </div>
                  </div>
                  
                  {selectedMedication === med.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-700">Instructions</span>
                        <p className="text-gray-800">{med.instructions}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-3 pt-3 border-t border-gray-100 space-x-2">
                    <button 
                      onClick={() => handleAdministerClick(med.id)}
                      className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200"
                    >
                      Administer
                    </button>
                    <button 
                      onClick={() => handleSelectMedication(med.id)}
                      className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200"
                    >
                      {selectedMedication === med.id ? 'Hide Details' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Medication details for medium-large screens */}
          {selectedMedication && (
            <div className="hidden md:block mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-medium text-blue-800">Medication Details</h4>
                <button 
                  onClick={() => setSelectedMedication(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Close
                </button>
              </div>
              
              {(() => {
                const med = medications.find(m => m.id === selectedMedication);
                if (!med) return null;
                
                return (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Medication Information</h5>
                        <p className="text-sm mb-1"><span className="font-medium">Name:</span> {med.name}</p>
                        <p className="text-sm mb-1"><span className="font-medium">Dosage:</span> {med.dosage}</p>
                        <p className="text-sm"><span className="font-medium">Frequency:</span> {med.frequency}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Schedule</h5>
                        <p className="text-sm mb-1"><span className="font-medium">Start Date:</span> {med.startDate}</p>
                        <p className="text-sm mb-1"><span className="font-medium">End Date:</span> {med.endDate}</p>
                        <p className="text-sm">
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(med.status)}`}>
                            {med.status}
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Patient</h5>
                        <p className="text-sm mb-1"><span className="font-medium">Name:</span> {med.patientName}</p>
                        <p className="text-sm mb-1"><span className="font-medium">ID:</span> {med.patientId}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Instructions</h5>
                      <p className="text-sm bg-white p-3 rounded border border-blue-200">{med.instructions}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-blue-200 flex space-x-3">
                      <button 
                        onClick={() => handleAdministerClick(med.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded border border-blue-300 text-sm"
                      >
                        Administer Now
                      </button>
                      <button className="px-4 py-2 bg-white text-blue-600 rounded border border-blue-300 text-sm">
                        Update Medication
                      </button>
                      <button className="px-4 py-2 bg-white text-blue-600 rounded border border-blue-300 text-sm">
                        View History
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 