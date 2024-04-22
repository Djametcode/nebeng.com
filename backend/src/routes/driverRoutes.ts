import express from 'express'
import { loginDriver, registerDriver } from '../controller/driverController';
const router = express.Router();

router.post('/register', registerDriver);
router.post('/login', loginDriver);

export const driverRouter = router;