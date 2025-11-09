
import { useState } from 'react';
import Layout from '@/components/Layout';
import UserDetailsModal from '@/components/UserDetailsModal';
import SuspendUserModal from '@/components/SuspendUserModal';
import DeleteUserModal from '@/components/DeleteUserModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  UserCheck, 
  UserX,
  Shield,
  ShieldAlert
} from 'lucide-react';

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@consulting.com',
      role: 'Core',
      plan: 'Pro',
      status: 'Active',
      clients: 15,
      dashboards: 8,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20',
      phone: '+1 (555) 123-4567',
      company: 'Smith Consulting',
      planExpiryDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@datalytics.com',
      role: 'Core',
      plan: 'Enterprise',
      status: 'Active',
      clients: 32,
      dashboards: 18,
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19',
      planExpiryDate: '2024-04-10'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@client.com',
      role: 'Client',
      plan: 'N/A',
      status: 'Active',
      clients: 0,
      dashboards: 3,
      createdAt: '2024-01-18',
      lastLogin: '2024-01-20',
      planExpiryDate: 'N/A'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      email: 'lisa@freelance.com',
      role: 'Core',
      plan: 'Free',
      status: 'Suspended',
      clients: 2,
      dashboards: 1,
      createdAt: '2024-01-19',
      lastLogin: '2024-01-19',
      planExpiryDate: '2024-02-19'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

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

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleSuspendUser = (user: any) => {
    setUserToSuspend(user);
    setIsSuspendModalOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmSuspendUser = (userId: number, reason?: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'Suspended' ? 'Active' : 'Suspended' }
          : user
      )
    );
    console.log(`User ${userId} ${userToSuspend?.status === 'Suspended' ? 'reactivated' : 'suspended'}. Reason: ${reason}`);
  };

  const confirmDeleteUser = (userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    console.log(`User ${userId} deleted`);
  };

  return (
    <Layout userType="admin" currentPage="/admin-users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage all platform users and their permissions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Core Users</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'Core').length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Client Users</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'Client').length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Today</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter(u => u.lastLogin === '2024-01-20').length}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="core">Core</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className={user.status === 'Suspended' ? 'opacity-60' : ''}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.plan}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.clients} clients</div>
                        <div className="text-gray-500">{user.dashboards} dashboards</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleViewUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleSuspendUser(user)}
                            className={user.status === 'Suspended' ? 'text-green-600' : 'text-orange-600'}
                          >
                            {user.status === 'Suspended' ? (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Reactivate User
                              </>
                            ) : (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Suspend User
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modals */}
        {selectedUser && (
          <UserDetailsModal
            open={isViewModalOpen}
            onOpenChange={setIsViewModalOpen}
            user={selectedUser}
          />
        )}

        {userToSuspend && (
          <SuspendUserModal
            open={isSuspendModalOpen}
            onOpenChange={setIsSuspendModalOpen}
            user={userToSuspend}
            onConfirm={confirmSuspendUser}
          />
        )}

        {userToDelete && (
          <DeleteUserModal
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            user={userToDelete}
            onConfirm={confirmDeleteUser}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminUserManagement;
