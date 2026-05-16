const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const pool = require('../db')

const LOCAL_USERS_FILE = path.join(__dirname, '../data/local_users.json')

function getLocalUsers() {
  try {
    if (!fs.existsSync(LOCAL_USERS_FILE)) {
      const initialUsers = [
        {
          id: 1,
          name: 'Aryan Lade',
          email: 'aryan@agropulse.com',
          password_hash: bcrypt.hashSync('password123', 10),
          created_at: new Date().toISOString()
        }
      ]
      fs.mkdirSync(path.dirname(LOCAL_USERS_FILE), { recursive: true })
      fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(initialUsers, null, 2))
      return initialUsers
    }
    const data = fs.readFileSync(LOCAL_USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

function saveLocalUsers(users) {
  try {
    fs.mkdirSync(path.dirname(LOCAL_USERS_FILE), { recursive: true })
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2))
  } catch (e) {
    console.error('Failed to save local users fallback:', e.message)
  }
}

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(100)  NOT NULL,
    email        VARCHAR(255)  UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at   TIMESTAMP DEFAULT NOW()
  )
`).catch(err => console.warn('Postgres table init bypassed (fallback active):', err.message))

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' })

  if (password.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters' })

  const cleanEmail = email.toLowerCase().trim()
  const cleanName = name.trim()

  try {
    let user = null

    try {
      const existing = await pool.query(
        'SELECT id FROM users WHERE email = $1', [cleanEmail]
      )
      if (existing.rows.length > 0)
        return res.status(409).json({ message: 'Email is already registered' })

      const hash = await bcrypt.hash(password, 10)
      const { rows } = await pool.query(
        `INSERT INTO users (name, email, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, name, email`,
        [cleanName, cleanEmail, hash]
      )
      user = rows[0]
    } catch (dbErr) {
      console.warn('PostgreSQL unavailable for register, using local fallback:', dbErr.message)
      const localUsers = getLocalUsers()
      if (localUsers.some(u => u.email === cleanEmail)) {
        return res.status(409).json({ message: 'Email is already registered' })
      }
      const hash = await bcrypt.hash(password, 10)
      user = {
        id: localUsers.length + 1,
        name: cleanName,
        email: cleanEmail,
        password_hash: hash,
        created_at: new Date().toISOString()
      }
      localUsers.push(user)
      saveLocalUsers(localUsers)
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'agropulse_secret',
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' })

  const cleanEmail = email.toLowerCase().trim()

  try {
    let user = null
    let valid = false

    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1', [cleanEmail]
      )
      if (rows.length > 0) {
        user = rows[0]
        valid = await bcrypt.compare(password, user.password_hash)
      }
    } catch (dbErr) {
      console.warn('PostgreSQL unavailable for login, using local fallback:', dbErr.message)
      const localUsers = getLocalUsers()
      const found = localUsers.find(u => u.email === cleanEmail)
      if (found) {
        user = found
        valid = await bcrypt.compare(password, user.password_hash)
      }
    }

    if (!user || !valid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'agropulse_secret',
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
})

module.exports = router
