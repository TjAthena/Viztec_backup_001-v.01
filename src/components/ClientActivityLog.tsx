
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, LogIn, AlertTriangle, User, Calendar } from 'lucide-react';

interface Activity {
  id: number;
  type: 'dashboard_view' | 'login' | 'expired_link' | 'profile_update';
  description: string;
  timestamp: string;
  metadata?: {
    dashboardName?: string;
    ipAddress?: string;
    fieldChanged?: string;
  };
}

interface ClientActivityLogProps {
  clientId: number;
  activities: Activity[];
}

const activityIcons = {
  dashboard_view: Eye,
  login: LogIn,
  expired_link: AlertTriangle,
  profile_update: User
};

const activityColors = {
  dashboard_view: 'text-blue-600',
  login: 'text-green-600',
  expired_link: 'text-red-600',
  profile_update: 'text-purple-600'
};

const ClientActivityLog = ({ clientId, activities }: ClientActivityLogProps) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredActivities = activities.filter(activity => 
    filterType === 'all' || activity.type === filterType
  );

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'dashboard_view':
        return <Badge className="bg-blue-100 text-blue-800">Dashboard View</Badge>;
      case 'login':
        return <Badge className="bg-green-100 text-green-800">Login</Badge>;
      case 'expired_link':
        return <Badge className="bg-red-100 text-red-800">Expired Link</Badge>;
      case 'profile_update':
        return <Badge className="bg-purple-100 text-purple-800">Profile Update</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="dashboard_view">Dashboard Views</SelectItem>
              <SelectItem value="login">Logins</SelectItem>
              <SelectItem value="expired_link">Expired Links</SelectItem>
              <SelectItem value="profile_update">Profile Updates</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activities found for the selected filter.</p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const IconComponent = activityIcons[activity.type];
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-full bg-gray-100 ${activityColors[activity.type]}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.description}
                      </p>
                      {getActivityBadge(activity.type)}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                      {activity.metadata && (
                        <div className="text-xs text-gray-400">
                          {activity.metadata.dashboardName && (
                            <span>Dashboard: {activity.metadata.dashboardName}</span>
                          )}
                          {activity.metadata.ipAddress && (
                            <span>IP: {activity.metadata.ipAddress}</span>
                          )}
                          {activity.metadata.fieldChanged && (
                            <span>Changed: {activity.metadata.fieldChanged}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientActivityLog;
