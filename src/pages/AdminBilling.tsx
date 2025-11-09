import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditPlanModal from '@/components/EditPlanModal';
import BillingViewModal from '@/components/BillingViewModal';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar, 
  Download, 
  Edit, 
  Eye,
  CreditCard
} from 'lucide-react';

const AdminBilling = () => {
  const [editPlanModal, setEditPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState<any>(null);
  const [viewType, setViewType] = useState<'user' | 'plan' | 'invoice'>('user');
  
  const [plans, setPlans] = useState([
    {
      name: 'Free',
      price: '$0',
      features: ['2 clients', '1 dashboard', 'Basic support'],
      maxClients: 2,
      maxDashboards: 1,
      activeUsers: 15,
      status: 'Active'
    },
    {
      name: 'Pro',
      price: '$49',
      features: ['25 clients', '10 dashboards', 'Priority support', 'White labeling'],
      maxClients: 25,
      maxDashboards: 10,
      activeUsers: 67,
      status: 'Active'
    },
    {
      name: 'Enterprise',
      price: '$199',
      features: ['Unlimited clients', 'Unlimited dashboards', '24/7 support', 'Custom branding', 'SLA'],
      maxClients: -1,
      maxDashboards: -1,
      activeUsers: 22,
      status: 'Active'
    }
  ]);

  const billingStats = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$12,450',
      change: '+15%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Subscriptions',
      value: '89',
      change: '+8',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Upcoming Renewals',
      value: '23',
      change: 'This month',
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Conversion Rate',
      value: '24%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setEditPlanModal(true);
  };

  const handleSavePlan = (updatedPlan: any) => {
    setPlans(plans.map(p => p.name === updatedPlan.name ? updatedPlan : p));
  };

  const handleViewPlan = (plan: any) => {
    setViewData(plan);
    setViewType('plan');
    setViewModal(true);
  };

  const handleViewUser = (user: any) => {
    setViewData(user);
    setViewType('user');
    setViewModal(true);
  };

  const handleViewInvoice = (invoice: any) => {
    setViewData(invoice);
    setViewType('invoice');
    setViewModal(true);
  };

  const coreUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@consulting.com',
      currentPlan: 'Pro',
      monthlyRevenue: 49,
      clientsUsed: 15,
      dashboardsUsed: 8,
      nextBilling: '2024-02-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@datalytics.com',
      currentPlan: 'Enterprise',
      monthlyRevenue: 199,
      clientsUsed: 32,
      dashboardsUsed: 18,
      nextBilling: '2024-02-10',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@analytics.com',
      currentPlan: 'Free',
      monthlyRevenue: 0,
      clientsUsed: 2,
      dashboardsUsed: 1,
      nextBilling: 'N/A',
      status: 'Trial'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      email: 'lisa@freelance.com',
      currentPlan: 'Pro',
      monthlyRevenue: 49,
      clientsUsed: 8,
      dashboardsUsed: 4,
      nextBilling: '2024-02-20',
      status: 'Active'
    }
  ];

  const recentInvoices = [
    {
      id: 'INV-001',
      user: 'Sarah Johnson',
      plan: 'Enterprise',
      amount: 199,
      date: '2024-01-10',
      status: 'Paid'
    },
    {
      id: 'INV-002',
      user: 'John Smith',
      plan: 'Pro',
      amount: 49,
      date: '2024-01-15',
      status: 'Paid'
    },
    {
      id: 'INV-003',
      user: 'Lisa Brown',
      plan: 'Pro',
      amount: 49,
      date: '2024-01-20',
      status: 'Pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Trial':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Layout userType="admin" currentPage="/admin-billing">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Plans</h1>
            <p className="text-gray-600">Manage subscriptions, billing, and revenue</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Revenue Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {billingStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plans Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Plans Overview</CardTitle>
            <CardDescription>Manage subscription plans and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.name} className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-2xl font-bold">{plan.price}<span className="text-sm text-gray-500">/mo</span></div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Features:</p>
                      <ul className="text-sm space-y-1 mt-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Users:</span>
                      <span className="font-medium">{plan.activeUsers}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditPlan(plan)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleViewPlan(plan)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Core Users Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Core Users Billing</CardTitle>
            <CardDescription>Monitor subscription usage and revenue by user</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Current Plan</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coreUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.currentPlan}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.clientsUsed} clients</div>
                        <div className="text-gray-500">{user.dashboardsUsed} dashboards</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${user.monthlyRevenue}/mo</div>
                    </TableCell>
                    <TableCell>{user.nextBilling}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest billing transactions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono">{invoice.id}</TableCell>
                    <TableCell>{invoice.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{invoice.plan}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${invoice.amount}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Plan Modal */}
        {selectedPlan && (
          <EditPlanModal
            open={editPlanModal}
            onOpenChange={setEditPlanModal}
            plan={selectedPlan}
            onSave={handleSavePlan}
          />
        )}

        {/* View Details Modal */}
        {viewData && (
          <BillingViewModal
            open={viewModal}
            onOpenChange={setViewModal}
            type={viewType}
            data={viewData}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminBilling;
