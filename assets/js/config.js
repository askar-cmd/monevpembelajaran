/* =====================================================================
 * KONFIGURASI APLIKASI MONEV PEMBELAJARAN PROGRAM STUDI
 * Poltekkes Kemenkes Makassar — Pusat Pengembangan Pendidikan
 * ---------------------------------------------------------------------
 * Ubah berkas ini untuk: alamat server (Google Apps Script), semester
 * aktif, daftar program studi, dan target KPI institusi.
 * ===================================================================== */
window.MONEV_CONFIG = {
  namaInstitusi: "Politeknik Kesehatan Kemenkes Makassar",
  unitPengelola: "Pusat Pengembangan Pendidikan (Pusbangdik)",
  koordinator: "Wakil Direktur I Bidang Akademik",

  /* URL Web App Google Apps Script (lihat apps-script/Code.gs & README).
   * Biarkan kosong ("") untuk MODE LOKAL: isian disimpan di peramban dan
   * dapat diunduh sebagai berkas JSON untuk dikirim ke Pusbangdik. */
  apiUrl: "https://script.google.com/macros/s/AKfycbxFNc1RieCq3K8tnx1w6YXSK7XM81GJkDJDfXcd5IVomRpuIsNbrsY-Mk_ZyMsiJtDJ/exec",

  /* Semester yang sedang dibuka untuk pengisian oleh prodi */
  semesterAktif: "ganjil-2026-2027",
  batasPengisian: "2027-01-15",
  /* Target lulusan tepat waktu per Renstra (2025: 88,70%; 2026: 88,80%) */
  targetTepatWaktuBySemester: { "genap-2025-2026": 88.70, "ganjil-2026-2027": 88.80 },

  semester: [
    { id: "genap-2025-2026", label: "Genap 2025/2026", ta: "2025/2026", jenis: "Genap", status: "arsip", mulaiPengisian: "2026-01-01", batasPengisian: "2026-07-15" },
    { id: "ganjil-2026-2027", label: "Ganjil 2026/2027", ta: "2026/2027", jenis: "Ganjil", status: "dibuka", mulaiPengisian: "2026-07-01", batasPengisian: "2027-01-15" }
  ],

  jurusan: [
    "Keperawatan", "Kebidanan", "Farmasi", "Fisioterapi",
    "Gizi", "Kesehatan Lingkungan", "Teknologi Laboratorium Medis", "Kesehatan Gigi"
  ],

  /* Kode 3 huruf (untuk label grafik): huruf 1 = jenjang (D = D-III, S = Sarjana Terapan,
   * P = Profesi), huruf 2–3 = bidang ilmu. Kode boleh diubah, tetapi harus unik.
   * 20 program studi pada 8 jurusan (ditetapkan Kapusbangdik, Nov 2026).
   * id dipakai sebagai kunci data — JANGAN diubah setelah ada isian. */
  prodi: [
    { id: "d3-kep-mks", kode: "DKM",      nama: "D-III Keperawatan Makassar",                   jenjang: "D-III",           jurusan: "Keperawatan" },
    { id: "d3-kep-pare", kode: "DKP",     nama: "D-III Keperawatan Parepare",                   jenjang: "D-III",           jurusan: "Keperawatan" },
    { id: "str-kep", kode: "SKP",         nama: "Sarjana Terapan Keperawatan",                  jenjang: "Sarjana Terapan", jurusan: "Keperawatan" },
    { id: "d3-bidan", kode: "DKB",        nama: "D-III Kebidanan",                              jenjang: "D-III",           jurusan: "Kebidanan" },
    { id: "str-bidan", kode: "SKB",       nama: "Sarjana Terapan Kebidanan",                    jenjang: "Sarjana Terapan", jurusan: "Kebidanan" },
    { id: "profesi-bidan", kode: "PKB",   nama: "Pendidikan Profesi Bidan",                     jenjang: "Profesi",         jurusan: "Kebidanan" },
    { id: "d3-farmasi", kode: "DFA",      nama: "D-III Farmasi",                                jenjang: "D-III",           jurusan: "Farmasi" },
    { id: "str-farmasi", kode: "SFA",     nama: "Sarjana Terapan Farmasi",                      jenjang: "Sarjana Terapan", jurusan: "Farmasi" },
    { id: "d3-fisio", kode: "DFT",        nama: "D-III Fisioterapi",                            jenjang: "D-III",           jurusan: "Fisioterapi" },
    { id: "str-fisio", kode: "SFT",       nama: "Sarjana Terapan Fisioterapi",                  jenjang: "Sarjana Terapan", jurusan: "Fisioterapi" },
    { id: "profesi-fisio", kode: "PFT",   nama: "Profesi Fisioterapi",                          jenjang: "Profesi",         jurusan: "Fisioterapi" },
    { id: "d3-gizi", kode: "DGZ",         nama: "D-III Gizi",                                   jenjang: "D-III",           jurusan: "Gizi" },
    { id: "str-gizi", kode: "SGZ",        nama: "Sarjana Terapan Gizi dan Dietetika",           jenjang: "Sarjana Terapan", jurusan: "Gizi" },
    { id: "profesi-dietisien", kode: "PDT", nama: "Profesi Dietisien",                          jenjang: "Profesi",         jurusan: "Gizi" },
    { id: "d3-sanitasi", kode: "DSN",     nama: "D-III Sanitasi",                               jenjang: "D-III",           jurusan: "Kesehatan Lingkungan" },
    { id: "str-sanling", kode: "SSL",     nama: "Sarjana Terapan Sanitasi Lingkungan",          jenjang: "Sarjana Terapan", jurusan: "Kesehatan Lingkungan" },
    { id: "d3-tlm", kode: "DTL",          nama: "D-III Teknologi Laboratorium Medis",           jenjang: "D-III",           jurusan: "Teknologi Laboratorium Medis" },
    { id: "str-tlm", kode: "STL",         nama: "Sarjana Terapan Teknologi Laboratorium Medis", jenjang: "Sarjana Terapan", jurusan: "Teknologi Laboratorium Medis" },
    { id: "d3-kesgi", kode: "DKG",        nama: "D-III Kesehatan Gigi",                         jenjang: "D-III",           jurusan: "Kesehatan Gigi" },
    { id: "str-terapi-gigi", kode: "STG", nama: "Sarjana Terapan Terapi Gigi",                 jenjang: "Sarjana Terapan", jurusan: "Kesehatan Gigi" }
  ],


  /* Ketua Jurusan awal (dari isian Genap 2025/2026). Pergantian berikutnya dicatat
   * melalui menu Pejabat — JANGAN mengubah baris ini untuk pergantian jabatan. */
  kajurAwal: [
    { jurusan: "Keperawatan", nama: "Iwan, SKp., M.Kes" },
    { jurusan: "Kebidanan", nama: "Hj. Sitti Mukarramah, S.ST., M.Keb" },
    { jurusan: "Farmasi", nama: "apt. Ida Adhayanti, S.Si., M.Sc" },
    { jurusan: "Fisioterapi", nama: "Darwis Durahim, S.Pd., S.ST.Ft., M.Kes" },
    { jurusan: "Gizi", nama: "Manjilala, S.Gz., M.Gizi" },
    { jurusan: "Kesehatan Lingkungan", nama: "Dr. Syamsuddin S, SKM., M.Kes" },
    { jurusan: "Teknologi Laboratorium Medis", nama: "Rahman, S.Si., M.Si" },
    { jurusan: "Kesehatan Gigi", nama: "Syamsuddin Abubakar, S.SiT., M.MKes" }
  ],

  /* Pimpinan yang memiliki akun login manajemen (seluruh dashboard + catatan pimpinan).
   * kunci JANGAN diubah. Pergantian berikutnya dicatat melalui menu Pejabat.
   * NIP tidak ditulis di repositori (publik); NIP tersimpan pada sheet Pejabat di server dan hanya dikirim kepada pengguna yang login. */
  jabatanPimpinan: {
    direktur: "Direktur",
    wadir1: "Wakil Direktur I Bidang Akademik",
    kapusbangdik: "Kepala Pusat Pengembangan Pendidikan",
    kapusmutu: "Kepala Pusat Penjaminan Mutu"
  },
  pimpinanAwal: [
    { kunci: "direktur", nama: "Addi Mardi Harnanto, MN" },
    { kunci: "wadir1", nama: "Dr. Siti Nurul Fajriah, S.Pd., S.Ft.Physio., M.Kes" },
    { kunci: "kapusbangdik", nama: "M. Askar, S.Kep., Ns., M.Kes" },
    { kunci: "kapusmutu", nama: "Zaenab, SKM., M.Kes" }
  ],

  /* Pergantian pejabat yang diinformasikan Kapusbangdik (NIP hanya tersimpan di server).
   * TMT/SK dapat dilengkapi melalui menu Pejabat. Isian semester yang diarsipkan tidak terpengaruh. */
  pergantianPejabat: [
    { tipe: "prodi", kunci: "str-kep", nama: "Sukma Saini, S.Kep., Ns., M.Kes" },
    { tipe: "prodi", kunci: "d3-kep-mks", nama: "Heriansyah, S.Kep., M.Kes" },
    { tipe: "prodi", kunci: "d3-kep-pare", nama: "Bahruddin, SKM., MM.Kes" },
    { tipe: "prodi", kunci: "str-sanling", nama: "Iwan Suryadi, SKM., M.Kes" },
    { tipe: "prodi", kunci: "str-tlm", nama: "Dr. Artati, S.Si., M.Si" },
    { tipe: "prodi", kunci: "d3-gizi", nama: "Hijrah Asikin, S.ST., M.Biomed" },
    { tipe: "prodi", kunci: "str-terapi-gigi", nama: "Dr. drg. Hans Lesmana, M.Kes" },
    { tipe: "prodi", kunci: "d3-gizi", nama: "Chaerunnimah, SKM, M.Kes", mulai: "2026-07-24", sk: "KP.03.01/F.XII/4760/2026", skUrl: "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link", sumber: "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026–2030)" },
    { tipe: "jurusan", kunci: "Fisioterapi", nama: "Dr. Muhammad Awal, SKM, M.Kes", mulai: "2026-07-24", sk: "KP.03.01/F.XII/4760/2026", skUrl: "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link", sumber: "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026–2030)" },
    { tipe: "jurusan", kunci: "Teknologi Laboratorium Medis", nama: "Syahida Djasang, SKM, M.M.Kes", mulai: "2026-07-24", sk: "KP.03.01/F.XII/4760/2026", skUrl: "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link", sumber: "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026–2030)" },
    { tipe: "jurusan", kunci: "Kesehatan Gigi", nama: "drg. Rini Irmayanti Sitanaya, M.M.Kes", mulai: "2026-07-24", sk: "KP.03.01/F.XII/4760/2026", skUrl: "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link", sumber: "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026–2030)" }
  ],

  /* Target KPI institusi 2026 (Bagian I). Isian prodi pada semester Genap
   * 2025/2026 mencantumkan target yang BERBEDA-BEDA untuk IKM yang sama.
   * Nilai di bawah adalah nilai yang paling sering dicantumkan dan WAJIB
   * diverifikasi terhadap dokumen RSB/Renstra & Bahan LKJ 2026. */
  targetKpi: {
    ukom:       { kode: "IKM 17.3.4",  label: "Persentase Kelulusan Uji Kompetensi", target: 95.51, satuan: "%", arah: "naik" },
    tepatWaktu: { kode: "-",           label: "Persentase Kelulusan Tepat Waktu",    target: 88.80, satuan: "%", arah: "naik" },
    rasio:      { kode: "IKM 17.3.8",  label: "Rasio Dosen Tetap terhadap Mahasiswa (1:n)", target: 28,    satuan: "1:n", arah: "turun" },
    inggris:    { kode: "IKM 17.3.11", label: "Dosen Tetap Berkemampuan Bahasa Inggris", target: 10.31, satuan: "%", arah: "naik" },
    prestasi:   { kode: "IKM 17.3.13", label: "Jumlah Prestasi Mahasiswa",           target: 8,     satuan: "prestasi", arah: "naik" },
    akreditasi: { kode: "IKM 17.3.14", label: "Program Studi Terakreditasi Unggul/Internasional", target: 100, satuan: "%", arah: "naik" }
  },

  /* Ambang peringatan dini (early warning) pada dasbor pimpinan */
  ambang: {
    kehadiranDosen: 100,   // standar: dosen hadir sesuai jadwal (16 pertemuan)
    kehadiranMhs: 90,      // mahasiswa < 90% → perlu pembinaan
    kehadiranMhsKritis: 80,// syarat umum mengikuti ujian akhir
    uktLunas: 100,
    ipkMin: 3.0
  }
};
