import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Success({ onBackToHome }) {
  const location = useLocation();
  const updatedAccountIds = location.state?.updatedAccountIds || [];

  const [updatedAccounts, setUpdatedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUpdatedAccounts = async () => {
      try {
        setLoading(true);
        
        // If we have specific account IDs, fetch those accounts
        if (updatedAccountIds && updatedAccountIds.length > 0) {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user/accounts/by-ids`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accountIds: updatedAccountIds
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setUpdatedAccounts(data);
          }
        } else {
          // Fallback: fetch accounts with COMPLIANT status for this user
          const userId = "687f171378161830fc3425fd";
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user/accounts/${userId}/status/COMPLIANT`);
          
          if (response.ok) {
            const data = await response.json();
            setUpdatedAccounts(data);
          }
        }
      } catch (err) {
        console.error('Error fetching updated accounts:', err);
        // Set some default accounts for demo purposes
        setUpdatedAccounts([
          {
            _id: '1',
            bankName: 'JPMorgan Chase Bank',
            accountNumber: '1234',
            accountType: 'banking'
          },
          {
            _id: '2',
            bankName: 'Wells Fargo Bank',
            accountNumber: '5678',
            accountType: 'banking'
          },
          {
            _id: '3',
            bankName: 'Discover Card',
            cardName: 'Discover Card',
            cardType: 'Cashback',
            accountNumber: '0987',
            accountType: 'credit'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdatedAccounts();
  }, [updatedAccountIds]);

  const getBankName = (account) => {
    return account.bankName || account.bank_name || account.institutionName || account.institution_name || account.name || 'Unknown Bank';
  };

  const getAccountNumber = (account) => {
    return account.accountNumber || account.account_number || account.cardNumber || account.card_number || account.number || '';
  };

  const getBankInitials = (bankName) => {
    if (!bankName || bankName === 'Unknown Bank') return 'UB';
    return bankName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getBankColor = (bankName) => {
    const colors = {
      'JPMorgan Chase Bank': 'bg-blue-600',
      'Wells Fargo Bank': 'bg-red-600',
      'Bank of America': 'bg-red-700',
      'Discover Card': 'bg-orange-500',
      'Chase': 'bg-blue-600',
      'Wells Fargo': 'bg-red-600',
      'Citi': 'bg-blue-500',
      'Capital One': 'bg-red-500',
      'American Express': 'bg-blue-800',
    };
    
    if (!bankName) return 'bg-blue-600';
    
    const matchedBank = Object.keys(colors).find(bank => 
      bankName.toLowerCase().includes(bank.toLowerCase())
    );
    
    return matchedBank ? colors[matchedBank] : 'bg-blue-600';
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return '****';
    const str = accountNumber.toString();
    return '****' + str.slice(-4);
  };
  
  const navigate = useNavigate();
  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      // Fallback navigation
      // window.location.href = '/dashboard';
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading success details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm font-medium text-gray-500">Success</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">100%</span>
              <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Progress indicators - all completed */}
          <div className="flex space-x-2 mb-8">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">KYC Update Completed</h2>
          
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Set !</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your KYC information has been successfully updated across all your accounts.
            </p>
          </div>
        </div>

        {/* Updated Accounts Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Updated Accounts</h3>
          <div className="space-y-3">
            {updatedAccounts.map((account, index) => {
              const bankName = getBankName(account);
              const accountNumber = getAccountNumber(account);
              
              return (
                <div key={account._id || index} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${getBankColor(bankName)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                      {getBankInitials(bankName)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{bankName}</h4>
                      <p className="text-sm text-gray-600">
                        {account.cardType && `${account.cardType} Card `}
                        {maskAccountNumber(accountNumber)}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="pt-6">
          <button
            onClick={handleBackToHome}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}