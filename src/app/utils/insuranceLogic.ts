import { WeatherData, Claim } from '../context/UserContext';

// AI-based premium calculation
export const calculateWeeklyPremium = (
  averageWeeklyEarnings: number,
  city: string,
  vehicleType: string,
  yearsOfExperience: number
): number => {
  // Base premium as percentage of earnings
  let basePremium = averageWeeklyEarnings * 0.05; // 5% base rate

  // City risk factor (weather patterns)
  const cityRiskFactors: Record<string, number> = {
    'Mumbai': 1.3,
    'Bangalore': 0.9,
    'Delhi': 1.2,
    'Kolkata': 1.25,
    'Chennai': 1.15,
    'Hyderabad': 1.0,
    'Pune': 1.05,
  };

  const cityFactor = cityRiskFactors[city] || 1.0;
  basePremium *= cityFactor;

  // Vehicle type factor
  const vehicleFactor = vehicleType === 'cycle' ? 0.85 : vehicleType === 'bike' ? 1.1 : 1.0;
  basePremium *= vehicleFactor;

  // Experience discount
  const experienceDiscount = Math.min(yearsOfExperience * 0.02, 0.15); // Max 15% discount
  basePremium *= (1 - experienceDiscount);

  return Math.round(basePremium);
};

// Calculate coverage amount (typically 60-80% of weekly earnings)
export const calculateCoverageAmount = (averageWeeklyEarnings: number): number => {
  return Math.round(averageWeeklyEarnings * 0.7);
};

// Check if weather conditions trigger a claim
export const shouldTriggerClaim = (weather: WeatherData): {
  shouldTrigger: boolean;
  type?: 'heavy_rain' | 'extreme_heat' | 'pollution';
  severity: number;
} => {
  // Heavy rain: > 50mm in a day
  if (weather.rainfall > 50) {
    return {
      shouldTrigger: true,
      type: 'heavy_rain',
      severity: Math.min(weather.rainfall / 50, 2), // 1x to 2x payout
    };
  }

  // Extreme heat: > 42°C
  if (weather.temperature > 42) {
    return {
      shouldTrigger: true,
      type: 'extreme_heat',
      severity: Math.min((weather.temperature - 40) / 5, 1.5),
    };
  }

  // Severe pollution: AQI > 300
  if (weather.aqi > 300) {
    return {
      shouldTrigger: true,
      type: 'pollution',
      severity: Math.min(weather.aqi / 300, 1.8),
    };
  }

  return { shouldTrigger: false, severity: 0 };
};

// Calculate claim payout amount
export const calculateClaimPayout = (
  coverageAmount: number,
  severity: number,
  type: 'heavy_rain' | 'extreme_heat' | 'pollution'
): number => {
  // Different payout rates for different conditions
  const basePayoutRates: Record<string, number> = {
    'heavy_rain': 0.5, // 50% of coverage
    'extreme_heat': 0.4, // 40% of coverage
    'pollution': 0.3, // 30% of coverage
  };

  const basePayout = coverageAmount * basePayoutRates[type];
  const adjustedPayout = basePayout * severity;

  return Math.round(adjustedPayout);
};

// Mock weather data generator
export const generateMockWeather = (city: string): WeatherData => {
  const scenarios = [
    { temp: 28, rain: 5, aqi: 120, condition: 'Partly Cloudy' },
    { temp: 35, rain: 0, aqi: 180, condition: 'Sunny' },
    { temp: 30, rain: 65, aqi: 150, condition: 'Heavy Rain' }, // Triggers claim
    { temp: 44, rain: 0, aqi: 200, condition: 'Extreme Heat' }, // Triggers claim
    { temp: 32, rain: 2, aqi: 320, condition: 'Severe Pollution' }, // Triggers claim
    { temp: 26, rain: 15, aqi: 95, condition: 'Light Rain' },
    { temp: 38, rain: 0, aqi: 220, condition: 'Hot and Hazy' },
  ];

  // Randomly select a scenario (weighted towards normal conditions)
  const random = Math.random();
  let selectedScenario;

  if (random < 0.7) {
    // 70% normal weather
    selectedScenario = scenarios[Math.floor(Math.random() * 2)];
  } else if (random < 0.85) {
    // 15% moderate conditions
    selectedScenario = scenarios[5] || scenarios[6];
  } else {
    // 15% extreme conditions (triggers claims)
    selectedScenario = scenarios[2 + Math.floor(Math.random() * 3)];
  }

  return {
    temperature: selectedScenario.temp,
    rainfall: selectedScenario.rain,
    aqi: selectedScenario.aqi,
    condition: selectedScenario.condition,
    timestamp: new Date().toISOString(),
  };
};

// Generate a unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
