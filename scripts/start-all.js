/**
 * AgroPulse - Unified Dev Launcher
 * Starts both the Backend SQLite Server (port 5000) and the Vite Frontend (port 5173).
 */

const { spawn } = require('child_process')
const path = require('path')

const isWin = process.platform === 'win32'
const npmCmd = isWin ? 'npm.cmd' : 'npm'
const npxCmd = isWin ? 'npx.cmd' : 'npx'

console.log('🚀 Starting AgroPulse Unified Environment...')

// 1. Start Backend Express SQLite Server
const backend = spawn('node', ['backend/server.js'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '..'),
  shell: true,
})

// 2. Start Vite Dev Server
const frontend = spawn(npxCmd, ['vite'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '..'),
  shell: true,
})

process.on('SIGINT', () => {
  backend.kill('SIGINT')
  frontend.kill('SIGINT')
  process.exit(0)
})

