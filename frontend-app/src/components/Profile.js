import React, { useState,useEffect } from 'react';
import { User, Star, Shield, Trophy, Edit, Camera, Check, X, Bell, Lock, CreditCard, Users, FileText, ArrowLeft, Verified } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [userProfile, setUserProfile] = useState(null);
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
          setUserProfile(userData);
          console.log('✅ User profile loaded:', userData);
        } else {
          console.log('⚠️ User profile not found, using default');
          setUserProfile({ name: "Alex Johnson", fullName: "Alex Johnson" });
        }
      } catch (error) {
        console.error('❌ Error fetching user profile:', error);
        setUserProfile({ name: "Alex Johnson", fullName: "Alex Johnson" });
      }
      
    } catch (error) {
      console.error("❌ Error in fetchAccounts:", error);
      setUserProfile({ name: "Alex Johnson", fullName: "Alex Johnson" });
    }
  };

  const verificationSteps = [
    { id: 1, title: 'Personal Information', status: 'completed', description: 'Basic details verified' },
    { id: 2, title: 'Identity Document', status: 'completed', description: 'Government ID verified' },
    { id: 3, title: 'Address Proof', status: 'completed', description: 'Utility bill verified' },
    { id: 4, title: 'Phone Verification', status: 'completed', description: 'SMS verification complete' },
    { id: 5, title: 'Email Verification', status: 'completed', description: 'Email confirmed' },
    { id: 6, title: 'Biometric Scan', status: 'pending', description: 'Face verification pending' }
  ];

  const achievements = [
    { id: 1, title: 'Early Adopter', description: 'Joined in the first month', icon: Trophy, color: 'from-yellow-400 to-yellow-600', earned: true },
    { id: 2, title: 'KYC Master', description: 'Completed full verification', icon: Shield, color: 'from-blue-400 to-blue-600', earned: true },
    { id: 3, title: 'Point Collector', description: 'Earned 25,000+ points', icon: Star, color: 'from-purple-400 to-purple-600', earned: true },
    { id: 4, title: 'Referral Pro', description: 'Referred 10+ friends', icon: Users, color: 'from-green-400 to-green-600', earned: false }
  ];

  const activityLog = [
    { id: 1, action: 'Profile Update', timestamp: '2 hours ago', points: 0 },
    { id: 2, action: 'Survey Completed', timestamp: '1 day ago', points: 100 },
    { id: 3, action: 'Referral Bonus', timestamp: '3 days ago', points: 250 },
    { id: 4, action: 'KYC Verification', timestamp: '1 week ago', points: 500 },
    { id: 5, action: 'Account Created', timestamp: '2 months ago', points: 1000 }
  ];

  const quickActions = [
    { title: 'Edit Profile', icon: Edit, color: 'from-blue-500 to-blue-600', action: () => setIsEditing(true) },
    { title: 'Notifications', icon: Bell, color: 'from-purple-500 to-purple-600', action: () => {} },
    { title: 'Security', icon: Lock, color: 'from-red-500 to-red-600', action: () => {} },
    { title: 'Payment Methods', icon: CreditCard, color: 'from-green-500 to-green-600', action: () => {} }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'verification', name: 'Verification', icon: Shield },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'activity', name: 'Activity', icon: FileText }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{'28,500'}</div>
              <div className="text-sm text-gray-500">Total Points</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{50}%</div>
              <div className="text-sm text-gray-500">KYC Complete</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{'Gold'}</div>
              <div className="text-sm text-gray-500">Member Tier</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-500">Referrals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="flex flex-col items-center space-y-3 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Verification Status</h3>
          <div className="flex items-center space-x-2">
            <Verified className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">95% Complete</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {verificationSteps.map((step) => (
            <div key={step.id} className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {step.status === 'completed' ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <X className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {step.status === 'pending' && (
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ${
                !achievement.earned ? 'opacity-50' : ''
              }`}
            >
              {achievement.earned && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg mb-2">{achievement.title}</h3>
              <p className="text-gray-600 text-sm">{achievement.description}</p>
              
              {!achievement.earned && (
                <div className="mt-4 text-xs text-gray-500 font-medium">🔒 Not yet earned</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {activityLog.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-white/60 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-900">{activity.action}</h4>
                <p className="text-sm text-gray-600">{activity.timestamp}</p>
              </div>
              {activity.points > 0 && (
                <div className="flex items-center space-x-1 text-green-600 font-semibold">
                  <span>+{activity.points}</span>
                  <Star className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <p className="text-sm lg:text-base text-gray-500">Manage your account and preferences</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-medium"
              >
                <img
                  src={userProfile?.picture || '/default-user.png'}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{userProfile?.fullName || ""}</span><FaBars className="w-5 h-5" />
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
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 sticky top-32">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-1/2 translate-x-8 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500">
                  <Camera className="w-4 h-4 text-blue-500" />
                </button>
              </div>
              
              {/* Profile Info */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{userProfile?.fullName}</h2>
                <p className="text-gray-600 text-sm mb-3">{userProfile?.email}</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
              </div>
              {/* Desktop Edit Button */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-center">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-6 py-3 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                >
                  <Edit className="w-5 h-5" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>
              {/* Profile Details
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div> */}

              {/* Member Status */}
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-center">
                <Trophy className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-semibold">{'Gold'} Member</div>
                <div className="text-white/80 text-xs">Premium benefits active</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-2 mb-8 bg-white/40 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'verification' && renderVerification()}
              {activeTab === 'achievements' && renderAchievements()}
              {activeTab === 'activity' && renderActivity()}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Mobile Profile Header */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500">
                  <Camera className="w-3 h-3 text-blue-500" />
                </button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{userProfile?.fullName}</h2>
                <p className="text-gray-600 text-sm mb-2">{userProfile?.email}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Tab Content */}
          <div>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'verification' && renderVerification()}
            {activeTab === 'achievements' && renderAchievements()}
            {activeTab === 'activity' && renderActivity()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;