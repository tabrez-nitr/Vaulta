import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middlewares/authMiddlewares.js'; // Ensure this matches your export
import pageRouter from './routes/page.js';
import transactionRouter from './routes/transaction.js';
import profileRouter from './routes/profile.js';

dotenv.config();
const app = express();

// 1. Connect to Database
connectDB();

const PORT = process.env.PORT || 8000;

// 2. Public Middlewares (Run for EVERY request)
app.use(cors({
    credentials: true, 
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(cookieParser());

// 3. Public Routes (Login/Signup MUST be accessible without token)
app.use('/api/auth', authRouter); 

// 4. Protected Routes (Apply middleware ONLY here)
// Option A: Apply globally for all routes defined BELOW this line
app.use(authMiddleware); 

// Example: This route is now protected because it is defined AFTER line 30
app.get('/api/user/profile', (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you are authorized!` });
});

// Root route (Optional: keep public or private as you prefer)
app.get('/', (req, res) => {
    res.json({ message: "SERVER IS LIVE" });
});


//all routes 
//all qauries related to page
app.use('/api/pages',pageRouter)
//all quaries related to transactions 
app.use('/api/transactions',transactionRouter)
//all queries related to profile 
app.use('/api/profile',profileRouter)





//server listens 
app.listen(PORT, () => {
    console.log(`server is live ${PORT}`);
});