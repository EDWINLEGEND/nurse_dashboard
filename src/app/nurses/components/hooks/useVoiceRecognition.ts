import { useState, useEffect, useCallback } from 'react';
import { WindowWithSpeech, SpeechRecognitionEvent, FormattedData } from '../types';

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if browser supports SpeechRecognition
      const windowWithSpeech = window as WindowWithSpeech;
      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onstart = () => {
          setIsListening(true);
          setError('');
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        recognitionInstance.onerror = (event: SpeechRecognitionEvent) => {
          setError(event.error);
          setIsListening(false);
        };
        
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const currentTranscript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          setTranscript(prev => prev + ' ' + currentTranscript);
        };
        
        setRecognition(recognitionInstance);
      } else {
        setError('Browser does not support speech recognition.');
      }
    }
  }, []);
  
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);
  
  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript('');
      recognition.start();
    }
  }, [recognition]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);
  
  // Format transcript for clinical use
  const formatTranscript = useCallback((rawTranscript: string): FormattedData => {
    if (!rawTranscript) return {
      symptoms: [],
      observations: [],
      vitals: [],
      plans: []
    };
    
    // Split into sentences
    const sentences = rawTranscript.split(/[.!?]+/).filter((sentence: string) => sentence.trim().length > 0);
    
    // Group by potential clinical categories
    const formattedText: FormattedData = {
      symptoms: [],
      observations: [],
      vitals: [],
      plans: []
    };
    
    // Simple rule-based categorization
    sentences.forEach((sentence: string) => {
      const lowerSentence = sentence.toLowerCase().trim();
      
      if (lowerSentence.includes('complain') || 
          lowerSentence.includes('pain') || 
          lowerSentence.includes('report') ||
          lowerSentence.includes('symptom')) {
        formattedText.symptoms.push(sentence.trim());
      } else if (lowerSentence.includes('vital') || 
                lowerSentence.includes('bp') || 
                lowerSentence.includes('temperature') ||
                lowerSentence.includes('pulse') ||
                lowerSentence.includes('heart rate')) {
        formattedText.vitals.push(sentence.trim());
      } else if (lowerSentence.includes('plan') || 
                lowerSentence.includes('recommend') || 
                lowerSentence.includes('advised') ||
                lowerSentence.includes('should')) {
        formattedText.plans.push(sentence.trim());
      } else {
        formattedText.observations.push(sentence.trim());
      }
    });
    
    return formattedText;
  }, []);
  
  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    formatTranscript
  };
} 