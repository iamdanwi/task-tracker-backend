import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// const cookieOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "none",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
// };

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'none', // required for cross-site cookies
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken({ id: newUser._id });
    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user._id });

    await res.cookie('token', token, cookieOptions);

    return res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const verifyTokenController = (req, res) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(200).json({ valid: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(200).json({ valid: false });
  }
};

export { register, login, logout, verifyTokenController };
