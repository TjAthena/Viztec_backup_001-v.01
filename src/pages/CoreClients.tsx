import { useState } from 'react';
import Layout from '@/components/Layout';
import AddClientModal from '@/components/AddClientModal';
import EditClientModal from '@/components/EditClientModal';
import SuspendUserModal from '@/components/SuspendUserModal';
import DeleteUserModal from '@/components/DeleteUserModal';
import ClientMessagingPanel from '@/components/ClientMessagingPanel';
import ClientActivityLog from '@/components/ClientActivityLog';
import AdvancedFilters from '@/components/AdvancedFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  Plus, 
  Eye, 
  Edit, 
  UserX, 
  UserCheck, 
  Users,
  BarChart3,
  Clock,
  MoreHorizontal,
  Trash,
  MessageSquare,
  Activity
} from 'lucide-react';

interface FilterState {
  status?: string;
  client?: string;
}

const CoreClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMessagingPanelOpen, setIsMessagingPanelOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedClientForMessage, setSelectedClientForMessage] = useState<any>(null);
  const [userToSuspend, setUserToSuspend] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [selectedClientForDetails, setSelectedClientForDetails] = useState<any>(null);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@techcorp.com',
      phone: '+1 (555) 234-5678',
      company: 'TechCorp Inc.',
      dashboardsAssigned: 3,
      accessExpiry: '2024-07-15',
      status: 'Active',
      lastLogin: '2024-01-19',
      notes: 'VIP client - high priority'
    },
    {
      id: 2,
      name: 'Bob Williams',
      email: 'bob@retailplus.com',
      phone: '+1 (555) 345-6789',
      company: 'Retail Plus',
      dashboardsAssigned: 2,
      accessExpiry: '2024-06-30',
      status: 'Active',
      lastLogin: '2024-01-18',
      notes: 'Monthly review scheduled'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@logistics.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Logistics',
      dashboardsAssigned: 1,
      accessExpiry: '2024-05-20',
      status: 'Suspended',
      lastLogin: '2024-01-10',
      notes: 'Contract renewal pending'
    }
  ]);

  // Sample activity data
  const sampleActivities = [
    {
      id: 1,
      type: 'dashboard_view' as const,
      description: 'Viewed Sales Performance Dashboard',
      timestamp: '2024-01-19T10:30:00Z',
      metadata: { dashboardName: 'Sales Performance Dashboard' }
    },
    {
      id: 2,
      type: 'login' as const,
      description: 'Logged into the system',
      timestamp: '2024-01-19T09:15:00Z',
      metadata: { ipAddress: '192.168.1.100' }
    },
    {
      id: 3,
      type: 'profile_update' as const,
      description: 'Updated profile information',
      timestamp: '2024-01-18T14:22:00Z',
      metadata: { fieldChanged: 'Contact Information' }
    }
  ];

  const filterOptions = {
    statuses: ['Active', 'Suspended', 'Expired'],
    clients: clients.map(c => c.company)
  };

  // Apply filters
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || client.status === filters.status;
    const matchesClient = !filters.client || client.company === filters.client;
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  const handleMessageClient = (client: any) => {
    setSelectedClientForMessage(client);
    setIsMessagingPanelOpen(true);
  };

  const handleViewClientDetails = (client: any) => {
    setSelectedClientForDetails(client);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'Suspended':
        return <Badge className="bg-orange-100 text-orange-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAddClient = (clientData: any) => {
    console.log('Adding new client:', clientData);
    alert('Client added successfully!');
  };

  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleUpdateClient = (updatedClient: any) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === updatedClient.id ? { ...client, ...updatedClient } : client
      )
    );
    console.log('Client updated:', updatedClient);
    alert('Client updated successfully!');
  };

  const handleSuspendClient = (client: any) => {
    setUserToSuspend(client);
    setIsSuspendModalOpen(true);
  };

  const handleDeleteClient = (client: any) => {
    setUserToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const confirmSuspendClient = (clientId: number, reason?: string) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, status: client.status === 'Suspended' ? 'Active' : 'Suspended' }
          : client
      )
    );
    console.log(`Client ${clientId} ${userToSuspend?.status === 'Suspended' ? 'reactivated' : 'suspended'}. Reason: ${reason}`);
  };

  const confirmDeleteClient = (clientId: number) => {
    setClients(prevClients => prevClients.filter(client => client.id !== clientId));
    console.log(`Client ${clientId} deleted`);
  };

  const activeClients = clients.filter(c => c.status === 'Active').length;
  const totalDashboards = clients.reduce((sum, c) => sum + c.dashboardsAssigned, 0);

  return (
    <TooltipProvider>
      <Layout userType="core" currentPage="/core-clients">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
              <p className="text-gray-600">Manage your clients and their dashboard access</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Clients</p>
                    <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Clients</p>
                    <p className="text-3xl font-bold text-gray-900">{activeClients}</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Dashboards</p>
                    <p className="text-3xl font-bold text-gray-900">{totalDashboards}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedClientForDetails ? (
            <Tabs defaultValue="details" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedClientForDetails.name}</h2>
                  <p className="text-gray-600">{selectedClientForDetails.company}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedClientForDetails(null)}>
                  Back to List
                </Button>
              </div>
              
              <TabsList>
                <TabsTrigger value="details">Client Details</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Name</label>
                        <p className="text-sm">{selectedClientForDetails.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-sm">{selectedClientForDetails.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Company</label>
                        <p className="text-sm">{selectedClientForDetails.company}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-sm">{selectedClientForDetails.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <div className="mt-1">{getStatusBadge(selectedClientForDetails.status)}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Access Expiry</label>
                        <p className="text-sm">{new Date(selectedClientForDetails.accessExpiry).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={() => handleMessageClient(selectedClientForDetails)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Client
                      </Button>
                      <Button variant="outline" onClick={() => handleEditClient(selectedClientForDetails)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Client
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <ClientActivityLog clientId={selectedClientForDetails.id} activities={sampleActivities} />
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {/* Advanced Filters */}
              <AdvancedFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filters={filters}
                onFiltersChange={setFilters}
                filterOptions={filterOptions}
                placeholder="Search by name, email, or company..."
              />

              {/* Clients Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Clients ({filteredClients.length})</CardTitle>
                  <CardDescription>Manage client access and dashboard assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Dashboards</TableHead>
                        <TableHead>Access Expiry</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow 
                          key={client.id}
                          className={client.status === 'Suspended' ? 'opacity-60' : ''}
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-gray-500">{client.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{client.company}</div>
                              <div className="text-sm text-gray-500">{client.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4 text-gray-400" />
                              <span>{client.dashboardsAssigned}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{new Date(client.accessExpiry).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(client.status)}</TableCell>
                          <TableCell>{new Date(client.lastLogin).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleMessageClient(client)}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Message Client</TooltipContent>
                              </Tooltip>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => handleViewClientDetails(client)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditClient(client)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Client
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleSuspendClient(client)}
                                    className={client.status === 'Suspended' ? 'text-green-600' : 'text-orange-600'}
                                  >
                                    {client.status === 'Suspended' ? (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Reactivate Client
                                      </>
                                    ) : (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" />
                                        Suspend Client
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteClient(client)}
                                    className="text-red-600"
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete Client
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {/* Modals */}
          <AddClientModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddClient}
          />

          <EditClientModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateClient}
            client={selectedClient}
          />

          {userToSuspend && (
            <SuspendUserModal
              open={isSuspendModalOpen}
              onOpenChange={setIsSuspendModalOpen}
              user={userToSuspend}
              onConfirm={confirmSuspendClient}
            />
          )}

          {userToDelete && (
            <DeleteUserModal
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
              user={userToDelete}
              onConfirm={confirmDeleteClient}
            />
          )}

          {/* Client Messaging Panel */}
          <ClientMessagingPanel
            isOpen={isMessagingPanelOpen}
            onClose={() => setIsMessagingPanelOpen(false)}
            client={selectedClientForMessage}
          />
        </div>
      </Layout>
    </TooltipProvider>
  );
};

export default CoreClients;
