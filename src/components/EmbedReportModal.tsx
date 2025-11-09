
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Search, Users } from 'lucide-react';

interface EmbedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: any) => void;
  clients: Array<{ id: string; name: string; email: string; }>;
}

const EmbedReportModal = ({ isOpen, onClose, onSubmit, clients }: EmbedReportModalProps) => {
  const [formData, setFormData] = useState({
    reportTitle: '',
    embedUrl: '',
    description: '',
    selectedClients: [] as string[],
    accessExpiry: ''
  });
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  const handleClientSelection = (clientId: string) => {
    if (formData.selectedClients.includes(clientId)) {
      setFormData(prev => ({
        ...prev,
        selectedClients: prev.selectedClients.filter(id => id !== clientId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        selectedClients: [...prev.selectedClients, clientId]
      }));
    }
  };

  const getSelectedClientsNames = () => {
    return clients
      .filter(client => formData.selectedClients.includes(client.id))
      .map(client => client.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reportTitle || !formData.embedUrl) {
      alert('Report title and embed URL are required');
      return;
    }

    if (formData.selectedClients.length === 0) {
      alert('Please select at least one client to assign this report');
      return;
    }

    onSubmit(formData);
    setFormData({
      reportTitle: '',
      embedUrl: '',
      description: '',
      selectedClients: [],
      accessExpiry: ''
    });
    setClientSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Embed New Report</CardTitle>
            <CardDescription>Add a new dashboard and assign it to clients</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportTitle">Report Title *</Label>
              <Input
                id="reportTitle"
                value={formData.reportTitle}
                onChange={(e) => handleInputChange('reportTitle', e.target.value)}
                placeholder="e.g., Sales Dashboard Q1 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="embedUrl">Embed URL *</Label>
              <Textarea
                id="embedUrl"
                value={formData.embedUrl}
                onChange={(e) => handleInputChange('embedUrl', e.target.value)}
                placeholder="Paste your Power BI, Tableau, or other dashboard embed URL here..."
                rows={3}
                required
              />
              <p className="text-xs text-gray-500">
                This should be the full embed URL from your BI tool (Power BI, Tableau, etc.)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of what this dashboard shows..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessExpiry">Access Expiry Date</Label>
              <Input
                id="accessExpiry"
                type="date"
                value={formData.accessExpiry}
                onChange={(e) => handleInputChange('accessExpiry', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Leave empty for no expiration. Clients will lose access after this date.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Assign to Clients *</Label>
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients to assign..."
                    value={clientSearchTerm}
                    onChange={(e) => setClientSearchTerm(e.target.value)}
                    onFocus={() => setShowClientDropdown(true)}
                    className="pl-10"
                  />
                </div>
                
                {showClientDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                    {filteredClients.length === 0 ? (
                      <div className="p-3 text-gray-500 text-sm">
                        {clients.length === 0 ? 'No clients available. Add clients first.' : 'No clients found.'}
                      </div>
                    ) : (
                      filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center space-x-2 p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleClientSelection(client.id)}
                        >
                          <Checkbox
                            checked={formData.selectedClients.includes(client.id)}
                            onChange={() => {}}
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{client.name}</div>
                            <div className="text-xs text-gray-500">{client.email}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {formData.selectedClients.length} client(s) selected
                </p>
                {showClientDropdown && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowClientDropdown(false)}
                  >
                    Done
                  </Button>
                )}
              </div>

              {formData.selectedClients.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                  {getSelectedClientsNames().map((name, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1">
                Embed Report
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbedReportModal;
