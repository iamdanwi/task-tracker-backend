import express from 'express';
import { createTask, updateTask, deleteTask, getTasks } from '../controllers/task.controller.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

// Get all tasks for logged-in user
router.get('/', verifyToken, getTasks);

// Create a new task
router.post('/', verifyToken, createTask);

// Update a task (by id)
router.put('/:id', verifyToken, updateTask);

// Delete a task (by id)
router.delete('/:id', verifyToken, deleteTask);

export default router;
