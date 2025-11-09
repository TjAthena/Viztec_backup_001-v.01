
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Activity,
  Shield,
  User,
  FileText
} from 'lucide-react';

const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7days');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-20 14:30:25',
      user: 'john@consulting.com',
      role: 'Core',
      action: 'Login',
      object: 'Dashboard',
      details: 'Successful login from IP 192.168.1.100',
      ipAddress: '192.168.1.100',
      severity: 'Info'
    },
    {
      id: 2,
      timestamp: '2024-01-20 14:25:12',
      user: 'sarah@datalytics.com',
      role: 'Core',
      action: 'Report Created',
      object: 'Sales Dashboard Q1',
      details: 'New report embedded and assigned to 3 clients',
      ipAddress: '192.168.1.105',
      severity: 'Info'
    },
    {
      id: 3,
      timestamp: '2024-01-20 13:45:33',
      user: 'admin@viztec.com',
      role: 'Admin',
      action: 'User Suspended',
      object: 'user_456',
      details: 'User suspended due to policy violation',
      ipAddress: '10.0.0.1',
      severity: 'Warning'
    },
    {
      id: 4,
      timestamp: '2024-01-20 12:15:44',
      user: 'mike@client.com',
      role: 'Client',
      action: 'Report Access',
      object: 'Marketing ROI Dashboard',
      details: 'Dashboard accessed and viewed for 15 minutes',
      ipAddress: '203.0.113.10',
      severity: 'Info'
    },
    {
      id: 5,
      timestamp: '2024-01-20 11:30:18',
      user: 'hacker@suspicious.com',
      role: 'Unknown',
      action: 'Failed Login',
      object: 'Login Attempt',
      details: 'Multiple failed login attempts detected',
      ipAddress: '198.51.100.1',
      severity: 'Critical'
    }
  ];

  const activityStats = [
    {
      title: 'Total Actions Today',
      value: '247',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Failed Logins',
      value: '12',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'Report Accesses',
      value: '89',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: '34',
      icon: User,
      color: 'text-purple-600'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      case 'Warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'Critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case 'Core':
        return <Badge className="bg-blue-100 text-blue-800">Core</Badge>;
      case 'Client':
        return <Badge className="bg-gray-100 text-gray-800">Client</Badge>;
      case 'Unknown':
        return <Badge className="bg-red-100 text-red-800">Unknown</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.object.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || log.role.toLowerCase() === roleFilter;
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    
    return matchesSearch && matchesRole && matchesAction;
  });

  return (
    <Layout userType="admin" currentPage="/admin-logs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-600">Monitor system activities and security events</p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Audit Logs
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {activityStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="report">Report Access</SelectItem>
                  <SelectItem value="user">User Management</SelectItem>
                  <SelectItem value="failed">Failed Attempts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">Last 24 hours</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>System Activity ({filteredLogs.length} entries)</CardTitle>
            <CardDescription>Detailed log of all system activities and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Object</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{log.user}</div>
                    </TableCell>
                    <TableCell>{getRoleBadge(log.role)}</TableCell>
                    <TableCell>
                      <div className="font-medium">{log.action}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{log.object}</div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Timeline</CardTitle>
            <CardDescription>Chronological view of recent system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full ${
                    log.severity === 'Critical' ? 'bg-red-100' :
                    log.severity === 'Warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Activity className={`h-4 w-4 ${
                      log.severity === 'Critical' ? 'text-red-600' :
                      log.severity === 'Warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{log.action}</div>
                      <div className="text-sm text-gray-500">{log.timestamp}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{log.details}</div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>User: {log.user}</span>
                      <span>IP: {log.ipAddress}</span>
                      {getSeverityBadge(log.severity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminAuditLogs;
