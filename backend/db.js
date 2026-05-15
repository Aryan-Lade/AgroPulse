const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
})

// Prevent unhandled errors from crashing the Node.js process
pool.on('error', (err) => {
  console.warn('Postgres pool background error:', err.message)
})

pool.connect((err, client, release) => {
  if (err) {
    console.warn('Primary database connection failed (fallback storage active):', err.message)
  } else {
    console.log('Connected to Railway PostgreSQL')
    release()
  }
})

module.exports = pool
