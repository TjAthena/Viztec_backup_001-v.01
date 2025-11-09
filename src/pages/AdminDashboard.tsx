
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BarChart3, 
  DollarSign, 
  Activity,
  TrendingUp,
  UserCheck,
  Shield,
  AlertCircle,
  Plus,
  Download,
  Upload,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const kpiData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Reports',
      value: '1,429',
      change: '+8%',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,800',
      change: '+18%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: Activity,
      color: 'text-emerald-600'
    }
  ];

  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Core', status: 'Active', plan: 'Pro' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@corp.com', role: 'Client', status: 'Active', plan: 'Free' },
    { id: 3, name: 'Mike Chen', email: 'mike@startup.io', role: 'Core', status: 'Pending', plan: 'Enterprise' },
    { id: 4, name: 'Lisa Wang', email: 'lisa@tech.co', role: 'Client', status: 'Active', plan: 'Pro' },
  ];

  const auditLogs = [
    { id: 1, time: '10:30 AM', user: 'john@company.com', action: 'Created new dashboard', type: 'Create' },
    { id: 2, time: '10:15 AM', user: 'sarah@corp.com', action: 'Accessed client report', type: 'Access' },
    { id: 3, time: '09:45 AM', user: 'admin@viztec.com', action: 'Updated user permissions', type: 'Update' },
    { id: 4, time: '09:30 AM', user: 'mike@startup.io', action: 'Failed login attempt', type: 'Security' },
  ];

  const billingData = [
    { id: 1, date: '2024-01-15', customer: 'TechCorp Ltd', plan: 'Enterprise', amount: '$499', status: 'Paid' },
    { id: 2, date: '2024-01-14', customer: 'StartupXYZ', plan: 'Pro', amount: '$99', status: 'Paid' },
    { id: 3, date: '2024-01-14', customer: 'DataFlow Inc', plan: 'Pro', amount: '$99', status: 'Pending' },
  ];

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} user with ID: ${userId}`);
    // Add actual implementation here
  };

  const handleBillingAction = (action: string, billingId: number) => {
    console.log(`${action} billing with ID: ${billingId}`);
    // Add actual implementation here
  };

  const handleAuditAction = (action: string, logId: number) => {
    console.log(`${action} audit log with ID: ${logId}`);
    // Add actual implementation here
  };

  return (
    <Layout userType="admin" currentPage="/admin-dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{kpi.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {log.type === 'Security' ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <Activity className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <p className="text-sm text-gray-500">{log.user}</p>
                        </div>
                        <div className="text-sm text-gray-500">{log.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                  <CardDescription>Active plans across all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Free Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">1,281</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pro Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">996</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enterprise</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">570</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => handleUserAction('add', 0)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUserAction('import', 0)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleUserAction('export', 0)}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Status</div>
                        <div>Plan</div>
                        <div>Actions</div>
                      </div>
                      {recentUsers.map((user) => (
                        <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-b-0">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-gray-600 truncate">{user.email}</div>
                          <div>
                            <Badge variant={user.role === 'Core' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </div>
                          <div>
                            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </div>
                          <div className="text-sm">{user.plan}</div>
                          <div className="flex flex-wrap gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleUserAction('edit', user.id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleUserAction('suspend', user.id)}>
                              <Ban className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleUserAction('delete', user.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Revenue</CardTitle>
                <CardDescription>Monitor subscriptions and financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$24,800</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$298,400</div>
                    <div className="text-sm text-gray-600">Annual Revenue</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-gray-600">Collection Rate</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h4 className="font-medium">Recent Transactions</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleBillingAction('export', 0)}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" onClick={() => handleBillingAction('add', 0)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Transaction
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                        <div>Date</div>
                        <div>Customer</div>
                        <div>Plan</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      {billingData.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-b-0">
                          <div className="text-sm">{transaction.date}</div>
                          <div className="text-sm">{transaction.customer}</div>
                          <div>
                            <Badge variant="outline">{transaction.plan}</Badge>
                          </div>
                          <div className="font-medium text-green-600">{transaction.amount}</div>
                          <div>
                            <Badge variant={transaction.status === 'Paid' ? 'default' : 'secondary'}>
                              {transaction.status}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleBillingAction('view', transaction.id)}>
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleBillingAction('edit', transaction.id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>System activities and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAuditAction('filter-all', 0)}>
                      All Events
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAuditAction('filter-security', 0)}>
                      Security
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAuditAction('filter-user', 0)}>
                      User Actions
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAuditAction('filter-system', 0)}>
                      System
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAuditAction('export', 0)} className="ml-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Export Logs
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                        <div>Time</div>
                        <div>User</div>
                        <div>Action</div>
                        <div>Type</div>
                        <div>Actions</div>
                      </div>
                      {auditLogs.map((log) => (
                        <div key={log.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-b-0">
                          <div className="text-sm">{log.time}</div>
                          <div className="text-sm truncate">{log.user}</div>
                          <div className="text-sm">{log.action}</div>
                          <div>
                            <Badge 
                              variant={log.type === 'Security' ? 'destructive' : 'outline'}
                            >
                              {log.type}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleAuditAction('view', log.id)}>
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAuditAction('archive', log.id)}>
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
