
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, BarChart3, Eye, Calendar } from 'lucide-react';

const CoreInsights = () => {
  const [timeRange, setTimeRange] = useState('last-30-days');

  const monthlyUsageData = [
    { month: 'Jan', views: 1245, clients: 24, reports: 18 },
    { month: 'Feb', views: 1456, clients: 26, reports: 20 },
    { month: 'Mar', views: 1678, clients: 28, reports: 22 },
    { month: 'Apr', views: 1892, clients: 30, reports: 25 },
    { month: 'May', views: 2134, clients: 32, reports: 28 },
    { month: 'Jun', views: 2387, clients: 34, reports: 30 }
  ];

  const clientViewsData = [
    { client: 'TechCorp Inc.', views: 456, reports: 3 },
    { client: 'Global Solutions', views: 387, reports: 5 },
    { client: 'Innovation Lab', views: 234, reports: 2 },
    { client: 'Retail Plus', views: 198, reports: 2 },
    { client: 'StartupXYZ', views: 167, reports: 1 }
  ];

  const reportPopularityData = [
    { name: 'Sales Dashboard', value: 35, color: '#3b82f6' },
    { name: 'Financial Overview', value: 25, color: '#10b981' },
    { name: 'Marketing Analytics', value: 20, color: '#f59e0b' },
    { name: 'Operations Report', value: 15, color: '#ef4444' },
    { name: 'HR Metrics', value: 5, color: '#8b5cf6' }
  ];

  const stats = [
    {
      title: 'Total Report Views',
      value: '12,458',
      change: '+23%',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: 'Active Clients',
      value: '34',
      change: '+12%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Reports Created',
      value: '30',
      change: '+18%',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Session Time',
      value: '8.5m',
      change: '+5%',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <Layout userType="core" currentPage="/core-insights">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Insights & Analytics</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Track your platform performance and client engagement</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className={`bg-gray-100 p-2 sm:p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Monthly Usage Trend */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base sm:text-lg">Monthly Usage Trends</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Report views, active clients, and reports over time</CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <LineChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="reports" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Report Popularity */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base sm:text-lg">Report Popularity</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Distribution of views across different reports</CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={reportPopularityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={window.innerWidth < 640 ? 60 : 80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportPopularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Client Views Ranking */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Top Clients by Activity</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Clients ranked by dashboard views and engagement</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]" minWidth={300}>
                <BarChart data={clientViewsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="client" type="category" width={window.innerWidth < 640 ? 80 : 120} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CoreInsights;
