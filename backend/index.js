const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'data_siswa'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack)
        return
    }
    console.log('Connected to MySQL')
})

app.get('/siswa', (req, res) => {
    connection.query('SELECT * FROM siswa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

app.get('/siswa/:id', (req, res) => {
    connection.query(
        'SELECT * FROM siswa WHERE kode = ?',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ error: 'Not found' })
            res.json(results[0])
        }
    )
})

app.post('/siswa', (req, res) => {
    const { kode, nama_siswa, alamat, tgl_siswa, jurusan_siswa } = req.body
    connection.query(
        'INSERT INTO siswa VALUES (?, ?, ?, ?, ?)',
        [kode, nama_siswa, alamat, tgl_siswa, jurusan_siswa],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({ id: results.insertId, kode, nama_siswa, alamat, tgl_siswa, jurusan_siswa })
        }
    )
})



app.put('/siswa/:id', (req, res) => {
    const { nama_siswa, alamat, tgl_siswa, jurusan_siswa } = req.body
    connection.query(
        'UPDATE siswa SET nama_siswa = ?, alamat = ?, tgl_siswa = ?, jurusan_siswa = ? WHERE kode = ?' 
        [nama_siswa, alamat, tgl_siswa, jurusan_siswa, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Updated successfully' })
        }
    )
})

app.delete('/siswa/:id', (req, res) => {
    connection.query(
        'DELETE FROM siswa WHERE kode = ?',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Deleted successfully' })
        }
    )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})