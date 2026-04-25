import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  platform: 'swiggy' | 'zomato' | 'both';
  city: string;
  averageWeeklyEarnings: number;
  vehicleType: 'bike' | 'scooter' | 'cycle';
  yearsOfExperience: number;
  onboardingComplete: boolean;
}

export interface CoverageDetails {
  weeklyPremium: number;
  coverageAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Claim {
  id: string;
  date: string;
  type: 'heavy_rain' | 'extreme_heat' | 'pollution';
  amount: number;
  status: 'triggered' | 'processing' | 'paid';
  weatherCondition: string;
}

export interface WeatherData {
  temperature: number;
  rainfall: number;
  aqi: number;
  condition: string;
  timestamp: string;
}

interface UserContextType {
  user: UserProfile | null;
  coverage: CoverageDetails | null;
  claims: Claim[];
  walletBalance: number;
  weatherData: WeatherData | null;
  setUser: (user: UserProfile) => void;
  setCoverage: (coverage: CoverageDetails) => void;
  addClaim: (claim: Claim) => void;
  updateWalletBalance: (amount: number) => void;
  setWeatherData: (weather: WeatherData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [coverage, setCoverage] = useState<CoverageDetails | null>(() => {
    const saved = localStorage.getItem('coverage');
    return saved ? JSON.parse(saved) : null;
  });

  const [claims, setClaims] = useState<Claim[]>(() => {
    const saved = localStorage.getItem('claims');
    return saved ? JSON.parse(saved) : [];
  });

  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? parseFloat(saved) : 0;
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (coverage) {
      localStorage.setItem('coverage', JSON.stringify(coverage));
    }
  }, [coverage]);

  useEffect(() => {
    localStorage.setItem('claims', JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance.toString());
  }, [walletBalance]);

  const addClaim = (claim: Claim) => {
    setClaims(prev => [claim, ...prev]);
  };

  const updateWalletBalance = (amount: number) => {
    setWalletBalance(prev => prev + amount);
  };

  const logout = () => {
    // Clear all localStorage data
    localStorage.removeItem('user');
    localStorage.removeItem('coverage');
    localStorage.removeItem('claims');
    localStorage.removeItem('walletBalance');
    
    // Reset all state
    setUser(null);
    setCoverage(null);
    setClaims([]);
    setWalletBalance(0);
    setWeatherData(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        coverage,
        claims,
        walletBalance,
        weatherData,
        setUser,
        setCoverage,
        addClaim,
        updateWalletBalance,
        setWeatherData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};