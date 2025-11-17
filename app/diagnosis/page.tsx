'use client';

import { useState } from 'react';
import { useDiagnosisStore } from '@/lib/store/diagnosis';
import VehicleSelector from '@/components/VehicleSelector';
import DiagnosisChat from '@/components/DiagnosisChat';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types/diagnosis';

export default function DiagnosisPage() {
  const [step, setStep] = useState<'vehicle' | 'symptoms' | 'chat'>('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [symptoms, setSymptoms] = useState('');

  const { startNewSession, currentSession } = useDiagnosisStore();

  const handleVehicleSelected = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleStartDiagnosis = () => {
    if (selectedVehicle && symptoms.trim()) {
      startNewSession(selectedVehicle, symptoms);
      setStep('chat');
    }
  };

  const handleNewDiagnosis = () => {
    setStep('vehicle');
    setSelectedVehicle(null);
    setSymptoms('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            AI Diagnostic Assistant
          </h1>
          <p className="text-gray-400">
            Get expert help diagnosing your vehicle issues
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { key: 'vehicle', label: 'Vehicle Info' },
              { key: 'symptoms', label: 'Symptoms' },
              { key: 'chat', label: 'Diagnosis' },
            ].map((s, idx) => (
              <div key={s.key} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s.key
                        ? 'bg-amber-600 text-white'
                        : step === 'chat' && idx < 2
                        ? 'bg-green-600 text-white'
                        : step === 'symptoms' && idx < 1
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {(step === 'chat' && idx < 2) ||
                    (step === 'symptoms' && idx < 1) ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      step === s.key ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className="w-12 h-0.5 bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 'vehicle' && (
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Select Your Vehicle
              </h2>
              <VehicleSelector
                onVehicleSelected={handleVehicleSelected}
                initialVehicle={selectedVehicle || undefined}
              />
              <button
                onClick={() => setStep('symptoms')}
                disabled={!selectedVehicle}
                className="mt-6 w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'symptoms' && (
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Describe the Problem
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What symptoms are you experiencing?
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={6}
                    placeholder="Example: My car makes a squealing noise when I turn left, especially at low speeds. The noise started about a week ago and seems to be getting worse. I also notice the steering feels slightly rough."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Be as detailed as possible. Include when it happens, how often, any recent changes, etc.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('vehicle')}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleStartDiagnosis}
                    disabled={!symptoms.trim()}
                    className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    Start Diagnosis
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'chat' && currentSession && (
            <div>
              <DiagnosisChat />
              <button
                onClick={handleNewDiagnosis}
                className="mt-4 w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Start New Diagnosis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
