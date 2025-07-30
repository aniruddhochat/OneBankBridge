import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import Logo from '../logo.png';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) navigate('/home');
      else alert(data.error);
    } catch (err) {
      alert('Registration failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decoded),
      });

      const data = await res.json();
      if (res.ok) navigate('/home');
      else alert(data.error);
    } catch (err) {
      alert('Google login failed');
    }
  };

  const handleGoogleFailure = () => {
    alert('Google sign in failed. Try again.');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-section flex items-center space-x-12">
          <img src={Logo} alt="OneBankBridge Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">OneBankBridge</h1>
            <p className="text-xs text-gray-600">Your KYC. Simplified. Secured</p>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <div className="flex justify-center mt-4">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
        </div>

        <div className="divider my-4"></div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h3>Create Account</h3>
          {/* Form Fields */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" required />
            <label>I agree to the Terms of Service and Privacy Policy</label>
          </div>

          <button type="submit" className="btn-primary">Create Account</button>

          <p className="auth-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
