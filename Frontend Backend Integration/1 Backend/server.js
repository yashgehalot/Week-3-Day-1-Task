const express = require('express');
const cors = require('cors'); // Import CORS (Make sure to run: npm install cors)
const dotenv = require('dotenv').config();
const connectDB = require('./Config/db'); 

const port = process.env.PORT || 5000; // Use port 5000 to match your frontend fetch

connectDB(); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // This allows React to fetch data from here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- ROUTES ---
// 1. User Routes
app.use('/api/users', require('./routes/userRoutes'));

// 2. Auth Routes
app.use('/api/auth', require('./routes/auth')); 

// 3. Expense Routes
app.use('/api/expenses', require('./routes/expenses'));

// 4. Sample Test Route
app.get('/api/day1', (req, res) => {
    res.json({ message: "Backend Working!" });
});


// --- START SERVER ---
app.listen(port, () => console.log(`Server started on port ${port}`));