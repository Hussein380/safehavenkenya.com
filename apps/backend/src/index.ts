import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mentalHealthRoutes from './routes/mentalHealthRoutes';

// Load env vars from root .env
// Assumes CWD is apps/backend
const envPath = path.resolve(process.cwd(), '../../.env');
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mental-health', mentalHealthRoutes);

app.get('/', (req, res) => {
    res.send('Safe Haven Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
