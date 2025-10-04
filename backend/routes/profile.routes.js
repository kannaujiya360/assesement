const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { getProfile, updateProfile } = require('../controllers/profile.controller');

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

module.exports = router;
