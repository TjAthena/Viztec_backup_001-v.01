
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  User, 
  Building2, 
  Mail, 
  Lock, 
  Send,
  UserPlus
} from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: any) => void;
}

const AddClientModal = ({ isOpen, onClose, onSubmit }: AddClientModalProps) => {
  const [activeTab, setActiveTab] = useState('manual');
  
  const [manualFormData, setManualFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [inviteFormData, setInviteFormData] = useState({
    clientName: '',
    companyName: '',
    email: ''
  });

  const handleManualInputChange = (field: string, value: string) => {
    setManualFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInviteInputChange = (field: string, value: string) => {
    setInviteFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateManualForm = () => {
    if (!manualFormData.clientName || !manualFormData.companyName || !manualFormData.email || !manualFormData.password) {
      alert('All fields are required');
      return false;
    }

    if (!manualFormData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }

    if (manualFormData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }

    if (manualFormData.password !== manualFormData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    return true;
  };

  const validateInviteForm = () => {
    if (!inviteFormData.clientName || !inviteFormData.companyName || !inviteFormData.email) {
      alert('All fields are required');
      return false;
    }

    if (!inviteFormData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateManualForm()) return;

    onSubmit({
      ...manualFormData,
      type: 'manual'
    });
    
    setManualFormData({
      clientName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    onClose();
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInviteForm()) return;

    onSubmit({
      ...inviteFormData,
      type: 'invite'
    });
    
    setInviteFormData({
      clientName: '',
      companyName: '',
      email: ''
    });
    onClose();
  };

  const resetForms = () => {
    setManualFormData({
      clientName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setInviteFormData({
      clientName: '',
      companyName: '',
      email: ''
    });
    setActiveTab('manual');
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 gap-0 bg-background border border-border shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b border-border bg-background">
          <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Add New Client
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
              <TabsTrigger 
                value="manual" 
                className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Manual Creation
              </TabsTrigger>
              <TabsTrigger 
                value="invite"
                className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Send Invite
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="mt-0">
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-clientName" className="text-sm font-medium text-foreground">
                    Client Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="manual-clientName"
                      value={manualFormData.clientName}
                      onChange={(e) => handleManualInputChange('clientName', e.target.value)}
                      placeholder="Enter client full name"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-companyName" className="text-sm font-medium text-foreground">
                    Company Name
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="manual-companyName"
                      value={manualFormData.companyName}
                      onChange={(e) => handleManualInputChange('companyName', e.target.value)}
                      placeholder="Enter company name"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="manual-email"
                      type="email"
                      value={manualFormData.email}
                      onChange={(e) => handleManualInputChange('email', e.target.value)}
                      placeholder="client@example.com"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="manual-password"
                      type="password"
                      value={manualFormData.password}
                      onChange={(e) => handleManualInputChange('password', e.target.value)}
                      placeholder="Create password"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="manual-confirmPassword"
                      type="password"
                      value={manualFormData.confirmPassword}
                      onChange={(e) => handleManualInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm password"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  >
                    Create Client
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleClose}
                    className="px-6 h-11 border-input hover:bg-accent hover:text-accent-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="invite" className="mt-0">
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-clientName" className="text-sm font-medium text-foreground">
                    Client Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-clientName"
                      value={inviteFormData.clientName}
                      onChange={(e) => handleInviteInputChange('clientName', e.target.value)}
                      placeholder="Enter client full name"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invite-companyName" className="text-sm font-medium text-foreground">
                    Company Name
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-companyName"
                      value={inviteFormData.companyName}
                      onChange={(e) => handleInviteInputChange('companyName', e.target.value)}
                      placeholder="Enter company name"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invite-email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-email"
                      type="email"
                      value={inviteFormData.email}
                      onChange={(e) => handleInviteInputChange('email', e.target.value)}
                      placeholder="client@example.com"
                      className="pl-10 h-11 bg-background border-input focus:border-ring focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Invite Link
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleClose}
                    className="px-6 h-11 border-input hover:bg-accent hover:text-accent-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
