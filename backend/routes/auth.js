const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
// Register via form
router.post('/register', async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;
  try {
    const user = new User({ fullName, email, phoneNumber, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Register/Login via Google
router.post('/google-auth', async (req, res) => {
    
  const { email, name, sub: googleId, picture } = req.body;
  console.log('Incoming Google login request:', req.body);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, fullName: name, googleId, picture });
      await user.save();
    }
    res.status(200).json({ message: 'Google login successful.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    // Check if user exists
    const existingUser = await User.findOne({ googleId });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not registered. Please sign up first.' });
    }

    // Return user if found
    res.status(200).json({
      user: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        googleId: existingUser.googleId,
        picture: existingUser.picture,
      },
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
