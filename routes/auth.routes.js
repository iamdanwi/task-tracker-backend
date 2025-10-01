import express from 'express';
import { register, login, logout, verifyTokenController } from '../controllers/auth.controller.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-token', verifyTokenController);

export default router;
