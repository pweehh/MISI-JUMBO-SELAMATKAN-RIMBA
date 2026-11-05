# MISI JUMBO-SELAMATKAN RIMBA

Portal pembelajaran statik Bahasa Melayu Tahun 1 tentang ayat tunggal, ayat majmuk dan penjagaan alam sekitar. Portal menggunakan HTML, CSS dan JavaScript tanpa pemasangan pakej.

Laporan tugasan 600–800 patah perkataan: [`laporan.md`](laporan.md).

## Jalankan secara setempat

Dalam PowerShell dari folder projek:

```powershell
python -m http.server 8000
```

Buka `http://localhost:8000`. Pelayan setempat membolehkan iframe permainan, video dan aset berfungsi menggunakan laluan yang sama seperti di GitHub Pages.

## Terbitkan di GitHub Pages

Dalam tetapan repositori GitHub, pilih **Pages**, kemudian bina dan terbitkan dari branch `main`, folder `/(root)`. Fail portal dan permainan berada di akar repositori; aset media dirujuk menggunakan laluan relatif. Perubahan fail `index.html` boleh diterbitkan sebagai laman utama.

## Kandungan

- `index.html`, `portal.css`, `portal.js`: portal tujuh bahagian dan kuiz formatif.
- `permainan.html`: permainan asal dengan lima misi dan kemajuan permainan setempat.
- Fail MP3, MP4 dan PNG di akar: media yang dibekalkan bersama projek.

Video pengenalan YouTube memerlukan sambungan internet. Refleksi portal tidak dihantar atau disimpan. Semak lesen dan atribusi bahan media asal mengikut sumber sebenar apabila menerbitkan atau mengedarkan semula projek ini.
