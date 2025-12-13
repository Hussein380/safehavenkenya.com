import dotenv from 'dotenv';
import path from 'path';
import app from './app';

// Load env vars from root .env
// Assumes CWD is apps/backend
const envPath = path.resolve(process.cwd(), '../../.env');
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

