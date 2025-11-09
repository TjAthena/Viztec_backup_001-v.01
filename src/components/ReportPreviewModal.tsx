
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X, Eye, Calendar, Users, ExternalLink } from 'lucide-react';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    id: number;
    title: string;
    embedUrl: string;
    description: string;
    clientsAssigned: string[];
    lastUpdated: string;
    status: string;
    views: number;
    tool: string;
  } | null;
}

const ReportPreviewModal = ({ isOpen, onClose, report }: ReportPreviewModalProps) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{report.title}</DialogTitle>
              <p className="text-gray-600 mt-1">{report.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">{report.views}</p>
                    <p className="text-xs text-gray-500">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{new Date(report.lastUpdated).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">Last Updated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">{report.clientsAssigned.length}</p>
                    <p className="text-xs text-gray-500">Shared Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant={report.status === 'Active' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex-1 px-6 pb-6">
          <div className="h-full bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={report.embedUrl}
              className="w-full h-full border-0"
              title={`Preview of ${report.title}`}
              allowFullScreen
            />
          </div>
        </div>
        
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Shared with:</span>
            {report.clientsAssigned.slice(0, 3).map((client, index) => (
              <Badge key={index} variant="outline">{client}</Badge>
            ))}
            {report.clientsAssigned.length > 3 && (
              <Badge variant="outline">+{report.clientsAssigned.length - 3} more</Badge>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreviewModal;
