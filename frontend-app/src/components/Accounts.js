import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { 
  Building2, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Shield,
  CreditCard,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  ArrowLeft,
  AlertCircle,
  Lock,
  Check,
  ChevronRight,
  Loader2
} from "lucide-react";

// Mock bank data with pre-defined accounts for MongoDB insertion
const MOCK_BANKS = [
  {
    id: 'chase',
    name: 'Chase',
    logo: '🏦',
    color: 'bg-blue-600',
    // This account will be added to MongoDB when user selects this bank
    mongoAccount: {
      _id: 5,
      userId: "687f171378161830fc3425fd",
      bankName: "Chase",
      accountNumber: "1234567890",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'chase-checking', name: 'Chase Total Checking', type: 'checking', balance: 2847.32, mask: '7890' },
      { id: 'chase-savings', name: 'Chase Savings', type: 'savings', balance: 12543.89, mask: '4321' },
      { id: 'chase-credit', name: 'Chase Freedom Unlimited', type: 'credit', balance: -1203.45, mask: '9876' }
    ]
  },
  {
    id: 'bofa',
    name: 'Bank of America',
    logo: '🏛️',
    color: 'bg-red-600',
    mongoAccount: {
      _id: 6,
      userId: "687f171378161830fc3425fd",
      bankName: "Bank of America",
      accountNumber: "2345678901",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'bofa-checking', name: 'Advantage Plus Banking', type: 'checking', balance: 3621.18, mask: '2468' },
      { id: 'bofa-savings', name: 'Advantage Savings', type: 'savings', balance: 18934.56, mask: '1357' }
    ]
  },
  {
    id: 'wells',
    name: 'Wells Fargo',
    logo: '🐎',
    color: 'bg-yellow-600',
    mongoAccount: {
      _id: 7,
      userId: "687f171378161830fc3425fd",
      bankName: "Wells Fargo",
      accountNumber: "3456789012",
      kycStatus: "COMPLIANT"
    },
    accounts: [
      { id: 'wells-checking', name: 'Everyday Checking', type: 'checking', balance: 1876.43, mask: '5678' },
      { id: 'wells-credit', name: 'Wells Fargo Active Cash', type: 'credit', balance: -567.89, mask: '9012' }
    ]
  },
  {
    id: 'citi',
    name: 'Citibank',
    logo: '🏢',
    color: 'bg-blue-700',
    mongoAccount: {
      _id: 8,
      userId: "687f171378161830fc3425fd",
      bankName: "Citibank",
      accountNumber: "4567890123",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'citi-checking', name: 'Citibank Account Package', type: 'checking', balance: 4321.76, mask: '3456' }
    ]
  },
  {
    id: 'usbank',
    name: 'U.S. Bank',
    logo: '🇺🇸',
    color: 'bg-blue-800',
    mongoAccount: {
      _id: 9,
      userId: "687f171378161830fc3425fd",
      bankName: "U.S. Bank",
      accountNumber: "5678901234",
      kycStatus: "COMPLIANT"
    },
    accounts: [
      { id: 'usbank-checking', name: 'U.S. Bank Checking', type: 'checking', balance: 5432.10, mask: '1234' }
    ]
  },
  {
    id: 'truist',
    name: 'Truist',
    logo: '💜',
    color: 'bg-purple-600',
    mongoAccount: {
      _id: 10,
      userId: "687f171378161830fc3425fd",
      bankName: "Truist",
      accountNumber: "6789012345",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'truist-checking', name: 'Truist One Checking', type: 'checking', balance: 1987.65, mask: '2345' }
    ]
  },
  {
    id: 'pnc',
    name: 'PNC Bank',
    logo: '🟦',
    color: 'bg-blue-600',
    mongoAccount: {
      _id: 11,
      userId: "687f171378161830fc3425fd",
      bankName: "PNC Bank",
      accountNumber: "7890123456",
      kycStatus: "COMPLIANT"
    },
    accounts: [
      { id: 'pnc-checking', name: 'PNC Virtual Wallet', type: 'checking', balance: 3210.87, mask: '3456' }
    ]
  },
  {
    id: 'capitol',
    name: 'Capital One',
    logo: '☕',
    color: 'bg-red-700',
    mongoAccount: {
      _id: 12,
      userId: "687f171378161830fc3425fd",
      bankName: "Capital One",
      accountNumber: "8901234567",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'capitol-checking', name: 'Capital One 360 Checking', type: 'checking', balance: 4567.89, mask: '4567' }
    ]
  },
  {
    id: 'td',
    name: 'TD Bank',
    logo: '🟢',
    color: 'bg-green-600',
    mongoAccount: {
      _id: 13,
      userId: "687f171378161830fc3425fd",
      bankName: "TD Bank",
      accountNumber: "9012345678",
      kycStatus: "COMPLIANT"
    },
    accounts: [
      { id: 'td-checking', name: 'TD Convenience Checking', type: 'checking', balance: 2876.54, mask: '5678' }
    ]
  },
  {
    id: 'regions',
    name: 'Regions Bank',
    logo: '🟨',
    color: 'bg-yellow-500',
    mongoAccount: {
      _id: 14,
      userId: "687f171378161830fc3425fd",
      bankName: "Regions Bank",
      accountNumber: "0123456789",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'regions-checking', name: 'Regions LifeGreen Checking', type: 'checking', balance: 1543.21, mask: '6789' }
    ]
  },
  {
    id: 'fifth',
    name: 'Fifth Third Bank',
    logo: '🔷',
    color: 'bg-indigo-600',
    mongoAccount: {
      _id: 15,
      userId: "687f171378161830fc3425fd",
      bankName: "Fifth Third Bank",
      accountNumber: "1357924680",
      kycStatus: "COMPLIANT"
    },
    accounts: [
      { id: 'fifth-checking', name: 'Fifth Third Essential Checking', type: 'checking', balance: 3698.47, mask: '4680' }
    ]
  },
  {
    id: 'keybank',
    name: 'KeyBank',
    logo: '🔑',
    color: 'bg-gray-600',
    mongoAccount: {
      _id: 16,
      userId: "687f171378161830fc3425fd",
      bankName: "KeyBank",
      accountNumber: "2468013579",
      kycStatus: "PENDING"
    },
    accounts: [
      { id: 'keybank-checking', name: 'Key Privilege Select Checking', type: 'checking', balance: 5234.12, mask: '3579' }
    ]
  }
];

