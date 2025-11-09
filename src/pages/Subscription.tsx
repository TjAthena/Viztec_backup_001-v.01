
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X,
  Star,
  Zap,
  Shield,
  Users,
  BarChart3,
  Crown,
  Headphones
} from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      current: false,
      features: [
        { name: 'Up to 3 clients', included: true },
        { name: 'Up to 2 dashboards', included: true },
        { name: '1 GB storage', included: true },
        { name: 'Basic support', included: true },
        { name: 'Custom branding', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'SSO integration', included: false }
      ],
      cta: 'Current Plan',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'per month',
      description: 'For growing businesses',
      current: true,
      features: [
        { name: 'Up to 50 clients', included: true },
        { name: 'Up to 25 dashboards', included: true },
        { name: '5 GB storage', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: true },
        { name: 'SSO integration', included: false }
      ],
      cta: 'Current Plan',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: '$499',
      period: 'per month',
      description: 'For large organizations',
      current: false,
      features: [
        { name: 'Unlimited clients', included: true },
        { name: 'Unlimited dashboards', included: true },
        { name: 'Unlimited storage', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: true },
        { name: 'SSO integration', included: true }
      ],
      cta: 'Upgrade to Enterprise',
      highlight: false
    }
  ];

  const usageStats = [
    { label: 'Clients', current: 24, limit: 50, percentage: 48 },
    { label: 'Dashboards', current: 18, limit: 25, percentage: 72 },
    { label: 'Storage', current: 2.4, limit: 5, unit: 'GB', percentage: 48 },
    { label: 'Monthly Views', current: 1247, limit: 5000, percentage: 25 }
  ];

  return (
    <Layout userType="core" currentPage="/subscription">
      <div className="space-y-8">
        {/* Current Plan Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span>Current Plan: Pro</span>
                </CardTitle>
                <CardDescription>
                  You're on the Pro plan with great features for growing businesses
                </CardDescription>
              </div>
              <Badge className="bg-blue-600 text-white">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {usageStats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{stat.label}</span>
                    <span className="text-xs text-gray-500">
                      {stat.current}{stat.unit || ''} / {stat.limit}{stat.unit || ''}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">
              Upgrade, downgrade, or manage your subscription at any time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.highlight ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    {plan.name === 'Free' && <Users className="h-8 w-8 text-gray-600" />}
                    {plan.name === 'Pro' && <Zap className="h-8 w-8 text-blue-600" />}
                    {plan.name === 'Enterprise' && <Crown className="h-8 w-8 text-purple-600" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className={`w-full ${plan.current ? 'bg-gray-200 text-gray-700 cursor-default' : ''}`}
                      variant={plan.current ? 'secondary' : 'default'}
                      disabled={plan.current}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enterprise Contact */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <span>Need Something Custom?</span>
            </CardTitle>
            <CardDescription>
              Enterprise plans can be customized to fit your organization's specific needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Enterprise Features Include:</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Advanced security & compliance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Headphones className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Custom integrations & APIs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Unlimited users & dashboards</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Button size="lg" className="mb-4">
                  Contact Sales Team
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Schedule a demo and discuss custom pricing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>
              Manage your payment method and billing details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Next billing date</div>
                  <div className="text-sm text-gray-600">February 15, 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$99.00</div>
                  <div className="text-sm text-gray-600">Pro Plan</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Payment method</div>
                  <div className="text-sm text-gray-600">**** **** **** 4242</div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline">View Billing History</Button>
                <Button variant="outline">Download Invoice</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Subscription;
