---
name: update-github
description: Memeriksa, menyimpan (commit), dan mengunggah (push) perubahan aplikasi Dashboard Monitoring dan Evaluasi Pembelajaran ke GitHub askar-cmd/monevpembelajaran, sehingga GitHub Pages ikut diperbarui. Gunakan setiap kali Pak Askar selesai meminta atau menyetujui perubahan pada aplikasi ini, atau ketika ia mengetik "/update-github", "unggah ke github", "update github", "terbitkan perubahan".
---

# Unggah perubahan aplikasi ke GitHub

Repositori: `askar-cmd/monevpembelajaran` (publik), cabang `main`.
Situs: https://askar-cmd.github.io/monevpembelajaran/ (GitHub Pages dari `main`, folder akar).
Server: Google Apps Script (URL `/exec` di `assets/js/config.js`); kode sumbernya di `apps-script/Code.gs`.

Jalankan langkah berikut berurutan. Laporkan kepada Pak Askar dalam bahasa Indonesia yang formal.

## 1. Lihat apa yang berubah

```bash
git status --short && git diff --stat
```

Bila tidak ada perubahan, katakan "Tidak ada perubahan yang perlu diunggah" dan berhenti.
Baca diff-nya agar pesan commit menggambarkan perubahan sebenarnya, bukan dugaan.

## 2. Pemeriksaan wajib

```bash
node tools/cek.js
```

Pemeriksaan ini mencakup sintaks semua JavaScript dan `Code.gs`, keutuhan arsip Genap 2025/2026, `apiUrl`, berkas terlarang (data pegawai, xlsx, docx, pdf, zip) dan kunci admin, serta uji asap enam halaman di peramban.

- **Gagal** → JANGAN commit. Perbaiki penyebabnya, jalankan ulang, dan baru lanjut setelah lolos.
- **Arsip Genap 2025/2026 berubah** → hampir selalu kesalahan; kembalikan dengan `git checkout -- data/baseline-genap-2025-2026.js`. Arsip hanya boleh diubah bila Pak Askar memintanya secara eksplisit sebagai koreksi data. Dalam hal itu jalankan `IZIN_UBAH_ARSIP=1 node tools/cek.js`, perbarui `ARSIP_SHA256` di `tools/cek.js`, dan sebutkan koreksinya di pesan commit.
- Jangan pernah menulis kunci admin, PIN pejabat, atau isi berkas Data Pegawai ke repositori. Repositori ini PUBLIK.

## 3. Commit

Pesan commit dalam bahasa Indonesia: satu baris ringkasan (≤ 72 karakter) yang menyebut apa yang berubah dari sudut pengguna, lalu baris kosong, butir rincian bila perlu, dan baris atribusi yang diminta sistem (system-reminder) untuk commit. Tambahkan berkas secara spesifik, bukan `git add -A` secara membabi buta: periksa dulu bahwa tidak ada berkas sementara yang ikut.

```bash
git add <berkas yang berubah>
git commit -m "<ringkasan>" -m "<rincian dan atribusi>"
```

## 4. Push

```bash
git fetch origin main && git rebase origin/main
git push -u origin main
```

Bila push gagal karena jaringan, ulangi hingga 4 kali dengan jeda 2, 4, 8, 16 detik. Bila ditolak karena izin atau aturan sistem, tampilkan pesan penolakannya apa adanya kepada Pak Askar (instruksi tetapnya) dan jangan mencari jalan pintas.

## 5. Bila `apps-script/Code.gs` ikut berubah

GitHub TIDAK memperbarui server. Sampaikan kepada Pak Askar:

1. Buka Google Sheet BasisData → **Ekstensi → Apps Script** → berkas **Kode.gs**.
2. Hapus seluruh isi, tempel isi `apps-script/Code.gs` yang baru (kirim berkasnya dengan SendUserFile sebagai `.txt`), lalu **Simpan**.
3. **Terapkan → Kelola deployment → ikon pensil → Versi: Versi baru → Terapkan.** Jangan "Deployment baru", karena URL akan berubah.
4. Bila ada fungsi `setup` baru yang perlu dijalankan, sebutkan.

Simpan juga salinan `Code.gs` ke Lemari Arsip Google Drive (folder proyek `1w-SKUDHURuvFxfhbamBBfNPB1N9x2p9S`) dengan nama `YYYY-MM-DD_KodeAppsScript_MonevPembelajaranProdi_vN.gs` (N = versi berikutnya; cek nama yang sudah ada dengan `search_files`), `contentMimeType: text/plain`, `disableConversionToGoogleType: true`. Bila Drive menolak, tampilkan penolakannya.

## 6. Laporan ke Pak Askar

Singkat, berisi:
- hash commit dan tautan: `https://github.com/askar-cmd/monevpembelajaran/commit/<hash>`
- ringkasan perubahan (2–4 butir) dan hasil pemeriksaan
- "Situs diperbarui dalam 1–2 menit di https://askar-cmd.github.io/monevpembelajaran/ — tekan Ctrl+Shift+R (muat ulang paksa) bila tampilan lama masih muncul."
- langkah 5 bila Code.gs berubah
- hal yang belum diuji, bila ada (mis. alur login ke server sungguhan)

Bila perubahan menyentuh tampilan, pratinjau claude.ai (https://claude.ai/artifact/QjCqQk1PDg7UT5SJwevNbe) boleh diperbarui dengan Artifact `publish` (url tersebut, `root` = akar repositori, `files` = berkas yang berubah). Ingatkan bahwa login tidak berfungsi di pratinjau; gunakan situs GitHub Pages.
