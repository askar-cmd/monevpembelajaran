/* =====================================================================
 * DATA BASELINE MONEV PEMBELAJARAN — SEMESTER GENAP TA 2025/2026
  * Ditranskripsi dari 20 isian "Format Monitoring Pembelajaran" yang
 * diisi Ketua Program Studi (folder Google Drive Pusbangdik, Nov 2026).
 * Nilai disalin apa adanya; angka persen dinormalisasi ke bilangan.
 * null = tidak diisi pada dokumen sumber.
 * Format ringkas:
 *   dosen   : [mata kuliah, dosen pengampu, % kehadiran, keterangan]
 *   mahasiswa     : [mata kuliah, rata-rata % kehadiran, keterangan]
 *   rps/evaluasi.status : "S" = Sesuai, "B" = Belum, null = tidak dicentang
 * ===================================================================== */
window.MONEV_BASELINE = {
  semester: "genap-2025-2026",
  sumberFolder: "https://drive.google.com/drive/folders/1TfyYZW8rbpE91Bq_JdnfQnAANuKv5FnK",
  isian: {

  /* ------------------------------------------------------------------ 1 */
  "str-terapi-gigi": {
    identitas: { prodi: "Sarjana Terapan Terapi Gigi", jenjang: "Sarjana Terapan", jurusan: "Kesehatan Gigi",
      kaprodi: "drg. Asridiana, M.MKes", nipKaprodi: null,
      kajur: "Syamsuddin, Ab, SSiT, M.Mkes", nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "1. D4 Terapi Gigi.docx", url: "https://drive.google.com/file/d/19y_tXSKv6I-ebaH5KJndEJAfnvICrUkC/view" },
    dosen: [
      ["Dental Anatomi","drg. Johnny Angki",100,""],["Manajemen Pelayanan Kesehatan Gigi dan Mulut II","Nugraheni",100,""],
      ["Psikologi Kesehatan","drg. Rini Irmayanti",100,""],["Etika Profesi dan Hukum","Muh Saleh",100,""],
      ["Sosiologi Kesehatan","Sainuddin",100,""],["Pendidikan Kewarganegaraan","",100,""],
      ["Instrument dan Dental Equipment","drg. Ernie Thioritz",100,""],["Ilmu Kesehatan Masyarakat","Agus Supriatna",100,""],
      ["Konsep Pendidikan Kesehatan Gigi dan Mulut","drg. Ira Liasari",100,""],["Penyakit Gigi dan Mulut","Dr. drg. Hans Lesmana",100,""],
      ["Pencabutan Gigi","drg. Surya Irayani Yunus",100,""],["Komunikasi Terapeutik","Syamsuddin Abubakar",100,""],
      ["Kegiatan Laboratorium Penambalan Gigi","drg. Johnny Angki",100,""],["Media Pembelajaran","Asriawal",100,""],
      ["Asuhan Kesehatan Gigi dan Mulut","Muhammad Saleh",100,""],["Analisis Risiko Karies","drg. Badai Septa",100,""],
      ["Manajemen UKGS","Jumriani",100,""],["Epidemiologi Dental","drg. Asridiana",100,""],
      ["Pendidikan Kesehatan Gigi dan Mulut","drg. Ira Liasari",100,""],["Preventive Dentistry","drg. Badai Septa W",100,""],
      ["Asuhan Kesehatan Gigi dan Mulut Individu","Wanda Nur Aida",100,""],["Praktik Bahasa Inggris","Achmad Basir",100,""],
      ["Ilmu Kesehatan Masyarakat (Semester VI)","Agus Supriatna",100,""],["Pencabutan Gigi (Semester VI)","drg. Surya Irayani Yunus",100,""],
      ["Pendidikan Pancasila","Rismawati",100,""],["Praktik Kerja Lapangan","Syamsuddin Abubakar",100,""],
      ["Skripsi","drg. Asridiana",100,""],["Magang","Dr. drg. Hans Lesmana",100,""]
    ],
    mhs: [
      ["Dental Anatomi",90,""],["Manajemen Pelayanan Kesehatan Gigi dan Mulut II",95,""],["Psikologi Kesehatan",97,""],["Etika Profesi dan Hukum",93,""],
      ["Sosiologi Kesehatan",90,""],["Pendidikan Kewarganegaraan",90,""],["Instrument dan Dental Equipment",100,""],["Ilmu Kesehatan Masyarakat",93,""],
      ["Konsep Pendidikan Kesehatan Gigi dan Mulut",95,""],["Penyakit Gigi dan Mulut",100,""],["Pencabutan Gigi",93,""],["Komunikasi Terapeutik",93,""],
      ["Kegiatan Laboratorium Penambalan Gigi",100,""],["Media Pembelajaran",97,""],["Asuhan Kesehatan Gigi dan Mulut",100,""],["Analisis Risiko Karies",100,""],
      ["Manajemen UKGS",100,""],["Epidemiologi Dental",100,""],["Pendidikan Kesehatan Gigi dan Mulut",100,""],["Preventive Dentistry",98,""],
      ["Asuhan Kesehatan Gigi dan Mulut Individu",100,""],["Praktik Bahasa Inggris",95,""],["Ilmu Kesehatan Masyarakat (Semester VI)",93,""],["Pencabutan Gigi (Semester VI)",98,""],
      ["Pendidikan Pancasila",90,""],["Praktik Kerja Lapangan",100,""],["Skripsi",100,""],["Magang",100,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "VIII/2022", jumlah: 92, lunasPct: 98.91, ket: "Dokumen: 91 (98,87%) lunas, belum lunas 1,12%" },
      { angkatan: "VI/2023", jumlah: 76, lunasPct: 98.68, ket: "Dokumen: 75 (98,87%) lunas, belum lunas 1,12%" },
      { angkatan: "IV/2024", jumlah: 72, lunasPct: 100, ket: "" },
      { angkatan: "II/2025", jumlah: 46, lunasPct: 100, ket: "" }
    ],
    retensi: [ { angkatan: "2020", cuti: 0, do: 0, skors: 0, pindah: 1, ket: "" } ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "mata kuliah praktek klinik dan preklinik", uraian: "Daya tampung mahasiswa yang kurang" },
      dosen:   { mk: "mata kuliah praktek", uraian: "Perlu penambahan dosen" },
      lms:     { mk: "Semua mata kuliah", uraian: "Belum menggunakan Edlink; belum terbiasa" },
      bahan:   { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "2022", ips: 3.22, ipk: 3.67, ukom: 84.32, kendala: "Pemahaman materi yang masih kurang dipahami mahasiswa" },
      { angkatan: "2023", ips: 3.43, ipk: 3.66, ukom: null, kendala: "" },
      { angkatan: "2024", ips: 3.03, ipk: 3.46, ukom: null, kendala: "" },
      { angkatan: "2025", ips: 3.26, ipk: 3.51, ukom: null, kendala: "" }
    ],
    lulus: [
      { tahun: "2021", jumlah: 105, tepat: 103, ket: "" },
      { tahun: "2020", jumlah: 55, tepat: 55, ket: "" },
      { tahun: "2019", jumlah: 61, tepat: 58, ket: "" }
    ],
    kpi: {
      ukom: { target: "100%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "1:30", real: "1:29" }, inggris: { target: "80%", real: "80%" },
      prestasi: { target: "10", real: "" }, akreditasi: { target: "1", real: "1" }
    },
    rekomendasi: [
      ["Daya tampung di klinik Sarjana Terapan masih kurang","Penambahan dental unit"],
      ["Akses wifi kampus bagi mahasiswa masih kurang","Penambahan akses wifi"],
      ["Kurang lengkapnya buku kesehatan gigi di perpustakaan","Penambahan buku kesehatan gigi"],
      ["Masih kurangnya alat praktik di laboratorium","Mengusulkan alat"]
    ],
    catatanData: [
      "Persentase UKT tidak konsisten: 91/92 = 98,91% dan 75/76 = 98,68%, keduanya ditulis 98,87%.",
      "Kelulusan tepat waktu menggunakan angkatan wisuda 2019–2021 (data lama); belum ada data 2023–2025.",
      "Realisasi IKM Uji Kompetensi, tepat waktu dan prestasi tidak diisi; padahal Try Out Uji Kompetensi 2022 = 84,32%.",
      "Nama jurusan pada kop tidak diisi; dosen PKn tidak dicantumkan."
    ]
  },

  /* ------------------------------------------------------------------ 2 */
  "d3-kep-mks": {
    identitas: { prodi: "D-III Keperawatan Makassar", jenjang: "D-III", jurusan: "Keperawatan",
      kaprodi: "Naharia Laubo, SPd, S.Kep, M.Kes", nipKaprodi: null,
      kajur: "Iwan, SKp, M.Kes", nipKajur: null, tanggal: "2026-07-08" },
    sumber: { file: "2. D3 Keperawatan Makassar.pdf", url: "https://drive.google.com/file/d/1x_SVTItfOULSG_cSRpv0_csthBMH5BRV/view" },
    dosen: [
      ["Patofisiologi","",100,""],["Farmakologi","",100,""],["Gizi dan Diet","",100,""],["Manajemen Patient Safety","",100,""],
      ["Metodologi dan Dokumentasi Keperawatan","",100,""],["Praktik Metodologi dan Dokumentasi Keperawatan","",100,""],
      ["Kebutuhan Manusia dalam Konteks Keperawatan","",100,""],["Praktik Kebutuhan Manusia dalam Konteks Keperawatan","",100,""],
      ["Metodologi Penelitian","",100,""],["Praktik Klinik Kebutuhan Manusia dalam Konteks Keperawatan","",100,""],
      ["Keperawatan Gawat Darurat","",100,""],["Penanggulangan Krisis Kesehatan dan Bencana (PKKB)","",100,""],
      ["Keperawatan Keluarga","",100,""],["Keperawatan Gerontik","",100,""],["Bahasa Jepang","",100,""],["Kewirausahaan","",100,""],
      ["Praktik Klinik Keperawatan Gawat Darurat","",100,""],["Praktik Klinik Manajemen Bencana dan PKKB","",100,""],
      ["Home Care","",100,""],["Transkultural Nursing","",100,""],["Karya Tulis Ilmiah","",100,""]
    ],
    mhs: [
      ["Patofisiologi",100,""],["Farmakologi",94.01,""],["Gizi dan Diet",99.2,""],["Manajemen Patient Safety",100,""],
      ["Metodologi dan Dokumentasi Keperawatan",100,""],["Praktik Metodologi dan Dokumentasi Keperawatan",100,""],
      ["Kebutuhan Manusia dalam Konteks Keperawatan",100,""],["Praktik Kebutuhan Manusia dalam Konteks Keperawatan",100,""],
      ["Metodologi Penelitian",100,""],["Praktik Klinik Kebutuhan Manusia dalam Konteks Keperawatan",97.3,""],
      ["Keperawatan Gawat Darurat",99.1,""],["Penanggulangan Krisis Kesehatan dan Bencana (PKKB)",100,""],
      ["Keperawatan Keluarga",100,""],["Keperawatan Gerontik",100,""],["Bahasa Jepang",100,""],["Kewirausahaan",100,""],
      ["Praktik Klinik Keperawatan Gawat Darurat",97.87,""],["Praktik Klinik Manajemen Bencana dan PKKB",97.87,""],
      ["Home Care",100,""],["Transkultural Nursing",100,""],["Karya Tulis Ilmiah",93,"Belum menyelesaikan tugas akhir"]
    ],
    prestasi: [ { nama: "Rabiatul Adawiyah Anwar", jenis: "Lomba Video Kreatif Hari Kartini", tingkat: "Nasional", capaian: "Juara I" } ],
    ukt: [
      { angkatan: "Tingkat I", jumlah: 203, lunasPct: 99.01, ket: "201 lunas, 2 belum" },
      { angkatan: "Tingkat II", jumlah: 183, lunasPct: 98.36, ket: "180 lunas, 3 belum" },
      { angkatan: "Tingkat III", jumlah: 133, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Tingkat I", cuti: 7, do: 0, skors: 0, pindah: 0, ket: "Kolom tidak jelas pada dokumen sumber" },
      { angkatan: "Tingkat II", cuti: 2, do: 17, skors: 0, pindah: 0, ket: "Kolom tidak jelas pada dokumen sumber" },
      { angkatan: "Tingkat III", cuti: 1, do: 5, skors: 0, pindah: 0, ket: "Kolom tidak jelas pada dokumen sumber" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "Ruang kelas Gedung D lt. 1 dan 2", uraian: "Ruang kelas panas; Gedung D lantai 2 bocor" },
      dosen:   { mk: "", uraian: "" },
      lms:     { mk: "Jumlah kelas yang banyak", uraian: "Menginput SIAKAD sering eror" },
      bahan:   { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","B"], ket: ["","","","","","Belum semua tim mata ajar memberikan feedback hasil belajar"] },
    ipk: [
      { angkatan: "Tingkat I", ips: null, ipk: 3.84, ukom: null, kendala: "Belum Uji Kompetensi" },
      { angkatan: "Tingkat II", ips: null, ipk: 3.86, ukom: null, kendala: "Belum Uji Kompetensi" },
      { angkatan: "Tingkat III", ips: null, ipk: 3.83, ukom: 66.6, kendala: "3 mahasiswa ikut (2 kompeten, 1 belum); 134 menunggu Uji Kompetensi" }
    ],
    lulus: [
      { tahun: "2023", jumlah: 195, tepat: 174, ket: "" },
      { tahun: "2024", jumlah: 178, tepat: 166, ket: "Dokumen: tidak tepat waktu 12 (1,48%) — seharusnya 6,74%" },
      { tahun: "2025", jumlah: 172, tepat: 171, ket: "" }
    ],
    kpi: {
      ukom: { target: "96,51%", real: "66,66% (3 mahasiswa; 134 belum Uji Kompetensi)" }, tepatWaktu: { target: "100%", real: "98,53%" },
      rasio: { target: "1:28", real: "1:26,27" }, inggris: { target: "100%", real: "60%" },
      prestasi: { target: "9", real: "1" }, akreditasi: { target: "Unggul", real: "Unggul" }
    },
    rekomendasi: [
      ["Pemenuhan alat praktikum","Alat dan bahan praktikum diajukan sebelum semester berjalan untuk kelancaran proses praktikum"],
      ["Ketersediaan tenaga PLP","Jurusan memiliki 20 kelas (±1.000 mahasiswa) dengan 1 PLP; diusulkan penambahan 1 PLP"],
      ["SIAKAD","Sosialisasi ulang untuk penguatan dosen dalam penggunaan SIAKAD"],
      ["Ruang kelas dan LCD","Perbaikan ruang kelas dan penambahan LCD karena banyak yang rusak"]
    ],
    catatanData: [
      "Nama dosen pengampu tidak dicantumkan pada Bagian B.",
      "Rata-rata IPS tidak diisi; hanya satu kolom nilai (diasumsikan IPK).",
      "Tabel retensi ambigu (cuti/berhenti tidak jelas posisinya) — perlu klarifikasi angka 17 dan 5.",
      "Persentase tidak tepat waktu 2024 salah hitung (12/178 = 6,74%, bukan 1,48%).",
      "Target Uji Kompetensi ditulis 96,51% (program studi lain 95,51%)."
    ]
  },

  /* ------------------------------------------------------------------ 3 */
  "d3-sanitasi": {
    identitas: { prodi: "Sanitasi", jenjang: "D-III", jurusan: "Kesehatan Lingkungan",
      kaprodi: "Khiki Purnawati Kasim, S.ST., M.Kes", nipKaprodi: null,
      kajur: "Dr. Syamsuddin S, SKM., M.Kes", nipKajur: null, tanggal: "2026-07-08" },
    sumber: { file: "3. D3 Sanitasi.docx", url: "https://drive.google.com/file/d/1EfXPeXBKGgE0Z3zUpsM0Hx-7g8p1Gewh/view" },
    dosen: [
      ["Mikrobiologi Lingkungan","",100,""],["Penyehatan Air","",100,""],["Penyehatan Udara","",100,""],["Penyehatan Tanah","",100,""],
      ["Higiene Sanitasi Pangan","",100,""],["Pengamanan Limbah Cair","",100,""],["Pengelolaan Sampah","",100,""],["Pendidikan Budaya Anti Korupsi","",100,""],
      ["Sanitasi Permukiman","",100,""],["Sanitasi Rumah Sakit","",100,""],["Sanitasi Tempat-tempat Umum","",100,""],["Sanitasi Industri","",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana","",100,""],["Kapita Selekta","",100,""],["Magang Tempat-tempat Umum","",100,""],
      ["Magang Industri","",100,""],["Metode Sampling Bioekologi","",100,""],["Pest Control","",100,""],["Analisa dan Pengolahan Data","",100,""],["Tugas Akhir","",100,""]
    ],
    mhs: [
      ["Mikrobiologi Lingkungan",88.53,""],["Penyehatan Air",96.67,""],["Penyehatan Udara",93.75,""],["Penyehatan Tanah",97.46,""],
      ["Higiene Sanitasi Pangan",83,"Sakit dan alpa"],["Pengamanan Limbah Cair",97.65,""],["Pengelolaan Sampah",97.85,""],["Pendidikan Budaya Anti Korupsi",96.48,""],
      ["Sanitasi Permukiman",94.07,"Sakit dan alpa"],["Sanitasi Rumah Sakit",98.87,""],["Sanitasi Tempat-tempat Umum",95.68,""],["Sanitasi Industri",99,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana",92.3,""],["Kapita Selekta",96.47,""],["Magang Tempat-tempat Umum",100,""],
      ["Magang Industri",99.67,"Sakit dan alpa"],["Metode Sampling Bioekologi",96.26,""],["Pest Control",86.3,"Mahasiswa sakit non medis dan persiapan penelitian"],
      ["Analisa dan Pengolahan Data",96.67,"Mahasiswa sakit dan persiapan penelitian"],["Tugas Akhir",91,"Pelaksanaan penelitian"]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "2025", jumlah: 32, lunasPct: 100, ket: "" },
      { angkatan: "2024", jumlah: 39, lunasPct: 100, ket: "" },
      { angkatan: "2023", jumlah: 47, lunasPct: 100, ket: "" }
    ],
    retensi: [ { angkatan: "II/2024", cuti: 0, do: 1, skors: 0, pindah: 0, ket: "Mengundurkan diri" } ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["50% masih menggunakan template lama; mata kuliah dan CPMK baru untuk Kurikulum 2024 KIBA","","","","",""] },
    kendala: {
      sarpras: { mk: "Mikrobiologi, Kimia dan mata kuliah kompetensi", uraian: "Alat dan reagen pemeriksaan mikro, kimia dan mata kuliah kompetensi tidak update" },
      dosen:   { mk: "Dasar Teknik, Kimia", uraian: "Kurang dosen basic teknik dan kimia" },
      lms:     { mk: "", uraian: "" }, bahan: { mk: "", uraian: "" },
      lain:    { mk: "Semua mata kuliah praktikum", uraian: "PLP kurang" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "I/2025", ips: 3.75, ipk: 3.66, ukom: null, kendala: "" },
      { angkatan: "II/2024", ips: 3.83, ipk: 3.56, ukom: null, kendala: "" },
      { angkatan: "III/2023", ips: null, ipk: 3.64, ukom: null, kendala: "Belum jadwal Uji Kompetensi" }
    ],
    lulus: [
      { tahun: "2025", jumlah: 25, tepat: 24, ket: "" },
      { tahun: "2024", jumlah: 34, tepat: 32, ket: "" },
      { tahun: "2023", jumlah: 44, tepat: 41, ket: "" }
    ],
    kpi: {
      ukom: { target: "95,51%", real: "Belum Uji Kompetensi" }, tepatWaktu: { target: "100%", real: "Belum Uji Kompetensi" },
      rasio: { target: "1:28", real: "1:12" }, inggris: { target: "15,71%", real: "50%" },
      prestasi: { target: "", real: "2 (Juara 2 Best Video dan Juara 3 Best Media NHCSC Nasional)" }, akreditasi: { target: "", real: "Unggul" }
    },
    rekomendasi: [
      ["50% mata kuliah Semester Genap TA 2024/2025 belum menyerahkan RPS sebelum perkuliahan (AMI 2025 – Observasi)","Menetapkan batas pengumpulan RPS sebelum semester baru; mengingatkan dosen pada setiap rapat internal"],
      ["Rasio dosen : mahasiswa 1:14 (AMI 2025 – Observasi)","Promosi jurusan melalui media sosial"],
      ["Ketersediaan alat laboratorium perlu disesuaikan kebutuhan pembelajaran (AMI 2025 – Minor)","Pengisian kebutuhan alat laboratorium pada aplikasi APKAL Jurusan Kesehatan Lingkungan"],
      ["1 orang PLP untuk 7 laboratorium (AMI 2025 – Minor)","Telaah ke UPPS untuk penambahan PLP melalui CPNS/PPPK, pegawai BLU, atau instruktur tidak tetap"]
    ],
    catatanData: [
      "Realisasi kelulusan tepat waktu ditulis 'Belum Uji Kompetensi', padahal tabel kelulusan menunjukkan 96% (2025).",
      "Rasio dosen ditulis 1:12 di Bagian I, tetapi 1:14 di Bagian J (temuan AMI).",
      "Prestasi tercatat di Bagian I, tetapi tabel Rekapitulasi Prestasi kosong."
    ]
  },

  /* ------------------------------------------------------------------ 4 */
  "profesi-bidan": {
    identitas: { prodi: "Pendidikan Profesi Bidan", jenjang: "Profesi", jurusan: "Kebidanan",
      kaprodi: "Afriani, SST., M.Keb", nipKaprodi: null,
      kajur: "Hj. Sitti Mukarramah, SST., M.Keb", nipKajur: null, tanggal: "2026-07-08" },
    sumber: { file: "4. Profesi Bidan.pdf", url: "https://drive.google.com/file/d/1jH6KJkg0ecmeS4FJrdz6YZJstgecwGzx/view" },
    dosen: [
      ["Praktik Asuhan Kebidanan Holistik pada Remaja dan Pra Nikah","",100,""],["Praktik Asuhan Kebidanan Holistik Prakonsepsi dan Perencanaan Kehamilan Sehat","",100,""],
      ["Praktik Asuhan Kebidanan Holistik Kehamilan","",100,""],["Praktik Asuhan Kebidanan Holistik Persalinan dan BBL","",100,""],
      ["Praktik Asuhan Kebidanan Holistik Nifas dan Menyusui","",100,""],["Praktik Asuhan Kebidanan Holistik Neonatus, Bayi, Balita dan Anak Prasekolah","",100,""],
      ["Praktik Asuhan Kebidanan Holistik KB dan Kesehatan Reproduksi","",100,""],["Praktik Kegawatdaruratan Maternal dan Neonatal","",100,""],
      ["Praktik Asuhan Kebidanan Kolaborasi Kasus Patologi dan Komplikasi","",100,""],["Praktik Asuhan Komunitas dalam Konteks Continuity of Care","",100,""],
      ["Praktik Manajemen Pelayanan Kebidanan Komprehensif","",100,""]
    ],
    mhs: [
      ["Praktik Asuhan Kebidanan Holistik pada Remaja dan Pra Nikah",100,""],["Praktik Asuhan Kebidanan Holistik Prakonsepsi dan Perencanaan Kehamilan Sehat",100,""],
      ["Praktik Asuhan Kebidanan Holistik Kehamilan",100,""],["Praktik Asuhan Kebidanan Holistik Persalinan dan BBL",100,""],
      ["Praktik Asuhan Kebidanan Holistik Nifas dan Menyusui",100,""],["Praktik Asuhan Kebidanan Holistik Neonatus, Bayi, Balita dan Anak Prasekolah",100,""],
      ["Praktik Asuhan Kebidanan Holistik KB dan Kesehatan Reproduksi",100,""],["Praktik Kegawatdaruratan Maternal dan Neonatal",100,""],
      ["Praktik Asuhan Kebidanan Kolaborasi Kasus Patologi dan Komplikasi",100,""],["Praktik Asuhan Komunitas dalam Konteks Continuity of Care",100,""],
      ["Praktik Manajemen Pelayanan Kebidanan Komprehensif",100,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "2025 Ganjil", jumlah: 126, lunasPct: 100, ket: "" },
      { angkatan: "2025 Genap", jumlah: 37, lunasPct: 100, ket: "" }
    ],
    retensi: [ { angkatan: "2025 Genap", cuti: 0, do: 1, skors: 0, pindah: 0, ket: "" } ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: { sarpras:{mk:"",uraian:""}, dosen:{mk:"",uraian:""}, lms:{mk:"",uraian:""}, bahan:{mk:"",uraian:""}, lain:{mk:"",uraian:""} },
    evaluasi: { varian: "profesi",
      item: ["Pelaksanaan morning report","Pengisian logbook capaian kompetensi setiap stase",
        "Presentasi/seminar kasus (laporan kasus, LP, journal reading, laporan komprehensif) setiap stase",
        "Pelaksanaan ujian stase di lahan praktik","Rubrik penilaian konsisten (DOPS, Assessment 360, Mini-CEX)",
        "Pelaksanaan OSCE sesuai Pedoman OSCE Nasional Bidan","Umpan balik hasil belajar diberikan ke mahasiswa"],
      status: ["S","S","S","S","S","S","S"], ket: ["","","","","","",""] },
    ipk: [
      { angkatan: "2025 Ganjil", ips: 4.00, ipk: 4.00, ukom: null, kendala: "Belum Uji Kompetensi" },
      { angkatan: "2025 Genap", ips: 4.00, ipk: null, ukom: null, kendala: "Belum Uji Kompetensi" }
    ],
    lulus: [ { tahun: "2024", jumlah: 253, tepat: 251, ket: "99,22% tepat waktu; 2 retaker (1 lulus Uji Kompetensi P1G1, 1 ikut P2G1)" } ],
    kpi: {
      ukom: { target: "95,51%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "1:28", real: "1:27" }, inggris: { target: "100%", real: "50%" },
      prestasi: { target: "100", real: "" }, akreditasi: { target: "100%", real: "100%" }
    },
    rekomendasi: [
      ["Dosen tidak menggunakan Edlink","Memotivasi dosen menggunakan Edlink"],
      ["Dosen terlambat melengkapi dokumen pembelajaran pada aplikasi SIAKAD","Memotivasi dosen mengisi dokumen pembelajaran di SIAKAD tepat waktu"]
    ],
    catatanData: [
      "Lembar pengesahan tertulis 'Ketua Jurusan TLM' — seharusnya Ketua Jurusan Kebidanan.",
      "NIP Ketua Jurusan dan NIP Ketua Program Studi identik. Berdasarkan berkas D-III Kebidanan dan Sarjana Terapan Kebidanan, NIP Ketua Jurusan Kebidanan yang benar tercatat pada sheet Pejabat (tidak ditulis di repositori).",
      "IPS/IPK 4,00 untuk seluruh mahasiswa perlu verifikasi (indikasi tidak ada diskriminasi nilai).",
      "Target prestasi ditulis '100' (tidak lazim; program studi lain 8–10 prestasi)."
    ]
  },

  /* ------------------------------------------------------------------ 5 */
  "profesi-fisio": {
    identitas: { prodi: "Profesi Fisioterapi", jenjang: "Profesi", jurusan: "Fisioterapi",
      kaprodi: "H. Muh. Thahir, S.Ft.Physio., M.Kes", nipKaprodi: null,
      kajur: "Darwis Durahim, S.ST.Ft., M.Kes", nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "5. Profesi Fisioterapi.docx", url: "https://drive.google.com/file/d/1ADwXxHVicuTr6BsA-Khy29j7y5kBuacn/view" },
    dosen: [
      ["Fisioterapi Muskuloskeletal","Ftr. Sudaryanto, S.ST., M.Fis",100,""],["Fisioterapi Muskuloskeletal","Rahmat Nugraha Akib, S.Ft, M.Fis",100,""],
      ["Fisioterapi Neuromuskular","Sri Saadiyah L, S.Ft, Physio, M.Kes",100,""],["Fisioterapi Neuromuskular","Hj. Hasnia Ahmad, S.Pd, S.ST, M.Kes",100,""],
      ["Fisioterapi Pediatri Neuromuskular","Dr. Yonathan Ramba, S.Ft.Physio, M.Si",100,""],["Fisioterapi Pediatri Neuromuskular","Aco Tang, S.ST, SKM, M.Kes",100,""],
      ["Fisioterapi Pediatri Muskuloskeletal","Dr. Muhammad Awal, SKM, M.Kes",100,""],["Fisioterapi Pediatri Muskuloskeletal","Fahrul Islam, S.Ft., Physio., M.Kes",100,""],
      ["Fisioterapi Pediatri Muskuloskeletal","Iksan Dermawan, S.Ft, M.Fis",100,""],["Fisioterapi Kesehatan Reproduksi","Dr. Sitti Nurul Fajriah, S.Pd, S.Ft.Physio, M.Kes",100,""],
      ["Fisioterapi Kesehatan Reproduksi","Hj. Hasbiah, S.ST, M.Kes",100,""],["Fisioterapi Kardiovaskular","Muh. Thahir, S.Ft.Physio, M.Kes",100,""],
      ["Fisioterapi Integumen","Andi Halimah, S.ST, M.Adm, M.Kes",100,""],["Fisioterapi Olahraga/Wellness","Muh. Thahir, S.Ft.Physio, M.Kes",100,""],
      ["Fisioterapi Olahraga/Wellness","Darwis Durahim, S.Pd., S.ST.Ft., M.Kes",100,""],["Fisioterapi Respirasi","Virny Dwiya Lestari, S.Ft.",100,""],
      ["Fisioterapi Komunitas","Arpandjam'an, SKM, S.ST.Ft, M.Adm.Kes",100,""],["Fisioterapi Geriatri","Dr. Tiar Erawan, S.Pd, S.Ft.Physio, M.Kes",100,""],
      ["Fisioterapi Kesehatan Kerja (K3)","Dr. Hendrik, S.ST, SH, M.Kes",100,""],["Fisioterapi Kesehatan Kerja (K3)","Supartina Hakim, S.Ft, M.Sc",100,""]
    ],
    mhs: [
      ["Fisioterapi Muskuloskeletal",100,""],["Fisioterapi Neuromuskular",100,""],["Fisioterapi Pediatri Neuromuskular",100,""],
      ["Fisioterapi Pediatri Muskuloskeletal",100,""],["Fisioterapi Kardiovaskular",100,""],["Fisioterapi Integumen",100,""],
      ["Fisioterapi Olahraga/Wellness",100,""],["Fisioterapi Kesehatan Reproduksi",100,""],["Fisioterapi Respirasi",100,""],
      ["Fisioterapi Komunitas",100,""],["Fisioterapi Geriatri",100,""],["Fisioterapi Kesehatan Kerja",100,""]
    ],
    prestasi: [],
    ukt: [ { angkatan: "2025", jumlah: 65, lunasPct: 100, ket: "" }, { angkatan: "2024", jumlah: 60, lunasPct: 100, ket: "" } ],
    retensi: [ { angkatan: "2025", cuti: 1, do: 0, skors: 0, pindah: 0, ket: "" } ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: { sarpras:{mk:"",uraian:""}, dosen:{mk:"",uraian:""}, lms:{mk:"",uraian:""}, bahan:{mk:"",uraian:""}, lain:{mk:"",uraian:""} },
    evaluasi: { varian: "profesi",
      item: ["Morning report (presentasi manajemen kasus sebelum pelayanan)","Tugas lapangan dan pengisian logbook kasus harian",
        "Presentasi kasus kelompok beserta kajian teoritis","Presentasi jurnal (analisis artikel ilmiah internasional, individu)",
        "Ujian bagian (ujian tulis) – kompetensi kognitif","Ujian bagian (Mini OSCE) – kompetensi psikomotor dan afektif"],
      status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [ { angkatan: "2024", ips: 3.99, ipk: 3.99, ukom: 100, kendala: "" } ],
    lulus: [ { tahun: "2024", jumlah: 60, tepat: 60, ket: "" } ],
    kpi: {
      ukom: { target: "100%", real: "100%" }, tepatWaktu: { target: "100%", real: "100%" },
      rasio: { target: "1:30", real: "1:3,4" }, inggris: { target: "100%", real: "31,58%" },
      prestasi: { target: "0", real: "0" }, akreditasi: { target: "100%", real: "40%" }
    },
    rekomendasi: [
      ["(AMI 2023) Ketidaksesuaian jumlah CPL antara dokumen kurikulum dan matriks bidang ilmu (13 KK vs 11 KK)","Review kurikulum menyeluruh untuk sinkronisasi keterampilan khusus dengan matriks sebaran mata kuliah"],
      ["(AMI 2023) Kurikulum belum membedakan standar input lulusan Sarjana Terapan dan Sarjana Akademik","Evaluasi kebutuhan variasi kurikulum atau program matrikulasi bagi input sarjana akademik"],
      ["(AMI 2024) Infrastruktur kelistrikan kurang memadai; sering padam pada jam kerja","Mengajukan penambahan daya listrik kepada Direktorat"],
      ["(AMI 2024) Belum optimal tracer study dan survei kepuasan pengguna lulusan","Menugaskan penanggung jawab kemahasiswaan membuat sistem pelacakan alumni dan survei kepuasan pengguna"],
      ["(AMI 2023 dan 2024) Hanya 3 tenaga kependidikan melayani 3 program studi","Usulan penambahan tenaga kependidikan berdasarkan analisis kebutuhan dan peta jabatan 5 tahun"],
      ["(AMI 2025) Kurang bukti fisik penyerahan RPS dan bahan ajar minimal 2 minggu sebelum kuliah perdana","Mewajibkan instrumen monitoring penyerahan dokumen pembelajaran sebelum semester"]
    ],
    catatanData: [
      "Rasio 1:3,4 dan akreditasi 40% perlu klarifikasi definisi (akreditasi tingkat program studi, bukan persentase).",
      "Target prestasi '0' tidak sejalan dengan IKM 17.3.13.",
      "Temuan AMI 2023–2025 yang sama berulang → indikasi tindak lanjut belum tuntas (siklus PPEPP)."
    ]
  },

  /* ------------------------------------------------------------------ 6 */
  "d3-fisio": {
    identitas: { prodi: "Fisioterapi", jenjang: "D-III", jurusan: "Fisioterapi",
      kaprodi: "Arpandjam'an, SKM, S.ST.Ft, M.Adm.Kes", nipKaprodi: null,
      kajur: "Darwis Durahim, S.Pd., S.ST.Ft., M.Kes", nipKajur: null, tanggal: "2026-07-09" },
    sumber: { file: "6. D3 Fisioterapi.docx", url: "https://drive.google.com/file/d/1XtjlCqAvxys0MWbKTPm_a70bSWH_8rLZ/view" },
    dosen: [
      ["Anatomi Terapan","Andi Halimah; Aco Tang",100,""],["Komunikasi Profesional","Dr. Tiar Erawan; Sri Saadiyah Leksonowati",100,""],
      ["Fisiologi Latihan","Dr. Siti Nurul Fajriah; Darwis Durahim; Fahrul Islam; Aco Tang",100,""],["Patologi Umum","Dr. Muhammad Awal; Hj. Hasnia Ahmad",100,""],
      ["Patofisiologi Tumbuh Kembang","Dr. Yonathan Ramba; Fahrul Islam",100,""],["Bahasa Inggris Terapan","Dr. Suhartina R",100,""],
      ["Psikologi Kesehatan dan Perilaku","Dr. Yonathan Ramba; Dr. Siti Nurul Fajriah",100,""],["Biomekanik dan Kinesiologi I (Ekstremitas)","Hasbiah; Supartina Hakim; Rahmat Nugraha Akib",100,""],
      ["Patologi Khusus","Dr. Muhammad Awal; Hj. Hasnia Ahmad; Sitti Muthiah",100,""],["Etika Profesi dan Hukum Kesehatan","Dr. Hendrik; Dr. Muhammad Awal",100,""],
      ["Terapi Latihan Spesifik","Ftr. Sudaryanto; Supartina Hakim",100,""],["Fisioterapi Geriatri","Dr. Tiar Erawan; Fahrul Islam; Virny Dwiya Lestari",100,""],
      ["Fisioterapi Kesehatan Reproduksi","Dr. Siti Nurul Fajriah; Hasbiah; Sri Saadiyah Leksonowati",100,""],["Fisioterapi Neuromuskular","Hj. Hasnia Ahmad; Sri Saadiyah Leksonowati",100,""],
      ["Fisioterapi Kardiovaskular dan Respirasi","Hasbiah; Virny Dwiya Lestari",100,""],["Fisioterapi Muskuloskeletal","Dr. Muhammad Awal; Aco Tang; Virny Dwiya Lestari",100,""],
      ["Fisioterapi Pediatri","Dr. Yonathan Ramba; Fahrul Islam",100,""],["Manajemen dan Kewirausahaan Fisioterapi","Arpandjaman; Andi Halimah; Sitti Muthiah",100,""]
    ],
    mhs: [
      ["Anatomi Terapan",100,""],["Komunikasi Profesional",100,""],["Fisiologi Latihan",100,""],["Patologi Umum",100,""],
      ["Patofisiologi Tumbuh Kembang",100,""],["Bahasa Inggris Terapan",100,""],["Psikologi Kesehatan dan Perilaku",100,""],
      ["Biomekanik dan Kinesiologi I (Ekstremitas)",100,""],["Patologi Khusus",100,""],["Etika Profesi dan Hukum Kesehatan",100,""],
      ["Terapi Latihan Spesifik",100,""],["Fisioterapi Geriatri",100,""],["Fisioterapi Kesehatan Reproduksi",100,""],["Fisioterapi Muskuloskeletal",100,""],
      ["Fisioterapi Pediatri",100,""],["Manajemen dan Kewirausahaan Fisioterapi",100,""],["Fisioterapi Kardiovaskular dan Respirasi",100,""],["Fisioterapi Neuromuskular",100,""]
    ],
    prestasi: [ { nama: "Nur Atri R H. Halibo", jenis: "Porninakes", tingkat: "Nasional", capaian: "Peringkat 4" } ],
    ukt: [
      { angkatan: "Tingkat 1/2025", jumlah: 83, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat 2/2024", jumlah: 49, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat 3/2023", jumlah: 29, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Tk. II/2024", cuti: 0, do: 2, skors: 0, pindah: 1, ket: "2 mahasiswa status 'belum ada info'; 1 pindah" },
      { angkatan: "Tk. I/2025", cuti: 0, do: 0, skors: 0, pindah: 1, ket: "1 mahasiswa 'belum ada info'" }
    ],
    rps: { status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "", uraian: "Ruang kelas/lab kurang" }, dosen: { mk: "", uraian: "" },
      lms: { mk: "", uraian: "Belum semua dosen terbiasa menggunakan Edlink" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Tingkat 1/2025", ips: 3.71, ipk: 3.79, ukom: null, kendala: "" },
      { angkatan: "Tingkat 2/2024", ips: 3.36, ipk: 3.58, ukom: null, kendala: "" },
      { angkatan: "Tingkat 3/2023", ips: 4.00, ipk: 3.79, ukom: 61.94, kendala: "" }
    ],
    lulus: [ { tahun: "2022", jumlah: 45, tepat: 43, ket: "Dokumen: 95% tepat waktu" } ],
    kpi: {
      ukom: { target: "100%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "1:30", real: "1:9,65" }, inggris: { target: "5%", real: "" },
      prestasi: { target: "", real: "" }, akreditasi: { target: "", real: "" }
    },
    rekomendasi: [
      ["Belum 100% dosen mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai","Dosen mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai"],
      ["Belum semua dosen terbiasa menggunakan Edlink","Semua dosen menggunakan LMS Sevima Edlink"]
    ],
    catatanData: [
      "Bagian F (RPS) dan H (Evaluasi Hasil Belajar) tidak dicentang sama sekali — tidak dapat dinilai.",
      "Bagian F tidak diisi, tetapi Bagian J menyebut RPS belum 100% terkumpul tepat waktu.",
      "Lembar pengesahan tertulis 'Ketua Jurusan TLM' — seharusnya Ketua Jurusan Fisioterapi.",
      "Hasil Try Out Uji Kompetensi 61,94% di bawah target 95,51% — perlu program penguatan.",
      "Status 3 mahasiswa 'belum ada info' — perlu kepastian status akademik."
    ]
  },

  /* ------------------------------------------------------------------ 7 */
  "d3-bidan": {
    identitas: { prodi: "D-III Kebidanan", jenjang: "D-III", jurusan: "Kebidanan",
      kaprodi: "Andi Syintha Ida, S.ST., M.Kes", nipKaprodi: null,
      kajur: "Hj. Sitti Mukarramah, S.ST, M.Keb", nipKajur: null, tanggal: "2026-07-01" },
    sumber: { file: "7. D3 Bidan.pdf", url: "https://drive.google.com/file/d/1r7YiC_s2XTIN6fa8j99OCyqbw_FQXZe-/view" },
    dosen: [
      ["Pendidikan Budaya Anti Korupsi","Asmawati G, SKM., M.Kes",100,""],["Komunikasi dalam Praktik Kebidanan","Hj. Fitriati Sabur, S.ST., M.Keb",100,""],
      ["Etikolegal dalam Praktik Kebidanan","Agustina Ningsi, S.ST., M.Kes",100,""],["Keterampilan Dasar Klinik Kebidanan","Dr. Hj. Hidayati, S.ST., M.Keb",100,""],
      ["Asuhan Kebidanan Kehamilan","Marhaeni, S.ST., M.Kes",100,""],["Promosi Kesehatan","Marhaeni, S.ST., M.Kes",100,""],
      ["Gizi dalam Kesehatan Reproduksi","Aswita Amir, A, M.Si., RD",100,""],["Bahasa Inggris Terapan","M. Syamsir, BA",100,""],
      ["Pelayanan KB dan Kesehatan Reproduksi","Agustina Ningsi, S.ST., M.Kes",100,""],["Asuhan Kebidanan Komunitas","Hj. Sitti Mukarramah, S.ST., M.Keb",100,""],
      ["Praktik Klinik Kebidanan Esensial","Marhaeni, S.ST., M.Kes",100,""],["Kegawatdaruratan Maternal Neonatal dan Basic Life Support","Zulaeha A. Amdadi, S.ST., M.Kes",100,""],
      ["Mutu Layanan Kebidanan","I Made Sukarta, A.Kep., M.Kes",100,""],["Praktik Klinik Kebidanan Fisiologi dan Patologis","Hj. Sitti Mukarramah, S.ST., M.Keb",100,""],
      ["Praktik Klinik Kebidanan Komprehensif dan Berkelanjutan","Afriani, S.ST., M.Keb",100,""],["Laporan Tugas Akhir","Hj. Sitti Mukarramah, S.ST., M.Keb",100,""]
    ],
    mhs: [
      ["Pendidikan Budaya Anti Korupsi",89.84,"1 mahasiswa Tingkat 1 bermasalah kehadiran di semua mata kuliah semester 2 (8 mata kuliah)"],
      ["Komunikasi dalam Praktik Kebidanan",97.36,""],["Etikolegal dalam Praktik Kebidanan",99.03,""],["Keterampilan Dasar Klinik Kebidanan",97.92,""],
      ["Asuhan Kebidanan Kehamilan",98.13,""],["Promosi Kesehatan",97.92,""],["Gizi dalam Kesehatan Reproduksi",94.66,""],["Bahasa Inggris Terapan",96.67,""],
      ["Pelayanan KB dan Kesehatan Reproduksi",99.73,""],["Asuhan Kebidanan Komunitas",99.59,""],["Praktik Klinik Kebidanan Esensial",100,""],
      ["Kegawatdaruratan Maternal Neonatal dan Basic Life Support",99.18,""],["Mutu Layanan Kebidanan",98.78,""],
      ["Praktik Klinik Kebidanan Fisiologi dan Patologis",100,""],["Praktik Klinik Kebidanan Komprehensif dan Berkelanjutan",100,""],["Laporan Tugas Akhir",100,""]
    ],
    prestasi: [
      { nama: "Adiba Khanza Azzahra", jenis: "Non Akademik / Voli", tingkat: "Lokal (Jurusan)", capaian: "II" },
      { nama: "Besse Annisa Mardhatilla. A", jenis: "Non Akademik / Voli", tingkat: "Lokal (Jurusan)", capaian: "II" },
      { nama: "Rosmimin", jenis: "Non Akademik / Puisi", tingkat: "Nasional", capaian: "I" },
      { nama: "Rosmimin", jenis: "Kompetisi Inovasi Diabetes Melitus", tingkat: "Nasional", capaian: "I" }
    ],
    ukt: [
      { angkatan: "2025", jumlah: 45, lunasPct: 97.78, ket: "1 orang belum lunas" },
      { angkatan: "2024", jumlah: 46, lunasPct: 100, ket: "" },
      { angkatan: "2023", jumlah: 45, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "2023", cuti: 2, do: 0, skors: 0, pindah: 0, ket: "" },
      { angkatan: "2024", cuti: 0, do: 0, skors: 0, pindah: 0, ket: "" },
      { angkatan: "2025", cuti: 2, do: 0, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "", uraian: "" }, dosen: { mk: "", uraian: "" },
      lms: { mk: "", uraian: "Sebagian besar dosen belum memanfaatkan LMS Edlink karena belum menguasai" },
      bahan: { mk: "", uraian: "" },
      lain: { mk: "", uraian: "Wifi terkadang tidak dapat diakses mahasiswa di lantai 3 (ruang kuliah D-III Bidan)" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "TK I/2025", ips: 3.77, ipk: 3.85, ukom: null, kendala: "" },
      { angkatan: "TK II/2024", ips: 3.91, ipk: 3.86, ukom: null, kendala: "" },
      { angkatan: "TK III/2023", ips: 3.98, ipk: 3.84, ukom: null, kendala: "Belum Uji Kompetensi (jadwal 11–13 Juli 2026)" }
    ],
    lulus: [ { tahun: "2022 (wisuda Des 2025)", jumlah: 59, tepat: 59, ket: "Seluruhnya lulus Uji Kompetensi P2 dan P3 Oktober 2025" } ],
    kpi: {
      ukom: { target: "95,5%", real: "Belum dilaksanakan (11–13 Juli 2026)" }, tepatWaktu: { target: "100%", real: "Belum Uji Kompetensi" },
      rasio: { target: "1:28", real: "1:28" }, inggris: { target: "10,31%", real: "55,55%" },
      prestasi: { target: "", real: "4" }, akreditasi: { target: "100%", real: "100%" }
    },
    rekomendasi: [
      ["Tidak ada bukti penyerahan RPS 2 minggu sebelum kuliah perdana sesuai target > 90%","Permintaan RPS melalui surat penyampaian perkuliahan 2 minggu sebelumnya; checklist penerimaan RPS; monitoring dan evaluasi kepatuhan dosen setiap awal semester"],
      ["Target Uji Kompetensi lulusan/calon lulusan 95% tidak terpenuhi","Analisis hasil try out dan Uji Kompetensi; pembinaan intensif (bimbingan, mentoring, remedial, try out berkala internal dan eksternal); evaluasi setiap try out; libatkan dosen Pembimbing Akademik (PA) mendampingi mahasiswa berisiko"]
    ],
    catatanData: [
      "Kolom Try Out Uji Kompetensi TK I dan II diisi '0' — seharusnya kosong/tidak berlaku.",
      "Prestasi tingkat jurusan (voli) tidak relevan untuk IKM 17.3.13 bila definisi IKM adalah tingkat regional/nasional/internasional."
    ]
  },

  /* ------------------------------------------------------------------ 8 */
  "d3-gizi": {
    identitas: { prodi: "Gizi", jenjang: "D-III", jurusan: "Gizi",
      kaprodi: "Suriani Rauf, S.SiT., M.Si", nipKaprodi: null,
      kajur: "Manjilala, S.Gz, M.Gizi", nipKajur: null, tanggal: "2026-07-03" },
    sumber: { file: "8. D3 Gizi.pdf", url: "https://drive.google.com/file/d/1A9hjnT4ISbMslB2tElRo8R57mcgJsojT/view" },
    dosen: [
      ["Pendidikan Budaya Anti Korupsi","Dr. Nadimin, SKM, M.Kes",100,""],["Praktik Pemantauan Pertumbuhan","Dr. Mustamin, SP, M.Kes; Chaerunnimah, SKM, M.Kes",100,""],
      ["Pemantauan Pertumbuhan","Dr. Mustamin, SP, M.Kes; Chaerunnimah, SKM, M.Kes",100,""],["Patologi Penyakit Infeksi","Nursalim, S.Gz, M.Si",100,""],
      ["Praktik Komunikasi","Dr. Ir. H. Agustian Ipa, M.Kes",100,""],["Praktik Penilaian Status Gizi","Suriani Rauf, S.SiT, M.Si; Faramitha, S.ST, M.TP",100,""],
      ["Penilaian Status Gizi","Suriani Rauf, S.SiT, M.Si; Faramitha, S.ST, M.TP",100,""],["Biokimia Gizi","Dr. Lydia Fanny, DCN, M.Kes",100,""],
      ["Praktik Gizi Kuliner","Sitti Sahariah Rowa, S.SiT, M.Kes",100,""],["Praktik Survei Konsumsi Pangan","Suriani Rauf, S.SiT, M.Si",100,""],
      ["Perencanaan Program Gizi","Dr. Sirajuddin, SP, M.Kes",100,""],["Tata Laksana Gizi Buruk","Suriani Rauf; Sitti Fatimah, DCN, M.Kes",100,""],
      ["Praktik Tata Laksana Gizi Buruk","Suriani Rauf; Sitti Fatimah, DCN, M.Kes",100,""],["Praktik Pendidikan dan Pelatihan Gizi","Mira Andini, S.Gz, M.Gz; Retno Sri Lestari, S.Pd, M.Kes",100,""],
      ["Praktik Konseling Gizi","Aswita Amir, A, M.Si; Faramitha, S.ST, M.TP",100,""],["Patologi Penyakit Tidak Menular","Hijrah Asikin, S.ST, M.Biomed",100,""],
      ["Praktik Teknologi Pangan","Nursalim, S.Gz, M.Si",100,""],["Etika Profesi","Dr. Nadimin, SKM, M.Kes",100,""],
      ["Dietetik Penyakit Tidak Menular","Dr. Hendrayati, DCN, M.Kes",100,""],["Praktik Dietetik Penyakit Tidak Menular","Dr. Hendrayati, DCN, M.Kes",100,""],
      ["Asuhan Gizi Remaja dan Ibu Hamil Lanjut","Aswita Amir, A, M.Si",100,""]
    ],
    mhs: [
      ["Pendidikan Budaya Anti Korupsi",94.8,""],["Praktik Pemantauan Pertumbuhan",100,""],["Pemantauan Pertumbuhan",98.6,""],["Patologi Penyakit Infeksi",96.9,""],
      ["Praktik Komunikasi",100,""],["Praktik Penilaian Status Gizi",97.6,""],["Penilaian Status Gizi",98.3,""],["Biokimia Gizi",100,""],["Praktik Gizi Kuliner",100,""],
      ["Praktik Survei Konsumsi Pangan",99.8,""],["Perencanaan Program Gizi",95.9,""],["Tata Laksana Gizi Buruk",98.6,""],["Praktik Tata Laksana Gizi Buruk",100,""],
      ["Praktik Pendidikan dan Pelatihan Gizi",97.6,""],["Praktik Konseling Gizi",100,""],["Patologi Penyakit Tidak Menular",98.6,""],["Praktik Teknologi Pangan",100,""],
      ["Etika Profesi",100,""],["Dietetik Penyakit Tidak Menular",96.53,""],["Praktik Dietetik Penyakit Tidak Menular",100,""],["Asuhan Gizi Remaja dan Ibu Hamil Lanjut",99.7,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "Tingkat 1/2025", jumlah: 45, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat 2/2024", jumlah: 45, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat 3/2023", jumlah: 41, lunasPct: 100, ket: "" }
    ],
    retensi: [ { angkatan: "Tingkat 1/2025", cuti: 0, do: 0, skors: 0, pindah: 1, ket: "" } ],
    rps: { status: [null,null,null,null,null,null], ket: ["Pengumpulan RPS sebelum PBM 86,3%; sampai akhir PBM 100%","","","","",""] },
    kendala: {
      sarpras: { mk: "", uraian: "" }, dosen: { mk: "", uraian: "" },
      lms: { mk: "", uraian: "Dosen belum terbiasa menggunakan Edlink" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: [null,null,null,null,null,null], ket: ["100%","100%","100%","100%","100%","Diberikan dosen setelah UTS dan UAS"] },
    ipk: [
      { angkatan: "Tingkat 1/2025", ips: 3.80, ipk: 3.88, ukom: null, kendala: "" },
      { angkatan: "Tingkat 2/2024", ips: 3.80, ipk: 3.85, ukom: null, kendala: "" },
      { angkatan: "Tingkat 3/2023", ips: 3.98, ipk: 3.83, ukom: 97.5, kendala: "" }
    ],
    lulus: [ { tahun: "2023", jumlah: 39, tepat: 37, ket: "95,12% tepat waktu; 2 orang ikut Uji Kompetensi P2 (dasar hitung 41)" } ],
    kpi: {
      ukom: { target: "95,51%", real: "97,50%" }, tepatWaktu: { target: "", real: "95,12%" },
      rasio: { target: "1:28", real: "1:32" }, inggris: { target: "10,31%", real: "" },
      prestasi: { target: "8", real: "0" }, akreditasi: { target: "100%", real: "" }
    },
    rekomendasi: [
      ["Belum 100% dosen mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai","Dosen mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai"],
      ["Ijazah dan transkrip mahasiswa yang sudah yudisium tidak segera diterbitkan","Ijazah dan transkrip segera diterbitkan, minimal fotokopi"]
    ],
    catatanData: [
      "Bagian F dan H hanya diberi keterangan, kotak Sesuai/Belum tidak dicentang.",
      "Persentase tepat waktu 95,12% dihitung dari 41 orang, sedangkan jumlah lulusan ditulis 39.",
      "Realisasi Bahasa Inggris dan akreditasi tidak diisi."
    ]
  },

  /* ------------------------------------------------------------------ 9 */
  "str-tlm": {
    identitas: { prodi: "Sarjana Terapan Teknologi Laboratorium Medis", jenjang: "Sarjana Terapan", jurusan: "Teknologi Laboratorium Medis",
      kaprodi: "Syahida Djasang, SKM., M.MKes", nipKaprodi: null,
      kajur: "Rahman, S.Si., M.Si", nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "9. S.Tr. TLM.docx", url: "https://drive.google.com/file/d/1di5nNFYiYu_0V9OTqhGkT5ka3J3PM1KX/view" },
    dosen: [
      ["Bahasa Inggris","Prof. Dr. Abdullah, M.Hum",100,""],["Biokimia","Nuradi, S.Si., M.Kes; Ridho Pratama, S.Si., M.Si",100,""],
      ["Flebotomi dan Pengelolaan Spesimen","Zulfikar Ali Hasan, S.ST., M.Kes; Maulia Hardian Hayati, S.Tr.Kes., M.Imun",100,""],
      ["Helminthologi","Rafika, S.Si., M.Kes; Herdiana, S.ST., M.Kes",100,""],["Hematologi","Widarti, S.Si., Apt., M.MKes; Yaumil F. Tandjungbulu, S.ST., M.Kes",100,""],
      ["Instrumentasi Klinik","Rahman, S.Si., M.Si; Arwan, S.ST",100,""],["Kimia Klinik","Dr. Herman, S.Pd., M.Kes; Zulfikar Ali Hasan, S.ST., M.Kes",100,""],
      ["Mikroskopis Bakteri","Mursalim, S.Pd., M.Kes; Siti Hadijah, S.Si., M.Kes",100,""],["Pendidikan Budaya Anti Korupsi","Drs. Muh. Nasir, M.Pd",100,""],
      ["Berpikir Kritis","Kalma, S.Pd., M.Si",100,""],["Bakteriologi Klinik","Mursalim, S.Pd., M.Kes; Hasnawati, S.Si., M.Kes",100,""],
      ["Diagnostik Molekuler","Rafika, S.Si., M.Kes; Yaumil Fachni Tandjungbulu, S.ST., M.Kes",100,""],["Epidemiologi","Syahida Djasang, SKM., M.MKes; Mawar, S.Si., M.Kes",100,""],
      ["Hemostasis","Widarti, S.Si., Apt., M.MKes; Yaumil Fachni Tandjungbulu, S.ST., M.Kes",100,""],["Imunoserologi","Nurdin, S.Si., M.Kes; Cut Indriputri, S.Tr.Ak., M.Imun",100,""],
      ["Kimia Darah dan Enzim","Dr. Herman, S.Pd., M.Kes; Zulfikar Ali Hasan, S.ST., M.Kes",100,""],["Komunikasi dan Promosi Kesehatan","Syahida Djasang, SKM., M.MKes; Mawar, S.Si., M.Kes",100,""],
      ["Patofisiologi","M. Askar, S.Kep., Ns., M.Kes",100,""],["Sitohistoteknologi","Syahida Djasang, SKM., M.MKes; Alfin Resya Virgiawan, S.ST., M.Si",100,""],
      ["Manajemen Penanggulangan Krisis Kesehatan pada Bencana","M. Askar, S.Kep., Ns., M.Kes; Rahman, S.Si., M.Si",100,""],["Statistika","Prof. Dr. Rudi Hartono, SKM., M.Kes",100,""],
      ["QC dan Validasi Metode","Dr. Herman, S.Pd., M.Kes; Zulfikar Ali Hasan, S.ST., M.Kes",100,""],["Toksikologi Medik","Zulfian Armah, S.Si., M.Si; Nuradi, S.Si., M.Kes",100,""],
      ["Virologi","Mursalim, S.Pd., M.Kes; Alfin Resya Virgiawan, S.ST., M.Si",100,""],["Manajemen Laboratorium","Syahida Djasang, SKM., M.MKes; Widarti, S.Si., Apt., M.MKes",100,""],
      ["Pendidikan Kewarganegaraan","Drs. Muh. Nasir, M.Pd",100,""],["Kesehatan dan Keselamatan Kerja","Dr. Artati, S.Si., M.Si; Ridho Pratama, S.Si., M.Si",100,""],
      ["Analisa Kimia Air, Makanan dan Minuman","Zulfian Armah, S.Si., M.Si; Dr. Artati, S.Si., M.Si",100,""]
    ],
    mhs: [
      ["Bahasa Inggris",100,""],["Biokimia",96.68,""],["Flebotomi dan Pengelolaan Spesimen",99.68,""],["Helminthologi",100,""],["Hematologi",98.10,""],
      ["Instrumentasi Klinik",100,""],["Kimia Klinik",100,""],["Mikroskopis Bakteri",97.56,""],["Pendidikan Budaya Anti Korupsi",100,""],["Berpikir Kritis",97.65,""],
      ["Bakteriologi Klinik",99.34,""],["Diagnostik Molekuler",98.10,""],["Epidemiologi",100,""],["Hemostasis",100,""],["Imunoserologi",98.57,""],
      ["Kimia Darah dan Enzim",100,""],["Komunikasi dan Promosi Kesehatan",100,""],["Patofisiologi",97.16,""],["Sitohistoteknologi",98.36,""],
      ["Manajemen Penanggulangan Krisis Kesehatan pada Bencana",99.52,""],["Statistika",100,""],["QC dan Validasi Metode",100,""],["Toksikologi Medik",97.65,""],
      ["Virologi",100,""],["Manajemen Laboratorium",100,""],["Pendidikan Kewarganegaraan",100,""],["Kesehatan dan Keselamatan Kerja",100,""],
      ["Analisa Kimia Air, Makanan dan Minuman",99.17,""]
    ],
    prestasi: [
      { nama: "Rifdah Haaniyah Aisyah Said", jenis: "Lomba Esai — Dies Natalis dan Poltekkes Expo XXV Poltekkes Kemenkes Bengkulu 2026", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Rifdah Haaniyah Aisyah Said", jenis: "Esai Ilmiah Poltekkes Banten Competition (PBC) 2026", tingkat: "Nasional", capaian: "Gold Winner II" }
    ],
    ukt: [
      { angkatan: "Tingkat I/2025", jumlah: 141, lunasPct: 100, ket: "" }, { angkatan: "Tingkat II/2024", jumlah: 143, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat III/2023", jumlah: 85, lunasPct: 100, ket: "" }, { angkatan: "Tingkat IV/2022", jumlah: 84, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Tingkat I/2025", cuti: 0, do: 11, skors: 0, pindah: 1, ket: "" },
      { angkatan: "Tingkat II/2024", cuti: 0, do: 8, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Tingkat III/2023", cuti: 0, do: 1, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: [null,null,null,null,null,null], ket: ["Format baru","","","","",""] },
    kendala: {
      sarpras: { mk: "mata kuliah teori dan skripsi; mata kuliah praktek; mata kuliah Biologi Sel dan Molekuler (P)", uraian: "Ruang kelas dipakai bersama untuk PBM teori dan UAP/skripsi; kursi laboratorium kurang (rusak); peralatan laboratorium Biologi Molekuler tidak lengkap sehingga praktikum tidak maksimal" },
      dosen: { mk: "Urinalisa dan Cairan Tubuh, Kimia Darah dan Enzim, Hematologi Rutin, Hemostasis", uraian: "Dosen mata kuliah purnabakti" },
      lms: { mk: "", uraian: "Belum semua dosen menggunakan Edlink" },
      bahan: { mk: "", uraian: "Ruang baca jurusan jarang terbuka; perpustakaan terpadu susah diakses" },
      lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Tingkat I/2025", ips: 3.45, ipk: 3.59, ukom: null, kendala: "" },
      { angkatan: "Tingkat II/2024", ips: 3.66, ipk: 3.75, ukom: null, kendala: "" },
      { angkatan: "Tingkat III/2023", ips: 3.65, ipk: 3.76, ukom: null, kendala: "" },
      { angkatan: "Tingkat IV/2022", ips: 3.89, ipk: 3.82, ukom: null, kendala: "" }
    ],
    lulus: [
      { tahun: "2023", jumlah: 96, tepat: 86, ket: "Dokumen: 89,58%" },
      { tahun: "2024", jumlah: 98, tepat: 93, ket: "Dokumen: 94,89%" },
      { tahun: "2025", jumlah: 111, tepat: 105, ket: "Dokumen: 94,59%" }
    ],
    kpi: {
      ukom: { target: "95,51%", real: "" }, tepatWaktu: { target: "83%", real: "" },
      rasio: { target: "1:28", real: "1:41" }, inggris: { target: "10,31%", real: "" },
      prestasi: { target: "8", real: "2" }, akreditasi: { target: "100%", real: "100%" }
    },
    rekomendasi: [
      ["Dosen belum mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai","Sosialisasi RPS format baru"],
      ["Ruang kelas dipakai bersama; kursi laboratorium kurang (rusak); peralatan laboratorium Biologi Molekuler tidak lengkap","Usulan penambahan ruang kelas, kursi laboratorium, dan peralatan laboratorium Biologi Molekuler"],
      ["Dosen mata kuliah purnabakti","Usulan penambahan sumber daya dosen"],
      ["Belum semua dosen menggunakan Edlink","Sosialisasi LMS Sevima Edlink"]
    ],
    catatanData: [
      "Bagian F dan H tidak dicentang — tidak dapat dinilai.",
      "Angka berhenti tinggi: 11 (Tk I) dan 8 (Tk II) — perlu analisis penyebab dan intervensi retensi.",
      "Rasio dosen 1:41 jauh di atas target 1:28 (tertinggi dari 20 program studi).",
      "Target tepat waktu ditulis 83% (program studi lain 100%); realisasi tidak diisi meski data tersedia (94,59%)."
    ]
  },

  /* ----------------------------------------------------------------- 10 */
  "str-gizi": {
    identitas: { prodi: "Gizi dan Dietetika Program Sarjana Terapan", jenjang: "Sarjana Terapan", jurusan: "Gizi",
      kaprodi: "Thresia Dewi Kartini B., SKM., M.Si", nipKaprodi: null,
      kajur: "Manjilala, S.Gz., M.Gizi", nipKajur: null, tanggal: "2026-06-25" },
    sumber: { file: "10. S.Tr. Gizi dan Dietetik.pdf", url: "https://drive.google.com/file/d/1-tKF4ZwTsNx2V4eBlWVClLue3p09L_dJ/view" },
    dosen: [
      ["Pendidikan Budaya Anti Korupsi","Dr. Hj. Sukmawati; Dr. Ir. H. Agustian Ipa; Adriyani Adam",100,""],
      ["Praktik Gizi Kuliner","Dr. Hj. Sukmawati; Thresia Dewi K. B; Retno Sri Lestari",100,""],
      ["Biokimia Gizi","Dr. Lydia Fanny; Nursalim; Hijrah Asikin",100,""],
      ["Penilaian Status Gizi","Dr. H. Mustamin; Chaerunnimah; Dr. Hendrayati; Thresia Dewi K. B; Nursalim",100,""],
      ["Praktik Kimia Pangan","Dr. Ir. Hikmawati Mas'ud; Andi Toewo Titi ZA; Nursalim",100,""],
      ["Praktik Survei Konsumsi Pangan","Dr. Sirajuddin; Dr. H. Mustamin",100,""],
      ["Praktik Penilaian Status Gizi","Dr. H. Mustamin; Dr. Hendrayati; Chaerunnimah; Thresia Dewi K. B; Nursalim",100,""],
      ["Sosiologi Antropologi Gizi","Dr. Ir. Hikmawati Mas'ud; Adriyani Adam",100,""],
      ["Patologi Penyakit Infeksi","Abdullah Tamrin; Dr. Lydia Fanny",100,""],
      ["Komunikasi","Manjilala; Chaerunnimah; Sunarto",100,""],
      ["Dietetika Penyakit Infeksi","Dr. Lydia Fanny; Aswita Amir; Abdullah Tamrin; Hijrah Asikin; Mira Andini",100,""],
      ["Praktik Teknologi Pangan","Dr. H. Zakaria; Thresia Dewi KB; Faramitha",100,""],
      ["Etika Profesi","Dr. Hj. Sukmawati; Dr. Ir. H. Agustian Ipa; Manjilala",100,""],
      ["Tata Laksana Gizi Buruk","Dr. Hj. Sukmawati; Sitti Fatimah; Suriani Rauf",100,""],
      ["Praktik Tata Laksana Gizi Buruk","Dr. Hj. Sukmawati; Sitti Fatimah; Suriani Rauf",100,""],
      ["Imunologi","Dr. Hendrayati; Nursalim; Hijrah Asikin",100,""],
      ["Praktik Dietetika Penyakit Infeksi","Dr. Lydia Fanny; Aswita Amir; Abdullah Tamrin; Hijrah Asikin; Mira Andini",100,""],
      ["Ekonomi Pangan","Dr. Ir. H. Agustian Ipa; Dr. Sirajuddin; Dra. Hj. Fatmawaty Suiab",100,""],
      ["Perencanaan Program Gizi","Dr. Sirajuddin; Prof. Rudy Hartono; Sitti Sahariah Rowa; Sunarto",100,""],
      ["Keuangan Kewirausahaan (Entrepreneurship)","Syarief Dienan Yahya, S.E, M.M",100,""],
      ["Metodologi Penelitian","Prof. Rudy Hartono; Dr. Nadimin; Adriyani Adam",100,""],
      ["Pengembangan Resep dan Formula","Dr. Hendrayati; Dr. H. Zakaria; Faramitha",100,""],
      ["Pengawasan Mutu Makanan","Dr. H. Zakaria; Andi Toewo Titi ZA; Hijrah Asikin; Faramitha",100,""],
      ["Advokasi dan Promosi Gizi Pangan, Kesehatan","Prof. Rudy Hartono; Dr. Nadimin; Manjilala; Dr. Ir. H. Agustian Ipa; Sunarto",100,""],
      ["Strategi Pemasaran","Retno Sri Lestari; Andi Nurul Suci Amaliah; Dra. Hj. Fatmawaty Suiab",100,""],
      ["Gizi Olahraga","Thresia Dewi K. B; Hijrah Asikin",100,""],
      ["Pendidikan Budaya Anti Korupsi (VIII)","Dr. Nadimin, SKM, M.Kes",100,""],
      ["Kimia Dasar (Kelas RPL)","Chaerunnimah; Dr. Ir. Hikmawati Mas'ud; Andi Toewo Titi ZA",100,""],
      ["Proposal Skripsi (Kelas RPL)","Manjilala, S.Gz, M.Gizi",100,""],["Mikrobiologi (Kelas RPL)","Dr. H. Zakaria; Andi Toewo Titi ZA",100,""],
      ["Interaksi Obat dan Makanan (Kelas RPL)","Prof. Rudy Hartono, SKM, M.Kes",100,""],["Psikologi (Kelas RPL)","Sunarto; Dr. Yonathan Ramba",100,""],
      ["English for Academic Purposes (Nutrition and Dietetics) (Kelas RPL)","Ahmad, SS, M.Lit",100,""],["Manajemen (Kelas RPL)","Abdullah Tamrin; Dra. Hj. Fatmawaty Suiab",100,""],
      ["Perilaku Konsumen (Kelas RPL)","Sitti Sahariah Rowa, S.SiT, M.Kes",100,""]
    ],
    mhs: [
      ["Pendidikan Budaya Anti Korupsi (Semester II Kelas A)",98.21,""],["Pendidikan Budaya Anti Korupsi (Semester II Kelas B)",100,""],["Pendidikan Budaya Anti Korupsi (Semester II Kelas C)",100,""],["Praktik Gizi Kuliner (Semester II Kelas A)",97.45,""],["Praktik Gizi Kuliner (Semester II Kelas B)",100,""],["Praktik Gizi Kuliner (Semester II Kelas C)",98.92,""],
      ["Biokimia Gizi (Semester II Kelas A)",100,""],["Biokimia Gizi (Semester II Kelas B)",98.72,""],["Biokimia Gizi (Semester II Kelas C)",98.71,""],["Penilaian Status Gizi (Semester II Kelas A)",99.62,""],["Penilaian Status Gizi (Semester II Kelas B)",100,""],["Penilaian Status Gizi (Semester II Kelas C)",98.71,""],
      ["Praktik Kimia Pangan (Semester II Kelas A)",100,""],["Praktik Kimia Pangan (Semester II Kelas B)",99.15,""],["Praktik Kimia Pangan (Semester II Kelas C)",100,""],["Praktik Survei Konsumsi Pangan (Semester II Kelas A)",97.19,""],["Praktik Survei Konsumsi Pangan (Semester II Kelas B)",100,""],["Praktik Survei Konsumsi Pangan (Semester II Kelas C)",100,""],
      ["Praktik PSG (Semester II Kelas A)",100,""],["Praktik PSG (Semester II Kelas B)",100,""],["Praktik PSG (Semester II Kelas C)",100,""],["Sosiologi Antropologi Gizi (Semester II Kelas A)",97.32,""],["Sosiologi Antropologi Gizi (Semester II Kelas B)",98.44,""],["Sosiologi Antropologi Gizi (Semester II Kelas C)",100,""],
      ["Patologi Penyakit Infeksi (Semester II Kelas A)",97.19,""],["Patologi Penyakit Infeksi (Semester II Kelas B)",97.19,""],["Patologi Penyakit Infeksi (Semester II Kelas C)",100,""],["Komunikasi (Semester II Kelas A)",97.83,""],["Komunikasi (Semester II Kelas B)",97.83,""],["Komunikasi (Semester II Kelas C)",100,""],
      ["Dietetika Penyakit Infeksi (Semester IV Kelas A)",100,""],["Dietetika Penyakit Infeksi (Semester IV Kelas B)",99.26,""],["Dietetika Penyakit Infeksi (Semester IV Kelas C)",99.07,""],["Praktik Teknologi Pangan (Semester IV Kelas A)",98.04,""],["Praktik Teknologi Pangan (Semester IV Kelas B)",100,""],["Praktik Teknologi Pangan (Semester IV Kelas C)",99.77,""],
      ["Etika Profesi (Semester IV Kelas A)",97.86,""],["Etika Profesi (Semester IV Kelas B)",100,""],["Etika Profesi (Semester IV Kelas C)",100,""],["Tata Laksana Gizi Buruk (Semester IV Kelas A)",98.93,""],["Tata Laksana Gizi Buruk (Semester IV Kelas B)",95.96,""],["Tata Laksana Gizi Buruk (Semester IV Kelas C)",100,""],
      ["Praktik Tata Laksana Gizi Buruk (Semester IV Kelas A)",97.86,""],["Praktik Tata Laksana Gizi Buruk (Semester IV Kelas B)",99.26,""],["Praktik Tata Laksana Gizi Buruk (Semester IV Kelas C)",100,""],["Imunologi (Semester IV Kelas A)",100,""],["Imunologi (Semester IV Kelas B)",100,""],["Imunologi (Semester IV Kelas C)",99.07,""],
      ["Praktik Dietetika Penyakit Infeksi (Semester IV Kelas A)",100,""],["Praktik Dietetika Penyakit Infeksi (Semester IV Kelas B)",100,""],["Praktik Dietetika Penyakit Infeksi (Semester IV Kelas C)",100,""],
      ["Praktik Pendidikan dan Pelatihan Gizi (Semester IV Kelas A)",100,""],["Praktik Pendidikan dan Pelatihan Gizi (Semester IV Kelas B)",100,""],["Praktik Pendidikan dan Pelatihan Gizi (Semester IV Kelas C)",97.92,""],["Ekonomi Pangan (Semester IV Kelas A)",100,""],["Ekonomi Pangan (Semester IV Kelas B)",97.79,""],["Ekonomi Pangan (Semester IV Kelas C)",96.53,""],
      ["Perencanaan Program Gizi (Semester VI Kelas A)",100,""],["Perencanaan Program Gizi (Semester VI Kelas B)",99.60,""],["Perencanaan Program Gizi (Semester VI Kelas C)",97.70,""],["Keuangan Kewirausahaan (Entrepreneurship) (Semester VI Kelas A)",96.65,""],["Keuangan Kewirausahaan (Entrepreneurship) (Semester VI Kelas B)",99.52,""],["Keuangan Kewirausahaan (Entrepreneurship) (Semester VI Kelas C)",96.55,""],
      ["Metodologi Penelitian (Semester VI Kelas A)",100,""],["Metodologi Penelitian (Semester VI Kelas B)",98.40,""],["Metodologi Penelitian (Semester VI Kelas C)",100,""],["Pengembangan Resep dan Formula (Semester VI Kelas A)",98.91,""],["Pengembangan Resep dan Formula (Semester VI Kelas B)",98.40,""],["Pengembangan Resep dan Formula (Semester VI Kelas C)",97.20,""],
      ["Pengawasan Mutu Makanan (Semester VI Kelas A)",97.81,""],["Pengawasan Mutu Makanan (Semester VI Kelas B)",95.51,""],["Pengawasan Mutu Makanan (Semester VI Kelas C)",99.57,""],["Advokasi dan Promosi Gizi Pangan, Kesehatan (Semester VI Kelas A)",100,""],["Advokasi dan Promosi Gizi Pangan, Kesehatan (Semester VI Kelas B)",99.84,""],["Advokasi dan Promosi Gizi Pangan, Kesehatan (Semester VI Kelas C)",99.57,""],
      ["Strategi Pemasaran (Semester VI Kelas A)",98.91,""],["Strategi Pemasaran (Semester VI Kelas B)",98.88,""],["Strategi Pemasaran (Semester VI Kelas C)",98.49,""],["Gizi Olahraga (Semester VI Kelas A)",99.38,""],["Gizi Olahraga (Semester VI Kelas B)",99.20,""],["Gizi Olahraga (Semester VI Kelas C)",99.57,""],
      ["Pendidikan Budaya Anti Korupsi (Semester VIII Kelas A)",100,""],["Pendidikan Budaya Anti Korupsi (Semester VIII Kelas B)",100,""],["Komunikasi (Kelas RPL)",99.26,""],["Kimia Dasar (Kelas RPL)",100,""],["Proposal Skripsi (Kelas RPL)",93.75,""],["Mikrobiologi (Kelas RPL)",100,""],
      ["Interaksi Obat dan Makanan (Kelas RPL)",100,""],["Psikologi (Kelas RPL)",100,""],["English for Academic Purposes (Nutrition and Dietetics) (Kelas RPL)",99.77,""],["Manajemen (Kelas RPL)",100,""],["Perilaku Konsumen (Kelas RPL)",100,""],["Pendidikan Budaya Anti Korupsi (Kelas RPL)",100,""]
    ],
    prestasi: [
      { nama: "St. Asmah Nurul Mujahidah", jenis: "Video Edukasi — Dies Natalis XXV Poltekkes Bengkulu", tingkat: "Nasional", capaian: "Juara 1" },
      { nama: "Gabriella Nurazizah Sirapanji, Hikmaria Alfisyar, Mega Salvaraya Adawiyah Rafie, Rena Amelia Putri, Tri Latipa Nurman", jenis: "Video Edukasi Kategori Best Media — NHCSC 26 (BEM Poltekkes Kemenkes Makassar)", tingkat: "Nasional", capaian: "Juara 1" }
    ],
    ukt: [
      { angkatan: "2025", jumlah: 149, lunasPct: 100, ket: "" }, { angkatan: "2024", jumlah: 131, lunasPct: 100, ket: "" },
      { angkatan: "2023", jumlah: 110, lunasPct: 100, ket: "" }, { angkatan: "2022", jumlah: 73, lunasPct: 100, ket: "" }
    ],
    retensi: [ { angkatan: "RPL 2025", cuti: 1, do: 1, skors: 0, pindah: 0, ket: "" } ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["82% terlaksana","","","","","70% terlaksana"] },
    kendala: {
      sarpras: { mk: "", uraian: "" },
      dosen: { mk: "Tata Laksana Gizi Buruk; Praktik Tata Laksana Gizi Buruk", uraian: "Hanya 2 dosen kompeten; akan diadakan pelatihan agar terpenuhi pada semester genap 2027" },
      lms: { mk: "", uraian: "" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","B","S"], ket: ["","","","","Masih dalam penyesuaian","Sudah ada banding nilai"] },
    ipk: [
      { angkatan: "2022", ips: 3.90, ipk: 3.80, ukom: 55.96, kendala: "Termasuk RPL 2024" },
      { angkatan: "2023", ips: 3.93, ipk: 3.82, ukom: null, kendala: "" },
      { angkatan: "2024", ips: 3.89, ipk: 3.86, ukom: null, kendala: "" },
      { angkatan: "2025", ips: 3.87, ipk: 3.69, ukom: null, kendala: "IPK dibagi 129 orang, padahal 7 orang sudah keluar di semester 1 (seharusnya 122)" },
      { angkatan: "RPL 2025", ips: 3.93, ipk: 3.66, ukom: null, kendala: "" }
    ],
    lulus: [ { tahun: "2026", jumlah: 109, tepat: 61, ket: "55,96% — sesuai hasil Uji Kompetensi Nasional P1" } ],
    kpi: {
      ukom: { target: "95,51%", real: "98,39%" }, tepatWaktu: { target: "100%", real: "55,96%" },
      rasio: { target: "1:28", real: "1:32" }, inggris: { target: "10,31%", real: "52,17%" },
      prestasi: { target: "8", real: "2" }, akreditasi: { target: "1", real: "1" }
    },
    rekomendasi: [
      ["Hanya 2 dosen kompeten untuk mata kuliah Tata Laksana Gizi Buruk","Pelatihan dosen terkait mata kuliah tersebut agar terpenuhi pada semester genap 2027"],
      ["Lahan Praktik Kerja Lapangan (PKL)/magang di Makassar tidak cukup (kriteria kelas rumah sakit dan ketersediaan CI) untuk 3 kelas reguler + 1 kelas RPL","Mencari lahan di luar Makassar (Kab. Bone, Kota Parepare); biaya bimbingan dan penjajakan perlu dianggarkan"],
      ["Ijazah dan transkrip mahasiswa yang sudah yudisium belum segera diterbitkan","Mahasiswa diberi fotokopi ijazah dan transkrip agar dapat melamar kerja (MagangHub)"]
    ],
    catatanData: [
      "Realisasi Uji Kompetensi 98,39% (IKM) bertentangan dengan Try Out/Uji Kompetensi 55,96% dan tepat waktu 55,96% — perlu klarifikasi definisi (Uji Kompetensi P1 vs kumulatif).",
      "Kendala 2025 menyebut 7 mahasiswa keluar di semester 1, tetapi tabel retensi hanya mencatat RPL 2025.",
      "Kehadiran dosen dilaporkan per dosen (98 baris) — sudah dirangkum per mata kuliah di aplikasi."
    ]
  },

  /* ----------------------------------------------------------------- 11 */
  "d3-tlm": {
    identitas: { prodi: "Teknologi Laboratorium Medis", jenjang: "D-III", jurusan: "Teknologi Laboratorium Medis",
      kaprodi: "Nurdin, S.Si., M.Kes", nipKaprodi: null,
      kajur: "Rahman, S.Si., M.Si", nipKajur: null, tanggal: "2026-06-25" },
    sumber: { file: "11. D3 TLM.docx", url: "https://drive.google.com/file/d/1vSP2dFa6hoFSVse_eozuuwOqPjCEN87O/view" },
    dosen: [
      ["Manajemen Penanggulangan Krisis Kesehatan pada Bencana (MPKKB)","M. Askar, S.Kep., Ns., M.Kes",100,""],["Kewarganegaraan","Drs. Muhammad Nasir, M.Pd",100,""],
      ["Biokimia","Nuradi; Zulfian Armah; Ridho Pratama; Mawar",100,""],["Bahasa Inggris","Drs. Abdullah, M.Hum; Murdia, S.Pd., M.TESOL",100,""],
      ["Flebotomi dan Pengelolaan Spesimen","Zulfikar Ali Hasan; Rahman",100,""],["Helmintologi dan Entomologi","Widarti; Herdiana",100,""],
      ["Imunoserologi","Nurdin; Cut Indriputri; Maulia Hardian Hayati",100,""],["Mikroskopis Bakteri","Mursalim; Hasnawati; Arwin",100,""],
      ["Patofisiologi","M. Askar, S.Kep., Ns., M.Kes",100,""],["Urinalisa dan Cairan Tubuh","Alfin Resya Virgiawan; Yaumil Fachni Tandjungbulu",100,""],
      ["Bisnis dan Kewirausahaan","Artati; Syahida Djasang; Ridho Pratama",100,""],["Epidemiologi","Syahida Djasang; Mawar",100,""],
      ["Hemostasis","Widarti; Yaumil Fachni Tandjungbulu; Herdiana",100,""],["Imunohematologi dan Bank Darah","Nurdin; Cut Indriputri; Maulia Hardian Hayati; Hasnawati",100,""],
      ["Kendali Mutu","Zulfikar Ali Hasan; Hj. Nurlia Naim",100,""],["Kimia Enzim, Elektrolit dan Gas Darah","Dr. H. Herman; Zulfikar Ali Hasan; Arwin",100,""],
      ["Metodologi Penelitian dan Biostatistik","Kalma, S.Pd, M.Si",100,""],["Virologi","Mursalim; Rafika",100,""],
      ["Kapita Selekta","Alfin Resya Virgiawan",100,""],["Kajian Kompetensi","Nurdin; Cut Indriputri; Maulia Hardian Hayati",100,""],
      ["Hematologi Sel Darah Tepi","Dr. H. Herman; Yaumil Fachni Tandjungbulu; Widarti",100,""]
    ],
    mhs: [
      ["Manajemen Penanggulangan Krisis Kesehatan pada Bencana (MPKKB)",94.78,""],["Kewarganegaraan",89.27,""],["Biokimia",100,""],["Bahasa Inggris",100,""],
      ["Flebotomi dan Pengelolaan Spesimen",96.83,""],["Helmintologi dan Entomologi",99.05,""],["Imunoserologi",92.37,""],["Mikroskopis Bakteri",94.87,""],
      ["Patofisiologi",93.39,""],["Urinalisa dan Cairan Tubuh",97.74,""],["Bisnis dan Kewirausahaan",98.92,""],["Epidemiologi",96.6,""],["Hemostasis",98.91,""],
      ["Imunohematologi dan Bank Darah",96.27,""],["Kendali Mutu",98.26,""],["Kimia Enzim, Elektrolit dan Gas Darah",100,""],
      ["Metodologi Penelitian dan Biostatistik",96.67,""],["Virologi",95.65,""],["Kapita Selekta",97.81,""],["Kajian Kompetensi",91.93,""],
      ["Hematologi Sel Darah Tepi",94.20,""],["Toksikologi Klinik",92.04,"Tidak tercantum pada Bagian B (kehadiran dosen)"]
    ],
    prestasi: [
      { nama: "M. Irfan Riayatullah Hak", jenis: "Essay PHIL — Dies Natalis dan Poltekkes Expo XXV Poltekkes Kemenkes Bengkulu 2026", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Jumadil Akbar Gaffar", jenis: "Medical Corona Competition Vol. 4", tingkat: "Antar kampus kesehatan", capaian: "" },
      { nama: "Siti Ashilah Ibtihal A.", jenis: "LKTIN Chemical Engineering Fair 2026", tingkat: "Nasional", capaian: "Presentasi Terbaik" },
      { nama: "Novita", jenis: "LKTIN Chemical Engineering Fair 2026", tingkat: "Nasional", capaian: "Presentasi Terbaik" },
      { nama: "M. Irfan Riayatullah Hak", jenis: "Chemical Engineering Fair 2026", tingkat: "Nasional", capaian: "Presentasi Terbaik" }
    ],
    ukt: [
      { angkatan: "Tingkat I (tertulis I/2023)", jumlah: 95, lunasPct: 100, ket: "Label angkatan terbalik pada dokumen sumber" },
      { angkatan: "Tingkat II/2024", jumlah: 94, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat III (tertulis III/2025)", jumlah: 95, lunasPct: 100, ket: "Label angkatan terbalik pada dokumen sumber" }
    ],
    retensi: [
      { angkatan: "I/2023 (label sumber)", cuti: 0, do: 1, skors: 0, pindah: 0, ket: "" },
      { angkatan: "II/2024", cuti: 0, do: 4, skors: 0, pindah: 0, ket: "" },
      { angkatan: "III/2025 (label sumber)", cuti: 0, do: 5, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "mata kuliah praktikum", uraian: "Laboratorium perlu diperbaiki; lab mikro perlu ruang steril untuk isolasi; mikroskop kurang (idealnya 1 mahasiswa 1 mikroskop)" },
      dosen: { mk: "Teori dan praktikum", uraian: "Rasio dosen : mahasiswa masih tinggi; pemahaman dosen tentang pembelajaran OBE masih kurang" },
      lms: { mk: "Teori dan praktikum", uraian: "Belum semua dosen memanfaatkan Edlink; Kaprodi perlu akun admin untuk memantau SIAKAD" },
      bahan: { mk: "Teori dan praktikum", uraian: "Perlu revisi menyesuaikan kurikulum OBE" },
      lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "I/2025", ips: 3.70, ipk: 3.73, ukom: null, kendala: "" },
      { angkatan: "II/2024", ips: 3.39, ipk: 3.65, ukom: null, kendala: "" },
      { angkatan: "III/2023", ips: 4.00, ipk: 3.81, ukom: null, kendala: "" }
    ],
    lulus: [
      { tahun: "2025", jumlah: 98, tepat: 93, ket: "" },
      { tahun: "2024", jumlah: 46, tepat: 42, ket: "" },
      { tahun: "2023", jumlah: 49, tepat: 46, ket: "" }
    ],
    kpi: {
      ukom: { target: "100%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "1:25", real: "1:35" }, inggris: { target: "60%", real: "12,5% (1 orang)" },
      prestasi: { target: "10", real: "5" }, akreditasi: { target: "100%", real: "100%" }
    },
    rekomendasi: [
      ["Pemahaman kurikulum OBE","Sosialisasi pemahaman kurikulum OBE"],
      ["RPS OBE dan instrumennya","Workshop penyusunan RPS OBE dan instrumen penilaiannya"],
      ["Laporan monitoring dan evaluasi proses belajar mengajar","Workshop cara penilaian ketercapaian CPL program studi"],
      ["Peralatan laboratorium dan reagensia kurang","Penambahan alat dan reagen (1 alat/reagen untuk 1 mahasiswa)"]
    ],
    catatanData: [
      "Bagian F dan H tidak dicentang — tidak dapat dinilai.",
      "Label tingkat/angkatan UKT dan retensi terbalik (Tingkat I ditulis 2023, Tingkat III ditulis 2025).",
      "Kehadiran mahasiswa Kewarganegaraan 89,27% (di bawah ambang 90%).",
      "Toksikologi Klinik ada di Bagian C tetapi tidak ada di Bagian B."
    ]
  },

  /* ----------------------------------------------------------------- 12 */
  "str-fisio": {
    identitas: { prodi: "Sarjana Terapan Fisioterapi", jenjang: "Sarjana Terapan", jurusan: "Fisioterapi",
      kaprodi: "Aco Tang, SKM, S.ST.Ft, M.Kes", nipKaprodi: null,
      kajur: "Darwis Durahim, S.Pd., S.ST.Ft., M.Kes", nipKajur: null, tanggal: "2026-07-09" },
    sumber: { file: "12. D4 Fisioterapi.docx", url: "https://drive.google.com/file/d/158MvqjdH7s12MxVR8xbJVGoZoZdJDAQM/view" },
    dosen: [
      ["Anatomi Terapan","Sitti Muthiah; H. Muh. Thahir; Dr. Yonathan Ramba; Rahmat Nugraha Akib",100,""],
      ["Psikologi Kesehatan dan Perilaku","Dr. Yonathan Ramba; Dr. Siti Nurul Fajriah",100,""],
      ["Fisiologi Latihan","Aco Tang; Darwis Durahim; Dr. Siti Nurul Fajriah; Fahrul Islam",100,""],
      ["Patologi Umum","Dr. Muhammad Awal; Hj. Hasnia Ahmad",100,""],["Patofisiologi Tumbuh Kembang","Dr. Yonathan Ramba; Fahrul Islam",100,""],
      ["Bahasa Inggris Terapan","Dr. Suhartina R",100,""],["Biomekanik dan Kinesiologi I (Ekstremitas)","Hasbiah; Rahmat Nugraha Akib; Supartina Hakim",100,""],
      ["Komunikasi Profesional","Dr. Tiar Erawan; Sri Saadiyah Leksonowati",100,""],["Filsafat Logika dan Berpikir Kritis","Dr. Hendrik; Dr. Yonathan Ramba",100,""],
      ["Etika Profesi dan Hukum Kesehatan","Dr. Hendrik; Dr. Muhammad Awal",100,""],["Terapi Manual Jaringan Lunak","Ftr. Sudaryanto; Dr. Tiar Erawan; Rahmat Nugraha Akib",100,""],
      ["Terapi Manual Vertebra","Ftr. Sudaryanto; Rahmat Nugraha Akib",100,""],["Pemeriksaan dan Diagnosa Fisioterapi","Hj. Hasnia Ahmad; Rahmat Nugraha Akib; Andi Halimah",100,""],
      ["Pengukuran Fisioterapi","Hasbiah; Sitti Muthiah; H. Muh. Thahir",100,""],["Terapi Latihan Spesifik","Ftr. Sudaryanto; Supartina Hakim",100,""],
      ["Pemeriksaan Penunjang Diagnostik","Supartina Hakim",100,""],["Manajemen dan Kewirausahaan Fisioterapi","Arpandjaman; Andi Halimah; Sitti Muthiah",100,""],
      ["Epidemiologi","Dr. Muhammad Awal; Arpandjaman",100,""],["Fisioterapi Integumen","Andi Halimah; Dr. Tiar Erawan; Sitti Muthiah",100,""],
      ["Terapi Latihan Terapan (Applied Exercise)","Ftr. Sudaryanto; Supartina Hakim",100,""],
      ["Soft Tissue Manipulation dan Terapi Manual Terapan","Ftr. Sudaryanto; Dr. Tiar Erawan; Rahmat Nugraha Akib",100,""],
      ["Fisioterapi Muskuloskeletal Non Bedah Ekstremitas","Ftr. Sudaryanto; Supartina Hakim; Rahmat Nugraha Akib",100,""],
      ["Fisioterapi Neurologi Sistem Saraf Tepi (Entrapment-Inflamasi)","Hj. Hasnia Ahmad; Sri Saadiyah Leksonowati",100,""],
      ["Fisioterapi Olahraga dan Wellness","Darwis Durahim; Fahrul Islam; Aco Tang",100,""],["Komunikasi Terapeutik","Dr. Tiar Erawan; Sri Saadiyah Leksonowati",100,""],
      ["Manajemen Pelayanan Fisioterapi","Arpandjaman; Andi Halimah; Sitti Muthiah",100,""],["Kewirausahaan","Dr. Tiar Erawan; Arpandjaman",100,""],
      ["Bahasa Inggris Terapan (Applied English)","Hamka, S.Kp., MSN., MPH(Adv)",100,""],["Biokimia Dasar","Dr. Hendrayati; Nursalim",100,""],
      ["Neurosains","Hj. Hasnia Ahmad",100,""],["Terapi Cold dan Hydrotherapy","Dr. Siti Nurul Fajriah; Aco Tang",100,""],
      ["Fisioterapi Muskuloskeletal Non Bedah Vertebra","Ftr. Sudaryanto; Supartina Hakim; Rahmat Nugraha Akib",100,""],
      ["Pemeriksaan Fisioterapi Vertebra dan Sistem","Hj. Hasnia Ahmad; Andi Halimah; Sitti Muthiah",100,""],
      ["Pengukuran Fisioterapi Sistem Muskuloskeletal dan Integumen","Hasbiah; Sitti Muthiah",100,""]
    ],
    mhs: [
      ["Anatomi Terapan",100,""],["Psikologi Kesehatan dan Perilaku",100,""],["Fisiologi Latihan",100,""],["Patologi Umum",100,""],
      ["Patofisiologi Tumbuh Kembang",100,""],["Bahasa Inggris Terapan",100,""],["Biomekanik dan Kinesiologi I (Ekstremitas)",100,""],
      ["Komunikasi Profesional",100,""],["Filsafat Logika dan Berpikir Kritis",100,""],["Etika Profesi dan Hukum Kesehatan",100,""],
      ["Terapi Manual Jaringan Lunak",100,""],["Terapi Manual Vertebra",100,""],["Pemeriksaan dan Diagnosa Fisioterapi",100,""],
      ["Pengukuran Fisioterapi",100,""],["Terapi Latihan Spesifik",100,""],["Pemeriksaan Penunjang Diagnostik",100,""],
      ["Manajemen dan Kewirausahaan Fisioterapi",100,""],["Epidemiologi",100,""],["Fisioterapi Integumen",100,""],
      ["Terapi Latihan Terapan (Applied Exercise)",100,""],["Soft Tissue Manipulation dan Terapi Manual Terapan",100,""],
      ["Fisioterapi Muskuloskeletal Non Bedah Ekstremitas",100,""],["Fisioterapi Neurologi Sistem Saraf Tepi (Entrapment-Inflamasi)",100,""],
      ["Fisioterapi Olahraga dan Wellness",100,""],["Komunikasi Terapeutik",100,""],["Manajemen Pelayanan Fisioterapi",100,""],
      ["Kewirausahaan",100,""],["Bahasa Inggris Terapan (Applied English)",100,""],["Biokimia Dasar",100,""],["Neurosains",100,""],
      ["Terapi Cold dan Hydrotherapy",100,""],["Fisioterapi Muskuloskeletal Non Bedah Vertebra",100,""],
      ["Pemeriksaan Fisioterapi Vertebra dan Sistem",100,""],["Pengukuran Fisioterapi Sistem Muskuloskeletal dan Integumen",100,""]
    ],
    prestasi: [
      { nama: "Aulia Reski", jenis: "Desain Poster — INISCOM", tingkat: "Internasional", capaian: "Juara 1" },
      { nama: "Febrisa Risti Nabila Makmur", jenis: "Edelweiss Competition of Science", tingkat: "(kode 4 — perlu klarifikasi)", capaian: "Juara 3" },
      { nama: "Nurul Syahdila Anisya", jenis: "Lomba Video Kreatif — CARDIONEO 2025", tingkat: "(kode 4 — perlu klarifikasi)", capaian: "Juara 3" },
      { nama: "Nurul Syahdila Anisya", jenis: "Lomba Cerdas Cermat — FISIOKER UMM 2025", tingkat: "(kode 4 — perlu klarifikasi)", capaian: "Juara 3" }
    ],
    ukt: [
      { angkatan: "Tingkat 1/2025", jumlah: 144, lunasPct: 100, ket: "" }, { angkatan: "Tingkat 2/2024", jumlah: 99, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat 3/2023", jumlah: 97, lunasPct: 99, ket: "1% belum lunas" }, { angkatan: "Tingkat 4/2022", jumlah: 52, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Tingkat II/2024", cuti: 2, do: 0, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Tingkat III/2023", cuti: 1, do: 0, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "", uraian: "Ruang kelas/lab kurang" }, dosen: { mk: "", uraian: "" },
      lms: { mk: "", uraian: "Belum semua dosen terbiasa menggunakan Edlink" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Tingkat I/2025", ips: 3.73, ipk: 3.67, ukom: null, kendala: "" },
      { angkatan: "Tingkat II/2024", ips: 3.66, ipk: 3.63, ukom: null, kendala: "" },
      { angkatan: "Tingkat III/2023", ips: 3.55, ipk: 3.52, ukom: null, kendala: "" },
      { angkatan: "Tingkat IV/2022", ips: 3.64, ipk: 3.61, ukom: null, kendala: "" }
    ],
    lulus: [],
    kpi: {
      ukom: { target: "100%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "1:30", real: "1:28,79" }, inggris: { target: "5%", real: "" },
      prestasi: { target: "", real: "" }, akreditasi: { target: "", real: "" }
    },
    rekomendasi: [
      ["Belum 100% dosen mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai","Dosen mengumpulkan RPS 1 minggu sebelum pembelajaran dimulai"],
      ["Belum semua dosen terbiasa menggunakan Edlink","Semua dosen menggunakan LMS Sevima Edlink"],
      ["Kurangnya laboratorium sehingga terjadi bentrok penggunaan","Optimalisasi jadwal penggunaan laboratorium"],
      ["(AMI 2023) 2 ruangan dengan plafon rusak; PBM dilakukan di gazebo dan aula","Mengajukan perbaikan kepada Direktorat"],
      ["(AMI 2024) Belum optimal tracer study dan survei kepuasan pengguna lulusan","Menugaskan penanggung jawab kemahasiswaan membuat sistem pelacakan alumni dan survei kepuasan pengguna"],
      ["(AMI 2024) 3 tenaga kependidikan melayani 3 program studi","Usulan penambahan tenaga kependidikan dengan peta jabatan 5 tahun"],
      ["(AMI 2024) Daya listrik kurang; sering padam saat jam kerja","Mengajukan penambahan daya listrik kepada Direktorat"],
      ["(AMI 2025) Kurang bukti fisik penyerahan RPS dan bahan ajar; input RPS di SIAKAD kurang","Instrumen monitoring penyerahan dan penginputan dokumen pembelajaran di SIAKAD"]
    ],
    catatanData: [
      "Nama Ketua Program Studi dan tanggal pengisian kosong pada Bagian A (diambil dari lembar pengesahan).",
      "Lembar pengesahan tertulis 'Ketua Jurusan TLM' — seharusnya Ketua Jurusan Fisioterapi.",
      "Tabel kelulusan tepat waktu kosong; realisasi IKM Uji Kompetensi, Bahasa Inggris, prestasi, akreditasi tidak diisi.",
      "Bagian C baris 26 berisi nama dosen (bukan mata kuliah); mata kuliah 'Anatomi Terapan' dan beberapa mata kuliah tercatat ganda.",
      "Tingkat prestasi ditulis kode '4' tanpa keterangan."
    ]
  },
  /* ----------------------------------------------------------------- 13 */
  "d3-kep-pare": {
    identitas: { prodi: "D-III Keperawatan Parepare", jenjang: "D-III", jurusan: "Keperawatan",
      kaprodi: "H. Muhammad Asikin, S.Pd., S.SiT., M.Si., M.Kes", nipKaprodi: null,
      kajur: "Iwan, SKp., M.Kes", nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "Isian D-III Keperawatan Parepare (diterima melalui pesan Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Patofisiologi","Muhammad Nuralamsyah, S.Kep., Ns., M.Kes",100,""],
      ["Farmakologi","H. Abd. Rahman, S.Pd., S.SiT., S.Kep., M.Si., MM",100,""],
      ["Gizi dan Diet","Dr. Syarifuddin, S.Pd., S.Kep., MM.Kes",100,""],
      ["Manajemen Patient Safety","Dr. Bahrudin, SKM., S.Kep., MM.Kes",100,""],
      ["Metodologi dan Dokumentasi Keperawatan","Ike Nurjana Tamrin, S.Kep., Ns., M.Kep",100,""],
      ["Praktik Metodologi dan Dokumentasi Keperawatan","Ike Nurjana Tamrin, S.Kep., Ns., M.Kep",100,""],
      ["Kebutuhan Manusia dalam Konteks Keperawatan","Syamsir, S.SiT., M.Kes",100,""],
      ["Praktik Kebutuhan Manusia dalam Konteks Keperawatan","Syamsir, S.SiT., M.Kes",100,""],
      ["Metodologi Penelitian","Dr. Edi Hasan, SKM., S.Kep., Ns., MM.Kes., MM.Kep",100,""],
      ["Praktik Klinik Kebutuhan Manusia dalam Konteks Keperawatan","Syamsir, S.SiT., M.Kes",100,""],
      ["Keperawatan Gawat Darurat","H. Muhammad Asikin, S.Pd., S.SiT., M.Si., M.Kes",100,"Pertemuan dijadwalkan ulang karena dosen mengikuti rapat pimpinan"],
      ["Penanggulangan Krisis Kesehatan dan Bencana","Dr. Agussalim, MSN",100,"Pertemuan dijadwalkan ulang karena dosen mengikuti seminar/pelatihan"],
      ["Keperawatan Keluarga","Dr. Bahrudin, SKM., S.Kep., MM.Kes",100,""],
      ["Keperawatan Gerontik","Hj. I Takko P, SKM., M.Kes",100,""],
      ["Praktik Klinik Keperawatan Gerontik dan Keluarga","Dr. Bahrudin, SKM., S.Kep., MM.Kes",100,"Pertemuan dijadwalkan ulang karena dosen mengikuti seminar/pelatihan"],
      ["Budaya dan Bahasa Jepang","Dr. Imelda, S.S., M.Pd",100,""],
      ["Manajemen Keperawatan","Dr. M. Natsir, SKM., S.Pd., S.Kep., Ns., M.Kes",100,""],
      ["Kewirausahaan","Drs. H. Muhammad Saleng, M.Kes",100,""],
      ["Keperawatan Paliatif","Ike Nurjana Tamrin, S.Kep., Ns., M.Kep",100,""],
      ["Praktik Klinik Keperawatan Paliatif","Ike Nurjana Tamrin, S.Kep., Ns., M.Kep",100,""],
      ["Praktik Kerja Nyata","Muhammad Nuralamsyah, S.Kep., Ns., M.Kes",100,""],
      ["Karya Tulis Ilmiah","H. Muhammad Asikin, S.Pd., S.SiT., M.Si., M.Kes",100,""]
    ],
    mhs: [
      ["Patofisiologi (kelas 1)",97.13,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Patofisiologi (kelas 2)",98.71,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Farmakologi (kelas 1)",96.78,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Farmakologi (kelas 2)",98.06,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Gizi dan Diet (kelas 1)",95.7,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Gizi dan Diet (kelas 2)",95.04,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Manajemen Patient Safety (Kelas A)",97.13,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Manajemen Patient Safety (Kelas B)",98.0,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Metodologi dan Dokumentasi Keperawatan (Kelas A)",96.0,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Metodologi dan Dokumentasi Keperawatan (Kelas B)",98.0,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Praktik Metodologi dan Dokumentasi Keperawatan (Kelas A)",100,""],
      ["Praktik Metodologi dan Dokumentasi Keperawatan (Kelas B)",100,""],
      ["Kebutuhan Manusia dalam Konteks Keperawatan (Kelas A)",98.76,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Kebutuhan Manusia dalam Konteks Keperawatan (Kelas B)",98.05,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Praktik Kebutuhan Manusia dalam Konteks Keperawatan (Kelas A)",100,""],
      ["Praktik Kebutuhan Manusia dalam Konteks Keperawatan (Kelas B)",100,""],
      ["Metodologi Penelitian (Kelas A)",97.05,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Metodologi Penelitian (Kelas B)",98.15,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Praktik Klinik Kebutuhan Manusia dalam Konteks Keperawatan (Kelas A)",100,""],
      ["Praktik Klinik Kebutuhan Manusia dalam Konteks Keperawatan (Kelas B)",100,""],
      ["Keperawatan Gawat Darurat (Kelas A)",98.45,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Gawat Darurat (Kelas B)",98.15,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Penanggulangan Krisis Kesehatan dan Bencana (Kelas A)",97.8,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Penanggulangan Krisis Kesehatan dan Bencana (Kelas B)",98.05,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Keluarga (Kelas A)",96.78,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Keluarga (Kelas B)",98.06,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Gerontik (Kelas A)",98.0,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Gerontik (Kelas B)",98.45,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Praktik Klinik Keperawatan Gerontik dan Keluarga (Kelas A)",100,""],
      ["Praktik Klinik Keperawatan Gerontik dan Keluarga (Kelas B)",100,""],
      ["Budaya dan Bahasa Jepang (Kelas A)",100,""],
      ["Budaya dan Bahasa Jepang (Kelas B)",100,""],
      ["Manajemen Keperawatan (Kelas A)",98.67,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Manajemen Keperawatan (Kelas B)",98.85,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Kewirausahaan (Kelas A)",98.56,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Kewirausahaan (Kelas B)",98.67,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Paliatif (Kelas A)",97.85,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Keperawatan Paliatif (Kelas B)",98.56,"Mahasiswa yang tidak hadir dengan alasan sakit atau izin"],
      ["Praktik Klinik Keperawatan Paliatif (Kelas A)",100,""],
      ["Praktik Klinik Keperawatan Paliatif (Kelas B)",100,""],
      ["Praktik Kerja Nyata (Kelas A)",100,""],
      ["Praktik Kerja Nyata (Kelas B)",100,""],
      ["Karya Tulis Ilmiah (Kelas A)",100,""],
      ["Karya Tulis Ilmiah (Kelas B)",100,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "Tingkat I/2025", jumlah: 60, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat II/2024", jumlah: 55, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat III/2023", jumlah: 59, lunasPct: 100, ket: "" }
    ],
    retensi: [ { angkatan: "Tingkat II/2024", cuti: 1, do: 0, skors: 0, pindah: 0, ket: "Rekapitulasi cuti mahasiswa sebanyak 1 orang" } ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "", uraian: "" },
      dosen:   { mk: "Budaya dan Bahasa Jepang", uraian: "Proses belajar mengajar dilaksanakan secara daring (virtual) 100% sehingga efektivitas pembelajaran kurang maksimal" },
      lms:     { mk: "", uraian: "" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Tingkat I/2025", ips: 3.71, ipk: null, ukom: null, kendala: "" },
      { angkatan: "Tingkat II/2024", ips: 3.94, ipk: null, ukom: null, kendala: "" },
      { angkatan: "Tingkat III/2023", ips: 3.98, ipk: 3.90, ukom: 90, kendala: "" }
    ],
    lulus: [
      { tahun: "2024", jumlah: 65, tepat: 65, ket: "" },
      { tahun: "2025", jumlah: 56, tepat: 55, ket: "Dokumen: 98,24% tepat waktu dan 1,8% tidak tepat waktu" }
    ],
    kpi: {
      ukom: { target: "95,51%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "1:28", real: "1:15" }, inggris: { target: "10,31%", real: "8,3%" },
      prestasi: { target: "8", real: "" }, akreditasi: { target: "", real: "" }
    },
    rekomendasi: [
      ["Kehadiran dosen pada beberapa pertemuan tidak sesuai jadwal karena bertepatan dengan tugas dinas","Dosen yang bersangkutan telah menjadwalkan ulang pertemuan/tatap muka pada hari lain"],
      ["Persentase kehadiran mahasiswa pada beberapa mata kuliah belum mencapai 100% karena mahasiswa berhalangan hadir dengan alasan sakit atau izin","Ketua Program Studi mengimbau dosen mata kuliah terkait untuk memanggil mahasiswa yang izin atau sakit dan memberikan tugas individu pengganti ketidakhadiran"],
      ["Belum terdapat prestasi mahasiswa pada Semester Genap TA 2025/2026","Ketua Program Studi bersama bagian Kemahasiswaan, Pembimbing Akademik, dan dosen memotivasi mahasiswa mengikuti kompetisi bidang olahraga, seni, dan ilmu kesehatan/keperawatan tingkat lokal, nasional, dan internasional"],
      ["Rasio dosen tetap terhadap mahasiswa belum mencapai target","Sosialisasi penerimaan mahasiswa baru ke SMA/SMK di wilayah Ajatappareng dan sekitarnya bersama dosen, tenaga kependidikan, dan mahasiswa"]
    ],
    catatanData: [
      "Kehadiran dosen dilaporkan 100% pada seluruh mata kuliah, sementara 3 mata kuliah tercatat dijadwalkan ulang; perlu dipastikan pertemuan pengganti telah terlaksana dan tercatat di SIAKAD.",
      "Bagian C: enam baris pertama (Patofisiologi, Farmakologi, Gizi dan Diet) tidak mencantumkan kelas; di aplikasi ditandai 'kelas 1' dan 'kelas 2'.",
      "Rata-rata IPK Tingkat I dan II tidak diisi.",
      "Realisasi IKM Uji Kompetensi tidak diisi, padahal hasil try out/Uji Kompetensi Tingkat III tercantum 90%; realisasi prestasi dan akreditasi juga tidak diisi.",
      "Rasio dosen 1:15 sudah memenuhi target 1:28 (rasio lebih kecil berarti lebih baik); rekomendasi butir 4 menyebut rasio 'belum mencapai target' sehingga perlu diklarifikasi maksudnya.",
      "Kelulusan tepat waktu 2025 ditulis 98,24%, sedangkan 55 dari 56 = 98,21%; data angkatan wisuda 2026 belum diisi.",
      "Dosen berkemampuan Bahasa Inggris 8,3% masih di bawah target 10,31%.",
      "Tanggal pengisian (24 Juni 2026) berbeda dengan tanggal pengesahan (29 Juni 2026); NIP Ketua Jurusan tidak dicantumkan."
    ]
  }
,
  /* ----------------------------------------------------------------- 14 */
  "profesi-dietisien": {
    identitas: { prodi: "Profesi Dietisien", jenjang: "Profesi", jurusan: "Gizi",
      kaprodi: "Dr. Sirajuddin, SP, M.Kes", nipKaprodi: null,
      kajur: "Manjilala, S.Gz, M.Gizi", nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "13. Profesi Dietisien.pdf (diunggah Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Konseling (Home Care)","Aswita Amir, A, M.Si, RD",100,""],
      ["Pengantar Praktik Profesi","Aswita Amir, A, M.Si, RD",100,""],
      ["Asuhan Gizi Penyakit Kegawatdaruratan Dewasa","Hijrah Asikin, S.ST., M.Biomed",100,""],
      ["Asuhan Gizi Penyakit Dalam","Dr. Lydia Fanny, DCN, M.Kes",100,""],
      ["Asuhan Gizi Penyakit Degeneratif","Dr. Hendrayati, DCN, M.Kes",100,""],
      ["Asuhan Gizi Penyakit Anak","Dr. Hendrayati, DCN, M.Kes",100,""],
      ["Asuhan Gizi Kegawatdaruratan Anak","Aswita Amir, A, M.Si, RD",100,""],
      ["Asuhan Gizi Kesehatan Reproduksi","Abdullah Tamrin, DCN., M.Kes",100,""],
      ["Asuhan Gizi Bedah","Dr. Lydia Fanny, DCN, M.Kes",100,""],
      ["Asuhan Gizi Rawat Jalan","Abdullah Tamrin, DCN., M.Kes",100,""],
      ["Manajemen Kualitas Penyelenggaraan Makanan","Dr. Nadimin, SKM, M.Kes; Dr. Sirajuddin, SP, M.Kes; Dr. Mustamin, SP, M.Kes; Adriyani Adam, SKM, M.Kes",100,""],
      ["Pengembangan Produk Pangan Fungsional","Dr. Hendrayati, DCN, M.Kes",100,""],
      ["Asuhan Gizi Masyarakat","Dr. Nadimin, SKM, M.Kes; Dr. Sirajuddin, SP, M.Kes; Dr. Mustamin, SP, M.Kes; Adriyani Adam, SKM, M.Kes",100,""],
      ["Pemasaran Sosial Pencegahan Stunting","Dr. Sirajuddin, SP, M.Kes; Manjilala, S.Gz, M.Gizi",100,""],
      ["Asuhan Gizi Kehamilan","Dr. Lydia Fanny, DCN, M.Kes; Aswita Amir, A, M.Si, RD",100,""],
      ["Studi Ilmiah Pencegahan Stunting","Hijrah Asikin, S.ST., M.Biomed; Dr. Mustamin, SP, M.Kes",100,""]
    ],
    mhs: [
      ["Konseling (Home Care)",100,""],
      ["Pengantar Praktik Profesi",100,""],
      ["Asuhan Gizi Penyakit Kegawatdaruratan Dewasa",100,""],
      ["Asuhan Gizi Penyakit Dalam",100,""],
      ["Asuhan Gizi Penyakit Degeneratif",100,""],
      ["Asuhan Gizi Penyakit Anak",100,""],
      ["Asuhan Gizi Kegawatdaruratan Anak",100,""],
      ["Asuhan Gizi Kesehatan Reproduksi",100,""],
      ["Asuhan Gizi Bedah",100,""],
      ["Asuhan Gizi Rawat Jalan",100,""],
      ["Manajemen Kualitas Penyelenggaraan Makanan",100,""],
      ["Pengembangan Produk Pangan Fungsional",100,""],
      ["Asuhan Gizi Masyarakat",100,""],
      ["Pemasaran Sosial Pencegahan Stunting",100,""],
      ["Asuhan Gizi Kehamilan",100,""],
      ["Studi Ilmiah Pencegahan Stunting",100,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "Angkatan 2025", jumlah: 96, lunasPct: 100, ket: "" },
      { angkatan: "Angkatan 2024", jumlah: 3, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Angkatan 2025", cuti: 0, do: 0, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2024", cuti: 0, do: 1, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "", uraian: "" },
      dosen:   { mk: "Mata kuliah Rotasi Gizi Klinik, Rotasi Gizi Masyarakat, dan Rotasi Gizi Institusi",
                 uraian: "Program studi idealnya memiliki minimal 3 dosen dietisien khusus (gizi klinik, gizi masyarakat, dan penyelenggaraan makanan). Dosen gizi klinik saat ini merangkap mengajar di kelas, padahal pembelajaran profesi dietisien berlangsung di lahan; dosen seharusnya berada di lahan rotasi bersama clinical instructor (CI) rumah sakit untuk mengobservasi capaian CPMK. Hal yang sama berlaku bagi dosen gizi masyarakat dan penyelenggaraan makanan. Total beban 19 SKS per semester ideal untuk 3 orang dosen." },
      lms:     { mk: "", uraian: "" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "profesi",
      item: ["Morning report (presentasi manajemen kasus pasien sebelum pelayanan)","Tugas lapangan dan pengisian logbook kasus harian",
        "Presentasi kasus kelompok beserta kajian teoritis","Presentasi jurnal (analisis artikel ilmiah internasional secara individu)",
        "Ujian bagian (ujian tulis) untuk menilai kompetensi kognitif","Ujian bagian (Mini OSCE) untuk menilai kompetensi psikomotor dan afektif"],
      status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [ { angkatan: "Angkatan 2025", ips: 3.69, ipk: 3.67, ukom: 100, kendala: "" } ],
    lulus: [ { tahun: "Angkatan 2025", jumlah: 0, tepat: 0, ket: "Belum ada lulusan; kelulusan setelah Uji Kompetensi periode Agustus 2026" } ],
    kpi: {
      ukom: { target: "100%", real: "Jadwal Uji Kompetensi Agustus 2026" }, tepatWaktu: { target: "100%", real: "Kelulusan setelah Uji Kompetensi periode Agustus 2026" },
      rasio: { target: "", real: "" }, inggris: { target: "100%", real: "Belum ada" },
      prestasi: { target: "100%", real: "Belum ada" }, akreditasi: { target: "100%", real: "Belum ada" }
    },
    rekomendasi: [
      ["Kegiatan kokurikuler di Program Studi Profesi Dietisien perlu ditinjau ulang karena 95% perkuliahan terintegrasi dengan kegiatan rotasi di lahan rumah sakit dan puskesmas. Ketua Program Studi berinisiatif mengintegrasikan pembinaan posyandu di wilayah rotasi gizi masyarakat sebagai bagian dari kegiatan kokurikuler (Temuan #5).",
       "Menyusun templat laporan kokurikuler bagi setiap kelompok mahasiswa di setiap lahan rotasi gizi masyarakat."],
      ["Jadwal clinical instructor (CI) padat dan peralihan stase tertunda (Temuan #6). Rasio CI terhadap mahasiswa dipertahankan 1:5; koordinasi dengan bagian Diklat RS Dr. Wahidin Sudirohusodo dilakukan pada September 2024, dan koordinasi dengan seluruh puskesmas lokasi rotasi gizi masyarakat dilakukan pada Maret 2025.",
       "Berdasarkan hasil telaahan, penggunaan rumah sakit lain dinilai tidak efektif sehingga dipilih penguatan koordinasi bimbingan antara CI dan mahasiswa."]
    ],
    catatanData: [
      "Kop dokumen tertulis 'Jurusan: Fisioterapi' — seharusnya Jurusan Gizi (salin-tempel templat Profesi Fisioterapi).",
      "Aspek Bagian H identik dengan Profesi Fisioterapi (Morning Report, Mini OSCE); perlu dipastikan sesuai metode asesmen profesi dietisien (mis. asuhan gizi terstandar/PAGT, ujian stase).",
      "Indikator IKM 17.3.8 (rasio dosen tetap terhadap mahasiswa) tidak dicantumkan pada Bagian I, padahal kendala Bagian G justru menyangkut kecukupan dosen.",
      "Target prestasi ditulis '100%' (seharusnya jumlah prestasi), target Bahasa Inggris 100%; realisasi Bahasa Inggris, prestasi, dan akreditasi 'Belum ada'.",
      "Kehadiran dosen dan mahasiswa dilaporkan 100% pada seluruh 16 mata kuliah — perlu diverifikasi dengan logbook/presensi lahan praktik.",
      "Rekomendasi butir 2 merujuk kegiatan September 2024 dan Maret 2025 (periode sebelumnya); perlu diperbarui dengan tindak lanjut Semester Genap 2025/2026.",
      "Belum ada lulusan; Uji Kompetensi dijadwalkan Agustus 2026. Nilai TO/Uji Kompetensi 100% perlu dijelaskan (try out internal atau hasil uji kompetensi).",
      "Angkatan 2024 tercatat 3 mahasiswa dengan 1 berhenti — perlu klarifikasi status (mahasiswa mengulang/lanjutan)."
    ]
  }
,
  /* ----------------------------------------------------------------- 15 */
  "d3-kesgi": {
    identitas: { prodi: "D-III Kesehatan Gigi", jenjang: "D-III", jurusan: "Kesehatan Gigi",
      kaprodi: "drg. Surya Irayani Yunus, M.MKes", nipKaprodi: null,
      kajur: "Syamsuddin Abubakar, S.SiT, M.MKes", nipKajur: null, tanggal: "2026-06-25" },
    sumber: { file: "Isian D-III Kesehatan Gigi (diterima melalui pesan Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Penggunaan dan Pemeliharaan Alat Kedokteran Gigi","",100,""],
      ["Bahan Kedokteran Gigi","",100,""],
      ["Farmakologi","",100,""],
      ["Kebutuhan Manusia dalam Kesehatan Gigi","",100,""],
      ["Manajemen Kesehatan Gigi dan Mulut","",100,""],
      ["Pengendalian Infeksi Silang","",100,""],
      ["Pendidikan Budaya Anti Korupsi","",100,""],
      ["Penyakit Gigi dan Mulut","",100,""],
      ["Kewarganegaraan","",100,""],
      ["Ilmu Penyakit Umum dalam Keperawatan Gigi","",100,""],
      ["Psikologi Keperawatan Gigi","",100,""],
      ["Teknologi Informasi Kesehatan","",100,""],
      ["Media Komunikasi","",100,""],
      ["Sosiologi Kesehatan","",100,""],
      ["Metodologi Penelitian dan Statistik","",100,""],
      ["Kewirausahaan (baris 16)","",100,""],
      ["Pencegahan Penyakit Gigi dan Mulut","",100,""],
      ["Asuhan Kesehatan Gigi dan Mulut Individu","",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana","",100,""],
      ["Kapita Selekta","",100,""],
      ["Kegawatdaruratan Medik Gigi","",100,""],
      ["Konsep Dasar UKGS","",100,""],
      ["Kewirausahaan (baris 23)","",100,""],
      ["Karya Tulis Ilmiah","",100,""],
      ["Penatalaksanaan Asuhan Kesehatan Gigi dan Mulut Masyarakat","",100,""],
      ["Penatalaksanaan Promosi Kesehatan Gigi dan Mulut","",100,""],
      ["Magang","",100,""],
      ["Dasar-dasar Media Komunikasi, Informasi, dan Edukasi","",100,""]
    ],
    mhs: [
      ["Penggunaan dan Pemeliharaan Alat Kedokteran Gigi",100,""],
      ["Bahan Kedokteran Gigi",100,""],
      ["Farmakologi",100,""],
      ["Kebutuhan Manusia dalam Kesehatan Gigi",100,""],
      ["Manajemen Kesehatan Gigi dan Mulut",100,""],
      ["Pengendalian Infeksi Silang",98,""],
      ["Pendidikan Budaya Anti Korupsi",92.6,""],
      ["Penyakit Gigi dan Mulut",100,""],
      ["Kewarganegaraan",98.64,""],
      ["Ilmu Penyakit Umum dalam Keperawatan Gigi",100,""],
      ["Psikologi Keperawatan Gigi",99.7,""],
      ["Teknologi Informasi Kesehatan",98,""],
      ["Media Komunikasi",100,""],
      ["Sosiologi Kesehatan",100,""],
      ["Metodologi Penelitian dan Statistik",97.6,""],
      ["Kewirausahaan (baris 16)",97.85,""],
      ["Pencegahan Penyakit Gigi dan Mulut",100,""],
      ["Asuhan Kesehatan Gigi dan Mulut Individu",97.5,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana",100,""],
      ["Kapita Selekta",94.4,""],
      ["Kegawatdaruratan Medik Gigi",97.7,""],
      ["Konsep Dasar UKGS",98.7,""],
      ["Kewirausahaan (baris 23)",94,""],
      ["Karya Tulis Ilmiah",100,""],
      ["Penatalaksanaan Asuhan Kesehatan Gigi dan Mulut Masyarakat",100,""],
      ["Penatalaksanaan Promosi Kesehatan Gigi dan Mulut",100,""],
      ["Magang",100,""],
      ["Dasar-dasar Media Komunikasi, Informasi, dan Edukasi",99.3,""]
    ],
    prestasi: [
      { nama: "Nadya Anggraeni Putri", jenis: "Embu Kyu I Putri — Shorinji Kempo Rector Unhas Cup XVIII 2026", tingkat: "Nasional", capaian: "Juara 1" },
      { nama: "Nadya Anggraeni", jenis: "Embu Beregu — Shorinji Kempo Rector Unhas Cup XVIII 2026", tingkat: "Nasional", capaian: "Juara 2" }
    ],
    ukt: [
      { angkatan: "Tingkat I/2025", jumlah: 69, lunasPct: 98.55, ket: "Dokumen: 98,6% lunas; 1 mahasiswa belum lunas" },
      { angkatan: "Tingkat II/2024", jumlah: 102, lunasPct: 99.02, ket: "Dokumen: 99% lunas; 1 mahasiswa belum lunas" },
      { angkatan: "Tingkat III/2023", jumlah: 86, lunasPct: 100, ket: "" },
      { angkatan: "Angkatan 2022", jumlah: 3, lunasPct: 0, ket: "3 mahasiswa belum lunas (100%)" }
    ],
    retensi: [
      { angkatan: "Tingkat I", cuti: 0, do: 4, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Tingkat II", cuti: 2, do: 5, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Tingkat III", cuti: 0, do: 0, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["Tidak 100%","","","","",""] },
    kendala: {
      sarpras: { mk: "Penggunaan dan Pemeliharaan Alat Kedokteran Gigi (PPAKG), Pengendalian Infeksi Silang, Pencabutan Gigi, Promosi berbasis teknologi informasi", uraian: "Instrumen dan alat belum memadai secara kuantitas; sarana media promosi masih milik mahasiswa" },
      dosen:   { mk: "", uraian: "" },
      lms:     { mk: "Semua mata kuliah", uraian: "Dosen belum tertarik menggunakan LMS Edlink" },
      bahan:   { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","B"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Tingkat I", ips: 3.69, ipk: 3.66, ukom: null, kendala: "" },
      { angkatan: "Tingkat II", ips: 3.45, ipk: 3.69, ukom: null, kendala: "" },
      { angkatan: "Tingkat III", ips: 3.58, ipk: 3.71, ukom: null, kendala: "" }
    ],
    lulus: [ { tahun: "2025", jumlah: 96, tepat: 93, ket: "Dokumen: 97% tepat waktu; 3 orang (3%) tidak tepat waktu" } ],
    kpi: {
      ukom: { target: "100%", real: "Belum terlaksana" }, tepatWaktu: { target: "100%", real: "Belum yudisium" },
      rasio: { target: "1:28", real: "1:33" }, inggris: { target: "100%", real: "25%" },
      prestasi: { target: "8", real: "2" }, akreditasi: { target: "1", real: "1" }
    },
    rekomendasi: [
      ["Mahasiswa tidak diberikan izin praktik di klinik swasta","Memberikan kesempatan kepada mahasiswa untuk memilih tempat magang selain yang diwajibkan kampus"],
      ["Dosen tidak menggunakan LMS Edlink","Memotivasi dan mendampingi dosen dalam penggunaan Edlink"],
      ["Pengelolaan limbah medis belum optimal","Memenuhi regulasi pengelolaan limbah melalui kerja sama dengan pengelola limbah berizin"],
      ["Kekurangan alat klinik","Menyusun perencanaan pengadaan berbasis kebutuhan"],
      ["Prestasi mahasiswa masih rendah","Meningkatkan pembinaan mahasiswa"]
    ],
    catatanData: [
      "Nama dosen pengampu tidak dicantumkan pada Bagian B; kotak Jenjang pada Bagian A tidak dicentang.",
      "Mata kuliah Kewirausahaan tercatat dua kali (baris 16 dan 23) tanpa keterangan semester/kelas; di aplikasi dibedakan menurut nomor baris.",
      "Bagian F butir 1 dicentang 'Sesuai' tetapi keterangan 'Tidak 100%' — perlu dicantumkan persentase RPS yang terkumpul sebelum semester.",
      "UKT Angkatan 2022: 3 mahasiswa (100%) belum lunas — perlu klarifikasi status akademik (masa studi melewati 6 semester).",
      "Sembilan mahasiswa berhenti (Tingkat I: 4, Tingkat II: 5) — perlu analisis penyebab dan program retensi.",
      "Realisasi kelulusan tepat waktu ditulis 'Belum yudisium', padahal tabel kelulusan 2025 menunjukkan 93 dari 96 (96,88%).",
      "Rasio dosen 1:33 melebihi target 1:28; target Bahasa Inggris ditulis 100% (target institusi 10,31%).",
      "Prestasi atas nama 'Nadya Anggraeni Putri' dan 'Nadya Anggraeni' kemungkinan orang yang sama — perlu konsistensi penulisan nama.",
      "Rekomendasi butir 1 (kebebasan memilih tempat magang/klinik swasta) merupakan kebijakan institusi yang perlu dikaji bersama Wakil Direktur I dan unit kerja sama.",
      "Tanggal pengisian (25 Juni 2026) berbeda dengan tanggal pengesahan (9 Juli 2026)."
    ]
  }
,
  /* ----------------------------------------------------------------- 16 */
  "str-kep": {
    identitas: { prodi: "Sarjana Terapan Keperawatan", jenjang: "Sarjana Terapan", jurusan: "Keperawatan",
      kaprodi: "Junaidi, S.ST., S.Kep., M.Kes", nipKaprodi: null,
      kajur: null, nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "14. Sarjana Terapan Keperawatan.docx (diunggah Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Patofisiologi","Dr. Sukriyadi, S.Kep., Ns., M.Kes",100,""],
      ["Farmakologi","Ambo Dalle, S.Kep., Ns., M.Kes",100,""],
      ["Falsafah dan Teori Keperawatan","Dr. Ismail, S.Kep., Ns., M.Kes",100,""],
      ["Metodologi Keperawatan","Yulianto, S.Kep., Ns., M.Kep",100,""],
      ["Dokumentasi Keperawatan","Yulianto, S.Kep., Ns., M.Kep",100,""],
      ["Manajemen Patient Safety","Rauf Harmiadi, S.Kep., Ns., M.Kes",100,""],
      ["Gizi dan Diet","Dr. Suhartatik, S.Kep., Ns., M.Kes",100,""],
      ["Bahasa Jepang (baris 8)","Dr. Imelda, SS., M.Pd",100,""],
      ["Keperawatan Jiwa","Rahman, S.Pd., A.Kep., M.Kes",100,""],
      ["Praktikum Keperawatan Jiwa","Rahman, S.Pd., A.Kep., M.Kes",100,""],
      ["Keperawatan Gawat Darurat","Mardiana Mustafa, SKM., S.Kep., Ns., M.Kes",100,""],
      ["Keperawatan Kritis","Mardiana Mustafa, SKM., S.Kep., Ns., M.Kes",100,""],
      ["Keperawatan Keluarga","Heriansyah, S.Kep., M.Kes",100,""],
      ["Keperawatan Gerontik","Rauf Harmiadi, S.Kep., Ns., M.Kes",100,""],
      ["Bahasa Inggris","Baharuddin K, S.Pd., M.Pd",100,""],
      ["Promosi Kesehatan","Nasrullah, S.SiT., Ns., M.Kes",100,""],
      ["Praktikum Keperawatan Gawat Darurat dan Kritis","Mardiana Mustafa, SKM., S.Kep., Ns., M.Kes",100,""],
      ["Bahasa Inggris I","Baharuddin K, S.Pd., M.Pd",100,""],
      ["Evidence Based Nursing","Dr. Ruslan Hasani, S.SiT., S.Kep., Ns., M.Kes",100,""],
      ["Keperawatan Komunitas","Rauf Harmiadi, S.Kep., Ns., M.Kes",100,""],
      ["Keperawatan Paliatif","Iwan, S.Kp., M.Kes",100,""],
      ["Praktik Klinik Keperawatan Kritis dan Gawat Darurat","Mardiana Mustafa, SKM., S.Kep., Ns., M.Kes",100,""],
      ["Praktik Klinik Keperawatan Keluarga, Gerontik, dan Komunitas","Rauf Harmiadi, S.Kep., Ns., M.Kes",100,""],
      ["Budaya dan Lingkungan Kerja di Jepang","Dr. Imelda, SS., M.Pd",100,""],
      ["Bahasa Jepang (baris 25)","Dr. Imelda, SS., M.Pd",100,""]
    ],
    mhs: [
      ["Patofisiologi",98,""],
      ["Farmakologi",98,""],
      ["Falsafah dan Teori Keperawatan",98,""],
      ["Metodologi Keperawatan",97,""],
      ["Dokumentasi Keperawatan",97,""],
      ["Manajemen Patient Safety",98,""],
      ["Gizi dan Diet",99,""],
      ["Bahasa Jepang (baris 8)",99,""],
      ["Keperawatan Jiwa",99,""],
      ["Praktikum Keperawatan Jiwa",99,""],
      ["Keperawatan Gawat Darurat",98,""],
      ["Keperawatan Kritis",98,""],
      ["Keperawatan Keluarga",98,""],
      ["Keperawatan Gerontik",99,""],
      ["Bahasa Inggris",98,""],
      ["Promosi Kesehatan",97,""],
      ["Praktikum Keperawatan Gawat Darurat dan Kritis",99,""],
      ["Bahasa Inggris I",98,""],
      ["Evidence Based Nursing",97,""],
      ["Keperawatan Komunitas",98,""],
      ["Keperawatan Paliatif",97,""],
      ["Praktik Klinik Keperawatan Kritis dan Gawat Darurat",100,""],
      ["Praktik Klinik Keperawatan Keluarga, Gerontik, dan Komunitas",100,""],
      ["Budaya dan Lingkungan Kerja di Jepang",98,""],
      ["Bahasa Jepang (baris 25)",98,""]
    ],
    prestasi: [
      { nama: "Indra Firmansyah", jenis: "Lomba Video Edukatif (tim)", tingkat: "Nasional", capaian: "Juara II (tim)" },
      { nama: "Egeire Nayla", jenis: "Lomba Video Edukatif (tim)", tingkat: "Nasional", capaian: "Juara II (tim)" },
      { nama: "Hilda Maulida Jafar", jenis: "Lomba Video Edukatif (tim)", tingkat: "Nasional", capaian: "Juara II (tim)" },
      { nama: "Raodhatul Jannah Mustafa", jenis: "Musabaqah Tilawatil Qur'an (MTQ)", tingkat: "Provinsi", capaian: "Juara II" }
    ],
    ukt: [
      { angkatan: "Angkatan 2025", jumlah: 100, lunasPct: 92, ket: "8% belum lunas" },
      { angkatan: "Angkatan 2024", jumlah: 97, lunasPct: 89.6, ket: "Dokumen: 89,6% lunas dan 10,1% belum lunas (jumlah 99,7%)" },
      { angkatan: "Angkatan 2023", jumlah: 91, lunasPct: 87.9, ket: "12,1% belum lunas" }
    ],
    retensi: [
      { angkatan: "Angkatan 2025", cuti: 0, do: 8, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2024", cuti: 0, do: 10, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2023", cuti: 0, do: 8, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "Keperawatan Dasar; Keperawatan Anak",
                 uraian: "Sarana laboratorium: tempat tidur terbuka dan tertutup, bantal dan sarung bantal, laken, stik laken, perlak, kursi roda, manekin praktik pemenuhan kebutuhan dasar, dan manekin pemeriksaan antropometri anak. Prasarana: belum tersedia Smart TV di semua ruang laboratorium dan pendingin ruangan (AC) belum merata." },
      dosen:   { mk: "Keperawatan Anak; Keperawatan Maternitas; Keperawatan Komunitas; Keperawatan Jiwa", uraian: "Belum ada dosen berkualifikasi S2 Keperawatan dan spesialis keperawatan" },
      lms:     { mk: "", uraian: "" },
      bahan:   { mk: "Keperawatan Anak", uraian: "Belum tersedia bahan ajar audiovisual untuk pemeriksaan suara napas tambahan, suara jantung, dan bising usus" },
      lain:    { mk: "Keperawatan Dasar; Keperawatan Anak", uraian: "Ruang perkuliahan kurang kondusif (masih menggunakan kipas angin), LCD tidak mencukupi, dan pengeras suara tidak tersedia di semua kelas" }
    },
    evaluasi: { varian: "reguler", status: [null,null,null,null,null,null], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Angkatan 2025", ips: 3.52, ipk: 3.55, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2024", ips: 3.95, ipk: 3.97, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2023", ips: 3.77, ipk: 3.79, ukom: null, kendala: "" }
    ],
    lulus: [],
    kpi: {
      ukom: { target: "", real: "" }, tepatWaktu: { target: "", real: "" },
      rasio: { target: "", real: "" }, inggris: { target: "", real: "" },
      prestasi: { target: "", real: "" }, akreditasi: { target: "", real: "" }
    },
    rekomendasi: [],
    catatanData: [
      "Isian belum lengkap: Bagian F (Capaian RPS), H (Evaluasi Hasil Belajar), I (KPI Institusi), dan J (Rekomendasi) kosong; tabel kelulusan tepat waktu kosong.",
      "Lembar pengesahan belum ditandatangani dan belum bertanggal; nama dan NIP Ketua Jurusan serta NIP Ketua Program Studi tidak dicantumkan.",
      "Ketaatan UKT rendah: 92% (2025), 89,6% (2024), dan 87,9% (2023) — terendah di antara program studi yang telah melapor; persentase 2024 tidak berjumlah 100% (89,6% + 10,1%).",
      "Mahasiswa berhenti 26 orang (2025: 8; 2024: 10; 2023: 8), sekitar 9% dari 288 mahasiswa tercatat — perlu analisis penyebab segera dan program retensi.",
      "Tiga peringkat IPK tingkat program studi dilaporkan sebagai prestasi; di aplikasi tidak dihitung sebagai prestasi mahasiswa (IKM 17.3.13) karena bukan prestasi kompetisi. Lomba video edukatif tim dihitung per mahasiswa sesuai isian.",
      "Bahasa Jepang tercatat dua kali (baris 8 dan 25) tanpa keterangan semester/kelas.",
      "Angkatan tertua 2023 sehingga belum ada lulusan; Uji Kompetensi dan kelulusan tepat waktu belum dapat dinilai.",
      "Kehadiran dosen 100% pada seluruh mata kuliah — perlu diverifikasi dengan rekapitulasi presensi SIAKAD."
    ]
  }
,
  /* ----------------------------------------------------------------- 17 */
  "str-bidan": {
    identitas: { prodi: "Sarjana Terapan Kebidanan", jenjang: "Sarjana Terapan", jurusan: "Kebidanan",
      kaprodi: "Wirawati Amin, S.ST., M.Keb", nipKaprodi: null,
      kajur: "Hj. Sitti Mukarramah, S.ST., M.Keb", nipKajur: null, tanggal: "2026-07-07" },
    sumber: { file: "14. Prodi S.Tr. Kebidanan.pdf (diunggah Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Asuhan Kebidanan Kegawatdaruratan Maternal dan Neonatal","Afriani, S.ST., M.Keb; Dr. Hidayati, S.ST., M.Keb; Hj. Ros Rahmawati, SKM., M.Sc; Fitriati Sabur, S.SiT., SKM., M.Keb; Agustina Ningsi, S.ST., M.Kes",100,""],
      ["Asuhan Kebidanan Kehamilan","Marhaeni, S.ST., M.Kes; Afriani, S.ST., M.Keb; Subriah, S.ST., M.Kes; Hastuti Husain, S.ST., M.Keb",100,""],
      ["Asuhan Kebidanan Kolaborasi pada Kasus Patologi dan Komplikasi","Syaniah Umar, S.ST., M.Keb; Zulaeha A. Amdadi, S.ST., M.Kes; Agustina Ningsi, S.ST., M.Kes",100,""],
      ["Asuhan Kebidanan Komunitas (Reguler Tingkat III)","Wirawati Amin, S.ST., M.Keb; Hj. Suriani B, SKM., M.Sc; Hj. Sitti Mukarramah, S.ST., M.Keb",100,""],
      ["Asuhan Kebidanan Komunitas (Reguler Tingkat IV)","Hj. Suriani B, SKM., M.Sc; Hj. Sitti Mukarramah, S.ST., M.Keb; Subriah, S.ST., M.Kes; Wirawati Amin, S.ST., M.Keb",100,""],
      ["Bahasa Inggris (Kelas RPL)","Dr. Agussalim, S.Kp., MSN",100,""],
      ["Biologi Reproduksi dan Genetika Dasar (Kelas Reguler)","Asmawati G, SKM., M.Kes; Citrawati, S.ST., M.Keb",100,""],
      ["Biologi Reproduksi dan Genetika Dasar (Kelas RPL)","Asmawati G, SKM., M.Kes; Citrawati, S.ST., M.Keb",100,""],
      ["Biostatistik","Ade Devriany, SKM., M.Kes; Junaedy J. Barahima, SKM., M.Kes",100,""],
      ["Epidemiologi","Ade Devriany, SKM., M.Kes; Marhaeni, S.ST., M.Kes",100,""],
      ["Etika Profesi dan Perundang-undangan","Agustina Ningsi, S.ST., M.Kes; Hj. Ros Rahmawati, SKM., M.Sc; I Made Sukarta, A.Kep., M.Kes",100,""],
      ["Farmakologi","Rusdiaman",100,""],
      ["Ginekologi","dr. Hasnawaty, Sp.OG",100,""],
      ["Gizi Reproduksi","Aswita Amir, A, M.Si, RD; Chaerunnimah, SKM., M.Kes",100,""],
      ["Ilmu Kesehatan Anak (Kelas Reguler)","dr. Besse Sarmila, M.Kes., Sp.A(K)",100,""],
      ["Ilmu Kesehatan Anak (Kelas RPL)","dr. Besse Sarmila, M.Kes., Sp.A(K)",100,""],
      ["Kesehatan Mental Perempuan","Dr. Hidayati, S.ST., M.Keb; Andi Syintha Ida, S.ST., M.Kes",100,""],
      ["Kewirausahaan dalam Kebidanan (Kelas Reguler)","Andi Syintha Ida, S.ST., M.Kes; Afriani, S.ST., M.Keb; Fitriati Sabur, S.SiT., SKM., M.Keb; I Made Sukarta, A.Kep., M.Kes",100,""],
      ["Kewirausahaan dalam Kebidanan (Kelas RPL)","Hastuti Husain, S.ST., M.Keb; Afriani, S.ST., M.Keb; Andi Syintha Ida, S.ST., M.Kes",100,""],
      ["Kolaborasi Interprofesional dalam Pelayanan KIA/KB (Kelas Reguler)","Subriah, S.ST., M.Kes; Hj. Sitti Mukarramah, S.ST., M.Keb",100,""],
      ["Kolaborasi Interprofesional dalam Pelayanan KIA/KB (Kelas RPL)","Subriah, S.ST., M.Kes; Dr. Hidayati, S.ST., M.Keb",100,""],
      ["Konsep Kebidanan","Syaniah Umar, S.ST., M.Keb; Hj. Suriani B, SKM., M.Sc; Zulaeha Amdadi, S.ST., M.Kes",100,""],
      ["Konsep Pemberdayaan Perempuan","Wirawati Amin, S.ST., M.Keb; Hj. Sitti Mukarramah, S.ST., M.Keb",100,""],
      ["Metode Penelitian","Asmawati G, SKM., M.Kes; Ade Devriany, SKM., M.Kes",100,""],
      ["Obstetri","dr. Hasnawaty, Sp.OG",100,""],
      ["Pendekatan Holistik dalam Kebidanan","Syaniah Umar, S.ST., M.Keb; Hj. Ros Rahmawati, SKM., M.Sc",100,""],
      ["Praktik Continuum of Care Maternal and Neonatal","Tim dosen",100,""],
      ["Psikologi Perkembangan (Kelas Reguler)","Dr. Dian Novita Siswanti, S.Psi., M.Psi., Psikolog",100,""],
      ["Psikologi Perkembangan (Kelas RPL)","Dr. Dian Novita Siswanti, S.Psi., M.Psi., Psikolog",100,""],
      ["Sistem Informasi Kesehatan","Hutami Endang, S.Kom., M.Kom",100,""],
      ["Skripsi (Kelas Reguler)","Tim dosen",100,""],
      ["Skripsi (Kelas RPL)","Tim dosen",100,""],
      ["Sosio Antropologi dalam Praktik Kebidanan","Fitriati Sabur, S.SiT., SKM., M.Keb; Asmawati G, SKM., M.Kes; I Made Sukarta, A.Kep., M.Kes",100,""]
    ],
    mhs: [
      ["Asuhan Kebidanan Kegawatdaruratan Maternal dan Neonatal",98.68,""],
      ["Asuhan Kebidanan Kehamilan",100,""],
      ["Asuhan Kebidanan Kolaborasi pada Kasus Patologi dan Komplikasi",100,""],
      ["Asuhan Kebidanan Komunitas (Reguler Tingkat III)",99.34,""],
      ["Asuhan Kebidanan Komunitas (Reguler Tingkat IV)",100,""],
      ["Bahasa Inggris (Kelas RPL)",100,""],
      ["Biologi Reproduksi dan Genetika Dasar (Kelas Reguler)",98.88,""],
      ["Biologi Reproduksi dan Genetika Dasar (Kelas RPL)",100,""],
      ["Biostatistik",100,""],
      ["Epidemiologi",99.5,""],
      ["Etika Profesi dan Perundang-undangan",99.1,""],
      ["Farmakologi",99.33,""],
      ["Ginekologi",100,""],
      ["Gizi Reproduksi",98.21,""],
      ["Ilmu Kesehatan Anak (Kelas Reguler)",100,""],
      ["Ilmu Kesehatan Anak (Kelas RPL)",100,""],
      ["Kesehatan Mental Perempuan",100,""],
      ["Kewirausahaan dalam Kebidanan (Kelas Reguler)",100,""],
      ["Kewirausahaan dalam Kebidanan (Kelas RPL)",100,""],
      ["Kolaborasi Interprofesional dalam Pelayanan KIA/KB (Kelas Reguler)",100,""],
      ["Kolaborasi Interprofesional dalam Pelayanan KIA/KB (Kelas RPL)",100,""],
      ["Konsep Kebidanan",98.43,""],
      ["Konsep Pemberdayaan Perempuan",100,""],
      ["Metode Penelitian",99,""],
      ["Obstetri",100,""],
      ["Pendekatan Holistik dalam Kebidanan",100,""],
      ["Praktik Continuum of Care Maternal and Neonatal",100,""],
      ["Psikologi Perkembangan (Kelas Reguler)",100,""],
      ["Psikologi Perkembangan (Kelas RPL)",100,""],
      ["Sistem Informasi Kesehatan",100,""],
      ["Skripsi (Kelas Reguler)",100,""],
      ["Skripsi (Kelas RPL)",100,""],
      ["Sosio Antropologi dalam Praktik Kebidanan",100,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "Tingkat I/2025", jumlah: 28, lunasPct: 100, ket: "" }, { angkatan: "Tingkat II/2024", jumlah: 14, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat III/2023", jumlah: 19, lunasPct: 100, ket: "" }, { angkatan: "Tingkat IV/2022", jumlah: 12, lunasPct: 100, ket: "" },
      { angkatan: "RPL/2025", jumlah: 31, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Kelas RPL", cuti: 0, do: 2, skors: 0, pindah: 0, ket: "Tidak dirinci per angkatan" },
      { angkatan: "Kelas Reguler", cuti: 0, do: 2, skors: 0, pindah: 0, ket: "Tidak dirinci per angkatan" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "Semua mata kuliah teori", uraian: "LCD di kelas berkedip sehingga mengganggu perkuliahan dan sulit terhubung dengan laptop; mahasiswa mengusulkan penggantian kursi kuliah" },
      dosen: { mk: "", uraian: "" }, lms: { mk: "", uraian: "" }, bahan: { mk: "", uraian: "" }, lain: { mk: "", uraian: "" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Tingkat I/2025", ips: 3.91, ipk: 3.85, ukom: null, kendala: "Tidak ada Uji Kompetensi pada jenjang Sarjana Terapan" },
      { angkatan: "Tingkat II/2024", ips: 3.86, ipk: 3.86, ukom: null, kendala: "" },
      { angkatan: "Tingkat III/2023", ips: 3.89, ipk: 3.82, ukom: null, kendala: "" },
      { angkatan: "Tingkat IV/2022", ips: 4.00, ipk: 3.86, ukom: null, kendala: "" },
      { angkatan: "RPL/2025", ips: 3.95, ipk: 3.66, ukom: null, kendala: "" }
    ],
    lulus: [
      { tahun: "Tingkat IV/2022", jumlah: 12, tepat: 12, ket: "Dokumen: 100%" },
      { tahun: "RPL/2025", jumlah: 31, tepat: 31, ket: "Dokumen: 100%" }
    ],
    kpi: {
      ukom: { target: "Tidak ada Uji Kompetensi pada jenjang Sarjana Terapan", real: "" }, tepatWaktu: { target: "100%", real: "100%" },
      rasio: { target: "1:28", real: "1:17" }, inggris: { target: "100%", real: "Kurang dari 50% (angka pasti tidak dicantumkan)" },
      prestasi: { target: "", real: "" }, akreditasi: { target: "", real: "Unggul" }
    },
    rekomendasi: [
      ["Pengisian pembelajaran pada SIAKAD secara waktu nyata (real time) belum maksimal","Memotivasi dosen mengisi SIAKAD secara waktu nyata"],
      ["Pengumpulan RPS tepat waktu sebelum proses belajar mengajar belum maksimal","Memotivasi dosen mengumpulkan RPS tepat waktu dan melakukan evaluasi secara berkala"]
    ],
    catatanData: [
      "Bagian F dicentang 'Sesuai' untuk ketersediaan RPS sebelum semester, tetapi Bagian J menyatakan pengumpulan RPS tepat waktu belum maksimal — perlu persentase RPS yang terkumpul tepat waktu.",
      "Retensi tidak dirinci per angkatan (Kelas RPL 2 orang dan Kelas Reguler 2 orang berhenti).",
      "Tabel kelulusan mencantumkan Tingkat IV/2022 (12) dan RPL/2025 (31) lulus 100% tepat waktu, padahal semester Genap 2025/2026 belum berakhir saat pengisian — perlu dipastikan apakah sudah yudisium.",
      "Realisasi dosen berkemampuan Bahasa Inggris ditulis '< 50%' tanpa angka pasti; target ditulis 100% (target institusi 10,31%).",
      "Tidak ada prestasi mahasiswa yang dilaporkan; Uji Kompetensi tidak berlaku pada jenjang Sarjana Terapan Kebidanan (dilaksanakan setelah pendidikan profesi).",
      "Mata kuliah Konsep Pemberdayaan Perempuan ditandai '(RPL)' pada Bagian C tetapi tidak pada Bagian B.",
      "Kehadiran dosen 100% pada seluruh mata kuliah — perlu diverifikasi dengan rekapitulasi presensi SIAKAD."
    ]
  }
,
  /* ----------------------------------------------------------------- 18 */
  "str-farmasi": {
    identitas: { prodi: "Sarjana Terapan Farmasi", jenjang: "Sarjana Terapan", jurusan: "Farmasi",
      kaprodi: "apt. Santi Sinala, S.Si., M.Si", nipKaprodi: null,
      kajur: "apt. Ida Adhayanti, S.Si., M.Sc", nipKajur: null, tanggal: "2026-06-26" },
    sumber: { file: "Isian Sarjana Terapan Farmasi (diterima melalui pesan Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Terminologi Medis dan Alat Kesehatan","",100,""],
      ["Kimia Organik","",100,""],
      ["Patofisiologi","",100,""],
      ["Mikrobiologi dan Parasitologi","",100,""],
      ["Fisika Farmasi","",100,""],
      ["Teknologi Sediaan Solid","",100,""],
      ["Praktikum Teknologi Sediaan Solid","",100,""],
      ["Farmakognosi","",100,""],
      ["Biokimia","",100,""],
      ["Biologi Sel Molekuler dan Imunologi Farmasi","",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana","",100,""],
      ["Teknologi Sediaan Steril","",100,""],
      ["Praktikum Teknologi Sediaan Steril","",100,""],
      ["Farmasi Komunitas","",100,""],
      ["Manajemen Farmasi","",100,""],
      ["Pengantar Farmasi Klinik","",100,""],
      ["Komunikasi Farmasi","",100,""],
      ["Aseptic Handling dan Nutrisi Parenteral","",100,""],
      ["Kimia Analisis Pangan","",100,""],
      ["Pengantar Farmakovigilans","",100,""],
      ["Statistik Farmasi","",100,""],
      ["Praktikum Statistik dan Komputasi","",100,""],
      ["Metodologi Penelitian","",100,""],
      ["Farmasi Kesehatan Masyarakat","",100,""],
      ["Praktik Penyuluhan Kesehatan","",100,""],
      ["Obat Herbal","",100,""],
      ["Praktikum Obat Herbal","",100,""],
      ["Kosmetologi dan Nutraseutikal","",100,""],
      ["Praktikum Kosmetologi dan Nutraseutikal","",100,""],
      ["Aseptic Handling","",100,""],
      ["Praktikum Aseptic Handling","",100,""],
      ["Praktik Kewirausahaan","",100,""],
      ["Praktik Kerja Lapangan (PKL) Puskesmas","",100,""],
      ["Praktik Kerja Lapangan (PKL) Analisis Obat dan Makanan","",100,""],
      ["Seminar Hasil","",100,""],
      ["Skripsi","",100,""],
      ["Ujian Skripsi","",100,""]
    ],
    mhs: [
      ["Terminologi Medis dan Alat Kesehatan",100,""],
      ["Kimia Organik",100,""],
      ["Patofisiologi",100,""],
      ["Mikrobiologi dan Parasitologi",100,""],
      ["Fisika Farmasi",100,""],
      ["Teknologi Sediaan Solid",100,""],
      ["Praktikum Teknologi Sediaan Solid",100,""],
      ["Farmakognosi",100,""],
      ["Biokimia",100,""],
      ["Biologi Sel Molekuler dan Imunologi Farmasi",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana",100,""],
      ["Teknologi Sediaan Steril",100,""],
      ["Praktikum Teknologi Sediaan Steril",100,""],
      ["Farmasi Komunitas",100,""],
      ["Manajemen Farmasi",100,""],
      ["Pengantar Farmasi Klinik",100,""],
      ["Komunikasi Farmasi",100,""],
      ["Aseptic Handling dan Nutrisi Parenteral",100,""],
      ["Kimia Analisis Pangan",100,""],
      ["Pengantar Farmakovigilans",100,""],
      ["Statistik Farmasi",100,""],
      ["Praktikum Statistik dan Komputasi",100,""],
      ["Metodologi Penelitian",100,""],
      ["Farmasi Kesehatan Masyarakat",100,""],
      ["Praktik Penyuluhan Kesehatan",100,""],
      ["Obat Herbal",100,""],
      ["Praktikum Obat Herbal",100,""],
      ["Kosmetologi dan Nutraseutikal",100,""],
      ["Praktikum Kosmetologi dan Nutraseutikal",100,""],
      ["Aseptic Handling",100,""],
      ["Praktikum Aseptic Handling",100,""],
      ["Praktik Kewirausahaan",100,""],
      ["Praktik Kerja Lapangan (PKL) Puskesmas",100,""],
      ["Praktik Kerja Lapangan (PKL) Analisis Obat dan Makanan",100,""],
      ["Seminar Hasil",100,""],
      ["Skripsi",100,""],
      ["Ujian Skripsi",100,""]
    ],
    prestasi: [
      { nama: "Akhmad Faqkhi A. Maudjik", jenis: "Lomba Esai Nasional PHIL (Polytechnic Health Innovation League)", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Akhmad Faqkhi A. Maudjik", jenis: "Soedirman Cendekia National Essay Competition (SOANCOM) 2026", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Ai Syamsi Dwi Emilia", jenis: "As-Shaydalah National Event of Pharmacy (ANEPH) 2026", tingkat: "Nasional", capaian: "Juara 1" },
      { nama: "Akhmad Faqkhi A. Maudjik", jenis: "Lomba Esai Ilmiah 2026 Poltekkes Kemenkes Banten", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Akhmad Faqkhi A. Maudjik", jenis: "Lomba Esai Ilmiah 2026 Poltekkes Kemenkes Bengkulu", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Nurfarahim Shiren Amira Maisura, Siti Muhajiroh Eka L.", jenis: "Lomba Gen Z Health Awareness and Education 2026", tingkat: "Nasional", capaian: "Juara 3" },
      { nama: "Akhmad Faqkhi A. Maudjik", jenis: "Lomba Esai Ilmiah 2026 Poltekkes Kemenkes Semarang", tingkat: "Nasional", capaian: "Juara 3" },
      { nama: "Akhmad Faqkhi A. Maudjik", jenis: "Lomba Infografis Imagine Camp Season XV Poltekkes Kemenkes Makassar", tingkat: "Kabupaten/Kota", capaian: "Juara 2" }
    ],
    ukt: [
      { angkatan: "Angkatan 2022", jumlah: 49, lunasPct: 100, ket: "" },
      { angkatan: "Angkatan 2023", jumlah: 79, lunasPct: 98.73, ket: "1,26% belum lunas (mahasiswa mengundurkan diri)" },
      { angkatan: "Angkatan 2024", jumlah: 47, lunasPct: 97.87, ket: "2,13% belum lunas (mahasiswa cuti)" },
      { angkatan: "Angkatan 2025", jumlah: 45, lunasPct: 100, ket: "" }
    ],
    retensi: [
      { angkatan: "Angkatan 2023", cuti: 0, do: 1, skors: 0, pindah: 0, ket: "Mengundurkan diri" },
      { angkatan: "Angkatan 2024", cuti: 1, do: 0, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "Praktikum di laboratorium", uraian: "Bak cuci alat dan keran air rusak; jumlah alat dan bahan yang datang tidak sesuai pesanan; sebagian alat dan bahan tidak tersedia (mis. ampul dan vial kosong); alat dan bahan baru tersedia di akhir semester setelah praktikum selesai" },
      dosen:   { mk: "Praktikum di laboratorium", uraian: "Tidak ada laboran di setiap laboratorium sehingga persiapan alat dan bahan dilakukan oleh dosen" },
      lms:     { mk: "Semua mata kuliah", uraian: "Tanda tangan dosen tidak tampil pada berkas SIAKAD meskipun sudah diunggah; nama tim pengajar/pengawas tidak muncul; jadwal yang bersamaan sulit diatur di SIAKAD" },
      bahan:   { mk: "", uraian: "" },
      lain:    { mk: "Administrasi akademik", uraian: "Kekurangan tenaga kependidikan: administrasi akademik terkendala karena Ketua Program Studi merangkap tugas tenaga administrasi" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["Sistem blok","Sistem blok","","","",""] },
    ipk: [
      { angkatan: "Angkatan 2022", ips: null, ipk: 3.80, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2023", ips: null, ipk: 3.81, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2024", ips: null, ipk: 3.78, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2025", ips: null, ipk: 3.45, ukom: null, kendala: "" }
    ],
    lulus: [],
    kpi: {
      ukom: { target: "95,51%", real: "Belum ujian" }, tepatWaktu: { target: "100%", real: "100%" },
      rasio: { target: "1:28", real: "1:27,25" }, inggris: { target: "100%", real: "25%" },
      prestasi: { target: "8", real: "8" }, akreditasi: { target: "Unggul", real: "Baik Sekali" }
    },
    rekomendasi: [
      ["Pemenuhan alat dan bahan praktikum","Alat dan bahan disediakan tepat waktu sebelum praktikum; memastikan ketersediaan alat dan bahan inti (mis. ampul dan vial sesuai spesifikasi untuk praktikum teknologi steril dan aseptic handling); memperbaiki bak cuci dan keran air"],
      ["Ketersediaan tenaga PLP/laboran","Menyediakan tenaga PLP/laboran"],
      ["Ketersediaan tenaga kependidikan","Menyediakan tenaga kependidikan"],
      ["SIAKAD Sevima","Peningkatan (upgrade) fitur SIAKAD"]
    ],
    catatanData: [
      "Nama dosen pengampu tidak dicantumkan pada Bagian B; rata-rata IPS tidak diisi.",
      "Kehadiran dosen dan mahasiswa 100% pada seluruh 37 mata kuliah — perlu diverifikasi dengan rekapitulasi presensi SIAKAD.",
      "Tabel kelulusan mencantumkan 49 lulusan 2026 tanpa angka tepat waktu ('Belum UKOM'), tetapi Bagian I menulis realisasi tepat waktu 100% — tabel kelulusan tidak dimasukkan ke perhitungan sampai data dikonfirmasi.",
      "Mahasiswa yang belum lunas UKT adalah mahasiswa yang mengundurkan diri (2023) dan cuti (2024); bila tidak wajib membayar, ketaatan UKT efektif 100%.",
      "Enam dari delapan prestasi diraih oleh satu mahasiswa (Akhmad Faqkhi A. Maudjik); satu prestasi tingkat kabupaten/kota. Perlu pembinaan agar sebaran prestasi lebih merata.",
      "Akreditasi 'Baik Sekali' belum mencapai target Unggul (IKM 17.3.14); target Bahasa Inggris ditulis 100% (target institusi 10,31%).",
      "Bagian G butir 4 diganti menjadi 'Sumber daya tenaga kependidikan' (format asli: Bahan Ajar/Referensi); di aplikasi dicatat pada kategori Lainnya.",
      "Isian menyebut tangkapan layar SIAKAD sebagai bukti kendala, tetapi gambar tidak disertakan dalam data yang diterima.",
      "Tanggal pengisian (26 Juni 2026) berbeda dengan tanggal pengesahan (10 Juli 2026)."
    ]
  }
,
  /* ----------------------------------------------------------------- 19 */
  "d3-farmasi": {
    identitas: { prodi: "D-III Farmasi", jenjang: "D-III", jurusan: "Farmasi",
      kaprodi: "apt. Arisanty, S.Si., M.Si", nipKaprodi: null,
      kajur: "apt. Ida Adhayanti, S.Si., M.Sc", nipKajur: null, tanggal: "2026-07-02" },
    sumber: { file: "15. Prodi D3 Farmasi.pdf (diunggah Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Spesialite dan Alat Kesehatan","",100,""],
      ["Kimia Organik","",100,""],
      ["Biokimia","",100,""],
      ["Mikrobiologi dan Parasitologi","",100,""],
      ["Fisika Farmasi","",100,""],
      ["Teknologi Sediaan Solid","",100,""],
      ["Praktikum Teknologi Sediaan Solid","",100,""],
      ["Farmakognosi","",100,""],
      ["Patofisiologi","",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana","",100,""],
      ["Teknologi Sediaan Steril","",100,""],
      ["Praktikum Teknologi Sediaan Steril","",100,""],
      ["Swamedikasi","",100,""],
      ["Manajemen Farmasi","",100,""],
      ["Dasar-Dasar Farmasi Klinik","",100,""],
      ["Komunikasi Farmasi","",100,""],
      ["Metodologi Penelitian","",100,""],
      ["Pengantar Farmakovigilans","",100,""],
      ["Kewirausahaan","",100,""],
      ["Etika dan Perundang-undangan","",100,""],
      ["Praktik Kerja Lapangan (PKL) Rumah Sakit","",100,""],
      ["Praktik Kerja Lapangan (PKL) Puskesmas","",100,""],
      ["Praktik Kerja Lapangan (PKL) Distribusi","",100,""],
      ["Praktik Kerja Lapangan (PKL) Industri","",100,""],
      ["Laporan Tugas Akhir","",100,""]
    ],
    mhs: [
      ["Spesialite dan Alat Kesehatan",100,""],
      ["Kimia Organik",99.5,""],
      ["Biokimia",98.6,""],
      ["Mikrobiologi dan Parasitologi",96.5,""],
      ["Fisika Farmasi",99.1,""],
      ["Teknologi Sediaan Solid",96.46,""],
      ["Praktikum Teknologi Sediaan Solid",99.2,""],
      ["Farmakognosi",97.9,""],
      ["Patofisiologi",97.3,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana",96.7,""],
      ["Teknologi Sediaan Steril",94.88,""],
      ["Praktikum Teknologi Sediaan Steril",95.06,""],
      ["Swamedikasi",94.18,""],
      ["Manajemen Farmasi",95.3,""],
      ["Dasar-Dasar Farmasi Klinik",100,""],
      ["Komunikasi Farmasi",95.5,""],
      ["Metodologi Penelitian",99.2,""],
      ["Pengantar Farmakovigilans",95.5,""],
      ["Kewirausahaan",95.8,""],
      ["Etika dan Perundang-undangan",91.8,""],
      ["Praktik Kerja Lapangan (PKL) Rumah Sakit",100,""],
      ["Praktik Kerja Lapangan (PKL) Puskesmas",100,""],
      ["Praktik Kerja Lapangan (PKL) Distribusi",100,""],
      ["Praktik Kerja Lapangan (PKL) Industri",100,""],
      ["Laporan Tugas Akhir",100,""]
    ],
    prestasi: [
      { nama: "Aisyah Danica Aurellia", jenis: "Health and Law Innovation Debate Competition, Bima International University (tim)", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Sari Ramadhani", jenis: "Health and Law Innovation Debate Competition, Bima International University (tim)", tingkat: "Nasional", capaian: "Juara 2" },
      { nama: "Nadine Issoura Helena Waas", jenis: "Health and Law Innovation Debate Competition, Bima International University (tim)", tingkat: "Nasional", capaian: "Juara 2" }
    ],
    ukt: [
      { angkatan: "Tingkat I/2025", jumlah: 114, lunasPct: 99.12, ket: "113 lunas, 1 belum" },
      { angkatan: "Tingkat II/2024", jumlah: 96, lunasPct: 96.88, ket: "93 lunas, 3 belum" },
      { angkatan: "Tingkat III/2023", jumlah: 95, lunasPct: 98.95, ket: "94 lunas, 1 belum" }
    ],
    retensi: [
      { angkatan: "Angkatan 2024", cuti: 0, do: 2, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2025", cuti: 1, do: 0, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: {
      sarpras: { mk: "Mata kuliah praktikum kelas Makassar dan kelas Parepare",
                 uraian: "Kelas Parepare membutuhkan sarana laboratorium memadai, terutama alat yang sulit dibawa dari Makassar. Di laboratorium: saluran gas bocor; bak cuci alat dan keran air rusak; jumlah alat dan bahan yang datang tidak sesuai pesanan; sebagian alat dan bahan tidak tersedia (mis. ampul dan vial kosong); alat dan bahan baru tersedia di akhir semester setelah praktikum selesai" },
      dosen:   { mk: "Praktikum di laboratorium", uraian: "Tidak ada laboran di setiap laboratorium sehingga persiapan alat dan bahan dilakukan oleh dosen" },
      lms:     { mk: "Semua mata kuliah", uraian: "Tanda tangan dosen tidak tampil pada berkas SIAKAD; SIAKAD tidak mengakomodasi pengisian jadwal dosen tim bila jadwal bentrok" },
      bahan:   { mk: "Semua mata kuliah", uraian: "Tidak tersedia sumber bacaan/referensi mutakhir di jurusan; pemanfaatan perpustakaan digital oleh mahasiswa dan dosen masih rendah" },
      lain:    { mk: "Mata kuliah kelas Parepare", uraian: "Asrama untuk tempat tinggal sementara mahasiswa kelas Parepare selama di Makassar tidak tersedia/tidak memadai" }
    },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["Jadwal blok","Jadwal blok","","","",""] },
    ipk: [
      { angkatan: "Angkatan 2023", ips: 3.17, ipk: 3.78, ukom: null, kendala: "Belum Uji Kompetensi" },
      { angkatan: "Angkatan 2024", ips: 3.75, ipk: 3.81, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2025", ips: 3.23, ipk: 3.76, ukom: null, kendala: "" }
    ],
    lulus: [ { tahun: "2026", jumlah: 96, tepat: 94, ket: "2 mahasiswa tidak tepat waktu (angkatan 2021)" } ],
    kpi: {
      ukom: { target: "95,51%", real: "Belum ujian" }, tepatWaktu: { target: "100%", real: "98,95%" },
      rasio: { target: "1:28", real: "1:27,45" }, inggris: { target: "100%", real: "66,67%" },
      prestasi: { target: "8", real: "1" }, akreditasi: { target: "Unggul", real: "Unggul" }
    },
    rekomendasi: [
      ["Pemenuhan alat dan bahan praktikum","Permintaan alat dan bahan sudah diajukan sebelum semester tetapi baru tersedia di tengah/akhir semester; menyiapkan alat dan bahan inti (mis. ampul dan vial sesuai spesifikasi untuk praktikum teknologi steril dan aseptic handling); memperbaiki bak cuci dan keran air; memperbaiki saluran gas yang bocor"],
      ["Ketersediaan tenaga PLP/laboran","Menyediakan tenaga PLP/laboran"],
      ["Ketersediaan tenaga kependidikan","Menyediakan tenaga kependidikan"],
      ["SIAKAD Sevima","Sosialisasi lanjutan dan penguatan kepada dosen agar lebih aktif menggunakan LMS/SIAKAD Sevima"]
    ],
    catatanData: [
      "Saluran gas laboratorium bocor merupakan risiko keselamatan (K3) dan perlu ditangani segera, tidak menunggu siklus pengadaan berikutnya.",
      "Rata-rata IPS dan IPK tidak konsisten: Angkatan 2025 IPS 3,23 dengan IPK 3,76 setelah dua semester berarti IPS semester pertama sekitar 4,29 (di atas 4,00); Angkatan 2023 IPS 3,17 jauh di bawah IPK 3,78. Perlu verifikasi data dari SIAKAD.",
      "Kelulusan tepat waktu 94 dari 96 = 97,92%, sedangkan Bagian I menulis 98,95%.",
      "Prestasi dilaporkan 3 baris untuk satu lomba tim (debat), sedangkan Bagian I menulis 1 prestasi; aplikasi menghitung per mahasiswa sesuai tabel isian.",
      "Nama dosen pengampu tidak dicantumkan; nama mata kuliah 'Spesiaite dan Alkes' diasumsikan 'Spesialite dan Alat Kesehatan' — perlu konfirmasi.",
      "Kendala pengadaan alat/bahan, ketiadaan laboran, dan kekurangan tenaga kependidikan sama dengan Sarjana Terapan Farmasi — bersifat tingkat jurusan dan perlu ditangani terpadu.",
      "Target Bahasa Inggris ditulis 100% (target institusi 10,31%); kehadiran dosen 100% pada seluruh mata kuliah perlu diverifikasi dengan rekapitulasi presensi SIAKAD.",
      "Tanggal pengisian (2 Juli 2026) berbeda dengan tanggal pengesahan (6 Juli 2026)."
    ]
  }
,
  /* ----------------------------------------------------------------- 20 */
  "str-sanling": {
    identitas: { prodi: "Sarjana Terapan Sanitasi Lingkungan", jenjang: "Sarjana Terapan", jurusan: "Kesehatan Lingkungan",
      kaprodi: "Nurhaidah, SKM., M.Kes", nipKaprodi: null,
      kajur: "Dr. Syamsuddin S, SKM., M.Kes", nipKajur: null, tanggal: "2026-06-24" },
    sumber: { file: "Isian Sarjana Terapan Sanitasi Lingkungan (diterima melalui pesan Kapusbangdik, 7 November 2026)", url: "" },
    dosen: [
      ["Kewarganegaraan","",100,""],
      ["Teknik Perancangan","",100,""],
      ["Perundang-undangan","",100,""],
      ["Pendidikan Budaya Anti Korupsi","",100,""],
      ["Komunikasi Kesehatan dan Pemberdayaan Masyarakat","",100,""],
      ["Pengantar Kesehatan Ibu, Bayi, dan Anak (KIBA)","",100,""],
      ["Bahasa Inggris","",100,""],
      ["Penyakit Berbasis Lingkungan","",100,""],
      ["Epidemiologi Kesehatan Lingkungan","",100,""],
      ["Manajemen Kesehatan","",100,""],
      ["Biostatistik","",100,""],
      ["Manajemen Risiko Kesehatan (baris 12)","",100,""],
      ["Teknologi Sanitasi","",100,""],
      ["Teknologi Air Bersih","",100,""],
      ["Kesehatan dan Keselamatan Kerja","",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana","",100,""],
      ["Penyehatan Tanah","",100,""],
      ["Pengelolaan Sampah","",100,""],
      ["Aplikasi Teknologi Informasi","",100,""],
      ["Inovasi Rekayasa Teknologi Sanitasi","",100,""],
      ["Manajemen Risiko Kesehatan (baris 21)","",100,""],
      ["Praktik Kerja Tempat-Tempat Umum (TTU) dan Sarana Transportasi","",100,""],
      ["Praktik Kerja Industri","",100,""],
      ["Kesehatan dan Keselamatan Kerja (Kelas RPL)","",100,""],
      ["Pemberantasan Penyakit Menular (Kelas RPL)","",100,""],
      ["Pengamanan Limbah Cair (Kelas RPL)","",100,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana (Kelas RPL)","",100,""],
      ["Analisis dan Pengolahan Data (Kelas RPL)","",100,""],
      ["Pendidikan Budaya Anti Korupsi (Kelas RPL)","",100,""],
      ["Promosi Kesehatan (Kelas RPL)","",100,""],
      ["Inovasi Rekayasa Teknologi Sanitasi (Kelas RPL)","",100,""],
      ["Aplikasi Teknologi Informasi (Kelas RPL)","",100,""],
      ["Kesehatan Lingkungan Kawasan Pesisir dan Pantai (Kelas RPL)","",100,""]
    ],
    mhs: [
      ["Kewarganegaraan",94.23,""],
      ["Teknik Perancangan",97.67,""],
      ["Perundang-undangan",99.67,""],
      ["Pendidikan Budaya Anti Korupsi",96.75,""],
      ["Komunikasi Kesehatan dan Pemberdayaan Masyarakat",98.6,""],
      ["Pengantar Kesehatan Ibu, Bayi, dan Anak (KIBA)",97.25,""],
      ["Bahasa Inggris",97.96,""],
      ["Penyakit Berbasis Lingkungan",97.44,""],
      ["Epidemiologi Kesehatan Lingkungan",95.52,""],
      ["Manajemen Kesehatan",98.87,""],
      ["Biostatistik",94.97,""],
      ["Manajemen Risiko Kesehatan (baris 12)",96.24,""],
      ["Teknologi Sanitasi",97.12,""],
      ["Teknologi Air Bersih",95.62,""],
      ["Kesehatan dan Keselamatan Kerja",96.45,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana",95.02,""],
      ["Penyehatan Tanah",91.42,""],
      ["Pengelolaan Sampah",90.35,""],
      ["Aplikasi Teknologi Informasi",92.92,""],
      ["Inovasi Rekayasa Teknologi Sanitasi",96.42,""],
      ["Manajemen Risiko Kesehatan (baris 21)",94.97,""],
      ["Praktik Kerja Tempat-Tempat Umum (TTU) dan Sarana Transportasi",100,""],
      ["Praktik Kerja Industri",99.81,""],
      ["Kesehatan dan Keselamatan Kerja (Kelas RPL)",100,""],
      ["Pemberantasan Penyakit Menular (Kelas RPL)",100,""],
      ["Pengamanan Limbah Cair (Kelas RPL)",98.75,""],
      ["Penanggulangan Krisis Kesehatan pada Bencana (Kelas RPL)",96.02,""],
      ["Analisis dan Pengolahan Data (Kelas RPL)",90.86,""],
      ["Pendidikan Budaya Anti Korupsi (Kelas RPL)",100,""],
      ["Promosi Kesehatan (Kelas RPL)",92.92,""],
      ["Inovasi Rekayasa Teknologi Sanitasi (Kelas RPL)",93.09,""],
      ["Aplikasi Teknologi Informasi (Kelas RPL)",99.34,""],
      ["Kesehatan Lingkungan Kawasan Pesisir dan Pantai (Kelas RPL)",96.52,""]
    ],
    prestasi: [],
    ukt: [
      { angkatan: "Tingkat II/2025", jumlah: 155, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat IV/2024", jumlah: 83, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat VI/2023", jumlah: 70, lunasPct: 100, ket: "" },
      { angkatan: "Tingkat VIII/2022", jumlah: 89, lunasPct: 98.88, ket: "88 lunas, 1 belum (dokumen: 98,87%)" }
    ],
    retensi: [
      { angkatan: "Angkatan 2025", cuti: 0, do: 10, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2024", cuti: 0, do: 5, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2023", cuti: 0, do: 0, skors: 0, pindah: 0, ket: "" },
      { angkatan: "Angkatan 2022", cuti: 0, do: 0, skors: 0, pindah: 0, ket: "" }
    ],
    rps: { status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    kendala: { sarpras:{mk:"",uraian:""}, dosen:{mk:"",uraian:""}, lms:{mk:"",uraian:""}, bahan:{mk:"",uraian:""}, lain:{mk:"",uraian:""} },
    evaluasi: { varian: "reguler", status: ["S","S","S","S","S","S"], ket: ["","","","","",""] },
    ipk: [
      { angkatan: "Angkatan 2025", ips: null, ipk: 3.50, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2024", ips: null, ipk: 3.61, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2023", ips: null, ipk: 3.58, ukom: null, kendala: "" },
      { angkatan: "Angkatan 2022", ips: null, ipk: 3.61, ukom: null, kendala: "" }
    ],
    lulus: [
      { tahun: "2025", jumlah: 69, tepat: 65, ket: "94,2% tepat waktu" },
      { tahun: "2024", jumlah: 81, tepat: 80, ket: "98,8% tepat waktu" },
      { tahun: "2023", jumlah: 81, tepat: 80, ket: "98,8% tepat waktu" },
      { tahun: "2022", jumlah: 95, tepat: 88, ket: "92,6% tepat waktu" }
    ],
    kpi: {
      ukom: { target: "100%", real: "" }, tepatWaktu: { target: "100%", real: "" },
      rasio: { target: "100%", real: "" }, inggris: { target: "100%", real: "" },
      prestasi: { target: "100%", real: "" }, akreditasi: { target: "100%", real: "" }
    },
    rekomendasi: [
      ["Masih terdapat mahasiswa yang belum mengisi KRS/membayar tepat waktu","Peringatan bagi mahasiswa yang tidak tertib administrasi dan kebijakan penonaktifan otomatis bagi mahasiswa yang tidak tepat waktu"],
      ["Kelulusan tepat waktu belum tercapai","Meningkatkan pemberdayaan dosen Pembimbing Akademik (PA)"],
      ["Masih terdapat mahasiswa tingkat akhir yang maju sidang skripsi melewati batas waktu semester genap","Kebijakan penonaktifan akun SIAKAD dan kebijakan pembayaran UKT 50%"],
      ["Pengisian proses belajar mengajar berbasis kurikulum OBE belum berjalan sesuai harapan","Pendampingan pengisian manajemen OBE di SIAKAD, mulai dari penyusunan RPS sampai pengisian hasil evaluasi"],
      ["Tidak tersedia rekapitulasi IPS pada aplikasi SIAKAD","Penambahan menu IPS pada fitur laporan SIAKAD"]
    ],
    catatanData: [
      "Bagian G (kendala) dikosongkan seluruhnya, padahal Bagian J menyebut kendala OBE di SIAKAD dan ketiadaan rekapitulasi IPS — kendala tersebut seharusnya dicantumkan pada Bagian G (Sistem Informasi).",
      "Bagian I hanya berisi target '100%' untuk semua indikator (termasuk rasio dan jumlah prestasi) tanpa realisasi; rasio dosen, Bahasa Inggris, dan akreditasi tidak dapat dinilai.",
      "Rata-rata IPS tidak diisi karena SIAKAD tidak menyediakan rekapitulasi IPS (Bagian J butir 5) — kendala sistem lintas program studi yang perlu ditindaklanjuti unit SIAKAD.",
      "Lima belas mahasiswa berhenti (Angkatan 2025: 10; 2024: 5) — perlu analisis penyebab dan program retensi.",
      "Mata kuliah Manajemen Risiko Kesehatan tercatat dua kali (baris 12 dan 21) dengan persentase berbeda; Bagian B baris 27 menulis 'Pengelolaan Krisis Kesehatan pada Bencana (RPL)', sedangkan Bagian C menulis 'Penanggulangan'.",
      "Lembar pengesahan tertulis 'Ketua Jurusan Sanitasi Lingkungan' — seharusnya Ketua Jurusan Kesehatan Lingkungan.",
      "Rekomendasi butir 3 (UKT 50% bagi mahasiswa yang melewati batas semester) merupakan kebijakan institusi yang perlu dikaji bersama Wakil Direktur I dan bagian keuangan.",
      "Kehadiran dosen 100% pada seluruh mata kuliah — perlu diverifikasi dengan rekapitulasi presensi SIAKAD."
    ]
  }


  }
};
