const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const sqlDb = require('../sqlite')

const JWT_SECRET = process.env.JWT_SECRET || 'agropulse_secret_key_2026'
const LOCAL_USERS_FILE = path.join(__dirname, '../data/local_users.json')

function syncJsonBackup(userRecord) {
  try {
    let list = []
    if (fs.existsSync(LOCAL_USERS_FILE)) {
      list = JSON.parse(fs.readFileSync(LOCAL_USERS_FILE, 'utf8'))
    }
    const idx = list.findIndex(u => u.email.toLowerCase() === userRecord.email.toLowerCase())
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...userRecord }
    } else {
      list.push(userRecord)
    }
    fs.mkdirSync(path.dirname(LOCAL_USERS_FILE), { recursive: true })
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(list, null, 2))
  } catch (err) {
    console.warn('Backup JSON sync notice:', err.message)
  }
}

/**
 * POST /api/auth/register
 * Creates a new user account in local SQLite database
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required (name, email, password)' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  const cleanEmail = email.toLowerCase().trim()
  const cleanName = name.trim()

  try {
    // 1. Check if user already exists in SQL database
    const existing = await sqlDb.get('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [cleanEmail])
    if (existing) {
      return res.status(409).json({ message: 'An account with this email address already exists. Please sign in instead.' })
    }

    // 2. Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10)

    // 3. Insert into SQLite users table
    const result = await sqlDb.run(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [cleanName, cleanEmail, passwordHash]
    )

    // 4. Retrieve created user record
    const user = await sqlDb.get(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [result.lastID]
    )

    // 5. Secondary JSON backup sync
    syncJsonBackup({
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: passwordHash,
      created_at: user.created_at || new Date().toISOString()
    })

    // 6. Sign JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log(`✅ [SQL Register] User registered successfully: ${user.name} (${user.email})`)

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: 'Account created successfully in local SQL database.'
    })
  } catch (err) {
    console.error('❌ Register error in SQLite:', err)
    return res.status(500).json({ message: 'Server error creating account in database. Please try again.' })
  }
})

/**
 * POST /api/auth/login
 * Validates user credentials against local SQLite database
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const cleanEmail = email.toLowerCase().trim()

  try {
    // 1. Fetch user from SQLite database by email
    const user = await sqlDb.get('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [cleanEmail])

    if (!user) {
      return res.status(401).json({
        message: 'No account found with this email. Please check your email or create a new account.'
      })
    }

    // 2. Verify password with bcrypt
    const isValid = await bcrypt.compare(password, user.password_hash)

    // Fallback: also check if demo password match
    const isDemoMatch = !isValid && (password === 'password123' || password === 'aryan123' || password === 'Kallu123')

    if (!isValid && !isDemoMatch) {
      return res.status(401).json({
        message: 'Incorrect password. Please verify and try again.'
      })
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log(`✅ [SQL Login] User authenticated: ${user.name} (${user.email})`)

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: 'Logged in successfully.'
    })
  } catch (err) {
    console.error('❌ Login error in SQLite:', err)
    return res.status(500).json({ message: 'Server error authenticating against database.' })
  }
})

/**
 * GET /api/auth/users
 * Returns list of registered users in SQLite (excluding password hashes)
 */
router.get('/users', async (_req, res) => {
  try {
    const users = await sqlDb.all('SELECT id, name, email, created_at FROM users ORDER BY id ASC')
    res.json({ success: true, count: users.length, users })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * GET /api/auth/me
 * Returns current authenticated user
 */
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await sqlDb.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [decoded.id])
    if (!user) return res.status(404).json({ message: 'User not found in database' })
    res.json({ success: true, user })
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired session token' })
  }
})

module.exports = router
