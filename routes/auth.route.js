const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/auth.controller');

const router = express.Router();

// POST /api/register
router.post(
  '/register',
  registerUser
);

// POST /api/login
router.post(
  '/login',
  loginUser
);

module.exports = router;
