
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  BarChart3, 
  Shield, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Play,
  Star,
  Globe,
  Lock,
  TrendingUp,
  Database,
  Settings,
  UserCheck,
  FileText,
  Cloud,
  Smartphone,
  Eye
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Built for BI Professionals",
      description: "Tired of emailing static reports? Viz Tec gives you a ready-to-use SaaS portal for securely delivering insights through Power BI."
    },
    {
      icon: Shield,
      title: "100% Secure Access",
      description: "No shared links. Your clients get dedicated logins to access only assigned dashboards with activity logging and token expiration."
    },
    {
      icon: Users,
      title: "Consultant-first Design",
      description: "We help you manage clients with tools to create, assign, track, and scale your reporting delivery efficiently."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Register & Add Clients",
      description: "Sign up and invite your clients to the platform",
      result: "Clients receive email invites"
    },
    {
      step: "2", 
      title: "Embed & Assign Reports",
      description: "Upload dashboards and assign them to specific clients",
      result: "Clients get dashboard access via login"
    },
    {
      step: "3",
      title: "Track Usage & Scale",
      description: "Monitor usage and grow your consulting practice",
      result: "Clients securely access data anytime"
    }
  ];

  const keyFeatures = [
    {
      icon: Database,
      title: "Report Sharing, Reimagined",
      description: "Embed Power BI dashboards and assign to specific clients. Update links anytime."
    },
    {
      icon: UserCheck,
      title: "Multi-role Access Control",
      description: "Built-in user roles for Admin, Core Users, and Client Users with proper permissions."
    },
    {
      icon: TrendingUp,
      title: "Usage & Quota Monitoring",
      description: "Track dashboards shared, clients onboarded, and plan usage in real-time."
    },
    {
      icon: Settings,
      title: "Subscription Management",
      description: "Choose the right plan based on clients and dashboards needed. Upgrade anytime."
    },
    {
      icon: Globe,
      title: "White-label Branding",
      description: "Customize client portal with your logo, brand name, and custom domain (Pro+ plans)."
    },
    {
      icon: Cloud,
      title: "Built for Scalability",
      description: "Designed to grow with your business — from 5 clients to 500+ clients."
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      clients: "2 clients",
      dashboards: "1 dashboard",
      features: ["Basic sharing", "Secure access", "Email support"],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "49",
      period: "month",
      clients: "25 clients",
      dashboards: "10 dashboards",
      features: ["Branding", "Usage stats", "Priority support", "Custom domain"],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      clients: "Unlimited",
      dashboards: "Unlimited",
      features: ["All features", "SLA", "Onboarding support", "Dedicated manager"],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGuestLogin = () => {
    navigate('/guest-login');
  };

  const handleViewPricing = () => {
    navigate('/subscription');
  };

  const handleContactSales = () => {
    // For now, redirect to login. In a real app, this would open a contact form
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Viz Tec</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Button variant="ghost" onClick={() => navigate('/')}>
                      Home
                    </Button>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent">Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2 bg-popover">
                        <NavigationMenuLink asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => navigate('/docs')}
                          >
                            Docs
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => navigate('/about')}
                          >
                            About Us
                          </Button>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent">Sign In</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2 bg-popover">
                        <NavigationMenuLink asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={handleLogin}
                          >
                            Login
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={handleGuestLogin}
                          >
                            Guest Login
                          </Button>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button onClick={handleRegister}>
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Securely Share BI Dashboards
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> With Your clients</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Viz Tec is your all-in-one platform to embed, share, and manage business intelligence dashboards with clients — all through secure, role-based access.
              </p>
              
              <p className="text-lg text-gray-500 mb-10">
                Whether you're a freelancer, BI consultant, or analytics agency — Viz Tec lets you deliver insights without coding or infrastructure overhead.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4" onClick={handleRegister}>
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={handleLogin}>
                  Login
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={handleGuestLogin}>
                  Guest Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Viz Tec Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Viz Tec?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-sm text-blue-600 font-medium">{step.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage and share BI dashboards</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-lg flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Benefits You'll Love</h2>
              <div className="space-y-6">
                {[
                  "Save Time: Skip the setup — focus on your analysis, not infrastructure",
                  "Impress Clients: Give clients their own login-based report portal", 
                  "Stay Organized: Manage all your reporting from a single platform",
                  "Scale Confidently: Designed for freelancers, consultants, and agencies",
                  "Enhance Security: Access control, token-based embedding, and user logs"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Start building with Viz Tec</h3>
              <p className="text-gray-600 mb-6">Get started with our free plan and upgrade as you grow. No credit card required for the free tier.</p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={handleRegister}>
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple & Scalable Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${
                plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'
              } transition-all duration-300 hover:shadow-lg`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <div>
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price === "Custom" ? plan.price : `$${plan.price}`}
                    </span>
                    {plan.period && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{plan.clients}</p>
                    <p>{plan.dashboards}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        handleContactSales();
                      } else {
                        handleRegister();
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" onClick={handleViewPricing}>
              View Full Pricing Details
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Get Started in Minutes</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Lock, text: "Sign up securely" },
              { icon: Users, text: "Add your clients" }, 
              { icon: BarChart3, text: "Share powerful insights" },
              { icon: TrendingUp, text: "Scale your practice" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-white">{step.text}</p>
              </div>
            ))}
          </div>
          
          <p className="text-xl text-blue-100 mb-8">Start your 7-day free trial — no credit card required</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={handleRegister}>
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-blue-600" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold">Viz Tec</span>
              </div>
              <p className="text-gray-400">Secure BI dashboard sharing platform for consultants and clients.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleViewPricing} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={handleViewPricing} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={handleLogin} className="hover:text-white transition-colors">Documentation</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleLogin} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={handleContactSales} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={handleLogin} className="hover:text-white transition-colors">Status</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleLogin} className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button onClick={handleLogin} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={handleContactSales} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Viz Tec. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Credentials Modal */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Demo Login Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="space-y-1">
              <p className="font-medium">Admin: admin@viztec.com / admin123</p>
              <p className="font-medium">Core User: core@viztec.com / core123</p>
              <p className="font-medium">Client: client@viztec.com / client123</p>
            </div>
            <Button size="sm" className="w-full mt-3" onClick={handleLogin}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
