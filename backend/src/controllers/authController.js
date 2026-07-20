const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authResponse = (user) => ({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email } });

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    if (await User.findOne({ email })) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    return res.status(201).json(authResponse(user));
  } catch (error) { return res.status(500).json({ message: 'Could not create account.' }); }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
    return res.json(authResponse(user));
  } catch (error) { return res.status(500).json({ message: 'Could not log in right now.' }); }
};
module.exports = { register, login };
