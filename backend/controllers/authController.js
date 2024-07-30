import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token , role });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error registering user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    const role = user.role ;
    res.json({ token , role });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error logging in' });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
