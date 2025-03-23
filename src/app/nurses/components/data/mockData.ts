import { ChatMessage, PatientTriageData, DoctorCategory, Task, Medication } from '../types';

// Mock chat messages
export const chatMessages: ChatMessage[] = [
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
];

// Mock patient triage data
export const patientTriageData: PatientTriageData[] = [
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
];

// Mock doctor categories
export const doctorCategories: DoctorCategory[] = [
  { category: 'Cardiology', doctors: ['Dr. Sarah Wilson', 'Dr. Neha Varma'] },
  { category: 'Endocrinology', doctors: ['Dr. Aakash Menon'] },
  { category: 'Neurology', doctors: ['Dr. James Thompson'] },
  { category: 'Oncology', doctors: ['Dr. Emily Chen'] }
];

// Mock patients list
export const patientsList: string[] = ['Patient 001', 'Patient 003', 'Patient 005'];

// Default task
export const defaultTask: Task = {
  id: 'TSK000',
  title: 'New Task',
  patientId: 'PT001',
  patientName: 'John Smith',
  description: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '08:00',
  endTime: '08:15',
  priority: 'Medium',
  status: 'Upcoming'
};

// Default medication
export const defaultMedication: Medication = {
  id: 'MED000',
  name: '',
  patientId: 'PT001',
  patientName: 'John Smith',
  dosage: '',
  frequency: 'Once daily',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  instructions: '',
  status: 'Active'
};

// Default triage form
export const defaultTriageForm = {
  patientId: '',
  chiefComplaint: '',
  painLevel: '5',
  temperature: '',
  bloodPressure: '',
  heartRate: '',
  respiration: '',
  oxygenSaturation: '',
}; 