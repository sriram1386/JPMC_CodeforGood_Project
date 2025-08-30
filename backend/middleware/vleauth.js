const jwt = require('jsonwebtoken');
const User = require('../Models/vle'); // Ensure this path is correct

const authVLE = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // ✅ Check if the user is a VLE
    if (!user.isVLE) {
      return res.status(403).json({ error: 'Access denied. VLE only.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('AuthVLE Error:', error);
    res.status(401).json({ error: 'Please authenticate as VLE' });
  }
};

module.exports = authVLE;
