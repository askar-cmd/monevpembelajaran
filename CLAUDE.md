# Dashboard Monitoring dan Evaluasi Pembelajaran Program Studi — Poltekkes Kemenkes Makassar

Aplikasi milik Pusat Pengembangan Pendidikan (Kapusbangdik: Pak Askar). Halaman statis tanpa build
(HTML/CSS/JS di `assets/`), di-host di GitHub Pages dari cabang `main`; server penyimpanan Google Apps
Script (`apps-script/Code.gs`) + Google Sheet BasisData. Panduan lengkap: `README.md`.

## Aturan kerja

- **Setelah setiap perubahan yang diminta atau disetujui Pak Askar, jalankan skill `update-github`**
  (pemeriksaan `node tools/cek.js`, commit, push). Jangan menumpuk perubahan tanpa diunggah.
- Bahasa antarmuka dan dokumen: Indonesia formal ("Dashboard Monitoring dan Evaluasi", "Sarjana Terapan",
  bukan "S.Tr."; "Sarjana Terapan Terapi Gigi"; label grafik memakai kode 3 huruf program studi).
- `data/baseline-genap-2025-2026.js` adalah ARSIP: jangan diubah. Laporan semester terarsip harus tetap sama
  walaupun pejabat berganti (setiap isian menyimpan salinan identitas pejabat).
- Repositori ini PUBLIK: jangan pernah menulis kunci admin, PIN, atau isi Data Pegawai ke repositori.
- Perubahan `apps-script/Code.gs` baru berlaku setelah Pak Askar menempelnya ke Apps Script dan membuat
  **Versi baru** pada deployment yang sama (URL tetap).
- Hasil kerja final disimpan juga ke Lemari Arsip Google Drive (folder proyek `1w-SKUDHURuvFxfhbamBBfNPB1N9x2p9S`,
  konvensi nama `YYYY-MM-DD_JenisDokumen_Topik_vN`). Bila sistem menolak, tampilkan penolakannya.

## Peran login (NIP pejabat yang sedang menjabat + PIN; PIN awal 123456 wajib diganti)

Ketua Program Studi (isi instrumen) · Ketua Jurusan (dashboard jurusannya + catatan) · Direktur, Wakil
Direktur I, Kepala Pusat Penjaminan Mutu (seluruh dashboard + catatan pimpinan) · Kapusbangdik (idem +
mencatat pergantian pejabat) · kunci admin darurat.
