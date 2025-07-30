import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import KYCDetails from './components/KYCDetails';
import AccountSelection from './components/AccountSelection';
import Success from './components/Success';
import Accounts from './components/Accounts';
import RewardsBazaar from './components/RewardsBazaar';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import About from './components/About';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="/kyc-details" element={<KYCDetails />} />
          <Route path="/account-selection" element={<AccountSelection />} />
          <Route path="/success" element={<Success />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/rewards" element={<RewardsBazaar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;