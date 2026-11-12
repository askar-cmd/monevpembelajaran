# Dashboard Monitoring dan Evaluasi Pembelajaran Program Studi Poltekkes Kemenkes Makassar

**Pusat Pengembangan Pendidikan (Pusbangdik) — Politeknik Kesehatan Kemenkes Makassar**
Di bawah koordinasi Wakil Direktur I Bidang Akademik

Aplikasi web untuk monitoring dan evaluasi pembelajaran di 20 program studi
(8 jurusan). Fungsinya:

- **Dashboard Institusi (20 program studi)**: filter semester, jenjang (D-III / Sarjana Terapan / Profesi), dan jurusan; KPI agregat; grafik; peringatan dini; peta kendala; rekomendasi per tema.
- **Pejabat**: pencatatan pergantian Ketua Program Studi/Ketua Jurusan beserta riwayat dan SK, tanpa mengubah laporan semester yang telah diarsipkan.
- **Dashboard Program Studi**: rincian satu program studi, perbandingan dengan semester lalu, catatan verifikasi data, dan catatan/arahan pimpinan.
- **Pengisian Instrumen**: formulir untuk Ketua Program Studi (Bagian A–J sesuai format Pusbangdik, ditambah K–M baru), simpan otomatis, *tempel dari Excel*, dan validasi sebelum kirim final.
- **Laporan dan Ekspor**: laporan per program studi (**DOCX & PDF**), per jenjang (**DOCX**), dan keseluruhan (**DOCX**), serta ekspor CSV/JSON.

Aplikasi berupa halaman statis (HTML/CSS/JS tanpa *build step*) yang bisa di-*deploy*
ke **GitHub Pages**. Penyimpanan isian program studi memakai **Google Apps Script + Google Sheet**
yang gratis dan berada di akun Google Workspace Poltekkes.

---

## 1. Struktur folder

```
monev-pembelajaran/
├── index.html                      halaman utama
├── assets/
│   ├── css/style.css               tema warna Kemenkes (terang & gelap)
│   ├── js/config.js                ← KONFIGURASI: URL server, semester, 20 program studi, target KPI
│   ├── js/store.js                 data, komunikasi server, perhitungan indikator
│   ├── js/app.js                   dasbor, dasbor program studi, laporan
│   ├── js/form.js                  formulir isian program studi
│   ├── js/report.js                penyusun laporan DOCX/PDF
│   ├── js/pejabat.js               daftar & riwayat Ketua Program Studi / Ketua Jurusan
│   └── vendor/                     Chart.js 4.4.1, JSZip 3.10.1, jsPDF 2.5.1, jsPDF-AutoTable 3.8.2
├── data/baseline-genap-2025-2026.js   arsip isian 20 program studi Genap 2025/2026
├── apps-script/Code.gs             backend Google Apps Script
├── docs/CATATAN_VERIFIKASI_DATA.md temuan verifikasi data Genap 2025/2026
├── tools/cek.js                    pemeriksaan wajib sebelum unggah (node tools/cek.js)
└── .claude/skills/update-github/   prosedur unggah perubahan ke GitHub (skill Claude Code)
```

## 2. Mencoba di komputer

Cukup buka `index.html` di Chrome/Edge, atau jalankan server lokal:

```bash
cd monev-pembelajaran
```

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`. Tanpa server Apps Script, aplikasi berjalan dalam **mode lokal**:
isian disimpan di peramban dan program studi mengirim berkas JSON (tombol *Unduh berkas isian*) ke Pusbangdik.
Pusbangdik kemudian mengimpor berkas itu di menu *Laporan dan Ekspor*.

## 3. Deploy ke GitHub Pages

1. Buat repositori baru di GitHub, misalnya `monev-pembelajaran` (sebaiknya milik akun organisasi Poltekkes).
2. Unggah seluruh isi folder ini, atau dari terminal:

```bash
git remote add origin https://github.com/<akun>/monev-pembelajaran.git
```

```bash
git push -u origin main
```

3. Di GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / root** → Save.
4. Setelah ±1 menit, aplikasi tersedia di `https://<akun>.github.io/monev-pembelajaran/`.

