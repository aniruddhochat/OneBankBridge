import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function KYCDetails() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentAddress: '',
    socialSecurityNumber: ''
  });
  const [uploadedDocs, setUploadedDocs] = useState({
    driverLicense: null,
    proofOfAddress: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (docType, file) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docType]: file
    }));
  };

  const navigate = useNavigate();
  const handleContinue = () => {
    console.log('Form Data:', formData);
    console.log('Uploaded Documents:', uploadedDocs);
    // Handle form submission logic here
    // window.location.href = '/account-selection';
    navigate('/account-selection');
  };

  const formatSSN = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as XXX-XX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    }
  };

  const handleSSNChange = (e) => {
    const formatted = formatSSN(e.target.value);
    setFormData(prev => ({
      ...prev,
      socialSecurityNumber: formatted
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm font-medium text-gray-500">KYC Details</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">100%</span>
              <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Progress indicators */}
          <div className="flex space-x-2 mb-6">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Update Your Information</h2>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Current Address */}
            <div>
              <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Current Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
                placeholder="Enter your current address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Social Security Number */}
            <div>
              <label htmlFor="socialSecurityNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Social Security Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="socialSecurityNumber"
                name="socialSecurityNumber"
                value={formData.socialSecurityNumber}
                onChange={handleSSNChange}
                placeholder="XXX-XX-XXXX"
                maxLength="11"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Document Upload Sections */}
            <div className="space-y-4 pt-4">
              {/* Driver's License Upload */}
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
                <div className="mb-4">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Upload Required Documents</h3>
                  <p className="text-sm text-gray-600 mb-2">Driver's License or State ID</p>
                  {uploadedDocs.driverLicense ? (
                    <p className="text-sm text-green-600">✓ {uploadedDocs.driverLicense.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Tap to browse files</p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('driverLicense', e.target.files[0])}
                  className="hidden"
                  id="driverLicense"
                />
                <label
                  htmlFor="driverLicense"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>

              {/* Proof of Address Upload */}
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
                <div className="mb-4">
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Proof of Address</h3>
                  <p className="text-sm text-gray-600 mb-2">Utility bill or bank statement</p>
                  {uploadedDocs.proofOfAddress ? (
                    <p className="text-sm text-green-600">✓ {uploadedDocs.proofOfAddress.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Tap to browse files</p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('proofOfAddress', e.target.files[0])}
                  className="hidden"
                  id="proofOfAddress"
                />
                <label
                  htmlFor="proofOfAddress"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-6">
              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue to Account Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};