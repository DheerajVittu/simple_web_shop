
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const pool = require('./db')
const authRoutes = require('./routes/auth')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT current_database() AS database'
    )

    res.json({
      message: 'Backend connected to PostgreSQL!',
      database: result.rows[0].database
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Database connection failed.' })
  }
})

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
