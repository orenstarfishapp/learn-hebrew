import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middleware/auth.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: ['https://easilystudyhebrew.com', 'https://www.easilystudyhebrew.com', 'http://localhost:5000'],
  credentials: true
}));

app.use(express.json());

// Force HTTPS and www in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Check for HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
  });
}

// Serve static files from the dist directory
app.use(express.static('dist'));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/*', authenticateToken);

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});