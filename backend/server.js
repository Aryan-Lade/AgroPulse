const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app  = express()
const PORT = process.env.PORT || 5000

// Allow requests from the Vite dev server
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))

app.use(express.json())

/* ── Routes ─────────────────────────────────────────────────────── */
app.use('/api/auth', authRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

/* ── Start ───────────────────────────────────────────────────────── */
app.listen(PORT, () =>
  console.log(`🚀  AgroPulse backend running on http://localhost:${PORT}`)
)
