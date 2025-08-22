import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './app.css'

const BACKEND_URL = 'http://localhost:3000'

interface Siswa {
  kode: number,
  nama_siswa: string,
  alamat: string,
  tgl_siswa: string,
  jurusan_siswa: string,
}

const App: React.FC = () => {
  const [siswa, setSiswa] = useState<Siswa[]>([])

  useEffect(() => {
    axios.get<Siswa[]>(`${BACKEND_URL}/siswa`)
      .then(res => setSiswa(res.data))
  }, [])

  const handleDelete = (id: number) => {
    axios.delete(`${BACKEND_URL}/siswa/${id}`)
      .then(() => setSiswa(siswa.filter(item => item.kode !== id)))
  }

  return (
    <div>
      <h1>Data Siswa</h1>
      <ul>
        {siswa.map(item => (
          <li key={item.kode}>
            {item.nama_siswa} - {item.alamat} - {item.tgl_siswa} - {item.jurusan_siswa} 

            <button onClick={() => handleDelete(item.kode)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;