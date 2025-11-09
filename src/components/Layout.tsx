import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  CreditCard, 
  User, 
  Settings,
  Shield,
  FileText,
  Calendar,
  LogOut,
  TrendingUp,
  Share,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: ReactNode;
  userType: 'admin' | 'core' | 'client';
  currentPage?: string;
}

const Layout = ({ children, userType, currentPage }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminNavItems = [
    { href: '/admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin-users', icon: Users, label: 'User Management' },
    { href: '/admin-billing', icon: CreditCard, label: 'Billing & Plans' },
    { href: '/admin-logs', icon: FileText, label: 'Audit Logs' },
  ];

  const coreNavItems = [
    { href: '/core-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/core-clients', icon: Users, label: 'Clients' },
    { href: '/core-reports', icon: BarChart3, label: 'Reports' },
    { href: '/core-insights', icon: TrendingUp, label: 'Insights' },
    { href: '/subscription', icon: CreditCard, label: 'Subscription' },
    { href: '/core-profile', icon: User, label: 'Profile' },
  ];

  const clientNavItems = [
    { href: '/client-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/client-profile', icon: User, label: 'Profile' },
    { href: '/client-sharing', icon: Share, label: 'Sharing' },
  ];

  const getNavItems = () => {
    switch (userType) {
      case 'admin':
        return adminNavItems;
      case 'core':
        return coreNavItems;
      case 'client':
        return clientNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const isActive = (href: string) => {
    return location.pathname === href || currentPage === href;
  };

  const handleLogout = () => {
    // Clear any stored user data/tokens here if needed
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to home page
    navigate('/');
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClick}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive(item.href)
                ? 'bg-blue-50 text-blue-700 border-l-4 md:border-l-0 md:border-r-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-white border-b flex items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full pt-16">
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-600" />
            <span className="text-base md:text-lg lg:text-xl font-bold text-gray-900">Viz Tec</span>
          </div>
        </div>

        {/* User section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="h-7 w-7 md:h-8 md:w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900">
                {userType === 'admin' ? 'Admin User' : userType === 'core' ? 'John Doe' : 'Client User'}
              </p>
              <p className="text-xs text-gray-500">
                {userType === 'admin' ? 'admin@viztec.com' : userType === 'core' ? 'john@company.com' : 'client@company.com'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center px-2 md:px-3 py-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Log out</span>
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg pt-14 md:pt-16">
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavLinks />
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 pt-14 md:pt-16">
        <main className="p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
