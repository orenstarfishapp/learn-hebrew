import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middleware/auth.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
});