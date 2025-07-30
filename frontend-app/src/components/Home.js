import React, { useState, useEffect } from 'react';
import { Shield, Users, FileCheck, TrendingUp, Star, ArrowRight, Play, CheckCircle, Globe, Zap, Award } from 'lucide-react';
import Logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem('user'); // Remove saved user data
  // window.location.href = '/'; // Redirect to home or login page
  navigate('/');
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    const showSignupSuccess = localStorage.getItem('showSignupSuccess');
    if (showSignupSuccess) {
      alert('Account created successfully!'); // Replace with toast if using a library
      localStorage.removeItem('showSignupSuccess');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log('User:', user);

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Advanced Security",
      description: "Military-grade encryption and multi-layer security protocols protect your sensitive data"
    },
    {
      icon: <FileCheck className="w-12 h-12 text-green-600" />,
      title: "Instant Verification",
      description: "AI-powered document verification and identity checks completed in seconds"
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-600" />,
      title: "Global Compliance",
      description: "Meet regulatory requirements across 50+ countries with automated compliance checks"
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Process thousands of KYC requests simultaneously with 99.9% uptime guarantee"
    }
  ];

  const stats = [
    { number: "2M+", label: "Verified Users" },
    { number: "99.8%", label: "Accuracy Rate" },
    { number: "50+", label: "Countries" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Compliance Director",
      company: "Chase",
      content: "OneBankBridge transformed our KYC process. What used to take days now takes minutes.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Risk Manager",
      company: "Discover",
      content: "The best KYC solution we've implemented. Incredibly intuitive and powerful.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "User",
      company: "Amazon",
      content: "Outstanding platform with exceptional customer support and reliability.",
      rating: 5
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
                    <span>{user.fullName}</span><FaBars className="w-5 h-5" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                      <button onClick={() => navigate('/dashboard')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Dashboard
                      </button>
                      <button onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Profile
                      </button>
                      <button onClick={() => navigate('/accounts')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Accounts
                      </button>
                      <button onClick={() => navigate('/rewards')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
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
                  <button onClick={() => navigate('/signin')} className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Sign In
                  </button>
                  <button onClick={() => navigate('/create-account')} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Sign Up
                  </button>
                </div>
              )}


          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  #1 KYC Solution 2024
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Streamline Your 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {' '}KYC Process
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  OneBankBridge redefines KYC by offering a seamless, secure, and centralized identity verification experience across all your financial institutions. 
                  Say goodbye to repetitive paperwork and fragmented updates<br />
                 <b>Complete Your KYC in One Tap - For All Your Banks.</b> 
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Mock Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">KYC Dashboard</h3>
                      <p className="text-blue-100 text-sm">Real-time monitoring</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-green-800">Verified</div>
                      <div className="text-lg font-bold text-green-900">1,247</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-yellow-800">Pending</div>
                      <div className="text-lg font-bold text-yellow-900">34</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-blue-800">Total</div>
                      <div className="text-lg font-bold text-blue-900">1,281</div>
                    </div>
                  </div>

                  {/* Mock Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Document Verification</span>
                        <span>97%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '97%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Identity Checks</span>
                        <span>94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Risk Assessment</span>
                        <span>99%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '99%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose OneBankBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive KYC solution combines cutting-edge technology with 
              regulatory expertise to deliver unmatched performance and compliance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about their experience with OneBankBridge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your KYC Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust OneBankBridge for their compliance needs. 
            Get started today with our free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <img src={Logo} alt="OneBankBridge Logo" className="w-10 h-10" />
                </div>
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
            <p>&copy; 2024 OneBankBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;