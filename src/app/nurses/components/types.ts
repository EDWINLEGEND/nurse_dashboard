// Type definitions for the Nurse Dashboard

// Web Speech API types
export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  0: SpeechRecognitionAlternative;
  length: number;
}

export interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Window interface extension for SpeechRecognition
export interface WindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

// Structured data type for formatted transcript
export interface FormattedData {
  symptoms: string[];
  observations: string[];
  vitals: string[];
  plans: string[];
}

// Triage level type
export interface TriageLevel {
  level: number;
  text: string;
  color: string;
}

// Navigation Tab
export interface Tab {
  id: string;
  name: string;
  icon: string;
}

// Task
export interface Task {
  id: string;
  title: string;
  patientId: string;
  patientName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Canceled';
  assignedTo?: string;
}

// Medication
export interface Medication {
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

// Triage form type
export interface TriageForm {
  patientId: string;
  chiefComplaint: string;
  painLevel: string;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  respiration: string;
  oxygenSaturation: string;
}

// Chat message type
export interface ChatMessage {
  sender: 'doctor' | 'nurse' | 'system';
  name?: string;
  avatar?: string;
  text: string;
  time?: string;
  suggestion?: {
    text: string;
    action: string;
  };
}

// Patient triage data type
export interface PatientTriageData {
  id: string;
  level: number;
  levelText: string;
  description: string;
  color: string;
  complaint: string;
  vitals: string;
  time: string;
  status: string;
}

// Doctor category type
export interface DoctorCategory {
  category: string;
  doctors: string[];
}

// Patient
export interface Patient {
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

// Vital Sign
export interface VitalSign {
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