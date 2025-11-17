# AI Auto Mechanic

An AI-powered automotive diagnostic assistant that democratizes mechanic knowledge by providing expert-level vehicle diagnosis help to everyone. Powered by Claude AI and backed by the Operation CHARM database of 50,000+ repair manuals.

## Features

- **AI-Powered Diagnosis**: Interactive chat-based diagnosis flow using Claude AI
- **Comprehensive Vehicle Coverage**: Support for vehicles from 1982-2013 across 40+ brands
- **Operation CHARM Integration**: References to 50,000+ OEM repair manuals
- **Intuitive Flow**: Step-by-step guided diagnosis process
- **Expert Knowledge**: Professional-grade diagnostic methodology
- **Safety First**: AI provides safety warnings and recommends professional help when needed
- **Session Persistence**: Diagnosis sessions saved locally for later reference

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand with persistence
- **AI**: Anthropic Claude API (Claude 3.5 Sonnet)
- **TypeScript**: Full type safety throughout
- **UI Components**: Headless UI, Lucide React icons

## Getting Started

### Prerequisites

- Node.js 20 or later
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd thewoodencoasters
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Anthropic API key to `.env.local`:
```env
ANTHROPIC_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Starting a Diagnosis

1. Navigate to the home page and click "Start Diagnosis"
2. Select your vehicle (Year, Make, Model)
3. Describe your symptoms in detail
4. Engage with the AI assistant through interactive Q&A
5. Receive diagnosis results and repair recommendations

### How It Works

The AI diagnostic assistant uses a systematic approach:

1. **Information Gathering**: Asks clarifying questions about symptoms
2. **System Identification**: Narrows down affected vehicle systems
3. **Diagnostic Testing**: Guides through logical diagnostic steps
4. **Solution Recommendation**: Provides repair procedures, parts needed, and difficulty estimates
5. **Safety Considerations**: Warns about risks and when to seek professional help

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── diagnosis/chat/     # AI chat endpoint
│   │   └── vehicles/           # Vehicle data endpoints
│   ├── diagnosis/              # Main diagnosis interface
│   └── page.tsx                # Landing page
├── components/
│   ├── DiagnosisChat.tsx       # Chat interface
│   ├── VehicleSelector.tsx     # Vehicle selection form
│   ├── Header.tsx              # Navigation header
│   └── Footer.tsx              # Footer component
├── lib/
│   ├── data/
│   │   └── vehicles.ts         # Vehicle database
│   ├── store/
│   │   └── diagnosis.ts        # State management
│   └── types/
│       └── diagnosis.ts        # TypeScript types
└── ARCHITECTURE.md             # Detailed architecture docs
```

## API Endpoints

- `POST /api/diagnosis/chat` - Send message to AI and get response
- `GET /api/vehicles/years` - Get available vehicle years
- `GET /api/vehicles/makes` - Get available vehicle makes
- `GET /api/vehicles/models?make=X` - Get models for a specific make

## Development

### Running Pursuit Agents

This project includes quality monitoring agents:

```bash
npm run pursuit           # Run all pursuit agents
npm run pursuit:quality   # Code quality guardian
npm run pursuit:test      # Test enforcer
npm run pursuit:perf      # Performance & accessibility checker
```

### Building for Production

```bash
npm run build
npm run start
```

## About Operation CHARM

[Operation CHARM](https://charm.li) (Collection of High-quality Auto Repair Manuals) is a free database cataloging repair manuals for nearly all car brands from 1982 to 2013. It includes over 50,000 repair manuals covering 40+ brands including:

- Domestic: Chevrolet, Ford, Dodge, GMC, Jeep, etc.
- Asian: Toyota, Honda, Nissan, Mazda, Subaru, etc.
- European: BMW, Audi, Mercedes-Benz, Volkswagen, Volvo, etc.

This AI assistant references CHARM's extensive knowledge base to provide accurate, manufacturer-grade repair information.

## Limitations & Disclaimers

- **Knowledge Cutoff**: AI knowledge is current as of January 2025
- **Vehicle Coverage**: CHARM database covers 1982-2013 vehicles primarily
- **Not a Replacement**: This tool assists with diagnosis but doesn't replace professional mechanics
- **Safety Critical**: Always consult a professional for safety-critical repairs
- **No Warranty**: Diagnoses and recommendations are provided as-is without warranty

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Acknowledgments

- **Anthropic** for the Claude AI API
- **Operation CHARM** for democratizing access to repair manuals
- The automotive DIY community for inspiration

---

**Built with passion to democratize automotive knowledge and empower DIY mechanics everywhere.**
