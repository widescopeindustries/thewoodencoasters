// Vehicle database - aligned with charm.li coverage (1982-2013)
// This is a representative subset; can be expanded with full database

export const VEHICLE_YEARS = Array.from(
  { length: 2013 - 1982 + 1 },
  (_, i) => 2013 - i
);

export const VEHICLE_MAKES = [
  'Acura',
  'Audi',
  'BMW',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Ford',
  'GMC',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jeep',
  'Kia',
  'Lexus',
  'Lincoln',
  'Mazda',
  'Mercedes-Benz',
  'Mercury',
  'Mitsubishi',
  'Nissan',
  'Oldsmobile',
  'Plymouth',
  'Pontiac',
  'Porsche',
  'Ram',
  'Saab',
  'Saturn',
  'Subaru',
  'Suzuki',
  'Toyota',
  'Volkswagen',
  'Volvo',
].sort();

// Common models by make - expandable
export const MODELS_BY_MAKE: Record<string, string[]> = {
  'Acura': ['Integra', 'Legend', 'TL', 'CL', 'RL', 'MDX', 'TSX', 'RDX', 'RSX'],
  'Audi': ['A4', 'A6', 'A8', 'Q5', 'Q7', 'TT', 'A3', 'S4', 'allroad'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'Z4', 'M3', 'M5'],
  'Buick': ['Century', 'LeSabre', 'Park Avenue', 'Regal', 'Riviera', 'Enclave', 'Lucerne'],
  'Cadillac': ['DeVille', 'Eldorado', 'Seville', 'CTS', 'SRX', 'Escalade', 'DTS'],
  'Chevrolet': [
    'Blazer', 'Camaro', 'Caprice', 'Cavalier', 'Corvette', 'Impala', 'Malibu',
    'Monte Carlo', 'S-10', 'Silverado', 'Suburban', 'Tahoe', 'Trailblazer',
    'Avalanche', 'Colorado', 'Equinox', 'HHR', 'Cobalt', 'Traverse'
  ],
  'Chrysler': ['300', 'Concorde', 'LeBaron', 'New Yorker', 'Sebring', 'Town & Country', 'PT Cruiser', 'Pacifica'],
  'Dodge': [
    'Caravan', 'Dakota', 'Durango', 'Intrepid', 'Neon', 'Ram 1500', 'Ram 2500',
    'Ram 3500', 'Stratus', 'Viper', 'Charger', 'Magnum', 'Caliber', 'Avenger', 'Journey'
  ],
  'Ford': [
    'Bronco', 'Crown Victoria', 'E-150', 'E-250', 'E-350', 'Econoline', 'Escort',
    'Expedition', 'Explorer', 'F-150', 'F-250', 'F-350', 'Focus', 'Fusion',
    'Mustang', 'Ranger', 'Taurus', 'Thunderbird', 'Windstar', 'Edge', 'Escape', 'Flex'
  ],
  'GMC': ['Jimmy', 'Safari', 'Sierra', 'Sonoma', 'Suburban', 'Yukon', 'Envoy', 'Canyon', 'Acadia', 'Terrain'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'Element', 'Fit', 'Odyssey', 'Pilot', 'Prelude', 'Ridgeline', 'S2000'],
  'Hyundai': ['Accent', 'Elantra', 'Santa Fe', 'Sonata', 'Tiburon', 'Tucson', 'Genesis', 'Azera'],
  'Infiniti': ['G35', 'G37', 'I30', 'M35', 'M45', 'Q45', 'QX4', 'QX56', 'FX35', 'FX45'],
  'Jeep': ['Cherokee', 'Grand Cherokee', 'Liberty', 'Wrangler', 'Commander', 'Compass', 'Patriot'],
  'Kia': ['Optima', 'Rio', 'Sedona', 'Sephia', 'Sorento', 'Spectra', 'Sportage', 'Soul'],
  'Lexus': ['ES 300', 'ES 330', 'GS 300', 'GS 400', 'IS 300', 'LS 400', 'LS 430', 'RX 300', 'RX 330', 'GX 470'],
  'Lincoln': ['Continental', 'LS', 'Mark VIII', 'Navigator', 'Town Car', 'MKX', 'MKZ'],
  'Mazda': ['323', '626', '929', 'B-Series', 'Miata', 'MPV', 'MX-5', 'Protege', 'RX-7', 'RX-8', 'Tribute', 'Mazda3', 'Mazda6', 'CX-7', 'CX-9'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'ML-Class', 'GL-Class', 'CLK-Class', 'SL-Class', 'SLK-Class'],
  'Mercury': ['Grand Marquis', 'Sable', 'Mountaineer', 'Mariner', 'Milan'],
  'Mitsubishi': ['Eclipse', 'Galant', 'Lancer', 'Mirage', 'Montero', 'Outlander', 'Endeavor'],
  'Nissan': [
    '240SX', '300ZX', 'Altima', 'Frontier', 'Maxima', 'Pathfinder', 'Quest',
    'Sentra', 'Titan', 'Xterra', '350Z', '370Z', 'Murano', 'Armada', 'Versa', 'Rogue'
  ],
  'Oldsmobile': ['88', '98', 'Achieva', 'Alero', 'Aurora', 'Bravada', 'Cutlass', 'Intrigue', 'Silhouette'],
  'Plymouth': ['Acclaim', 'Breeze', 'Grand Voyager', 'Neon', 'Voyager'],
  'Pontiac': ['Bonneville', 'Firebird', 'Grand Am', 'Grand Prix', 'Sunfire', 'Trans Am', 'Vibe', 'G6', 'Solstice', 'Torrent'],
  'Porsche': ['911', '928', '944', '968', 'Boxster', 'Cayenne', 'Cayman'],
  'Ram': ['1500', '2500', '3500'],
  'Saab': ['9-3', '9-5', '900', '9000'],
  'Saturn': ['Aura', 'Ion', 'L-Series', 'Outlook', 'Sky', 'Vue'],
  'Subaru': ['Baja', 'Forester', 'Impreza', 'Legacy', 'Outback', 'Tribeca', 'WRX'],
  'Suzuki': ['Esteem', 'Forenza', 'Grand Vitara', 'Reno', 'Sidekick', 'Swift', 'Vitara', 'XL-7'],
  'Toyota': [
    '4Runner', 'Avalon', 'Camry', 'Celica', 'Corolla', 'Echo', 'FJ Cruiser',
    'Highlander', 'Land Cruiser', 'Matrix', 'Prius', 'RAV4', 'Sequoia',
    'Sienna', 'Supra', 'Tacoma', 'Tundra', 'Yaris'
  ],
  'Volkswagen': ['Beetle', 'Cabrio', 'Golf', 'GTI', 'Jetta', 'Passat', 'Rabbit', 'Tiguan', 'Touareg'],
  'Volvo': ['240', '740', '850', '940', '960', 'C70', 'S40', 'S60', 'S80', 'V70', 'XC90'],
};

export function getModelsForMake(make: string): string[] {
  return MODELS_BY_MAKE[make] || [];
}

export function isValidVehicle(year: number, make: string, model: string): boolean {
  if (!VEHICLE_YEARS.includes(year)) return false;
  if (!VEHICLE_MAKES.includes(make)) return false;
  const models = getModelsForMake(make);
  return models.includes(model);
}

export function getCharmUrl(vehicle: { year: number; make: string; model: string }): string {
  // Generate charm.li URL for the vehicle
  // Format: https://charm.li/[make]/[model]/[year]
  const makeSlug = vehicle.make.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = vehicle.model.toLowerCase().replace(/\s+/g, '-');
  return `https://charm.li/${makeSlug}/${modelSlug}/${vehicle.year}`;
}
