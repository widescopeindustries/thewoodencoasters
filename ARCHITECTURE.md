# AI Auto Mechanic App - Architecture

## Overview
An AI-powered automotive diagnostic assistant that democratizes mechanic knowledge by leveraging the Operation CHARM database (charm.li) - a collection of 50,000+ repair manuals covering vehicles from 1982-2013.

## Core Features

### 1. Intuitive Diagnosis Flow
- **Vehicle Selection**: Year, Make, Model selection
- **Symptom Description**: Natural language input for issues
- **AI-Guided Diagnosis**: Step-by-step troubleshooting
- **Interactive Q&A**: AI asks clarifying questions
- **Solution Recommendations**: Repair procedures and parts needed

### 2. Knowledge Base Integration
- Reference to charm.li repair manual database
- Links to specific manual sections
- Visual guides and diagrams
- OEM specifications and procedures

### 3. AI Assistant
- Powered by Claude API (Anthropic)
- Contextual understanding of automotive systems
- Progressive diagnosis methodology
- Safety warnings and professional advice

## Technical Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI, Lucide React icons
- **State Management**: Zustand
- **TypeScript**: Full type safety

### Backend
- **API Routes**: Next.js API routes
- **AI Integration**: Anthropic Claude API
- **Data Storage**: localStorage for session persistence
- **External API**: charm.li references and links

## User Flow

```
1. Landing Page
   ↓
2. Vehicle Selection (Year → Make → Model)
   ↓
3. Symptom Input (Natural language description)
   ↓
4. AI Analysis & Initial Assessment
   ↓
5. Interactive Diagnosis Session
   - AI asks clarifying questions
   - User provides answers
   - AI narrows down potential issues
   ↓
6. Diagnosis Results
   - Most likely causes
   - Repair procedures
   - Parts needed
   - Estimated difficulty
   - Safety considerations
   ↓
7. Detailed Repair Guide
   - Step-by-step instructions
   - Links to charm.li manuals
   - Visual aids
   - Tools required
```

## Data Models

### Vehicle
```typescript
interface Vehicle {
  year: number;
  make: string;
  model: string;
  engine?: string;
  transmission?: string;
}
```

### DiagnosisSession
```typescript
interface DiagnosisSession {
  id: string;
  vehicle: Vehicle;
  symptoms: string;
  conversation: Message[];
  status: 'active' | 'completed' | 'paused';
  diagnosis?: Diagnosis;
  createdAt: Date;
  updatedAt: Date;
}
```

### Message
```typescript
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'question' | 'diagnosis' | 'recommendation';
    relatedSystems?: string[];
  };
}
```

### Diagnosis
```typescript
interface Diagnosis {
  likelyCauses: DiagnosticIssue[];
  recommendedActions: RepairAction[];
  estimatedDifficulty: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  estimatedCost?: {
    min: number;
    max: number;
  };
  safetyWarnings: string[];
}
```

## API Endpoints

- `POST /api/diagnosis/start` - Initialize new diagnosis session
- `POST /api/diagnosis/chat` - Send message and get AI response
- `GET /api/diagnosis/[id]` - Retrieve diagnosis session
- `GET /api/vehicles/makes` - Get available makes
- `GET /api/vehicles/models?make=X&year=Y` - Get models for make/year
- `GET /api/charm/search` - Search charm.li database references

## Security & Privacy
- No persistent storage of user data
- Session data in browser localStorage only
- API keys stored securely in environment variables
- Rate limiting on AI API calls

## Future Enhancements
- Image upload for visual diagnosis
- OBD-II code interpretation
- Maintenance scheduling
- Cost estimation by region
- Community knowledge sharing
- Video tutorials integration