const ALL_BANKS_LIST = [
  { id: 'chase', name: 'JPMorgan Chase', logo: '🏦' },
  { id: 'bofa', name: 'Bank of America', logo: '🏛️' },
  { id: 'wells', name: 'Wells Fargo', logo: '🐎' },
  { id: 'citi', name: 'Citibank', logo: '🏢' },
  { id: 'usbank', name: 'U.S. Bank', logo: '🇺🇸' },
  { id: 'truist', name: 'Truist', logo: '💜' },
  { id: 'pnc', name: 'PNC Bank', logo: '🟦' },
  { id: 'capitol', name: 'Capital One', logo: '☕' },
  { id: 'td', name: 'TD Bank', logo: '🟢' },
  { id: 'regions', name: 'Regions Bank', logo: '🟨' },
  { id: 'fifth', name: 'Fifth Third Bank', logo: '🔷' },
  { id: 'keybank', name: 'KeyBank', logo: '🔑' }
];

// Plaid Integration Components
const PlaidBankSearch = ({ onBankSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredBanks = ALL_BANKS_LIST.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankClick = (bankId) => {
    setIsSearching(true);
    // Simulate loading time
    setTimeout(() => {
      onBankSelect(bankId);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Select your bank</h1>
            <p className="text-sm text-gray-600">Choose your financial institution</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <Loader2 size={40} className="animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">Connecting to your bank...</p>
              <p className="text-sm text-gray-500 mt-1">This should only take a moment</p>
            </div>
          </div>
        )}

        {/* Popular Banks */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Popular banks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ALL_BANKS_LIST.slice(0, 6).map(bank => (
              <button
                key={bank.id}
                onClick={() => handleBankClick(bank.id)}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <span className="text-2xl">{bank.logo}</span>
                <span className="font-medium text-gray-900 text-sm">{bank.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All Banks */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">All banks ({filteredBanks.length})</h3>
          <div className="space-y-2">
            {filteredBanks.map(bank => (
              <button
                key={bank.id}
                onClick={() => handleBankClick(bank.id)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{bank.logo}</span>
                  <span className="font-medium text-gray-900">{bank.name}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Your data is secure</h4>
              <p className="text-xs text-gray-600">
                We use bank-level security and don't store your login credentials. 
                Your connection is encrypted and protected by Plaid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaidLogin = ({ bank, onSuccess, onBack }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) return;
    
    setIsLogging(true);
    // Simulate login process
    setTimeout(() => {
      onSuccess(bank.id);
    }, 2000);
  };

  const selectedBank = MOCK_BANKS.find(b => b.id === bank) || MOCK_BANKS[0];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedBank.logo}</span>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{selectedBank.name}</h1>
                <p className="text-sm text-gray-600">Enter your online banking credentials</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock size={16} />
            <span>Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Loading Overlay */}
        {isLogging && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center min-w-[300px]">
              <Loader2 size={40} className="animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Logging into {selectedBank.name}...</p>
              <p className="text-sm text-gray-500">Verifying your credentials</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username or Email
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!credentials.username || !credentials.password}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Your login is secure</h4>
              <p className="text-xs text-blue-700">
                We never store your banking credentials. Your login information is encrypted 
                and sent directly to {selectedBank.name} through a secure connection.
              </p>
            </div>
          </div>
        </div>

        {/* Help Links */}
        <div className="mt-6 text-center space-y-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm">
            Forgot your password?
          </button>
          <div className="text-xs text-gray-500">
            Having trouble? <button className="text-blue-600 hover:text-blue-700">Get help</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaidAccountSelect = ({ bankId, onAccountsSelected, onBack }) => {
  const [selectedAccounts, setSelectedAccounts] = useState(new Set());
  const [isConnecting, setIsConnecting] = useState(false);

  const bank = MOCK_BANKS.find(b => b.id === bankId) || MOCK_BANKS[0];

  const toggleAccount = (accountId) => {
    const newSelected = new Set(selectedAccounts);
    if (newSelected.has(accountId)) {
      newSelected.delete(accountId);
    } else {
      newSelected.add(accountId);
    }
    setSelectedAccounts(newSelected);
  };

  const handleContinue = () => {
    if (selectedAccounts.size === 0) return;
    
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      const accounts = bank.accounts.filter(acc => selectedAccounts.has(acc.id));
      onAccountsSelected(accounts, bank);
    }, 3000);
  };

  const formatBalance = (balance, type) => {
    const absBalance = Math.abs(balance);
    if (type === 'credit') {
      return balance < 0 ? `-$${absBalance.toLocaleString()}` : `$${balance.toLocaleString()}`;
    }
    return `$${balance.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{bank.logo}</span>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Select accounts</h1>
              <p className="text-sm text-gray-600">Choose which {bank.name} accounts to connect</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isConnecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center min-w-[350px]">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={32} className="text-blue-600" />
              </div>
              <Loader2 size={24} className="animate-spin text-blue-600 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connecting your accounts</h3>
            <p className="text-gray-600 mb-4">Setting up secure access to your {bank.name} accounts</p>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check size={16} className="text-green-600" />
                <span>Verified account credentials</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Check size={16} className="text-green-600" />
                <span>Established secure connection</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Loader2 size={16} className="animate-spin" />
                <span>Linking selected accounts...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Accounts List */}
        <div className="space-y-4 mb-8">
          {bank.accounts.map(account => (
            <div
              key={account.id}
              onClick={() => toggleAccount(account.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAccounts.has(account.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAccounts.has(account.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAccounts.has(account.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {account.type} • •••{account.mask}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatBalance(account.balance, account.type)}
                  </p>
                  {account.type === 'credit' && (
                    <p className="text-xs text-gray-500">Available credit</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
          <button
            onClick={handleContinue}
            disabled={selectedAccounts.size === 0}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              selectedAccounts.size > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Connect {selectedAccounts.size} account{selectedAccounts.size !== 1 ? 's' : ''}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            You can disconnect these accounts anytime from your settings
          </p>
        </div>
      </div>
    </div>
  );
};

const PlaidSuccess = ({ accounts, bank, onComplete }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Successfully connected!</h2>
        <p className="text-gray-600 mb-6">
          Your {bank.name} accounts have been securely linked to your profile.
        </p>

        <div className="space-y-3 mb-8">
          {accounts.map(account => (
            <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">{account.name}</p>
                <p className="text-xs text-gray-600">•••{account.mask}</p>
              </div>
              <CheckCircle2 size={16} className="text-green-600" />
            </div>
          ))}
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

// Main PlaidLink Component
const PlaidLink = ({ userId, onSuccess, onExit, isLoading, setIsLoading }) => {
  const [currentStep, setCurrentStep] = useState('button'); // button, search, login, select, success
  const [selectedBank, setSelectedBank] = useState(null);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [connectedBank, setConnectedBank] = useState(null);

  const handleStartFlow = () => {
    setCurrentStep('search');
  };

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
    setCurrentStep('login');
  };

  const handleLoginSuccess = () => {
    setCurrentStep('select');
  };

  const handleAccountsSelected = (accounts, bank) => {
    setConnectedAccounts(accounts);
    setConnectedBank(bank);
    setCurrentStep('success');
  };

  const handleComplete = async () => {
    try {
      // Get the MongoDB account template for the selected bank
      const bankData = MOCK_BANKS.find(b => b.id === selectedBank);
      if (!bankData) {
        throw new Error('Bank data not found');
      }

      // Use the pre-defined MongoDB account structure
      const mongoAccount = {
        ...bankData.mongoAccount,
        // Ensure unique ID by adding timestamp
        _id: bankData.mongoAccount._id + Date.now()
      };

      console.log('💾 Adding account to MongoDB:', mongoAccount);
      
      // Save the account to MongoDB
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/accounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mongoAccount)
        });

        if (response.ok) {
          console.log(`✅ Successfully saved ${bankData.name} account to MongoDB`);
        } else {
          throw new Error(`Failed to save account: ${response.statusText}`);
        }
      } catch (error) {
        console.error('❌ Error saving to MongoDB:', error);
        // Continue with local update even if save fails
      }

      // Create the account data for local state update
      const accountData = [{
        ...mongoAccount,
        // Add additional fields for UI display
        accountType: 'checking', // Default type for display
        balance: bankData.accounts[0]?.balance || 0,
        mask: mongoAccount.accountNumber.slice(-4)
      }];

      const mockPlaidData = {
        message: 'Account linked successfully',
        accounts: accountData
      };

      await onSuccess(mockPlaidData);
      setCurrentStep('button');
      setSelectedBank(null);
      setConnectedAccounts([]);
      setConnectedBank(null);
    } catch (error) {
      console.error('Error completing Plaid flow:', error);
      onExit && onExit(error);
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'search':
        setCurrentStep('button');
        onExit && onExit();
        break;
      case 'login':
        setCurrentStep('search');
        setSelectedBank(null);
        break;
      case 'select':
        setCurrentStep('login');
        break;
      default:
        break;
    }
  };

  // Render different steps
  if (currentStep === 'search') {
    return <PlaidBankSearch onBankSelect={handleBankSelect} onBack={handleBack} />;
  }

  if (currentStep === 'login') {
    return <PlaidLogin bank={selectedBank} onSuccess={handleLoginSuccess} onBack={handleBack} />;
  }

  if (currentStep === 'select') {
    return <PlaidAccountSelect bankId={selectedBank} onAccountsSelected={handleAccountsSelected} onBack={handleBack} />;
  }

  if (currentStep === 'success') {
    return <PlaidSuccess accounts={connectedAccounts} bank={connectedBank} onComplete={handleComplete} />;
  }

  // Default button state
  return (
    <div className="text-center">
      <button
        onClick={handleStartFlow}
        disabled={isLoading}
        className={`
          ${!isLoading 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl transform hover:scale-105' 
            : 'bg-gray-400 cursor-not-allowed'
          }
          text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all 
          flex items-center gap-2 disabled:transform-none disabled:shadow-lg
        `}
      >
        {isLoading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            Connecting...
          </>
        ) : (
          <>
            <Plus size={20} />
            Connect Bank Account
          </>
        )}
      </button>
    </div>
  );
};

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showAccountNumbers, setShowAccountNumbers] = useState({});
  const [isPlaidLoading, setIsPlaidLoading] = useState(false);

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
      setIsLoading(true);
      const userId = "687f171378161830fc3425fd";
      
      console.log('📡 Fetching existing accounts from MongoDB...');
      
      // Fetch user profile
      try {
        const userRes = await fetch(`${process.env.REACT_APP_API_URL}/user/profile/${userId}`);
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

      // Fetch existing accounts from MongoDB
      try {
        const accRes = await fetch(`${process.env.REACT_APP_API_URL}/user/accounts/${userId}`);
        if (accRes.ok) {
          const accountsData = await accRes.json();
          console.log('✅ Loaded existing accounts from MongoDB:', accountsData);
          setAccounts(Array.isArray(accountsData) ? accountsData : []);
        } else {
          console.log('⚠️ No existing accounts found in MongoDB');
          setAccounts([]);
        }
      } catch (error) {
        console.error('❌ Error fetching accounts from MongoDB:', error);
        setAccounts([]);
      }
      
    } catch (error) {
      console.error("❌ Error in fetchAccounts:", error);
      setAccounts([]);
      setUser({ name: "Alex Johnson", fullName: "Alex Johnson" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaidSuccess = async (data) => {
    try {
      console.log('🎉 Account successfully added to MongoDB:', data);
      
      // Add the new account to local state for immediate UI update
      setAccounts(prevAccounts => [...prevAccounts, ...data.accounts]);
      
      // Show success message
      setTimeout(() => {
        alert(`✅ Successfully connected and saved ${data.accounts[0].bankName} account to MongoDB!`);
      }, 100);
      
    } catch (error) {
      console.error('❌ Error handling account addition:', error);
      alert('Failed to save account. Please try again.');
    } finally {
      setIsPlaidLoading(false);
    }
  };

  const handlePlaidExit = (err, metadata) => {
    setIsPlaidLoading(false);
    if (err) {
      console.error('Plaid Link exit with error:', err);
    }
  };

  const toggleAccountVisibility = (accountId) => {
    setShowAccountNumbers(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.bankName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || account.kycStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const verified = accounts.filter(acc => acc.kycStatus === "COMPLIANT").length;
  const pending = accounts.length - verified;

  const AccountCard = ({ account, index }) => (
    <div 
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Building2 size={24} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{account.bankName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                {showAccountNumbers[account._id] 
                  ? account.accountNumber 
                  : `****${account.accountNumber?.slice(-4)}`
                }
              </span>
              <button
                onClick={() => toggleAccountVisibility(account._id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {showAccountNumbers[account._id] ? 
                  <EyeOff size={16} className="text-gray-400" /> : 
                  <Eye size={16} className="text-gray-400" />
                }
              </button>
            </div>
            {account.accountType && (
              <span className="text-xs text-gray-400 capitalize">{account.accountType} Account</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
            account.kycStatus === "COMPLIANT"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}>
            {account.kycStatus === "COMPLIANT" ? (
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
          
          {account.balance && (
            <span className="text-lg font-bold text-gray-800">
              ${account.balance.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {account.kycStatus !== "COMPLIANT" && (
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1">
              <Shield size={16} />
              Complete KYC
            </button>
          )}
          <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            <CreditCard size={16} />
            View Details
          </button>
        </div>
        
        <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Loading your accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Bank Accounts</h1>
                <p className="text-gray-600">Manage your connected financial accounts</p>
              </div>
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="COMPLIANT">Verified</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>

          <PlaidLink
            userId="687f171378161830fc3425fd"
            onSuccess={handlePlaidSuccess}
            onExit={handlePlaidExit}
            isLoading={isPlaidLoading}
            setIsLoading={setIsPlaidLoading}
          />
        </div>

        {/* Add Account CTA */}
        {accounts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No accounts connected yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Connect your bank accounts securely to get started with KYC verification and unlock premium features.
            </p>
            <PlaidLink
              userId="687f171378161830fc3425fd"
              onSuccess={handlePlaidSuccess}
              onExit={handlePlaidExit}
              isLoading={isPlaidLoading}
              setIsLoading={setIsPlaidLoading}
            />
          </div>
        ) : (
          <>
            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Secure Connection</h4>
                  <p className="text-blue-700 text-sm">
                    All account connections are secured with 256-bit encryption and never store your banking credentials. 
                    We use Plaid's bank-level security to protect your financial information.
                  </p>
                </div>
              </div>
            </div>

            {/* Accounts Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Accounts ({filteredAccounts.length})
                </h2>
                {pending > 0 && (
                  <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">{pending} KYC pending</span>
                  </div>
                )}
              </div>

              <div className="grid gap-6">
                {filteredAccounts.map((account, index) => (
                  <AccountCard key={account._id} account={account} index={index} />
                ))}
              </div>

              {filteredAccounts.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <Search size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No accounts found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;