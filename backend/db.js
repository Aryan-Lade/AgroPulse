const { Pool } = require('pg')
require('dotenv').config()

// Railway PostgreSQL requires SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

pool.connect((err) => {
  if (err) {
    console.error('❌  Database connection failed:', err.message)
  } else {
    console.log('✅  Connected to Railway PostgreSQL')
  }
})

module.exports = pool
