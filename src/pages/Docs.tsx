import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, FileText, HelpCircle, Code, Database, Users, Lock } from 'lucide-react';

const Docs = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of Viz Tec",
      items: [
        "Quick Start Guide",
        "Creating Your First Dashboard",
        "Adding Clients",
        "Managing Reports"
      ]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage users and roles",
      items: [
        "User Roles Overview",
        "Inviting Clients",
        "Permission Management",
        "User Activity Tracking"
      ]
    },
    {
      icon: Database,
      title: "Dashboard Integration",
      description: "Embed and manage dashboards",
      items: [
        "Power BI Integration",
        "Embedding Dashboards",
        "Report Assignment",
        "Update & Versioning"
      ]
    },
    {
      icon: Lock,
      title: "Security & Access",
      description: "Secure your data",
      items: [
        "Authentication Methods",
        "Role-Based Access Control",
        "Token Management",
        "Audit Logs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg mb-6">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about using Viz Tec for your business intelligence needs
          </p>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg w-fit mb-4">
                    <section.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Contact Support
            </Button>
            <Button variant="outline">
              View API Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Docs;
