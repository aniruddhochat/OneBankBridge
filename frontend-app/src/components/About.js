import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Star, Award, Eye, Building, Menu,
  Target, Heart, Lightbulb, Trophy, MapPin, Linkedin, Twitter,
  Mail, Phone
} from 'lucide-react';
import Logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Security First',
      description: 'We prioritize the highest levels of security and data protection in everything we build'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'Customer Centric',
      description: 'Our customers success is our success. We build solutions that truly serve their needs'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      title: 'Innovation',
      description: 'We continuously push the boundaries of what\'s possible in KYC and compliance technology'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships with our clients'
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'OneBankBridge was established with a vision to revolutionize KYC processes'
    },
    {
      year: '2020',
      title: 'First Product Launch',
      description: 'Launched our core KYC platform with advanced document verification'
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Expanded to serve clients across 25+ countries with localized compliance'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Introduced machine learning algorithms for enhanced risk assessment'
    },
    {
      year: '2023',
      title: '1M+ Verifications',
      description: 'Processed over 1 million identity verifications with 99.8% accuracy'
    },
    {
      year: '2024',
      title: 'Industry Leadership',
      description: 'Recognized as the #1 KYC solution by leading financial institutions'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Chief Executive Officer',
      bio: 'Former VP of Compliance at JPMorgan Chase with 15+ years in financial services',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'Ex-Google engineer specializing in AI/ML and enterprise security solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Thompson',
      role: 'Chief Compliance Officer',
      bio: 'Former regulatory advisor with deep expertise in global financial compliance',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Leading our technical team with expertise in scalable cloud architecture',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Lisa Patel',
      role: 'VP of Product',
      bio: 'Product strategist focused on creating intuitive user experiences',
      image: 'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'James Wilson',
      role: 'VP of Sales',
      bio: 'Enterprise sales leader with a track record of building lasting partnerships',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const stats = [
    { number: "2M+", label: "Verified Users" },
    { number: "500+", label: "Enterprise Clients" },
    { number: "50+", label: "Countries Served" },
    { number: "99.8%", label: "Accuracy Rate" }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Best KYC Solution',
      organization: 'FinTech Awards',
      icon: <Trophy className="w-6 h-6 text-yellow-600" />
    },
    {
      year: '2023',
      title: 'Innovation in Compliance',
      organization: 'RegTech Summit',
      icon: <Award className="w-6 h-6 text-blue-600" />
    },
    {
      year: '2023',
      title: 'Top Startup to Watch',
      organization: 'Forbes',
      icon: <Star className="w-6 h-6 text-purple-600" />
    },
    {
      year: '2022',
      title: 'Excellence in Security',
      organization: 'Cybersecurity Excellence Awards',
      icon: <Shield className="w-6 h-6 text-green-600" />
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Building className="w-4 h-4 mr-2" />
                  About OneBankBridge
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Revolutionizing 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {' '}KYC Solutions
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Founded in 2019, OneBankBridge has grown from a startup with a bold vision 
                  to the leading provider of KYC solutions trusted by financial institutions worldwide.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
                  alt="OneBankBridge Office" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Global Headquarters</h3>
                  <p className="text-gray-600 mb-4">
                    Located in the heart of New York's financial district, our headquarters 
                    houses our world-class team of engineers, compliance experts, and industry specialists.
                  </p>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>New York, NY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To simplify and secure the KYC process for financial institutions worldwide, 
                  enabling them to focus on serving their customers while maintaining the highest 
                  standards of compliance and security. We believe that identity verification 
                  should be seamless, accurate, and accessible to all.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-purple-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become the global standard for KYC and identity verification, creating a world 
                  where financial inclusion is enhanced through secure, efficient, and user-friendly 
                  identity solutions. We envision a future where every person can access financial 
                  services quickly and safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the culture of our organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our company's growth and evolution</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10">
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Industry experts and visionaries driving innovation in KYC technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recognition & Awards</h2>
            <p className="text-xl text-gray-600">
              Industry recognition for our innovation and excellence in KYC solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 flex justify-center">
                  {award.icon}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">{award.title}</div>
                <div className="text-sm text-gray-600 mb-1">{award.organization}</div>
                <div className="text-sm font-medium text-blue-600">{award.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We'd love to discuss how OneBankBridge can transform your KYC processes. 
            Get in touch with our team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </button>
            <button className="flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-medium hover:bg-white hover:text-blue-600 transition-all duration-200">
              <Phone className="w-5 h-5 mr-2" />
              Schedule Call
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

export default About;