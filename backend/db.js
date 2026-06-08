/**
 * AgroPulse Database Engine
 * Primary local database: SQLite3 (`backend/data/agropulse.sqlite`)
 * Optional cloud sync: PostgreSQL (`DATABASE_URL`)
 */

const sqlDb = require('./sqlite')

// Backwards-compatible query method mapping
const dbAdapter = {
  ...sqlDb,

  /**
   * pg-compatible query wrapper
   * Converts $1, $2, ... to ? for SQLite compatibility
   */
  async query(text, params = []) {
    let sqliteSql = text
    if (params && params.length > 0) {
      sqliteSql = text.replace(/\$(\d+)/g, '?')
    }

    const trimmed = text.trim().toUpperCase()
    if (trimmed.startsWith('SELECT')) {
      const rows = await sqlDb.all(sqliteSql, params)
      return { rows, rowCount: rows.length }
    } else {
      const result = await sqlDb.run(sqliteSql, params)
      return { rows: [], rowCount: result.changes, lastID: result.lastID }
    }
  },

  on(event, handler) {
    // Event listener stub for compatibility
  }
}

module.exports = dbAdapter
