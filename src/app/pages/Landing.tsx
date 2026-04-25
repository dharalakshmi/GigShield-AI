import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Zap, Cloud, CheckCircle, TrendingUp, Wallet } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    // If user is already onboarded, redirect to dashboard
    if (user?.onboardingComplete) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🛡️ GigShield
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            AI-Powered Parametric Insurance for Delivery Partners
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Protect your weekly income against weather disruptions. No claims, no hassle - just instant payouts when conditions are bad.
          </p>
          <Button 
            size="lg" 
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={() => navigate('/onboarding')}
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Instant Auto-Claims</CardTitle>
              <CardDescription>
                No forms, no waiting. Claims trigger automatically and payouts are instant when weather conditions cross thresholds.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Cloud className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Real-Time Monitoring</CardTitle>
              <CardDescription>
                AI-powered weather tracking monitors temperature, rainfall, and air quality 24/7 to protect your income.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>AI Premium Pricing</CardTitle>
              <CardDescription>
                Fair premiums calculated using AI based on your city, experience, vehicle, and earning patterns.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Protection Details */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You're Protected Against</CardTitle>
            <CardDescription>Automatic payouts when these conditions are met</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-5xl mb-3">🌧️</div>
                <h3 className="font-semibold mb-2">Heavy Rain</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Rainfall exceeding 50mm in a day
                </p>
                <p className="text-sm font-medium text-blue-600">
                  Up to 50% of coverage amount
                </p>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <div className="text-5xl mb-3">🌡️</div>
                <h3 className="font-semibold mb-2">Extreme Heat</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Temperature above 42°C
                </p>
                <p className="text-sm font-medium text-orange-600">
                  Up to 40% of coverage amount
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-5xl mb-3">💨</div>
                <h3 className="font-semibold mb-2">Air Pollution</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Air Quality Index (AQI) above 300
                </p>
                <p className="text-sm font-medium text-purple-600">
                  Up to 30% of coverage amount
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How 🛡️ GigShield Works</CardTitle>
            <CardDescription>Simple, transparent, and fully automated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Sign Up</h3>
                <p className="text-sm text-muted-foreground">
                  Complete quick onboarding with your delivery details
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">AI Calculates Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized weekly premium based on your profile
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Stay Protected</h3>
                <p className="text-sm text-muted-foreground">
                  Weather is monitored 24/7 automatically
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Get Paid Instantly</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic payouts when conditions trigger claims
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Income?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Join thousands of delivery partners who are already protected
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/onboarding')}
          >
            Start Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;