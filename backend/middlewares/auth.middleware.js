const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  try {
    const secret = process.env.JWT_SECRET || 'changeme';
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user not found');
    }
    req.user = user; // attach user to request
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token invalid');
  }
});

module.exports = { protect };
