const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// GET /user/accounts/:userId - Fetch accounts for a specific user
router.get('/accounts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    console.log('Fetching accounts for user:', userId);
    
    // Use the existing mongoose connection to access the accounts collection
    const accountsCollection = mongoose.connection.db.collection('accounts');
    
    // Fetch accounts where userId matches (as string)
    const accounts = await accountsCollection.find({ 
      userId: userId 
    }).toArray();
    
    console.log(`Found ${accounts.length} accounts for user: ${userId}`);
    
    res.status(200).json(accounts);
    
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch accounts',
      message: error.message 
    });
  }
});

// GET /user/profile/:userId - Fetch user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    console.log('Fetching profile for user:', userId);

    // Use the existing mongoose connection to access the users collection
    const usersCollection = mongoose.connection.db.collection('users');
    
    // Convert string to ObjectId for user lookup
    const { ObjectId } = require('mongodb');
    const userObjectId = new ObjectId(userId);
    
    const user = await usersCollection.findOne({ _id: userObjectId });
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    
    // Remove version field and return user data
    const { __v, ...userProfile } = user;
    res.status(200).json(userProfile);
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user profile',
      message: error.message 
    });
  }
});


router.post('/accounts', async (req, res) => {
  try {
    const { _id, userId, bankName, accountNumber, kycStatus } = req.body;
    
    // Validate required fields
    if (!userId || !bankName || !accountNumber) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, bankName, and accountNumber are required' 
      });
    }

    console.log('Creating new account for user:', userId);
    
    // Use the existing mongoose connection to access the accounts collection
    const accountsCollection = mongoose.connection.db.collection('accounts');
    
    // Check if account already exists for this user and bank
    const existingAccount = await accountsCollection.findOne({ 
      userId: userId,
      bankName: bankName
    });
    
    if (existingAccount) {
      return res.status(409).json({ 
        error: 'Account already exists',
        message: `An account for ${bankName} already exists for this user` 
      });
    }
    
    // Prepare account data
    const accountData = {
      _id: _id || Date.now(), // Use provided ID or generate timestamp-based ID
      userId: userId,
      bankName: bankName,
      accountNumber: accountNumber,
      kycStatus: kycStatus || 'PENDING', // Default to PENDING if not provided
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert the new account
    const result = await accountsCollection.insertOne(accountData);
    
    if (result.acknowledged) {
      console.log(`✅ Successfully created account: ${bankName} for user: ${userId}`);
      
      // Return the created account
      res.status(201).json({
        message: 'Account created successfully',
        account: accountData
      });
    } else {
      throw new Error('Failed to insert account into database');
    }
    
  } catch (error) {
    console.error('❌ Error creating account:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: 'Duplicate account',
        message: 'An account with this ID already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create account',
      message: error.message 
    });
  }
});
// GET /user/accounts/:userId/status/:status
router.get('/accounts/:userId/status/:status', async (req, res) => {
  const { userId, status } = req.params;

  const accounts = await mongoose.connection.db
    .collection('accounts')
    .find({ userId, kycStatus: status })
    .toArray();

  res.json(accounts);
});

// POST /user/accounts/complete-kyc
router.post('/accounts/complete-kyc', async (req, res) => {
  try {
    const { accountIds } = req.body;

    if (!Array.isArray(accountIds) || accountIds.length === 0) {
      return res.status(400).json({ error: 'No account IDs provided' });
    }

    console.log('Updating KYC for accounts:', accountIds);

    const accountsCollection = mongoose.connection.db.collection('accounts');

    // Update all matching accounts where _id is in the provided array
    const result = await accountsCollection.updateMany(
      {
        _id: { $in: accountIds.map(id => parseInt(id)) }, // assuming your _id is a Number
        kycStatus: 'PENDING'
      },
      {
        $set: { kycStatus: 'COMPLIANT' }
      }
    );

    res.status(200).json({
      message: 'KYC status updated successfully',
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Error updating KYC:', error);
    res.status(500).json({
      error: 'Failed to update KYC status',
      message: error.message
    });
  }
});

// Required if you're using ObjectId
// const { ObjectId } = require('mongodb');

// POST /user/accounts/by-ids
router.post('/accounts/by-ids', async (req, res) => {
  try {
    const { accountIds } = req.body;

    if (!Array.isArray(accountIds) || accountIds.length === 0) {
      return res.status(400).json({ error: 'No account IDs provided' });
    }

    const accountsCollection = mongoose.connection.db.collection('accounts');

    // If your _id is a Number
    const ids = accountIds.map(id => parseInt(id));

    // If your _id is an ObjectId, use this instead:
    // const ids = accountIds.map(id => new ObjectId(id));

    const accounts = await accountsCollection.find({ _id: { $in: ids } }).toArray();

    res.status(200).json(accounts);

  } catch (error) {
    console.error('Error fetching accounts by IDs:', error);
    res.status(500).json({
      error: 'Failed to fetch accounts',
      message: error.message
    });
  }
});

module.exports = router;