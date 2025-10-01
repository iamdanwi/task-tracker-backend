import express from 'express';
import {
  changeEmail,
  changePassword,
  deleteAccount,
  getUser,
} from '../controllers/user.controller.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.get('/get-user', verifyToken, getUser);
router.put('/change-email', verifyToken, changeEmail);
router.put('/change-password', verifyToken, changePassword);
router.delete('/delete', verifyToken, deleteAccount);

export default router;
