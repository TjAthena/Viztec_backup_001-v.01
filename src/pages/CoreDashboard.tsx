import { useState } from 'react';
import Layout from '@/components/Layout';
import AddClientModal from '@/components/AddClientModal';
import EmbedReportModal from '@/components/EmbedReportModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BarChart3, 
  Plus,
  Share,
  Clock,
  TrendingUp,
  FileText,
  Zap,
  Crown,
  AlertTriangle,
  Star
} from 'lucide-react';

const CoreDashboard = () => {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isEmbedReportModalOpen, setIsEmbedReportModalOpen] = useState(false);

  const stats = [
    {
      title: 'Clients Created',
      value: '24',
      limit: '50',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Dashboards Shared',
      value: '18',
      limit: '25',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Views',
      value: '1,247',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Storage Used',
      value: '2.4 GB',
      limit: '5 GB',
      icon: FileText,
      color: 'text-orange-600'
    }
  ];

  // Client summary data
  const clientSummaries = [
    {
      title: 'Most Active Client',
      client: 'TechCorp Inc.',
      metric: '456 views this month',
      icon: Star,
      color: 'bg-blue-50 text-blue-900',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Client with Most Reports',
      client: 'Global Solutions',
      metric: '5 active reports',
      icon: BarChart3,
      color: 'bg-green-50 text-green-900',
      iconColor: 'text-green-600'
    },
    {
      title: 'Recently Suspended',
      client: 'Innovation Labs',
      metric: 'Contract renewal pending',
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-900',
      iconColor: 'text-orange-600'
    }
  ];

  const recentClients = [
    { name: 'Acme Corp', email: 'contact@acme.com', reports: 3, status: 'Active', lastAccess: '2 hours ago' },
    { name: 'TechStart Inc', email: 'info@techstart.io', reports: 1, status: 'Active', lastAccess: '1 day ago' },
    { name: 'Global Solutions', email: 'team@global.com', reports: 5, status: 'Inactive', lastAccess: '3 days ago' },
    { name: 'Innovation Lab', email: 'lab@innovation.co', reports: 2, status: 'Active', lastAccess: '5 hours ago' },
  ];

  const recentReports = [
    { name: 'Sales Dashboard Q1', client: 'Acme Corp', views: 124, shared: '2024-01-10', expiry: '2024-07-10' },
    { name: 'Marketing Analytics', client: 'TechStart Inc', views: 87, shared: '2024-01-08', expiry: '2024-06-08' },
    { name: 'Financial Overview', client: 'Global Solutions', views: 203, shared: '2024-01-05', expiry: '2024-05-05' },
  ];

  // Mock clients data for EmbedReportModal
  const mockClients = [
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com' },
    { id: '2', name: 'TechStart Inc', email: 'info@techstart.io' },
    { id: '3', name: 'Global Solutions', email: 'team@global.com' },
    { id: '4', name: 'Innovation Lab', email: 'lab@innovation.co' },
  ];

  const handleAddClient = (clientData: any) => {
    console.log('Adding new client:', clientData);
    alert('Client added successfully!');
  };

  const handleEmbedReport = () => {
    setIsEmbedReportModalOpen(true);
  };

  const handleEmbedReportSubmit = (reportData: any) => {
    console.log('Embedding new report:', reportData);
    alert('Report embedded successfully!');
  };

  const handleUpgradePlan = () => {
    console.log('Navigating to upgrade plan...');
    window.location.href = '/subscription';
  };

  return (
    <Layout userType="core" currentPage="/core-dashboard">
      <div className="space-y-6">
        {/* Header with Welcome Message */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Here's what's happening with your clients and reports today.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Crown className="h-3 w-3 mr-1" />
              Pro Plan
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                {stat.limit ? (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Usage</span>
                      <span>{stat.value} / {stat.limit}</span>
                    </div>
                    <Progress 
                      value={(parseInt(stat.value) / parseInt(stat.limit)) * 100} 
                      className="h-2"
                    />
                  </div>
                ) : stat.change ? (
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {clientSummaries.map((summary, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">{summary.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg ${summary.color}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{summary.client}</p>
                      <p className="text-sm opacity-80">{summary.metric}</p>
                    </div>
                    <summary.icon className={`h-6 w-6 ${summary.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your clients and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                className="h-16 sm:h-20 flex flex-col space-y-2 text-center"
                onClick={() => setIsAddClientModalOpen(true)}
              >
                <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Add New Client</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex flex-col space-y-2 text-center"
                onClick={handleEmbedReport}
              >
                <Share className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Embed Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 sm:h-20 flex flex-col space-y-2 text-center"
                onClick={handleUpgradePlan}
              >
                <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Upgrade Plan</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Your latest client additions</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500 truncate">{client.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{client.reports} reports</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Recently shared dashboards</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.client}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{report.views} views</div>
                      <div className="text-xs text-gray-500">
                        Expires: {new Date(report.expiry).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Usage Summary</CardTitle>
            <CardDescription>Current Pro Plan - Upgrade to Enterprise for unlimited access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Clients</span>
                  <span>24 / 50</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reports</span>
                  <span>18 / 25</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>2.4 GB / 5 GB</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                Current plan: <Badge>Pro Plan</Badge>
              </div>
              <Button size="sm" onClick={handleUpgradePlan}>Upgrade Plan</Button>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <AddClientModal
          isOpen={isAddClientModalOpen}
          onClose={() => setIsAddClientModalOpen(false)}
          onSubmit={handleAddClient}
        />
        
        <EmbedReportModal
          isOpen={isEmbedReportModalOpen}
          onClose={() => setIsEmbedReportModalOpen(false)}
          onSubmit={handleEmbedReportSubmit}
          clients={mockClients}
        />
      </div>
    </Layout>
  );
};

export default CoreDashboard;
