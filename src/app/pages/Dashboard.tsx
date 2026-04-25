import React from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import WeatherMonitor from '../components/WeatherMonitor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Shield, Wallet, TrendingUp, FileText, User, Bell, ArrowRight, LogOut } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, coverage, claims, walletBalance, logout } = useUser();

  if (!user || !coverage) {
    navigate('/');
    return null;
  }

  // Generate earnings protection chart data
  const chartData = [
    { day: 'Mon', protected: 0.7, actual: 0.65 },
    { day: 'Tue', protected: 0.7, actual: 0.7 },
    { day: 'Wed', protected: 0.7, actual: 0.4 }, // Bad weather day
    { day: 'Thu', protected: 0.7, actual: 0.6 },
    { day: 'Fri', protected: 0.7, actual: 0.7 },
    { day: 'Sat', protected: 0.7, actual: 0.75 },
    { day: 'Sun', protected: 0.7, actual: 0.7 },
  ].map(item => ({
    ...item,
    protected: Math.round(item.protected * user.averageWeeklyEarnings / 7),
    actual: Math.round(item.actual * user.averageWeeklyEarnings / 7),
  }));

  const totalClaimsPaid = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const activeClaims = claims.filter(c => c.status === 'paid').length;

  const daysRemaining = Math.ceil(
    (new Date(coverage.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">🛡️ GigShield</h1>
              <p className="text-sm text-muted-foreground">Income Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {user.name}! 👋</h2>
          <p className="text-muted-foreground">Your coverage is active and protecting your income</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Wallet Balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">₹{walletBalance}</p>
                  <p className="text-xs text-muted-foreground mt-1">From {activeClaims} claims</p>
                </div>
                <Wallet className="h-8 w-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Weekly Premium</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">₹{coverage.weeklyPremium}</p>
                  <p className="text-xs text-muted-foreground mt-1">{daysRemaining} days left</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Coverage Amount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">₹{coverage.coverageAmount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Per disruption</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Claims Paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">₹{totalClaimsPaid}</p>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Monitor */}
        <WeatherMonitor />

        {/* Earnings Protection Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Earnings Protection</CardTitle>
            <CardDescription>
              Your guaranteed income vs actual earnings this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="protected" x1="0" y1="0" x2="0" y2="1">
                    <stop key="protected-stop-1" offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop key="protected-stop-2" offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                    <stop key="actual-stop-1" offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop key="actual-stop-2" offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area 
                  key="protected-area"
                  type="monotone" 
                  dataKey="protected" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#protected)"
                  name="Protected Income"
                />
                <Area 
                  key="actual-area"
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#actual)"
                  name="Actual Earnings"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Protected Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Actual Earnings</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Claims</CardTitle>
                <CardDescription>Auto-triggered and instantly paid</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/claims')}>
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {claims.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No claims yet</p>
                <p className="text-sm">Claims are automatically triggered when weather conditions meet thresholds</p>
              </div>
            ) : (
              <div className="space-y-3">
                {claims.slice(0, 3).map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        claim.type === 'heavy_rain' ? 'bg-blue-100' :
                        claim.type === 'extreme_heat' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        {claim.type === 'heavy_rain' ? '🌧️' :
                         claim.type === 'extreme_heat' ? '🌡️' : '💨'}
                      </div>
                      <div>
                        <p className="font-medium">
                          {claim.type === 'heavy_rain' ? 'Heavy Rain' :
                           claim.type === 'extreme_heat' ? 'Extreme Heat' :
                           'Air Pollution'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {claim.weatherCondition} • {new Date(claim.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+₹{claim.amount}</p>
                      <Badge variant="default" className="bg-green-600">Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coverage Status */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Your Coverage is Active</h3>
                <p className="text-blue-100 mb-4">
                  Protecting your income 24/7 against weather disruptions
                </p>
                <div className="space-y-2 text-sm">
                  <p>✓ Heavy Rain Protection</p>
                  <p>✓ Extreme Heat Protection</p>
                  <p>✓ Air Pollution Protection</p>
                  <p>✓ Instant Auto-Claims</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Coverage Period</p>
                <p className="font-semibold">
                  {new Date(coverage.startDate).toLocaleDateString()} -
                </p>
                <p className="font-semibold">
                  {new Date(coverage.endDate).toLocaleDateString()}
                </p>
                <Badge variant="secondary" className="mt-3">
                  {daysRemaining} days left
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;