
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Shield, Users, BarChart3, ArrowLeft } from 'lucide-react';

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const demoCredentials = [
    { type: 'admin', email: 'admin@viztec.com', password: 'admin123', label: 'Admin User' },
    { type: 'core', email: 'core@viztec.com', password: 'core123', label: 'Core User' },
    { type: 'client', email: 'client@viztec.com', password: 'client123', label: 'Client User' }
  ];

  const handleDemoLogin = (credentials: typeof demoCredentials[0]) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    // Automatically redirect based on demo credentials
    handleLogin(credentials.type);
  };

  const handleLogin = (userType?: string) => {
    if (!email || !password) return;
    
    // Determine user type based on email domain or explicit type
    let redirectType = userType;
    if (!redirectType) {
      if (email.includes('admin@viztec.com')) redirectType = 'admin';
      else if (email.includes('core@viztec.com')) redirectType = 'core';
      else if (email.includes('client@viztec.com')) redirectType = 'client';
      else redirectType = 'core'; // Default to core for other emails
    }
    
    // Redirect based on user type
    switch (redirectType) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'core':
        navigate('/core-dashboard');
        break;
      case 'client':
        navigate('/client-dashboard');
        break;
      default:
        navigate('/core-dashboard');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Landing Page */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Viz Tec</h2>
          <p className="mt-2 text-gray-600">Secure BI Dashboard Sharing Platform</p>
        </div>

        {/* Demo Credentials */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Demo Login Credentials</CardTitle>
            <CardDescription>Click to auto-fill login credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoCredentials.map((cred) => (
              <Button
                key={cred.type}
                variant="outline"
                className="w-full justify-start hover:bg-blue-50 transition-colors duration-200"
                onClick={() => handleDemoLogin(cred)}
              >
                {cred.type === 'admin' && <Shield className="h-4 w-4 mr-2 text-red-500" />}
                {cred.type === 'core' && <Users className="h-4 w-4 mr-2 text-blue-500" />}
                {cred.type === 'client' && <BarChart3 className="h-4 w-4 mr-2 text-green-500" />}
                {cred.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              onClick={() => handleLogin()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              disabled={!email || !password}
            >
              Sign in
            </Button>

            <div className="text-center text-sm text-gray-600">
              <button 
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 hover:underline transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
