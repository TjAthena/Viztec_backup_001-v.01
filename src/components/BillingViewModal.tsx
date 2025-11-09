
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Building, 
  CreditCard, 
  Calendar, 
  Users, 
  BarChart3, 
  DollarSign,
  Clock,
  Activity,
  TrendingUp
} from 'lucide-react';

interface BillingViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'user' | 'plan' | 'invoice';
  data: any;
}

const BillingViewModal = ({ open, onOpenChange, type, data }: BillingViewModalProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case 'Trial':
      case 'Pending':
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderUserView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <div className="font-medium">{data.name}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{data.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Current Plan</label>
              <Badge variant="outline">{data.currentPlan}</Badge>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Status</label>
              {getStatusBadge(data.status)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Monthly Revenue</label>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-xl font-bold">${data.monthlyRevenue}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Next Billing</label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{data.nextBilling}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{data.clientsUsed}</div>
                <div className="text-sm text-gray-600">Clients Used</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{data.dashboardsUsed}</div>
                <div className="text-sm text-gray-600">Dashboards Used</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlanView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            {data.name} Plan
            <div className="text-2xl font-bold">{data.price}<span className="text-sm text-gray-500">/mo</span></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Features</label>
              <ul className="mt-2 space-y-1">
                {data.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Max Clients</label>
                <div className="text-lg font-semibold">
                  {data.maxClients === -1 ? 'Unlimited' : data.maxClients}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Max Dashboards</label>
                <div className="text-lg font-semibold">
                  {data.maxDashboards === -1 ? 'Unlimited' : data.maxDashboards}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{data.activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{getStatusBadge(data.status)}</div>
                <div className="text-sm text-gray-600">Plan Status</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInvoiceView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Invoice ID</label>
              <div className="font-mono text-sm">{data.id}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">User</label>
              <div className="font-medium">{data.user}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Plan</label>
              <Badge variant="outline">{data.plan}</Badge>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Amount</label>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-xl font-bold">${data.amount}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Date</label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{data.date}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Status</label>
              {getStatusBadge(data.status)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>${data.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span>$0.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${data.amount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getModalTitle = () => {
    switch (type) {
      case 'user':
        return `User Billing Details - ${data.name}`;
      case 'plan':
        return `Plan Details - ${data.name}`;
      case 'invoice':
        return `Invoice Details - ${data.id}`;
      default:
        return 'Details';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
          <DialogDescription>
            {type === 'user' && `Complete billing information for ${data.name}`}
            {type === 'plan' && `Detailed information about the ${data.name} plan`}
            {type === 'invoice' && `Invoice details and payment information`}
          </DialogDescription>
        </DialogHeader>
        
        {type === 'user' && renderUserView()}
        {type === 'plan' && renderPlanView()}
        {type === 'invoice' && renderInvoiceView()}
      </DialogContent>
    </Dialog>
  );
};

export default BillingViewModal;
