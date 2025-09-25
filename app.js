const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Server is running on port ${PORT}!</h1>
    <p>Test endpoints:</p>
    <ul>
      <li><a href="/test-db">Test Database Connection</a></li>
      <li><a href="/users">View Users</a></li>
    </ul>
  `);
});

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    res.json({ 
      message: '✅ Database connected successfully!',
      time: result.rows[0].current_time 
    });
  } catch (err) {
    res.status(500).json({ 
      error: '❌ Database connection failed',
      details: err.message 
    });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY id');
    res.json({
      message: '✅ Users retrieved successfully',
      count: result.rows.length,
      users: result.rows
    });
  } catch (err) {
    res.status(500).json({ 
      error: '❌ Failed to get users',
      details: err.message 
    });
  }
});

// Create new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json({
      message: '✅ User created successfully',
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      error: '❌ Failed to create user',
      details: err.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Test database: http://localhost:${PORT}/test-db`);
  console.log(`👥 View users: http://localhost:${PORT}/users`);
});