> **Kerahasiaan data.** Situs GitHub Pages dapat dibuka siapa saja yang mengetahui alamatnya.
> Berkas `data/baseline-genap-2025-2026.js` memuat nama pejabat, NIP, nama mahasiswa berprestasi, dan
> catatan evaluasi internal. Bila tidak boleh publik: (a) gunakan repositori privat dengan GitHub
> Enterprise (Pages privat), atau (b) host di server internal kampus. Isian program studi semester berikutnya
> **tidak** disimpan di GitHub, tetapi di Google Sheet yang hanya dapat dibaca pejabat yang login dengan NIP + PIN.

## 4. Mengaktifkan server (Google Apps Script)

1. Buat **Google Sheet** baru di Drive Pusbangdik, misalnya "DB Monitoring dan Evaluasi Pembelajaran".
2. **Ekstensi → Apps Script**, hapus isi `Code.gs`, lalu tempel isi `apps-script/Code.gs`.
3. Pilih fungsi `setup` → **Run** → izinkan akses. Fungsi ini melengkapi sheet `Akun` (20 program studi,
   8 Ketua Jurusan, 4 pimpinan; PIN awal `123456`), `Isian`, `Pejabat`, `CatatanKajur`, dan `Log`.
   **Kunci admin (darurat)** tampil di *Execution log*.
4. **Deploy → New deployment → Web app**: *Execute as* **Me**, *Who has access* **Anyone** → Deploy → salin URL `/exec`.
5. Tempel URL tersebut ke `assets/js/config.js`:

```js
apiUrl: "https://script.google.com/macros/s/XXXXXXXX/exec",
```

6. Commit & push. Semua pejabat login dengan **NIP** (sheet `Pejabat`, pejabat yang sedang menjabat) dan **PIN**;
   PIN awal `123456` wajib diganti pada login pertama. Lupa PIN: jalankan `resetPin("d3-tlm")`,
   `resetPin("jurusan:Gizi")`, atau `resetPin("pimpinan:direktur")`. Kunci admin disimpan Pusbangdik secara
   tertutup dan dapat diganti dengan `gantiKunciPimpinan()`.

| Peran | Akun (sheet `Akun`) | Hak akses |
|---|---|---|
| Ketua Program Studi | `prodiId` | mengisi instrumen program studinya pada semester yang dibuka |
| Ketua Jurusan | `jurusan:<nama jurusan>` | dashboard program studi di jurusannya + Catatan Ketua Jurusan |
| Direktur, Wakil Direktur I, Kepala Pusat Penjaminan Mutu | `pimpinan:direktur`, `pimpinan:wadir1`, `pimpinan:kapusmutu` | seluruh dashboard dan laporan + catatan pimpinan |
| Kepala Pusat Pengembangan Pendidikan | `pimpinan:kapusbangdik` | seperti pimpinan + mencatat pergantian pejabat (menu Pejabat) |
| Admin (darurat) | kunci admin | seluruh akses; dipakai bila akun pejabat bermasalah |

Catatan: setiap kali `Code.gs` diubah, buat **Manage deployments → Edit → New version** agar perubahan berlaku.

## 5. Siklus per semester

| Langkah | Pelaku | Di aplikasi |
|---|---|---|
| Buka periode pengisian | Pusbangdik | `config.js`: tambah semester di `semester`, ubah `semesterAktif` & `batasPengisian` |
| Isi instrumen monitoring dan evaluasi | Ketua Program Studi | menu **Pengisian Instrumen**; Bagian K otomatis memuat rekomendasi semester lalu |
| Validasi | Ketua Jurusan | memeriksa isian sebelum program studi menekan **Kirim versi final** |
| Telaah | Pusbangdik/Pimpinan | **Dashboard Institusi (20 program studi)**, peringatan dini, catatan pimpinan |
| Rapat monitoring dan evaluasi | Direktur & Wadir I | laporan keseluruhan/per jenjang (DOCX) |
| Tindak lanjut | Program Studi & unit | dipantau di Bagian K semester berikutnya |

