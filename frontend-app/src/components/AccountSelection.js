import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function AccountSelection() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  // Fetch accounts with KYC status 'PENDING' from MongoDB
  useEffect(() => {
    const fetchPendingAccounts = async () => {
      try {
        const userId = "687f171378161830fc3425fd";
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/accounts/${userId}/status/PENDING`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        
        const data = await response.json();
        console.log('Fetched accounts:', data); // Debug log
        setAccounts(data);
        
        // Pre-select all accounts by default
        setSelectedAccounts(data.map(account => account._id));
      } catch (err) {
        setError(err.message);
        console.error('Error fetching accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAccounts();
  }, []);

  const toggleAccountSelection = (accountId) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };
  const navigate = useNavigate();
  const handleUpdateKYC = async () => {
    if (selectedAccounts.length === 0) {
      alert('Please select at least one account to update.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/accounts/complete-kyc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountIds: selectedAccounts
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update KYC');
      }

      const result = await response.json();
      console.log('KYC Update Result:', result);
      
      // Handle success (redirect or show success message)
      alert('KYC information updated successfully!');
      navigate('/success', { state: { updatedAccountIds: selectedAccounts } });
    } catch (err) {
      console.error('Error updating KYC:', err);
      alert('Failed to update KYC information. Please try again.');
    }
  };

  const getBankName = (account) => {
    // Try multiple possible property names for bank name
    return account.bankName || account.bank_name || account.institutionName || account.institution_name || account.name || 'Unknown Bank';
  };

  const getAccountNumber = (account) => {
    // Try multiple possible property names for account number
    return account.accountNumber || account.account_number || account.cardNumber || account.card_number || account.number || '';
  };

  const getAccountType = (account) => {
    // Try multiple possible property names for account type
    return account.accountType || account.account_type || account.type || 'banking';
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
    
    // Find matching color or default to blue
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading accounts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
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
            <h1 className="text-sm font-medium text-gray-500">Account Selection</h1>
          </div>
          
          {/* Progress indicators */}
          <div className="flex space-x-2 mb-6">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Select Accounts to Update</h2>
        </div>

        {/* Ready to Update Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Ready to Update</h3>
          <p className="text-sm text-gray-600">
            Your information will be securely sent to the selected financial institutions via encrypted API.
          </p>
        </div>

        {/* All Accounts Section (since we don't know the exact structure) */}
        {accounts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounts</h3>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {accounts.map((account, index) => {
                const bankName = getBankName(account);
                const accountNumber = getAccountNumber(account);
                const accountType = getAccountType(account);
                
                return (
                  <div key={account._id || index}>
                    <div 
                      className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedAccounts.includes(account._id) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => toggleAccountSelection(account._id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${getBankColor(bankName)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          {getBankInitials(bankName)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{bankName}</h4>
                          <p className="text-sm text-gray-600">
                            {accountType === 'credit' ? 'Credit Card ' : ''}
                            {maskAccountNumber(accountNumber)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                          KYC Expired
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedAccounts.includes(account._id) 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {selectedAccounts.includes(account._id) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                    {index < accounts.length - 1 && (
                      <div className="border-b border-gray-200"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}



        {/* No Accounts Message */}
        {accounts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">No accounts with pending KYC status found.</p>
          </div>
        )}

        {/* Update Button */}
        {accounts.length > 0 && (
          <div className="pt-6">
            <button
              onClick={handleUpdateKYC}
              disabled={selectedAccounts.length === 0}
              className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${
                selectedAccounts.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Update KYC for {selectedAccounts.length > 0 ? `${selectedAccounts.length} ` : 'All '}Account{selectedAccounts.length !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}