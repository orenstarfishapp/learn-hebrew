import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middleware/auth.js';
import path from 'path';
import { connectDB } from './utils/db.js';
import validateEnv from './utils/validateEnv.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Validate environment variables
const env = validateEnv();

const app = express();
const port = env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: env.NODE_ENV === 'production'
    ? ['https://easilystudyhebrew.com', 'https://www.easilystudyhebrew.com']
    : ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

// Force HTTPS and www in production
if (env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Check for HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
  });
}

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/*', authenticateToken);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      error: 'Database operation failed',
      details: err.message
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      details: err.message
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    details: env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(port, () => {
      console.log(`
🚀 Server is running on port ${port}
🌍 Environment: ${env.NODE_ENV}
📝 API Documentation: ${env.NODE_ENV === 'development' ? `http://localhost:${port}/api-docs` : 'https://easilystudyhebrew.com/api-docs'}
      `);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer();