
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Calendar, User, ExternalLink, Clock, ArrowLeft } from 'lucide-react';

interface SharedReport {
  id: number;
  title: string;
  description: string;
  sharedBy: string;
  sharedByEmail: string;
  expiryDate: string;
  embedUrl: string;
  accessType: 'view' | 'limited';
}

const GuestDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [reports, setReports] = useState<SharedReport[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  // Mock data for shared reports
  useEffect(() => {
    if (!email) {
      navigate('/guest-login');
      return;
    }

    // Simulate fetching shared reports
    const mockReports: SharedReport[] = [
      {
        id: 1,
        title: 'Sales Performance Q4 2024',
        description: 'Quarterly sales analysis and performance metrics',
        sharedBy: 'John Smith',
        sharedByEmail: 'john@company.com',
        expiryDate: '2024-12-31T23:59:59Z',
        embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiSample1',
        accessType: 'view'
      },
      {
        id: 2,
        title: 'Marketing ROI Dashboard',
        description: 'Campaign performance and return on investment analysis',
        sharedBy: 'Sarah Johnson',
        sharedByEmail: 'sarah@marketing.com',
        expiryDate: '2024-12-15T23:59:59Z',
        embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiSample2',
        accessType: 'limited'
      }
    ];

    setReports(mockReports);
  }, [email, navigate]);

  // Calculate time remaining for each report
  useEffect(() => {
    const updateTimeLeft = () => {
      const newTimeLeft: { [key: number]: string } = {};
      
      reports.forEach(report => {
        const expiry = new Date(report.expiryDate);
        const now = new Date();
        const diff = expiry.getTime() - now.getTime();
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          
          if (days > 0) {
            newTimeLeft[report.id] = `${days} days, ${hours} hours`;
          } else {
            newTimeLeft[report.id] = `${hours} hours`;
          }
        } else {
          newTimeLeft[report.id] = 'Expired';
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [reports]);

  const handleViewReport = (report: SharedReport) => {
    // In a real app, this would navigate to a dedicated report view page
    window.open(report.embedUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Viz Tec</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Guest Access
              </Badge>
              <Button variant="ghost" onClick={handleBackToHome}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guest Notice */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-blue-800 font-medium">You are viewing as a Guest</p>
              <p className="text-blue-600 text-sm">Access is limited and time-bound. Reports will expire based on sharing settings.</p>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shared Dashboards</h1>
          <p className="text-gray-600">Reports shared with {email}</p>
        </div>

        {/* Reports Grid */}
        {reports.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">
                        {report.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-4">
                        {report.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={timeLeft[report.id] === 'Expired' ? 'destructive' : 'secondary'}
                      className="ml-2"
                    >
                      {report.accessType === 'limited' ? 'Limited' : 'View'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Shared By Info */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>Shared by {report.sharedBy}</span>
                      <span className="text-gray-400">({report.sharedByEmail})</span>
                    </div>
                    
                    {/* Expiry Info */}
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Expires:</span>
                      <span className={timeLeft[report.id] === 'Expired' ? 'text-red-600 font-medium' : 'text-gray-900'}>
                        {timeLeft[report.id] || 'Loading...'}
                      </span>
                    </div>
                    
                    {/* Action Button */}
                    <Button
                      onClick={() => handleViewReport(report)}
                      disabled={timeLeft[report.id] === 'Expired'}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {timeLeft[report.id] === 'Expired' ? 'Access Expired' : 'View Report'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Available</h3>
              <p className="text-gray-600">No dashboards have been shared with this email address yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default GuestDashboard;
