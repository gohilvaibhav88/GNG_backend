import { User } from '../models/user.model.js';
import { generateToken } from '../lib/utils/generateToken.js';


export const register = async (req, res) => {
  const { fullName, email, number, address, role, password } = req.body;
  const user = await User.create({ fullName, email, number, address, role, password });
  res.status(201).json({ token: generateToken(user._id), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id), user });
};
