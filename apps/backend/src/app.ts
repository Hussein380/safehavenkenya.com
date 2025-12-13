import express from 'express';
import cors from 'cors';
import mentalHealthRoutes from './routes/mentalHealthRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mental-health', mentalHealthRoutes);

app.get('/', (req, res) => {
    res.send('Safe Haven Backend is running');
});

export default app;
