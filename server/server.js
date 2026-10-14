
const express = require('express')
require('dotenv').config()

const pool = require('./db')
const app = express()

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT current_database() AS database'
    )

    res.json({
      message: 'Backend connected to PostgreSQL!',
      database: result.rows[0].database,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Database connection failed',
    })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
