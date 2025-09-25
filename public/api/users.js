const { Pool } = require('pg');

module.exports = async (req, res) => {
  // Allow CORS for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { email, name } = req.body;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    
    try {
      await pool.query(
        'INSERT INTO users (email, name) VALUES ($1, $2)',
        [email, name]
      );
      res.status(200).json({ message: 'User added!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      pool.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};