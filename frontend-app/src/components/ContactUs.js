import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Headphones, Menu,
  MapPin, Calendar,
  Mail, Phone, Send, MessageSquare,
  HelpCircle
} from 'lucide-react';
import Logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        inquiryType: 'general',
        message: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-blue-600" />,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@onebankbridge.com',
      action: 'Send Email'
    },
    {
      icon: <Phone className="w-8 h-8 text-green-600" />,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      title: 'Live Chat',
      description: 'Get instant support through our live chat system',
      contact: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-600" />,
      title: 'Schedule Demo',
      description: 'Book a personalized demo with our product experts',
      contact: '30-minute session',
      action: 'Book Demo'
    }
  ];

  const offices = [
    {
      city: 'New York',
      type: 'Headquarters',
      address: '456 Wall Street, Floor 15',
      zipCode: 'New York, NY 10005',
      phone: '+1 (555) 234-5678',
      email: 'ny@onebankbridge.com',
      hours: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      city: 'San Francisco',
      type: 'West Coast Office',
      address: '123 Financial District Blvd, Suite 2000',
      zipCode: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'sf@onebankbridge.com',
      hours: 'Mon-Fri: 9AM-6PM PST'
    },
    {
      city: 'London',
      type: 'European Operations',
      address: '789 Canary Wharf, Level 20',
      zipCode: 'London E14 5AB, UK',
      phone: '+44 20 7123 4567',
      email: 'london@onebankbridge.com',
      hours: 'Mon-Fri: 9AM-6PM GMT'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'demo', label: 'Request Demo' },
    { value: 'other', label: 'Other' }
  ];

  const faqs = [
    {
      question: 'How quickly can we implement OneBankBridge?',
      answer: 'Most implementations take 2-4 weeks depending on your existing infrastructure. Our team provides full support throughout the process.'
    },
    {
      question: 'What compliance standards do you support?',
      answer: 'We support KYC/AML regulations across 50+ countries including GDPR, PCI DSS, SOC 2, and industry-specific requirements.'
    },
    {
      question: 'Do you offer API integration?',
      answer: 'Yes, we provide comprehensive RESTful APIs and SDKs for seamless integration with your existing systems.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 technical support, dedicated account managers, and comprehensive documentation and training resources.'
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
            <Headphones className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            We're Here to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Help You
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Have questions about OneBankBridge? Want to see our platform in action? 
            Our team of experts is ready to assist you with any inquiries.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-lg font-semibold text-gray-900 mb-4">{method.contact}</div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-600">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john.doe@company.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your KYC requirements and how we can help..."
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help you transform your KYC processes. Reach out to us through 
                  any of the channels below or visit one of our offices.
                </p>
              </div>

              {/* Office Locations */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Our Offices</h3>
                {offices.map((office, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{office.city}</h4>
                        <p className="text-sm text-blue-600 font-medium">{office.type}</p>
                      </div>
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{office.address}</p>
                      <p>{office.zipCode}</p>
                      <div className="flex items-center space-x-4 pt-2">
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {office.phone}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{office.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our KYC solutions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              View All FAQs
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

export default Contact;