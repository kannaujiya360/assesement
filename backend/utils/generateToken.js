const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'changeme';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

module.exports = generateToken;
