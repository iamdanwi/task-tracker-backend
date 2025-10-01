import Task from '../models/task.model.js';
import User from '../models/user.model.js';

const createTask = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    if (!name || !dueDate) {
      return res.status(400).json({ message: 'Name and due date are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask = new Task({
      name,
      description,
      dueDate,
      user: req.user.id,
      status: 'pending',
    });

    await newTask.save();
    return res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { name, description, dueDate, status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (name) task.name = name;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;

    await task.save();
    return res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { createTask, updateTask, deleteTask, getTasks };
