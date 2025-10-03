import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(cors());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

app.use(express.json());
app.use('/api/auth', authRoutes);

// Placeholder for a protected route
app.get('/api/data/protected', (req, res) => {
  // In a real application, this would involve JWT verification middleware
  res.status(200).json({ message: 'This is protected data!', user: 'placeholder_user' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Authentication and Authorization Service by Gabriel Demetrios Lafis');
});

