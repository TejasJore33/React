import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Static file serving
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/enquire', emailRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
