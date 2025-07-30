import React, { useEffect, useState } from "react";
import { 
  BarChart3, 
  Building2, 
  Gift, 
  User, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Shield,
  Bell,
  ArrowRight,
  Sparkles,
  Activity
} from "lucide-react";
import Logo from '../logo.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("/");
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

    const fetchData = async () => {
    try {
      const accRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/accounts/${userData._id}`);
      setAccounts(accRes.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
//   console.log(user._id)
  const verified = accounts.filter(acc => acc.kycStatus === "COMPLIANT").length;
  const pending = accounts.length - verified;
  const completionRate = Math.round((verified / (accounts.length || 1)) * 100);

  const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left
        ${active 
          ? "bg-indigo-600 text-white shadow-lg transform scale-105" 
          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
        }`}
    >
      <Icon size={20} className={`transition-colors ${active ? "text-white" : "group-hover:text-indigo-600"}`} />
      <span className="font-medium">{label}</span>
      {active && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
    </button>
  );

  const StatCard = ({ title, value, trend, color, icon: Icon, delay = 0 }) => (
    <div 
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <TrendingUp size={16} />
            +{trend}%
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const ProgressRing = ({ percentage, size = 120 }) => {
    const radius = (size - 10) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeOffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#4f46e5"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
          <span className="text-sm text-gray-500">Complete</span>
        </div>
      </div>
    );
  };

  const ActivityItem = ({ icon, text, time, type }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
      <div className={`p-2 rounded-lg ${
        type === 'success' ? 'bg-green-100 text-green-600' : 
        type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
        'bg-blue-100 text-blue-600'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">{text}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Enhanced Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-white-600 rounded-xl">
            <img src={Logo} alt="OneBankBridge Logo" className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">OneBankBridge</h1>
            <p className="text-xs text-gray-500">Your KYC. Simplified. Secured</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem
            label="Dashboard"
            to="/"
            active={currentPage === "/"}
            onClick={() => setCurrentPage("/")}
            icon={BarChart3}
          />
          <SidebarItem
            label="Accounts"
            to="/accounts"
            active={currentPage === "/accounts"}
            onClick={() => navigate('/accounts')}
            icon={Building2}
          />
          <SidebarItem
            label="Rewards"
            to="/rewards"
            active={currentPage === "/rewards"}
            onClick={() => navigate("/rewards")}
            icon={Gift}
          />
          <SidebarItem
            label="Profile"
            to="/profile"
            active={currentPage === "/profile"}
            onClick={() => navigate("/profile")}
            icon={User}
          />
        </nav>

        <div className="mt-auto">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white text-center mb-4">
            <Sparkles className="mx-auto mb-2" size={20} />
            <p className="text-sm font-medium">Premium Support</p>
            <p className="text-xs opacity-90">24/7 Assistance</p>
          </div>
          <div className="text-xs text-gray-400 text-center">© 2025 KYC Hub</div>
        </div>
      </aside>

      {/* Enhanced Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Welcome Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {user?.fullName}! 👋
              </h2>
              <p className="text-gray-600">
                Here's your KYC overview and account status summary.
              </p>
            </div>
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
                    <button onClick={() => navigate('/')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Home
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Accounts"
              value={accounts.length}
              color="bg-indigo-600"
              icon={Building2}
              delay={0}
            />
            <StatCard
              title="Verified Accounts"
              value={verified}
              color="bg-green-600"
              icon={CheckCircle2}
              delay={100}
            />
            <StatCard
              title="Pending Verification"
              value={pending}
              color="bg-orange-600"
              icon={Clock}
              delay={200}
            />
            <StatCard
              title="Total Points"
              value={'28,500'}
              trend={18}
              color="bg-purple-600"
              icon={TrendingUp}
              delay={300}
            />
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">KYC Progress</h3>
              <div className="flex items-center justify-center">
                <ProgressRing percentage={completionRate} />
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {verified} of {accounts.length} accounts verified
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Recent Activity</h3>
              <div className="space-y-2">
                <ActivityItem
                  icon={<CheckCircle2 size={16} />}
                  text="KYC completed for Capital One"
                  time="2 hours ago"
                  type="success"
                />
                <ActivityItem
                  icon={<Bell size={16} />}
                  text="KYC reminder sent for Wells Fargo"
                  time="Yesterday"
                  type="warning"
                />
                <ActivityItem
                  icon={<Gift size={16} />}
                  text="Earned 500 points for Chase verification"
                  time="3 days ago"
                  type="success"
                />
                <ActivityItem
                  icon={<Activity size={16} />}
                  text="New security update available"
                  time="1 week ago"
                  type="info"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          {pending > 0 && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl text-white mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Action Needed!</h4>
                  <p className="text-indigo-100 mb-4">
                    You have {pending} accounts pending KYC verification. Complete now to earn rewards and unlock premium features!
                  </p>
                  <button
                    onClick={() => navigate("/kyc-details")}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    Complete KYC Now
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="hidden lg:block">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Shield size={40} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accounts Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Connected Accounts</h3>
              <button 
                onClick={() => setCurrentPage("/accounts")} 
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {accounts.map((acc, index) => (
                <div
                  key={acc._id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-xl">
                        <Building2 size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">{acc.bankName}</p>
                        <p className="text-sm text-gray-500">****{acc.accountNumber.slice(-4)}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                      acc.kycStatus === "COMPLIANT"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {acc.kycStatus === "COMPLIANT" ? (
                        <>
                          <CheckCircle2 size={16} />
                          Verified
                        </>
                      ) : (
                        <>
                          <Clock size={16} />
                          Pending
                        </>
                      )}
                    </span>
                  </div>
                  
                  {acc.kycStatus !== "COMPLIANT" && (
                    <button 
                      onClick={() => setCurrentPage("/kyc")}
                      className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 px-4 rounded-xl font-medium transition-colors"
                    >
                      Complete Verification
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;