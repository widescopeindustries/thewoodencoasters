'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '@/lib/types/diagnosis';

interface VehicleSelectorProps {
  onVehicleSelected: (vehicle: Vehicle) => void;
  initialVehicle?: Vehicle;
}

export default function VehicleSelector({ onVehicleSelected, initialVehicle }: VehicleSelectorProps) {
  const [years, setYears] = useState<number[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const [selectedYear, setSelectedYear] = useState<number | null>(initialVehicle?.year || null);
  const [selectedMake, setSelectedMake] = useState<string>(initialVehicle?.make || '');
  const [selectedModel, setSelectedModel] = useState<string>(initialVehicle?.model || '');

  // Load years and makes on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/vehicles/years').then((r) => r.json()),
      fetch('/api/vehicles/makes').then((r) => r.json()),
    ]).then(([yearsData, makesData]) => {
      setYears(yearsData.years);
      setMakes(makesData.makes);
    });
  }, []);

  // Load models when make is selected
  useEffect(() => {
    if (selectedMake) {
      fetch(`/api/vehicles/models?make=${encodeURIComponent(selectedMake)}`)
        .then((r) => r.json())
        .then((data) => {
          setModels(data.models);
        });
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedMake]);

  // Notify parent when vehicle is complete
  useEffect(() => {
    if (selectedYear && selectedMake && selectedModel) {
      onVehicleSelected({
        year: selectedYear,
        make: selectedMake,
        model: selectedModel,
      });
    }
  }, [selectedYear, selectedMake, selectedModel, onVehicleSelected]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
          Year
        </label>
        <select
          id="year"
          value={selectedYear || ''}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="make" className="block text-sm font-medium text-gray-300 mb-2">
          Make
        </label>
        <select
          id="make"
          value={selectedMake}
          onChange={(e) => {
            setSelectedMake(e.target.value);
            setSelectedModel('');
          }}
          disabled={!selectedYear}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">
          Model
        </label>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedMake}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
