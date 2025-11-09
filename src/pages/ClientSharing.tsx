import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Share2,
  Mail,
  Plus,
  Trash2,
  Clock,
  Eye,
  Calendar,
  User
} from 'lucide-react';

const ClientSharing = () => {
  const [newEmail, setNewEmail] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const [accessDuration, setAccessDuration] = useState('');

  // Available reports
  const reports = [
    { id: '1', name: 'Sales Performance Dashboard' },
    { id: '2', name: 'Marketing ROI Analysis' },
    { id: '3', name: 'Financial Overview Report' }
  ];

  // Access duration options
  const durationOptions = [
    { value: '7', label: '7 Days' },
    { value: '14', label: '14 Days' },
    { value: '30', label: '30 Days' },
    { value: '60', label: '60 Days' },
    { value: '90', label: '90 Days' },
    { value: 'unlimited', label: 'Unlimited' }
  ];

  // Existing shared reports
  const [sharedReports, setSharedReports] = useState([
    {
      id: 1,
      email: 'john.smith@example.com',
      reportName: 'Sales Performance Dashboard',
      accessDuration: '30 Days',
      sharedDate: '2024-01-10',
      expiryDate: '2024-02-09',
      views: 12,
      status: 'Active'
    },
    {
      id: 2,
      email: 'mary.wilson@company.com',
      reportName: 'Marketing ROI Analysis',
      accessDuration: '14 Days',
      sharedDate: '2024-01-08',
      expiryDate: '2024-01-22',
      views: 8,
      status: 'Active'
    },
    {
      id: 3,
      email: 'david.brown@firm.org',
      reportName: 'Financial Overview Report',
      accessDuration: '7 Days',
      sharedDate: '2024-01-05',
      expiryDate: '2024-01-12',
      views: 3,
      status: 'Expired'
    }
  ]);

  const handleAddShare = () => {
    if (newEmail && selectedReport && accessDuration) {
      const selectedReportName = reports.find(r => r.id === selectedReport)?.name || '';
      const durationLabel = durationOptions.find(d => d.value === accessDuration)?.label || '';
      
      const newShare = {
        id: Date.now(),
        email: newEmail,
        reportName: selectedReportName,
        accessDuration: durationLabel,
        sharedDate: new Date().toISOString().split('T')[0],
        expiryDate: accessDuration === 'unlimited' ? 'Never' : new Date(Date.now() + parseInt(accessDuration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: 0,
        status: 'Active'
      };

      setSharedReports([newShare, ...sharedReports]);
      setNewEmail('');
      setSelectedReport('');
      setAccessDuration('');
    }
  };

  const handleRemoveShare = (id: number) => {
    setSharedReports(sharedReports.filter(share => share.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    if (expiryDate === 'Never') return 'Never expires';
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    return `${diffDays} days left`;
  };

  return (
    <Layout userType="client" currentPage="/client-sharing">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Share Reports</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Share your dashboard reports with specific email addresses</p>
          </div>
        </div>

        {/* Add New Share Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Share New Report</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Add an email address to share your dashboard report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="report" className="text-xs sm:text-sm">Select Report</Label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose report" />
                  </SelectTrigger>
                  <SelectContent>
                    {reports.map((report) => (
                      <SelectItem key={report.id} value={report.id}>
                        {report.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration" className="text-xs sm:text-sm">Access Duration</Label>
                <Select value={accessDuration} onValueChange={setAccessDuration}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleAddShare}
                  className="w-full text-sm"
                  disabled={!newEmail || !selectedReport || !accessDuration}
                >
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Share Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shared Reports List */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Shared Reports</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Manage your shared dashboard reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {sharedReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Share2 className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">No reports shared yet</p>
                  <p className="text-xs sm:text-sm">Use the form above to share your first report</p>
                </div>
              ) : (
                sharedReports.map((share) => (
                  <div key={share.id} className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center space-x-2 mb-2 flex-wrap">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium truncate text-sm sm:text-base">{share.email}</span>
                          {getStatusBadge(share.status)}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{share.reportName}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span className="hidden sm:inline">Shared: {new Date(share.sharedDate).toLocaleDateString()}</span>
                            <span className="sm:hidden">{new Date(share.sharedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{getDaysUntilExpiry(share.expiryDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{share.views} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveShare(share.id)}
                          className="text-red-600 hover:text-red-700 w-full sm:w-auto text-xs sm:text-sm"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardContent className="flex items-center p-4 sm:p-5 md:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">{sharedReports.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Shares</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4 sm:p-5 md:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {sharedReports.filter(s => s.status === 'Active').length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Active Shares</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4 sm:p-5 md:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {sharedReports.reduce((sum, share) => sum + share.views, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Views</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ClientSharing;
