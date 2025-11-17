// Core types for the AI Auto Mechanic diagnosis system

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  engine?: string;
  transmission?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'question' | 'diagnosis' | 'recommendation' | 'clarification';
    relatedSystems?: string[];
    confidence?: number;
  };
}

export interface DiagnosticIssue {
  name: string;
  description: string;
  likelihood: 'very-high' | 'high' | 'medium' | 'low';
  affectedSystems: string[];
  symptoms: string[];
  diagnosticSteps: string[];
  charmLink?: string; // Link to relevant charm.li manual section
}

export interface RepairAction {
  title: string;
  description: string;
  steps: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  estimatedTime?: string;
  requiredTools: string[];
  requiredParts?: string[];
  safetyWarnings: string[];
  charmReference?: string;
}

export interface Diagnosis {
  likelyCauses: DiagnosticIssue[];
  recommendedActions: RepairAction[];
  estimatedDifficulty: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  estimatedCost?: {
    min: number;
    max: number;
    currency: string;
  };
  safetyWarnings: string[];
  professionalRecommendation?: boolean;
  additionalNotes?: string;
}

export type DiagnosisStatus = 'gathering-info' | 'analyzing' | 'diagnosed' | 'completed';

export interface DiagnosisSession {
  id: string;
  vehicle: Vehicle;
  initialSymptoms: string;
  conversation: Message[];
  status: DiagnosisStatus;
  diagnosis?: Diagnosis;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleDatabase {
  makes: string[];
  modelsByMake: Record<string, string[]>;
  yearRange: {
    min: number;
    max: number;
  };
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  vehicle: Vehicle;
  conversationHistory: Message[];
}

export interface ChatResponse {
  message: Message;
  status: DiagnosisStatus;
  diagnosis?: Diagnosis;
  suggestedQuestions?: string[];
}
