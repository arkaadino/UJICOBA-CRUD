CREATE DATABASE data_siswa;

CREATE TABLE siswa (
	kode CHAR(5) PRIMARY KEY,
    nama_siswa VARCHAR(100),
    alamat VARCHAR(100),
    tgl_siswa DATE,
    jurusan_siswa enum('ipa', 'ips')
);

use data_siswa;

INSERT INTO siswa VALUES 
('12349', 'Ardanz', 'Cicalengka', '2032-12-01', 'ips'),
('12346', 'Ardanskuy', 'Cicalengka', '2012-12-01', 'ips');

UPDATE siswa SET nama_siswa = 'Zeko', alamat = 'Kopo', tgl_siswa = '2022-07-15', jurusan_siswa = 'ips' WHERE kode = '12345';

SELECT * FROM siswa;

SELECT * FROM siswa WHERE kode = '12345';

DELETE FROM siswa WHERE kode = '12223';