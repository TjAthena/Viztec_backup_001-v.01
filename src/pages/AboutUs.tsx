import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Target, Users, Award, Lightbulb, Heart, Shield } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security and privacy of your data above all else."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly evolving to bring you the best BI sharing experience."
    },
    {
      icon: Heart,
      title: "Customer Success",
      description: "Your success is our success. We're here to help you grow."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every feature we build."
    }
  ];

  const team = [
    {
      name: "Vision",
      description: "To revolutionize how business intelligence is shared and consumed across organizations."
    },
    {
      name: "Mission",
      description: "Empower BI professionals and consultants with secure, scalable tools to deliver insights to their clients."
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
            <Users className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Viz Tec
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the future of business intelligence sharing
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Viz Tec was born from a simple observation: BI consultants and freelancers were spending countless hours managing dashboard access, dealing with security concerns, and struggling with scalability.
              </p>
              <p>
                We saw talented professionals bogged down by technical infrastructure instead of focusing on what they do best—delivering powerful insights to their clients.
              </p>
              <p>
                That's why we created Viz Tec: a platform that handles the complexity of secure dashboard sharing, user management, and scalability, so you can focus on your analysis and client relationships.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg w-fit mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg w-fit mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're a solo consultant or running an analytics agency, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => navigate('/register')}
              className="text-lg px-8 py-4"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
