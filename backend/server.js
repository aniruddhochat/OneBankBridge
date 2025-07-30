const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/user', accountRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
