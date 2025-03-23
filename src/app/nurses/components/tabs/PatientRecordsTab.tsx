import React, { useState } from 'react';

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  roomNumber: string;
  diagnosis: string;
  admissionDate: string;
  doctor: string;
  status: 'Stable' | 'Critical' | 'Improving' | 'Deteriorating';
  allergies: string[];
  medicalHistory: string;
}

export default function PatientRecordsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showPatientDetails, setShowPatientDetails] = useState<string | null>(null);

  // Sample patient data
  const patients: PatientRecord[] = [
    {
      id: 'PT001',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      roomNumber: '203',
      diagnosis: 'Pneumonia',
      admissionDate: '2023-03-20',
      doctor: 'Dr. Sarah Wilson',
      status: 'Improving',
      allergies: ['Penicillin', 'Sulfa drugs'],
      medicalHistory: 'Asthma, Hypertension'
    },
    {
      id: 'PT002',
      name: 'Emily Johnson',
      age: 62,
      gender: 'Female',
      roomNumber: '105',
      diagnosis: 'Congestive Heart Failure',
      admissionDate: '2023-03-15',
      doctor: 'Dr. James Thompson',
      status: 'Stable',
      allergies: ['Latex'],
      medicalHistory: 'Diabetes Type 2, Coronary Artery Disease'
    },
    {
      id: 'PT003',
      name: 'Michael Brown',
      age: 32,
      gender: 'Male',
      roomNumber: '311',
      diagnosis: 'Appendicitis - Post-surgery',
      admissionDate: '2023-03-22',
      doctor: 'Dr. Sarah Wilson',
      status: 'Improving',
      allergies: [],
      medicalHistory: 'None'
    },
    {
      id: 'PT004',
      name: 'Amanda Garcia',
      age: 54,
      gender: 'Female',
      roomNumber: '218',
      diagnosis: 'Stroke',
      admissionDate: '2023-03-18',
      doctor: 'Dr. James Thompson',
      status: 'Critical',
      allergies: ['Aspirin', 'Codeine'],
      medicalHistory: 'Hypertension, Previous TIA'
    },
    {
      id: 'PT005',
      name: 'David Lee',
      age: 70,
      gender: 'Male',
      roomNumber: '124',
      diagnosis: 'COPD Exacerbation',
      admissionDate: '2023-03-19',
      doctor: 'Dr. Sarah Wilson',
      status: 'Deteriorating',
      allergies: ['Sulfa drugs'],
      medicalHistory: 'COPD, Emphysema, Former smoker'
    }
  ];

  // Filter patients by search term and status
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: PatientRecord['status']) => {
    switch (status) {
      case 'Stable': return 'text-green-700 bg-green-100';
      case 'Improving': return 'text-blue-700 bg-blue-100';
      case 'Critical': return 'text-red-700 bg-red-100';
      case 'Deteriorating': return 'text-orange-700 bg-orange-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const handlePatientSelect = (patientId: string) => {
    setShowPatientDetails(showPatientDetails === patientId ? null : patientId);
  };

  const selectedPatient = showPatientDetails ? patients.find(p => p.id === showPatientDetails) : null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-gray-700">Patient Records</h3>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-grow max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search patients..."
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
              <option value="Stable">Stable</option>
              <option value="Improving">Improving</option>
              <option value="Critical">Critical</option>
              <option value="Deteriorating">Deteriorating</option>
            </select>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {/* Table for medium-large screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className={showPatientDetails === patient.id ? 'bg-blue-50' : ''}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{patient.id}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">{patient.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age} / {patient.gender}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{patient.roomNumber}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{patient.diagnosis}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{patient.doctor}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                      <button 
                        onClick={() => handlePatientSelect(patient.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {showPatientDetails === patient.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile/small screens */}
          <div className="md:hidden space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-800">{patient.name}</span>
                    <span className="ml-2 text-xs text-gray-500">{patient.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <span className="text-xs text-gray-500">Age/Gender</span>
                      <p className="text-gray-700">{patient.age} / {patient.gender}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Room</span>
                      <p className="text-gray-700">{patient.roomNumber}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-gray-500">Diagnosis</span>
                      <p className="text-gray-700">{patient.diagnosis}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-gray-500">Doctor</span>
                      <p className="text-gray-700">{patient.doctor}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handlePatientSelect(patient.id)}
                      className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200"
                    >
                      {showPatientDetails === patient.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>
                
                {/* Expandable details section */}
                {showPatientDetails === patient.id && (
                  <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Patient Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-xs text-gray-500 block">Admission Date</span>
                        <p className="text-gray-700">{patient.admissionDate}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">Allergies</span>
                        <p className="text-gray-700">
                          {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">Medical History</span>
                        <p className="text-gray-700">{patient.medicalHistory}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-100 flex space-x-2">
                      <button className="px-3 py-1.5 text-xs bg-white text-blue-600 rounded border border-blue-200">
                        Update Record
                      </button>
                      <button className="px-3 py-1.5 text-xs bg-white text-blue-600 rounded border border-blue-200">
                        View Chart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Patient details panel for medium-large screens */}
          {showPatientDetails && selectedPatient && (
            <div className="hidden md:block mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-blue-800">Patient Details: {selectedPatient.name}</h4>
                <button 
                  onClick={() => setShowPatientDetails(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Admission Information</h5>
                  <p className="text-sm mb-1"><span className="font-medium">Date:</span> {selectedPatient.admissionDate}</p>
                  <p className="text-sm mb-1"><span className="font-medium">Room:</span> {selectedPatient.roomNumber}</p>
                  <p className="text-sm"><span className="font-medium">Doctor:</span> {selectedPatient.doctor}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Medical Information</h5>
                  <p className="text-sm mb-1"><span className="font-medium">Diagnosis:</span> {selectedPatient.diagnosis}</p>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Allergies:</span> {selectedPatient.allergies.length > 0 ? selectedPatient.allergies.join(', ') : 'None'}
                  </p>
                  <p className="text-sm"><span className="font-medium">Medical History:</span> {selectedPatient.medicalHistory}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-1">Current Status</h5>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                  </p>
                  <p className="text-sm mb-1"><span className="font-medium">Last Updated:</span> Today, 9:30 AM</p>
                  <p className="text-sm"><span className="font-medium">Care Plan:</span> Regular monitoring</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200 flex space-x-3">
                <button className="px-4 py-2 bg-white text-blue-600 rounded border border-blue-300 text-sm">
                  Update Record
                </button>
                <button className="px-4 py-2 bg-white text-blue-600 rounded border border-blue-300 text-sm">
                  View Chart
                </button>
                <button className="px-4 py-2 bg-white text-blue-600 rounded border border-blue-300 text-sm">
                  Add Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 