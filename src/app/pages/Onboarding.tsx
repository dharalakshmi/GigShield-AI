import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { calculateWeeklyPremium, calculateCoverageAmount, generateId } from '../utils/insuranceLogic';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Shield, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setCoverage } = useUser();
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    // If user is already onboarded, redirect to dashboard
    if (user?.onboardingComplete) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    platform: 'swiggy' as 'swiggy' | 'zomato' | 'both',
    city: '',
    averageWeeklyEarnings: '',
    vehicleType: 'bike' as 'bike' | 'scooter' | 'cycle',
    yearsOfExperience: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const earnings = parseFloat(formData.averageWeeklyEarnings);
    const experience = parseFloat(formData.yearsOfExperience);

    // Calculate premium using AI logic
    const premium = calculateWeeklyPremium(
      earnings,
      formData.city,
      formData.vehicleType,
      experience
    );

    const coverageAmount = calculateCoverageAmount(earnings);

    // Create user profile
    const userProfile = {
      id: generateId(),
      name: formData.name,
      phone: formData.phone,
      platform: formData.platform,
      city: formData.city,
      averageWeeklyEarnings: earnings,
      vehicleType: formData.vehicleType,
      yearsOfExperience: experience,
      onboardingComplete: true,
    };

    // Create coverage
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const coverage = {
      weeklyPremium: premium,
      coverageAmount: coverageAmount,
      startDate: today.toISOString(),
      endDate: nextWeek.toISOString(),
      isActive: true,
    };

    setUser(userProfile);
    setCoverage(coverage);
    navigate('/dashboard');
  };

  const isStep1Valid = formData.name && formData.phone && formData.platform;
  const isStep2Valid = formData.city && formData.averageWeeklyEarnings && formData.vehicleType;
  const isStep3Valid = formData.yearsOfExperience;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to 🛡️ GigShield</CardTitle>
          <CardDescription>
            AI-powered income protection for delivery partners
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Delivery Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => handleInputChange('platform', value)}
                >
                  <SelectTrigger id="platform">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swiggy">Swiggy</SelectItem>
                    <SelectItem value="zomato">Zomato</SelectItem>
                    <SelectItem value="both">Both Platforms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Work Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleInputChange('city', value)}
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="earnings">Average Weekly Earnings (₹)</Label>
                <Input
                  id="earnings"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.averageWeeklyEarnings}
                  onChange={(e) => handleInputChange('averageWeeklyEarnings', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Type</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleInputChange('vehicleType', value)}
                >
                  <SelectTrigger id="vehicle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="cycle">Cycle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Experience</h3>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Delivery Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  More experience = Lower premium rates!
                </p>
              </div>

              {formData.yearsOfExperience && formData.averageWeeklyEarnings && formData.city && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">AI-Calculated Premium</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on your profile, earnings, city risk, and experience
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Premium</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{calculateWeeklyPremium(
                          parseFloat(formData.averageWeeklyEarnings),
                          formData.city,
                          formData.vehicleType,
                          parseFloat(formData.yearsOfExperience)
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage Amount</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{calculateCoverageAmount(parseFloat(formData.averageWeeklyEarnings))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !isStep2Valid)
                }
                className="ml-auto"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStep3Valid}
                className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Activate Coverage
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;