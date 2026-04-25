import React from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, User, Phone, MapPin, Bike, Calendar, TrendingUp, Shield, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, coverage, walletBalance, logout } = useUser();

  if (!user || !coverage) {
    navigate('/');
    return null;
  }

  const platformDisplay = user.platform === 'both' ? 'Swiggy & Zomato' :
                         user.platform.charAt(0).toUpperCase() + user.platform.slice(1);

  const vehicleDisplay = user.vehicleType.charAt(0).toUpperCase() + user.vehicleType.slice(1);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-xl">Profile & Settings</h1>
            <p className="text-sm text-muted-foreground">Your account information</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-muted-foreground mb-3">Delivery Partner</p>
                <div className="flex gap-2">
                  <Badge variant="default" className="bg-green-600">Active Coverage</Badge>
                  <Badge variant="outline">{platformDisplay}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="text-3xl font-bold text-green-600">₹{walletBalance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{user.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Shield className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Platform</p>
                  <p className="font-medium">{platformDisplay}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Details */}
        <Card>
          <CardHeader>
            <CardTitle>Work Details</CardTitle>
            <CardDescription>Information about your delivery work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Bike className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Type</p>
                  <p className="font-medium">{vehicleDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{user.yearsOfExperience} years</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Earnings</p>
                  <p className="font-medium">₹{user.averageWeeklyEarnings}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage Details */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage Details</CardTitle>
            <CardDescription>Your current insurance coverage information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Weekly Premium</p>
                  <p className="text-2xl font-bold text-blue-600">₹{coverage.weeklyPremium}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Coverage Amount</p>
                  <p className="text-2xl font-bold text-green-600">₹{coverage.coverageAmount}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage Start Date</p>
                    <p className="font-medium">{new Date(coverage.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage End Date</p>
                    <p className="font-medium">{new Date(coverage.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Protected Against</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl">🌧️</span>
                    <div>
                      <p className="font-medium text-sm">Heavy Rain</p>
                      <p className="text-xs text-muted-foreground">&gt; 50mm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                    <span className="text-2xl">🌡️</span>
                    <div>
                      <p className="font-medium text-sm">Extreme Heat</p>
                      <p className="text-xs text-muted-foreground">&gt; 42°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                    <span className="text-2xl">💨</span>
                    <div>
                      <p className="font-medium text-sm">Air Pollution</p>
                      <p className="text-xs text-muted-foreground">AQI &gt; 300</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Calculation Breakdown */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              AI Premium Calculation
            </CardTitle>
            <CardDescription>How your premium is calculated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Base Premium (5% of weekly earnings)</span>
                <span className="font-medium">₹{Math.round(user.averageWeeklyEarnings * 0.05)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>• City Risk Factor ({user.city})</span>
                <span>Applied</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>• Vehicle Type ({vehicleDisplay})</span>
                <span>Applied</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>• Experience Discount ({user.yearsOfExperience} years)</span>
                <span>-{Math.min(user.yearsOfExperience * 2, 15)}%</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Final Weekly Premium</span>
                <span className="text-blue-600">₹{coverage.weeklyPremium}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Section */}
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Logout</h3>
                <p className="text-sm text-muted-foreground">
                  Sign out of your account to allow another user to login
                </p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;