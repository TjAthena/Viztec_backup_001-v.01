
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Search className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/')}>
            <CardHeader className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Go to Homepage</CardTitle>
              <CardDescription>
                Return to our main page and explore Viz Tec features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(-1)}>
            <CardHeader className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
                <ArrowLeft className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Go Back</CardTitle>
              <CardDescription>
                Return to the previous page you were visiting
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => navigate('/login')} className="h-16 flex flex-col space-y-1">
                <span className="font-medium">Login</span>
                <span className="text-xs text-gray-500">Access your dashboard</span>
              </Button>
              <Button variant="outline" onClick={() => navigate('/register')} className="h-16 flex flex-col space-y-1">
                <span className="font-medium">Register</span>
                <span className="text-xs text-gray-500">Create new account</span>
              </Button>
              <Button variant="outline" onClick={() => window.location.href = 'mailto:support@viztec.com'} className="h-16 flex flex-col space-y-1">
                <span className="font-medium">Contact Support</span>
                <span className="text-xs text-gray-500">Get help from our team</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-sm text-gray-500 pt-8">
          <p>If you believe this is an error, please contact our support team.</p>
          <p className="mt-2">
            <a href="mailto:support@viztec.com" className="text-blue-600 hover:underline">
              support@viztec.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
