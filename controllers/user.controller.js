import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// =============================
// Change Email
// =============================
const changeEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    if (!newEmail) {
      return res.status(400).json({ message: 'New email is required' });
    }

    const existing = await User.findOne({ email: newEmail });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = newEmail;
    await user.save();

    return res.status(200).json({ message: 'Email updated successfully', email: newEmail });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Change Password
// =============================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Delete Account
// =============================
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    // console.log(req.user.id)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User found successfully',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export { changeEmail, changePassword, deleteAccount, getUser };
