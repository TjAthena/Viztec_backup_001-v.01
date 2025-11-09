
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SuspendUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    status: string;
  };
  onConfirm: (userId: number, reason?: string) => void;
}

const SuspendUserModal = ({ open, onOpenChange, user, onConfirm }: SuspendUserModalProps) => {
  const [reason, setReason] = useState('');
  const isSuspended = user.status === 'Suspended';

  const handleConfirm = () => {
    onConfirm(user.id, reason);
    setReason('');
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isSuspended ? 'Reactivate this user?' : 'Suspend this user?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSuspended 
              ? `Reactivating ${user.name} will restore their account access.`
              : `Suspended users will not be able to access their account. You can reactivate them later.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {!isSuspended && (
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason (Optional)
            </Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for suspension..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={isSuspended ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            {isSuspended ? 'Reactivate User' : 'Suspend User'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuspendUserModal;
