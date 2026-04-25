import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { generateMockWeather, shouldTriggerClaim, calculateClaimPayout, generateId } from '../utils/insuranceLogic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Cloud, Droplets, Wind, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const WeatherMonitor: React.FC = () => {
  const { user, coverage, weatherData, setWeatherData, addClaim, updateWalletBalance } = useUser();
  const [lastCheckTime, setLastCheckTime] = useState<string>('');
  const [lastClaimId, setLastClaimId] = useState<string>('');

  useEffect(() => {
    if (!user || !coverage?.isActive) return;

    // Initial weather check
    checkWeather();

    // Update weather every 30 seconds (simulating real-time monitoring)
    const interval = setInterval(() => {
      checkWeather();
    }, 30000);

    return () => clearInterval(interval);
  }, [user, coverage]);

  const checkWeather = () => {
    if (!user || !coverage) return;

    const weather = generateMockWeather(user.city);
    setWeatherData(weather);
    setLastCheckTime(new Date().toLocaleTimeString());

    // Check if claim should be triggered
    const claimCheck = shouldTriggerClaim(weather);
    
    if (claimCheck.shouldTrigger && claimCheck.type) {
      const payoutAmount = calculateClaimPayout(
        coverage.coverageAmount,
        claimCheck.severity,
        claimCheck.type
      );

      // Create and add claim
      const newClaim = {
        id: generateId(),
        date: new Date().toISOString(),
        type: claimCheck.type,
        amount: payoutAmount,
        status: 'paid' as const,
        weatherCondition: weather.condition,
      };

      addClaim(newClaim);
      updateWalletBalance(payoutAmount);
      setLastClaimId(newClaim.id);
      
      // Show toast notification
      const typeLabel = claimCheck.type === 'heavy_rain' ? 'Heavy Rain' :
                       claimCheck.type === 'extreme_heat' ? 'Extreme Heat' : 'Air Pollution';
      
      toast.success(`🎉 Claim Auto-Triggered!`, {
        description: `${typeLabel} detected. ₹${payoutAmount} instantly credited to your wallet.`,
        duration: 5000,
      });
    }
  };

  if (!weatherData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Monitor</CardTitle>
          <CardDescription>Loading weather data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'bg-green-500' };
    if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'bg-orange-500' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'bg-red-500' };
    return { label: 'Hazardous', color: 'bg-purple-500' };
  };

  const getTempStatus = (temp: number) => {
    if (temp < 25) return 'bg-blue-500';
    if (temp < 35) return 'bg-green-500';
    if (temp < 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRainStatus = (rain: number) => {
    if (rain === 0) return 'bg-gray-300';
    if (rain < 10) return 'bg-blue-300';
    if (rain < 50) return 'bg-blue-500';
    return 'bg-blue-700';
  };

  const claimTrigger = shouldTriggerClaim(weatherData);
  const aqiStatus = getAQIStatus(weatherData.aqi);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Weather Monitor</CardTitle>
            <CardDescription>
              {user?.city} • Updated: {lastCheckTime}
            </CardDescription>
          </div>
          {claimTrigger.shouldTrigger ? (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Claim Triggered
            </Badge>
          ) : (
            <Badge variant="default" className="gap-1 bg-green-600">
              <CheckCircle className="h-3 w-3" />
              Normal
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border">
            <div className={`p-2 rounded-full ${getTempStatus(weatherData.temperature)} bg-opacity-20`}>
              <Cloud className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
              {weatherData.temperature > 42 && (
                <p className="text-xs text-red-600 mt-1">⚠️ Extreme heat alert</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border">
            <div className={`p-2 rounded-full ${getRainStatus(weatherData.rainfall)} bg-opacity-20`}>
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rainfall</p>
              <p className="text-2xl font-bold">{weatherData.rainfall}mm</p>
              {weatherData.rainfall > 50 && (
                <p className="text-xs text-red-600 mt-1">⚠️ Heavy rain alert</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border">
            <div className={`p-2 rounded-full ${aqiStatus.color} bg-opacity-20`}>
              <Wind className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Air Quality</p>
              <p className="text-2xl font-bold">{weatherData.aqi}</p>
              <p className="text-xs text-muted-foreground mt-1">{aqiStatus.label}</p>
              {weatherData.aqi > 300 && (
                <p className="text-xs text-red-600">⚠️ Pollution alert</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Current Condition</p>
          <p className="text-lg">{weatherData.condition}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMonitor;