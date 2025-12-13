import { Router } from 'express';
import { analyzeMentalState } from '../controllers/mentalHealthController';

const router = Router();

router.post('/analyze', analyzeMentalState);

export default router;
