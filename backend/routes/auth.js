const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')

// Auto-create users table on first run
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(100)  NOT NULL,
    email        VARCHAR(255)  UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at   TIMESTAMP DEFAULT NOW()
  )
`).catch(err => console.error('Table init error:', err.message))

/* ── POST /api/auth/register ─────────────────────────────────────── */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' })

  if (password.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters' })

  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1', [email.toLowerCase()]
    )
    if (existing.rows.length > 0)
      return res.status(409).json({ message: 'Email is already registered' })

    const hash = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name.trim(), email.toLowerCase(), hash]
    )

    const user = rows[0]
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, user })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
})

/* ── POST /api/auth/login ────────────────────────────────────────── */
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' })

  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email.toLowerCase()]
    )
    if (rows.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' })

    const user = rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid)
      return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
})

module.exports = router
