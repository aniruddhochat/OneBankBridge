import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, FileCheck, ArrowRight, Play, 
  Globe, Zap, Award, Clock, Database, AlertTriangle, Eye, 
  Smartphone, Cloud, BarChart3, Settings, Workflow, BrainCircuit,
  FileText, CreditCard, Building, Headphones, RefreshCw, Search, Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo.png';
const Features = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState('verification');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove saved user data
    navigate('/');
    console.log('Logout clicked');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreFeatures = [
    {
      id: 'verification',
      title: 'Identity Verification',
      icon: <Shield className="w-8 h-8" />,
      description: 'Advanced biometric and document verification',
      features: [
        {
          icon: <FileCheck className="w-6 h-6 text-blue-600" />,
          title: 'Document Authentication',
          description: 'AI-powered verification of government IDs, passports, and licenses with 99.8% accuracy'
        },
        {
          icon: <Eye className="w-6 h-6 text-green-600" />,
          title: 'Biometric Verification',
          description: 'Facial recognition and liveness detection to prevent spoofing and ensure authenticity'
        },
        {
          icon: <Search className="w-6 h-6 text-purple-600" />,
          title: 'Background Checks',
          description: 'Comprehensive screening against global watchlists, sanctions, and PEP databases'
        },
        {
          icon: <Database className="w-6 h-6 text-orange-600" />,
          title: 'Data Validation',
          description: 'Real-time verification of personal information against trusted data sources'
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      icon: <Globe className="w-8 h-8" />,
      description: 'Global compliance across 50+ jurisdictions',
      features: [
        {
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          title: 'Multi-Jurisdiction Support',
          description: 'Automatic compliance with KYC/AML regulations across different countries and regions'
        },
        {
          icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
          title: 'Risk Assessment',
          description: 'Dynamic risk scoring based on transaction patterns, geography, and behavior analysis'
        },
        {
          icon: <RefreshCw className="w-6 h-6 text-green-600" />,
          title: 'Ongoing Monitoring',
          description: 'Continuous monitoring for changes in risk profile and regulatory status'
        },
        {
          icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
          title: 'Audit Trail',
          description: 'Complete audit trail with timestamps and regulatory reporting capabilities'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Process Automation',
      icon: <Zap className="w-8 h-8" />,
      description: 'Streamlined workflows and intelligent automation',
      features: [
        {
          icon: <Workflow className="w-6 h-6 text-blue-600" />,
          title: 'Smart Workflows',
          description: 'Customizable approval workflows with automatic routing and escalation rules'
        },
        {
          icon: <BrainCircuit className="w-6 h-6 text-green-600" />,
          title: 'AI Decision Engine',
          description: 'Machine learning algorithms for intelligent risk assessment and decision making'
        },
        {
          icon: <Clock className="w-6 h-6 text-orange-600" />,
          title: 'Real-time Processing',
          description: 'Instant verification results with sub-second response times for better user experience'
        },
        {
          icon: <Settings className="w-6 h-6 text-purple-600" />,
          title: 'Custom Rules',
          description: 'Flexible rule engine to configure verification requirements based on your business needs'
        }
      ]
    },
    {
      id: 'integration',
      title: 'Platform Integration',
      icon: <Building className="w-8 h-8" />,
      description: 'Seamless integration with existing systems',
      features: [
        {
          icon: <Cloud className="w-6 h-6 text-blue-600" />,
          title: 'API-First Architecture',
          description: 'RESTful APIs and webhooks for easy integration with any existing system or platform'
        },
        {
          icon: <Smartphone className="w-6 h-6 text-green-600" />,
          title: 'Multi-Platform SDKs',
          description: 'Native SDKs for iOS, Android, and web platforms with comprehensive documentation'
        },
        {
          icon: <CreditCard className="w-6 h-6 text-purple-600" />,
          title: 'Banking Integration',
          description: 'Direct integration with major banking systems and financial service providers'
        },
        {
          icon: <Database className="w-6 h-6 text-orange-600" />,
          title: 'Data Synchronization',
          description: 'Real-time data synchronization across multiple banking platforms and institutions'
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: 'Reduce Processing Time',
      description: 'From days to minutes',
      metric: '95% faster'
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: 'Enhance Security',
      description: 'Military-grade protection',
      metric: '99.9% secure'
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: 'Improve User Experience',
      description: 'Seamless onboarding',
      metric: '40% higher conversion'
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-orange-600" />,
      title: 'Reduce Costs',
      description: 'Operational efficiency',
      metric: '60% cost savings'
    }
  ];

  const industries = [
    {
      name: 'Banking & Finance',
      icon: <Building className="w-8 h-8 text-blue-600" />,
      description: 'Comprehensive KYC solutions for banks, credit unions, and financial institutions'
    },
    {
      name: 'Fintech',
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      description: 'Digital-first verification for neobanks, payment processors, and fintech startups'
    },
    {
      name: 'Cryptocurrency',
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      description: 'Regulatory compliance for crypto exchanges and digital asset platforms'
    },
    {
      name: 'Insurance',
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      description: 'Risk assessment and fraud prevention for insurance providers'
    },
    {
      name: 'Real Estate',
      icon: <FileCheck className="w-8 h-8 text-red-600" />,
      description: 'Identity verification for property transactions and real estate investments'
    },
    {
      name: 'Healthcare',
      icon: <Headphones className="w-8 h-8 text-teal-600" />,
      description: 'Patient identity verification and healthcare provider credentialing'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="OneBankBridge Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">OneBankBridge</h1>
                <p className="text-xs text-gray-600">Your KYC. Simplified. Secured</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
              {['Home', 'Features', 'About', 'Contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    if (tab.toLowerCase()==='home'){
                        navigate('/');
                    }
                    else if (tab.toLowerCase()==='features') {
                        navigate('/features');
                    }
                    else if (tab.toLowerCase()==='about'){
                        navigate('/about');
                    }
                    else if (tab.toLowerCase() === 'contact'){
                        navigate('/contact-us')
                    }
                    setActiveTab(tab.toLowerCase());
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* User Auth/Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-medium"
                >
                  <img
                    src={user?.picture || '/default-user.png'}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user.fullName}</span><Menu className="w-5 h-5" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Accounts
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Rewards
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Sign In
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Comprehensive KYC Solutions
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Modern KYC
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover how OneBankBridge's advanced features streamline identity verification, 
            ensure regulatory compliance, and enhance security across all your financial operations.
          </p>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {coreFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeatureTab(feature.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  activeFeatureTab === feature.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-md'
                }`}
              >
                <div className={activeFeatureTab === feature.id ? 'text-white' : 'text-blue-600'}>
                  {feature.icon}
                </div>
                <span>{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {coreFeatures.map((featureGroup) => (
            activeFeatureTab === featureGroup.id && (
              <div key={featureGroup.id} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <div className="text-blue-600">{featureGroup.icon}</div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{featureGroup.title}</h2>
                  <p className="text-xl text-gray-600">{featureGroup.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {featureGroup.features.map((feature, index) => (
                    <div key={index} className="flex space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Measurable Business Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OneBankBridge delivers tangible results that transform your KYC operations 
              and drive business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-blue-600">{benefit.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our flexible KYC platform adapts to the unique requirements of different 
              industries while maintaining the highest standards of security and compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on enterprise-grade infrastructure with industry-leading performance and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">&lt;2s</div>
              <div className="text-gray-300">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">256-bit</div>
              <div className="text-gray-300">Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-gray-300">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            See how OneBankBridge's powerful features can transform your KYC process. 
            Start your free trial today or schedule a personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
              <Play className="w-5 h-5 mr-2" />
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src={Logo} alt="OneBankBridge Logo" className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-bold">OneBankBridge</h3>
                  <p className="text-gray-400 text-sm">Your KYC. Simplified. Secured.</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering businesses with cutting-edge KYC solutions that ensure compliance, 
                enhance security, and streamline operations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">API</li>
                <li className="hover:text-white cursor-pointer">Documentation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Privacy</li>
                <li className="hover:text-white cursor-pointer">Terms</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 OneBankBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;