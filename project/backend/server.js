import express from 'express';
import authRoutes from './authRoutes.js';
import analysisRoutes from './analysisRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Adjust your frontend URL
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/analyze', analysisRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
