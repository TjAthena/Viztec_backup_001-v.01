
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  ExternalLink,
  Clock,
  Eye,
  Calendar,
  AlertCircle,
  User,
  Mail,
  Phone,
  Building
} from 'lucide-react';

const ClientDashboard = () => {
  const reports = [
    {
      id: 1,
      name: 'Sales Performance Dashboard',
      description: 'Q1 2024 sales metrics and KPIs',
      provider: 'Acme Analytics',
      lastUpdated: '2024-01-15',
      views: 47,
      status: 'Active',
      expiryDate: '2024-07-15',
      url: '#'
    },
    {
      id: 2,
      name: 'Marketing ROI Analysis',
      description: 'Campaign performance and attribution data',
      provider: 'DataFlow Solutions',
      lastUpdated: '2024-01-10',
      views: 23,
      status: 'Active',
      expiryDate: '2024-06-10',
      url: '#'
    },
    {
      id: 3,
      name: 'Financial Overview Report',
      description: 'Monthly financial statements and projections',
      provider: 'Finance Pro',
      lastUpdated: '2024-01-08',
      views: 12,
      status: 'Expiring Soon',
      expiryDate: '2024-02-08',
      url: '#'
    }
  ];

  // Client profile information
  const clientProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    role: 'Data Analytics Manager',
    accountManager: 'John Doe',
    accountManagerEmail: 'john.doe@viztec.com'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Expiring Soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
      case 'Expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout userType="client" currentPage="/client-dashboard">
      <div className="space-y-6">
        {/* Welcome Header with Profile Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {clientProfile.name}!</h2>
            <p className="text-gray-600">
              You have access to {reports.length} dashboard reports. Click on any report below to view your data.
            </p>
          </div>
          
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{clientProfile.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{clientProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Building className="h-4 w-4 text-gray-400" />
                <span>{clientProfile.company}</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600">Account Manager</p>
                <p className="text-sm font-medium">{clientProfile.accountManager}</p>
                <p className="text-xs text-gray-500">{clientProfile.accountManagerEmail}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{reports.length}</div>
                  <div className="text-sm text-gray-600">Active Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {reports.reduce((sum, report) => sum + report.views, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {reports.filter(r => r.status === 'Active').length}
                  </div>
                  <div className="text-sm text-gray-600">Up to Date</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {reports.filter(r => r.status === 'Expiring Soon').length}
                  </div>
                  <div className="text-sm text-gray-600">Expiring Soon</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Dashboard Reports</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {report.description}
                      </CardDescription>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Updated: {new Date(report.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{report.views} views</span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="text-gray-600">Provided by: <span className="font-medium">{report.provider}</span></div>
                    <div className="text-gray-600 mt-1">
                      Expires: <span className="font-medium">{new Date(report.expiryDate).toLocaleDateString()}</span>
                      {getDaysUntilExpiry(report.expiryDate) <= 30 && (
                        <span className="ml-2 text-orange-600">
                          ({getDaysUntilExpiry(report.expiryDate)} days left)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => window.open(`/client-report/${report.id}`, '_blank')}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Open Dashboard
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Get assistance with your dashboard reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col space-y-1">
                <div className="font-medium">Contact Support</div>
                <div className="text-xs text-gray-500">Get help with technical issues</div>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1">
                <div className="font-medium">Request Update</div>
                <div className="text-xs text-gray-500">Ask for report data refresh</div>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col space-y-1">
                <div className="font-medium">Training Resources</div>
                <div className="text-xs text-gray-500">Learn how to use dashboards</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
