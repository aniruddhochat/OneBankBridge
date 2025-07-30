import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Logo from '../logo.png';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleFormLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // const decoded = jwtDecode(credentialResponse.credential);
      // const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-auth`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(decoded),
      // });

      // const data = await res.json();


      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google-login`, {
        token: credentialResponse.credential,
      });

      // Save user info and redirect
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (error) {
      if (error.response?.status === 404) {
        alert('User not registered. Please create an account first.');
      } else {
        alert('Google login failed. Please try again.');
      }
    }
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
        <div className="divider"></div>
        <div className="google-signin">
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => alert('Login Failed')} />
        </div>

        <div className="divider">or</div>

        <form onSubmit={handleFormLogin} className="auth-form">
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Sign In</button>

          <p className="auth-link">
            Don't have an account? <Link to="/create-account">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
