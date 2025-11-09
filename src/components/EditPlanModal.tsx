import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface EditPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    name: string;
    price: string;
    features: string[];
    maxClients: number;
    maxDashboards: number;
    activeUsers: number;
    status: string;
  };
  onSave: (updatedPlan: any) => void;
}

const EditPlanModal = ({ open, onOpenChange, plan, onSave }: EditPlanModalProps) => {
  const [formData, setFormData] = useState({
    name: plan.name,
    price: plan.price.replace('$', ''),
    features: plan.features.join('\n'),
    maxClients: plan.maxClients === -1 ? '' : plan.maxClients.toString(),
    maxDashboards: plan.maxDashboards === -1 ? '' : plan.maxDashboards.toString(),
    isActive: plan.status === 'Active'
  });

  const handleSave = () => {
    const updatedPlan = {
      ...plan,
      name: formData.name,
      price: `$${formData.price}`,
      features: formData.features.split('\n').filter(f => f.trim()),
      maxClients: formData.maxClients === '' ? -1 : parseInt(formData.maxClients),
      maxDashboards: formData.maxDashboards === '' ? -1 : parseInt(formData.maxDashboards),
      status: formData.isActive ? 'Active' : 'Inactive'
    };
    onSave(updatedPlan);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Plan - {plan.name}</DialogTitle>
          <DialogDescription>
            Update plan details, pricing, and features
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="planName">Plan Name</Label>
            <Input
              id="planName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter plan name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Monthly Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxClients">Max Clients</Label>
              <Input
                id="maxClients"
                type="number"
                value={formData.maxClients}
                onChange={(e) => setFormData({ ...formData, maxClients: e.target.value })}
                placeholder="Unlimited"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDashboards">Max Dashboards</Label>
              <Input
                id="maxDashboards"
                type="number"
                value={formData.maxDashboards}
                onChange={(e) => setFormData({ ...formData, maxDashboards: e.target.value })}
                placeholder="Unlimited"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Enter features, one per line"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Plan is Active</Label>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanModal;