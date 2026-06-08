const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')

const DB_DIR = path.join(__dirname, 'data')
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

const DB_PATH = path.join(DB_DIR, 'agropulse.sqlite')
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Failed to open SQLite database:', err.message)
  } else {
    console.log(`📦 Local SQLite database connected: ${DB_PATH}`)
  }
})

// Initialize SQL Schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email)
  `)

  // Check if users table is empty and seed initial users from local_users.json or defaults
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) return console.warn('Could not query user count:', err.message)

    if (row && row.count === 0) {
      console.log('🌱 Seeding initial users into local SQLite database...')
      const initialUsers = [
        {
          name: 'Aryan Lade',
          email: 'aryan@agropulse.com',
          password_hash: bcrypt.hashSync('aryan123', 10),
        },
        {
          name: 'Kallu',
          email: 'kallu@gmail.com',
          password_hash: bcrypt.hashSync('Kallu123', 10),
        },
        {
          name: 'Pooja Sharma',
          email: 'pooja@farm.in',
          password_hash: bcrypt.hashSync('pooja123', 10),
        },
      ]

      // Also import from local_users.json if exists
      const jsonUsersPath = path.join(DB_DIR, 'local_users.json')
      if (fs.existsSync(jsonUsersPath)) {
        try {
          const fileUsers = JSON.parse(fs.readFileSync(jsonUsersPath, 'utf8'))
          fileUsers.forEach((fu) => {
            if (!initialUsers.some((u) => u.email.toLowerCase() === fu.email.toLowerCase())) {
              initialUsers.push({
                name: fu.name,
                email: fu.email,
                password_hash: fu.password_hash,
              })
            }
          })
        } catch (e) {
          console.warn('Error reading local_users.json:', e.message)
        }
      }

      const stmt = db.prepare('INSERT OR IGNORE INTO users (name, email, password_hash) VALUES (?, ?, ?)')
      initialUsers.forEach((u) => {
        stmt.run(u.name, u.email, u.password_hash)
      })
      stmt.finalize(() => {
        console.log(`✅ Seeded ${initialUsers.length} users into SQLite database.`)
      })
    }
  })
})

/**
 * Async query helpers
 */
const sqlDb = {
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  },

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err)
        else resolve(rows || [])
      })
    })
  },

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err)
        else resolve({ lastID: this.lastID, changes: this.changes })
      })
    })
  },

  raw: db,
}

module.exports = sqlDb