## 6. Pergantian Ketua Program Studi dan Ketua Jurusan

Menu **Pejabat** (Kepala Pusat Pengembangan Pendidikan) mencatat pergantian jabatan pimpinan, Ketua Jurusan, dan Ketua Program Studi: nama, NIP 18 digit, TMT, nomor SK, dan tautan SK. Pejabat sebelumnya otomatis dicatat berakhir sehari sebelum TMT, dan riwayatnya tetap tersimpan.

Prinsip keamanan data laporan:

- Setiap isian semester **menyimpan salinan** nama dan NIP pejabat pada saat pengisian. Dashboard dan laporan semester mana pun membaca salinan tersebut, bukan daftar pejabat. Akibatnya, laporan **Genap 2025/2026 tetap memakai pejabat yang tercantum pada isian Genap 2025/2026** walaupun ada pergantian pejabat pada Ganjil 2026/2027.
- Data semester arsip dibekukan di aplikasi (tidak dapat diubah), dan server menolak penyimpanan ke semester yang tercantum pada `SEMESTER_TERKUNCI` di `apps-script/Code.gs`. Setiap kali periode pengisian ditutup, tambahkan semester tersebut ke daftar itu.
- Formulir semester yang sedang dibuka otomatis terisi pejabat yang menjabat pada tanggal pengisian (tombol *Gunakan data pejabat terbaru*).
- Dalam mode server, daftar pejabat tersimpan di sheet `Pejabat` pada Google Sheet basis data.

## 7. Pengembangan format (Bagian K–M)

Agar evaluasi lebih akuntabel, format Genap 2025/2026 dikembangkan sebagai berikut:

- **Bagian I**: KPI **dihitung dari angka mentah** (jumlah dosen tetap, mahasiswa aktif, peserta/lulusan Uji Kompetensi, dosen ber-Bahasa Inggris) dan dibandingkan dengan **target institusi** di `config.js`. Program Studi tidak lagi mengetik target sendiri, karena pada Genap 2025/2026 target untuk IKM yang sama berbeda-beda antar program studi (mis. Bahasa Inggris 5%–100%).
- **Bagian D**: UKT diisi sebagai jumlah lunas, dan persentasenya dihitung otomatis.
- **Bagian H (Profesi)**: varian aspek evaluasi pembelajaran klinik (logbook, DOPS/Mini-CEX, OSCE).
- **Bagian K — Tindak lanjut** rekomendasi semester sebelumnya (status Belum/Proses/Selesai + bukti), untuk menutup siklus PPEPP.
- **Bagian L — Indikator tambahan**: pemanfaatan LMS Edlink (8 dari 12 program studi melaporkan kendala Edlink), indeks EDOM, dan jumlah dosen terlatih OBE.
- **Bagian M — Bukti dukung**: tautan Google Drive per bagian.

## 8. Target dan ambang

Target KPI pada `config.js` (Uji Kompetensi 95,51%, tepat waktu 100%, rasio 1:28, Bahasa Inggris 10,31%,
prestasi 8, akreditasi Unggul) diambil dari nilai yang **paling sering** dicantumkan program studi
pada Genap 2025/2026. Nilai ini **wajib diverifikasi** terhadap dokumen RSB/Renstra dan Bahan LKJ 2026
sebelum dipakai sebagai acuan resmi.

## 9. Dasar acuan

- Permendikbudristek Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi.
- RSB/Renstra BLU Poltekkes Kemenkes Makassar dan Bahan LKJ 2026 (IKM 17.3.4, 17.3.8, 17.3.11, 17.3.13, 17.3.14).
- Format Monitoring Pembelajaran TA 2025/2026 Semester Genap (Pusbangdik).

---
Dikembangkan untuk Pusat Pengembangan Pendidikan Poltekkes Kemenkes Makassar, November 2026.
