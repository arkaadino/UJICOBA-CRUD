import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-semibold mb-8 text-gray-800 tracking-wide">
        Data Siswa
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        {siswa.length === 0 ? (
          <div className="py-10 text-center text-gray-400 italic text-lg">
            Tidak ada data siswa.
          </div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#1E293B] text-white select-none">
                <th className="px-6 py-3 text-left font-medium tracking-wide">Nama</th>
                <th className="px-6 py-3 text-left font-medium tracking-wide">Alamat</th>
                <th className="px-6 py-3 text-left font-medium tracking-wide">Tanggal Lahir</th>
                <th className="px-6 py-3 text-left font-medium tracking-wide">Jurusan</th>
                <th className="px-6 py-3 text-center font-medium tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((item, idx) => (
                <tr
                  key={item.kode}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#f1f5f9] transition-colors duration-200`}
                >
                  <td className="px-6 py-4 text-gray-800">{item.nama_siswa}</td>
                  <td className="px-6 py-4 text-gray-700">{item.alamat}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(item.tgl_siswa).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-700">{item.jurusan_siswa}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(item.kode)}
                      className="inline-block bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 text-white font-semibold px-4 py-1 rounded shadow-sm transition"
                      aria-label={`Delete siswa ${item.nama_siswa}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App
