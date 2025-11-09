
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Mail, Phone, Building, CreditCard, Users, BarChart3, Clock } from 'lucide-react';

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    plan: string;
    status: string;
    clients: number;
    dashboards: number;
    createdAt: string;
    lastLogin: string;
    phone?: string;
    company?: string;
    industry?: string;
    planExpiryDate?: string;
  };
}

const UserDetailsModal = ({ open, onOpenChange, user }: UserDetailsModalProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Trial':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>User Details</span>
            {getRoleBadge(user.role)}
            {getStatusBadge(user.status)}
          </DialogTitle>
          <DialogDescription>
            Complete information about {user.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{user.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                </div>
                {user.phone && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                )}
                {user.company && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Company</label>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{user.company}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Role</label>
                  <div>{getRoleBadge(user.role)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div>{getStatusBadge(user.status)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Plan</label>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <Badge variant="outline">{user.plan}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Account Created</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {user.planExpiryDate && user.planExpiryDate !== 'N/A' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Plan Expiry Date</label>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{new Date(user.planExpiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          {user.role === 'Core' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{user.clients}</div>
                      <div className="text-sm text-gray-600">Total Clients</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">{user.dashboards}</div>
                      <div className="text-sm text-gray-600">Dashboards</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Last Login:</span>
                  <span className="text-sm">{new Date(user.lastLogin).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Account Status:</span>
                  <span className="text-sm">{user.status} since {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
