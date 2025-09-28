const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, first_name, last_name, email, role, created_at FROM users');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;