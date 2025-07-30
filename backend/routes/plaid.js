// 3. Backend Routes for Plaid (routes/plaid.js)
const express = require('express');
const mongoose = require('mongoose');
const plaidClient = require('../config/plaid');
const router = express.Router();

// Create link token
router.post('/create-link-token', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const configs = {
      user: {
        client_user_id: userId,
      },
      client_name: 'KYC Hub',
      products: ['auth', 'identity', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    res.json(createTokenResponse.data);
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: error.message });
  }
});

// Exchange public token for access token
router.post('/exchange-public-token', async (req, res) => {
  try {
    const { public_token, userId } = req.body;
    
    // Exchange public token for access token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });
    
    const access_token = tokenResponse.data.access_token;
    const item_id = tokenResponse.data.item_id;
    
    // Get account info
    const accountsResponse = await plaidClient.accountsGet({
      access_token: access_token,
    });
    
    const accounts = accountsResponse.data.accounts;
    
    // Get identity info for KYC
    const identityResponse = await plaidClient.identityGet({
      access_token: access_token,
    });
    
    // Save accounts to database
    const accountsCollection = mongoose.connection.db.collection('accounts');
    const savedAccounts = [];
    
    for (const account of accounts) {
      // Get the next available ID
      const lastAccount = await accountsCollection.findOne({}, { sort: { _id: -1 } });
      const nextId = lastAccount ? lastAccount._id + 1 : 1;
      
      const newAccount = {
        _id: nextId,
        userId: userId,
        bankName: account.name,
        accountNumber: account.account_id, // In production, use masked number
        accountType: account.type,
        kycStatus: 'PENDING',
        balance: account.balances.current || 0,
        plaidAccountId: account.account_id,
        plaidAccessToken: access_token, // Store securely in production
        plaidItemId: item_id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await accountsCollection.insertOne(newAccount);
      savedAccounts.push(newAccount);
    }
    
    res.json({
      message: 'Accounts linked successfully',
      accounts: savedAccounts
    });
    
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;