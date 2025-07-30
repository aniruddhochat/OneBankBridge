import React, { useState, useEffect } from 'react';
import { Gift, Star, Zap, Trophy, ArrowLeft, ArrowRight, Sparkles, Target, Coffee, ShoppingBag, DollarSign, Users, FileCheck, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
const RewardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPoints] = useState(28500);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem('user'); // Remove saved user data
  // window.location.href = '/'; // Redirect to home or login page
  navigate('/');
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const userId = "687f171378161830fc3425fd";      
      // Fetch user profile
      try {
        const userRes = await fetch(`${process.env.REACT_APP_API_URL}/user/profile/${userId}`);
        console.log("User", userRes);
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
          console.log('✅ User profile loaded:', userData);
        } else {
          console.log('⚠️ User profile not found, using default');
          setUser({ name: "Alex Johnson", fullName: "Alex Johnson" });
        }
      } catch (error) {
        console.error('❌ Error fetching user profile:', error);
        setUser({ name: "Alex Johnson", fullName: "Alex Johnson" });
      }
      
    } catch (error) {
      console.error("❌ Error in fetchAccounts:", error);
      setUser({ name: "Alex Johnson", fullName: "Alex Johnson" });
    }
  };
  
  const rewards = [
    { 
      id: 1,
      name: 'Amazon Gift Card', 
      points: 25000, 
      icon: ShoppingBag, 
      available: true, 
      category: 'shopping',
      description: 'Shop for anything on Amazon',
      popularity: 95,
      color: 'from-orange-400 to-orange-600'
    },
    { 
      id: 2,
      name: 'Starbucks Card', 
      points: 15000, 
      icon: Coffee, 
      available: true, 
      category: 'food',
      description: 'Enjoy your favorite coffee',
      popularity: 88,
      color: 'from-green-400 to-green-600'
    },
    { 
      id: 3,
      name: 'Target Gift Card', 
      points: 20000, 
      icon: Target, 
      available: false, 
      category: 'shopping',
      description: 'Shop at Target stores nationwide',
      popularity: 78,
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 4,
      name: 'Cash Back', 
      points: 30000, 
      icon: DollarSign, 
      available: true, 
      category: 'cash',
      description: 'Direct cash to your account',
      popularity: 92,
      color: 'from-emerald-400 to-emerald-600'
    },
    { 
      id: 5,
      name: 'Netflix Subscription', 
      points: 18000, 
      icon: Sparkles, 
      available: true, 
      category: 'entertainment',
      description: '3 months premium subscription',
      popularity: 85,
      color: 'from-red-500 to-red-700'
    },
    { 
      id: 6,
      name: 'Spotify Premium', 
      points: 12000, 
      icon: Zap, 
      available: true, 
      category: 'entertainment',
      description: '6 months ad-free music',
      popularity: 82,
      color: 'from-green-500 to-green-700'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Rewards', icon: Gift },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
    { id: 'food', name: 'Food & Drink', icon: Coffee },
    { id: 'cash', name: 'Cash Back', icon: DollarSign },
    { id: 'entertainment', name: 'Entertainment', icon: Sparkles }
  ];

  const earningMethods = [
    { icon: FileCheck, title: 'Complete KYC', points: '+500', description: 'Verify your identity' },
    { icon: Users, title: 'Refer Friends', points: '+250', description: 'Each successful referral' },
    { icon: MessageSquare, title: 'Surveys', points: '+100', description: 'Quick feedback surveys' }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const canAfford = (points) => userPoints >= points;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Rewards Bazaar
                </h1>
                <p className="text-sm lg:text-base text-gray-500">Redeem your points for amazing rewards</p>
              </div>
            </div>
            {/* Desktop Stats */}
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
                <span>{user?.fullName || ""}</span><FaBars className="w-5 h-5" />
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 mb-8">
          {/* Left Sidebar - Points & Earning Methods */}
          <div className="lg:col-span-1 space-y-6">
            {/* Points Balance Card */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-6">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-white/80 font-medium text-sm">Points</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white mb-1">
                    {userPoints.toLocaleString()}
                  </div>
                  <div className="text-white/60 text-xs">Ready to redeem</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-xs font-medium">Gold Status</span>
                </div>
              </div>
            </div>

            {/* Quick Earning Methods */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span>Quick Earn</span>
              </h3>
              <div className="space-y-3">
                {earningMethods.slice(0, 3).map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors cursor-pointer">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{method.title}</div>
                        <div className="text-xs text-gray-600">{method.description}</div>
                      </div>
                      <div className="font-bold text-green-600 text-sm">{method.points}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - Categories & Rewards */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => {
                const Icon = reward.icon;
                const affordable = canAfford(reward.points);
                
                return (
                  <div
                    key={reward.id}
                    className={`group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 ${
                      !reward.available ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Popularity Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {reward.popularity}% ❤️
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${reward.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{reward.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-purple-500" />
                          <span className="font-bold text-purple-600">
                            {reward.points.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm">points</span>
                        </div>
                        
                        {affordable && (
                          <div className="flex items-center space-x-1 text-green-600 text-xs font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Affordable</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      disabled={!reward.available || !affordable}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                        reward.available && affordable
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>
                        {!reward.available 
                          ? 'Not Available' 
                          : !affordable 
                            ? 'Insufficient Points'
                            : 'Redeem Now'
                        }
                      </span>
                      {reward.available && affordable && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Mobile Points Balance Card */}
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="text-white/80 font-medium">Available Points</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-white/60 text-sm">Premium Member</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-4xl font-bold text-white mb-1">
                  {userPoints.toLocaleString()}
                </div>
                <div className="text-white/60 text-sm">Points ready to redeem</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm font-medium">Gold Status</span>
                </div>
                <div className="text-white/60 text-sm">
                  Earn 2x points on all activities
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Rewards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRewards.map((reward) => {
              const Icon = reward.icon;
              const affordable = canAfford(reward.points);
              
              return (
                <div
                  key={reward.id}
                  className={`group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 ${
                    !reward.available ? 'opacity-60' : ''
                  }`}
                >
                  {/* Popularity Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {reward.popularity}% ❤️
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${reward.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{reward.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-purple-500" />
                        <span className="font-bold text-purple-600">
                          {reward.points.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">points</span>
                      </div>
                      
                      {affordable && (
                        <div className="flex items-center space-x-1 text-green-600 text-xs font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Affordable</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    disabled={!reward.available || !affordable}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                      reward.available && affordable
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {!reward.available 
                        ? 'Not Available' 
                        : !affordable 
                          ? 'Insufficient Points'
                          : 'Redeem Now'
                      }
                    </span>
                    {reward.available && affordable && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile Earning Methods */}
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Earn More Points</h2>
              <p className="text-gray-600 text-sm">Boost your rewards with these quick activities</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {earningMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className="group flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-gray-600 text-sm">{method.description}</p>
                    </div>
                    <div className="text-xl font-bold text-green-600">{method.points}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;