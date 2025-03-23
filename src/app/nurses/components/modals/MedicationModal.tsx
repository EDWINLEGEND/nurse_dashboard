import React from 'react';
import { Medication } from '../types';

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: Medication;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MedicationModal({ isOpen, onClose, medication, onChange, onSubmit }: MedicationModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Add New Medication</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
              <input 
                type="text" 
                name="name" 
                value={medication.name} 
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                placeholder="Medication name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select 
                name="patient" 
                value={medication.patient} 
                onChange={onChange}
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
                value={medication.dosage} 
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                placeholder="e.g. 500mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
              <input 
                type="text" 
                name="schedule" 
                value={medication.schedule} 
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm" 
                placeholder="e.g. 3x daily"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
              <select 
                name="route" 
                value={medication.route} 
                onChange={onChange}
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
                value={medication.startDate} 
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-3">
              <button 
                type="button" 
                onClick={onClose}
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
  );
} 