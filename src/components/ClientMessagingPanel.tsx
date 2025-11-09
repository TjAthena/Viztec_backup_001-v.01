
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Send, FileText, Mail, Bell } from 'lucide-react';

interface ClientMessagingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  client: {
    id: number;
    name: string;
    email: string;
    company: string;
  } | null;
}

const messageTemplates = {
  'subscription-reminder': {
    subject: 'Subscription Renewal Reminder',
    body: 'Hi {clientName},\n\nThis is a friendly reminder that your subscription will expire soon. Please renew to continue accessing your dashboards.\n\nBest regards,\nViz Tec Team'
  },
  'dashboard-update': {
    subject: 'Dashboard Updated',
    body: 'Hi {clientName},\n\nWe\'ve updated your dashboard with the latest data and improvements. Please check it out and let us know if you have any feedback.\n\nBest regards,\nViz Tec Team'
  },
  'feedback-request': {
    subject: 'We\'d Love Your Feedback',
    body: 'Hi {clientName},\n\nWe hope you\'re enjoying your dashboard experience. We\'d appreciate any feedback you have to help us improve our service.\n\nBest regards,\nViz Tec Team'
  }
};

const ClientMessagingPanel = ({ isOpen, onClose, client }: ClientMessagingPanelProps) => {
  const [messageType, setMessageType] = useState<'email' | 'notification'>('email');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleTemplateSelect = (templateKey: string) => {
    const template = messageTemplates[templateKey as keyof typeof messageTemplates];
    if (template && client) {
      setSubject(template.subject);
      setMessage(template.body.replace('{clientName}', client.name));
      setSelectedTemplate(templateKey);
    }
  };

  const handleSendMessage = () => {
    if (!client || !message.trim()) return;
    
    console.log('Sending message:', {
      type: messageType,
      to: client.email,
      subject,
      message,
      clientId: client.id
    });
    
    // Reset form
    setSubject('');
    setMessage('');
    setSelectedTemplate('');
    onClose();
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 border-l">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">Message Client</h3>
            <p className="text-sm text-gray-600">{client.name} - {client.company}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium">Message Type</label>
            <Select value={messageType} onValueChange={(value: 'email' | 'notification') => setMessageType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </SelectItem>
                <SelectItem value="notification">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>In-App Notification</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Quick Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(messageTemplates).map(([key, template]) => (
                <Button
                  key={key}
                  variant={selectedTemplate === key ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => handleTemplateSelect(key)}
                >
                  {template.subject}
                </Button>
              ))}
            </CardContent>
          </Card>

          {messageType === 'email' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject..."
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Recipient</label>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{client.email}</Badge>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button 
            onClick={handleSendMessage}
            className="w-full"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            Send {messageType === 'email' ? 'Email' : 'Notification'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientMessagingPanel;
