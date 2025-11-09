import { useState } from 'react';
import Layout from '@/components/Layout';
import EmbedReportModal from '@/components/EmbedReportModal';
import ReportPreviewModal from '@/components/ReportPreviewModal';
import AdvancedFilters from '@/components/AdvancedFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  Plus, 
  Eye, 
  Edit, 
  Users,
  BarChart3,
  Calendar,
  Activity,
  ExternalLink
} from 'lucide-react';

interface FilterState {
  status?: string;
  type?: string;
}

const CoreReports = () => {
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({});

  const clients = [
    { id: '1', name: 'Alice Johnson', email: 'alice@techcorp.com' },
    { id: '2', name: 'Bob Williams', email: 'bob@retailplus.com' },
    { id: '3', name: 'Carol Davis', email: 'carol@logistics.com' }
  ];

  const reports = [
    {
      id: 1,
      title: 'Sales Performance Dashboard',
      embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZGFjY...',
      description: 'Q1 2024 sales metrics and KPIs',
      clientsAssigned: ['Alice Johnson', 'Bob Williams'],
      lastUpdated: '2024-01-19',
      status: 'Active',
      views: 245,
      tool: 'Power BI'
    },
    {
      id: 2,
      title: 'Financial Overview Report',
      embedUrl: 'https://tableau.example.com/views/financial...',
      description: 'Monthly financial performance tracking',
      clientsAssigned: ['Carol Davis'],
      lastUpdated: '2024-01-18',
      status: 'Active',
      views: 156,
      tool: 'Tableau'
    },
    {
      id: 3,
      title: 'Marketing Analytics',
      embedUrl: 'https://datastudio.google.com/reporting/...',
      description: 'Marketing campaign performance metrics',
      clientsAssigned: ['Alice Johnson'],
      lastUpdated: '2024-01-15',
      status: 'Draft',
      views: 89,
      tool: 'Google Data Studio'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tool.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || report.status === filters.status;
    const matchesTool = !filters.type || report.tool === filters.type;
    
    return matchesSearch && matchesStatus && matchesTool;
  });

  const filterOptions = {
    statuses: ['Active', 'Draft', 'Inactive'],
    types: ['Power BI', 'Tableau', 'Google Data Studio', 'Looker'],
  };

  const handlePreviewReport = (report: any) => {
    setSelectedReport(report);
    setIsPreviewModalOpen(true);
  };

  const handleEmbedReport = (reportData: any) => {
    console.log('Embedding new report:', reportData);
    alert('Report embedded successfully!');
  };

  const activeReports = reports.filter(r => r.status === 'Active').length;
  const totalViews = reports.reduce((sum, r) => sum + r.views, 0);
  const totalClients = new Set(reports.flatMap(r => r.clientsAssigned)).size;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getToolBadge = (tool: string) => {
    const colors = {
      'Power BI': 'bg-blue-100 text-blue-800',
      'Tableau': 'bg-orange-100 text-orange-800',
      'Google Data Studio': 'bg-green-100 text-green-800',
      'Looker': 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[tool as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{tool}</Badge>;
  };

  return (
    <TooltipProvider>
      <Layout userType="core" currentPage="/core-reports">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Dashboards</h1>
              <p className="text-gray-600">Manage and embed your business intelligence dashboards</p>
            </div>
            <Button onClick={() => setIsEmbedModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Embed New Report
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Reports</p>
                    <p className="text-3xl font-bold text-gray-900">{activeReports}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clients Served</p>
                    <p className="text-3xl font-bold text-gray-900">{totalClients}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quota Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Plan Usage</CardTitle>
              <CardDescription>Track your dashboard usage against plan limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dashboards Used</span>
                    <span>{reports.length} / 25</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(reports.length / 25) * 100}%` }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Clients Assigned</span>
                    <span>{totalClients} / 50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(totalClients / 50) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Filters */}
          <AdvancedFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
            filterOptions={filterOptions}
            placeholder="Search by title, description, or tool..."
          />

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Reports ({filteredReports.length})</CardTitle>
              <CardDescription>Manage your embedded dashboards and client assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Tool</TableHead>
                    <TableHead>Clients Assigned</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{report.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getToolBadge(report.tool)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{report.clientsAssigned.length}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {report.clientsAssigned.slice(0, 2).join(', ')}
                          {report.clientsAssigned.length > 2 && ` +${report.clientsAssigned.length - 2} more`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span>{report.views}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{new Date(report.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handlePreviewReport(report)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview Report</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Report</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Open External Link</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Modals */}
          <EmbedReportModal
            isOpen={isEmbedModalOpen}
            onClose={() => setIsEmbedModalOpen(false)}
            onSubmit={handleEmbedReport}
            clients={clients}
          />

          <ReportPreviewModal
            isOpen={isPreviewModalOpen}
            onClose={() => setIsPreviewModalOpen(false)}
            report={selectedReport}
          />
        </div>
      </Layout>
    </TooltipProvider>
  );
};

export default CoreReports;
