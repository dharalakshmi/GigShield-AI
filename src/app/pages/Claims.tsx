import React from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, FileText, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Claims: React.FC = () => {
  const navigate = useNavigate();
  const { claims } = useUser();

  const totalPaid = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const claimsByType = claims.reduce((acc, claim) => {
    acc[claim.type] = (acc[claim.type] || 0) + claim.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'Heavy Rain', value: claimsByType['heavy_rain'] || 0, color: '#3b82f6' },
    { name: 'Extreme Heat', value: claimsByType['extreme_heat'] || 0, color: '#f97316' },
    { name: 'Pollution', value: claimsByType['pollution'] || 0, color: '#8b5cf6' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-xl">Claims History</h1>
            <p className="text-sm text-muted-foreground">All your auto-triggered claims</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Claims Paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-green-600">₹{totalPaid}</p>
                <TrendingUp className="h-8 w-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Number of Claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{claims.length}</p>
                <FileText className="h-8 w-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Payout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">
                  ₹{claims.length > 0 ? Math.round(totalPaid / claims.length) : 0}
                </p>
                <Calendar className="h-8 w-8 text-purple-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Claims by Type Chart */}
        {claims.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Claims by Disruption Type</CardTitle>
              <CardDescription>Breakdown of payouts by weather condition</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* All Claims List */}
        <Card>
          <CardHeader>
            <CardTitle>All Claims</CardTitle>
            <CardDescription>
              Claims are automatically triggered and instantly paid when conditions are met
            </CardDescription>
          </CardHeader>
          <CardContent>
            {claims.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No claims yet</p>
                <p className="text-sm mt-2">
                  Claims are automatically triggered when weather conditions exceed thresholds:
                </p>
                <div className="mt-4 text-sm space-y-1">
                  <p>• Heavy Rain: &gt; 50mm rainfall</p>
                  <p>• Extreme Heat: &gt; 42°C temperature</p>
                  <p>• Air Pollution: AQI &gt; 300</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {claims.map((claim) => {
                  const claimDate = new Date(claim.date);
                  const emoji = claim.type === 'heavy_rain' ? '🌧️' :
                               claim.type === 'extreme_heat' ? '🌡️' : '💨';
                  const bgColor = claim.type === 'heavy_rain' ? 'bg-blue-50' :
                                 claim.type === 'extreme_heat' ? 'bg-orange-50' : 'bg-purple-50';
                  const textColor = claim.type === 'heavy_rain' ? 'text-blue-700' :
                                   claim.type === 'extreme_heat' ? 'text-orange-700' : 'text-purple-700';

                  return (
                    <div
                      key={claim.id}
                      className={`p-4 rounded-lg border ${bgColor}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-4xl">{emoji}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">
                                {claim.type === 'heavy_rain' ? 'Heavy Rain Disruption' :
                                 claim.type === 'extreme_heat' ? 'Extreme Heat Disruption' :
                                 'Air Pollution Disruption'}
                              </h3>
                              <Badge variant="default" className="bg-green-600">
                                {claim.status === 'paid' ? 'Paid' : 'Processing'}
                              </Badge>
                            </div>
                            <p className={`text-sm ${textColor} mb-2`}>
                              {claim.weatherCondition}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>📅 {claimDate.toLocaleDateString()}</span>
                              <span>🕐 {claimDate.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">+₹{claim.amount}</p>
                          <p className="text-xs text-muted-foreground mt-1">to wallet</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Claim ID</p>
                            <p className="font-mono text-xs">{claim.id.slice(0, 12)}...</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Processing Time</p>
                            <p className="font-medium">Instant</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Method</p>
                            <p className="font-medium">Auto-triggered</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              How Auto-Claims Work
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Weather conditions are monitored 24/7 in real-time</p>
              <p>✓ When conditions exceed thresholds, claims are automatically triggered</p>
              <p>✓ Payouts are instantly credited to your wallet</p>
              <p>✓ No paperwork, no waiting - completely automated</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Claims;
