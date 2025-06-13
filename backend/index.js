const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();         // ✅ Load .env variables before using them
connectDB();             // ✅ Connect to MongoDB

const app = express();

app.use(express.json()); // ✅ Required to parse JSON body data

app.get('/', (req, res) => {
    res.send('Sainath Estate Backend Running ✅');
});

// API's 
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const creativeRoutes = require('./routes/creativeImageRoutes');
app.use('/api/creatives', creativeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
