/* =====================================================================
 * REPORT — penyusunan laporan monitoring dan evaluasi (DOCX via JSZip, PDF via jsPDF)
 * Isi laporan disusun sebagai daftar blok, lalu dirender ke DOCX/PDF.
 * ===================================================================== */
(function () {
  const M = window.MONEV;
  const { C, Data, metrics, fmt, TEMA, temaOf, KENDALA } = M;
  const T = C.targetKpi, A = C.ambang;
  const KMK = "00A39D", KMK_D = "004F4C", KMK_L = "E6F6F5";
  const PENYUSUN = { nama: "M. Askar, S.Kep., Ns., M.Kes", nip: "", jabatan: "Kepala Pusat Pengembangan Pendidikan" };
  const tglID = d => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const pct = v => v === null || v === undefined || isNaN(v) ? "–" : fmt(v, 2) + "%";
  const val = v => v === null || v === undefined || v === "" ? "–" : String(v);
  const status = (v, t, dir) => v === null || v === undefined ? "Tidak ada data" : (dir === "turun" ? v <= t : v >= t) ? "Tercapai" : "Belum tercapai";

  /* ================= blok konten ================= */
  const B = {
    title: (lines) => ({ t: "title", lines }),
    h1: x => ({ t: "h1", x }), h2: x => ({ t: "h2", x }), h3: x => ({ t: "h3", x }),
    p: (x, o) => ({ t: "p", x, o: o || {} }),
    ul: items => ({ t: "ul", items }),
    table: (head, rows, o) => ({ t: "table", head, rows, o: o || {} }),
    img: (src, w, h, cap) => ({ t: "img", src, w, h, cap }),
    br: () => ({ t: "pb" }),
    sign: (left, right) => ({ t: "sign", left, right }),
    sign1: (a, b, n, nip) => ({ t: "sign1", a, b, n, nip })
  };

  /* ================= grafik offscreen ================= */
  function chartImg(cfg, w, h) {
    const cv = document.createElement("canvas"); cv.width = w || 1100; cv.height = h || 520;
    cv.style.cssText = "position:fixed;left:-9999px;top:0"; document.body.appendChild(cv);
    cfg.options = Object.assign({ responsive: false, animation: false, devicePixelRatio: 1 }, cfg.options || {});
    cfg.plugins = (cfg.plugins || []).concat([{ id: "bgw", beforeDraw: c => { const x = c.ctx; x.save(); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.restore(); } }]);
    const prevColor = Chart.defaults.color; Chart.defaults.color = "#33504F"; Chart.defaults.locale = "id-ID";
    const ch = new Chart(cv, cfg); const url = cv.toDataURL("image/png"); ch.destroy(); cv.remove();
    Chart.defaults.color = prevColor;
    return url;
  }
  const COL = { kmk: "#00A39D", kmk2: "#9FDCD9", red: "#D64545", amber: "#E39B00", accent: "#F5B400", green: "#1F9D55", mute: "#9AAAA9", grid: "#E3EBEA" };
  const shortName = n => n;

  /* ================= pembuka standar ================= */
  function kop(judul, sub, unitLines) {
    unitLines = unitLines || ["PUSAT PENGEMBANGAN PENDIDIKAN"];
    return B.title(["KEMENTERIAN KESEHATAN REPUBLIK INDONESIA", "POLITEKNIK KESEHATAN KEMENKES MAKASSAR"].concat(unitLines).concat(["", judul]).concat(sub || []));
  }
  function pendahuluan(semLabel, cakupan, sumberTxt) {
    return [
      B.h1("BAB I PENDAHULUAN"),
      B.h2("1.1 Latar Belakang"),
      B.p(`Monitoring dan evaluasi pembelajaran merupakan bagian dari siklus Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan (PPEPP) Sistem Penjaminan Mutu Internal. Monitoring dan evaluasi pembelajaran Semester ${semLabel} dilaksanakan Pusat Pengembangan Pendidikan di bawah koordinasi Wakil Direktur I Bidang Akademik untuk memotret pelaksanaan proses belajar mengajar (PBM) ${cakupan} sebagai bahan rapat monitoring dan evaluasi bersama Direktur.`),
      B.h2("1.2 Tujuan"),
      B.ul(["Menilai keterlaksanaan proses belajar mengajar (PBM): kehadiran dosen dan mahasiswa, kepatuhan RPS, dan evaluasi hasil belajar.",
        "Memantau capaian indikator kinerja yang relevan dengan proses belajar mengajar (IKM 17.3.x RSB/Renstra 2026).",
        "Mengidentifikasi kendala, peringatan dini, dan rekomendasi tindak lanjut untuk pengambilan keputusan pimpinan."]),
      B.h2("1.3 Dasar Acuan"),
      B.ul(["Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi.",
        "Rencana Strategis Bisnis (RSB) BLU Poltekkes Kemenkes Makassar dan Bahan Laporan Kinerja (LKJ) Tahun 2026.",
        "Format Monitoring Pembelajaran Program Studi yang ditetapkan Pusat Pengembangan Pendidikan."]),
      B.h2("1.4 Metode"),
      B.p(`Data diperoleh dari isian Format Monitoring Pembelajaran oleh Ketua Program Studi (${sumberTxt}). Analisis bersifat deskriptif: rerata, persentase, dan pembandingan terhadap target institusi serta ambang peringatan dini (kehadiran mahasiswa < ${A.kehadiranMhs}% kuning dan < ${A.kehadiranMhsKritis}% merah; rasio dosen di luar rentang ideal 1:27 s.d. 1:30 menurut skala capaian; Uji Kompetensi di bawah ${fmt(T.ukom.target)}%). Persentase dihitung ulang oleh aplikasi dari data mentah; bila ada perbedaan dengan angka yang ditulis program studi, perbedaannya dicatat pada catatan verifikasi data.`)
    ];
  }
  function pengesahan(mode, opts) {
    mode = mode || "institusi";
    opts = opts || {};
    const PJ = window.MONEV.Pejabat;
    const nip = v => v ? "NIP. " + (PJ ? PJ.fmtNip(v) : v) : "NIP. ...........................................";
    /* laporan program studi: tanda tangan Ketua Jurusan dan Ketua Program Studi */
    if (mode === "prodi") {
      const kajur = opts.kajur || {}, kaprodi = opts.kaprodi || {};
      return [B.sign(
        { a: "Mengetahui,", b: "Ketua Jurusan", n: kajur.nama || "(.............................................)", nip: nip(kajur.nip) },
        { a: `Makassar, ${tglID(new Date())}`, b: "Ketua Program Studi", n: kaprodi.nama || "(.............................................)", nip: nip(kaprodi.nip) })];
    }
    /* laporan jurusan: tanda tangan Ketua Jurusan saja */
    if (mode === "jurusan") {
      const kajur = opts.kajur || (PJ ? PJ.aktif("kajur", opts.jurusan) : null) || {};
      return [B.sign(
        { a: "", b: "", n: "", nip: "" },
        { a: `Makassar, ${tglID(new Date())}`, b: "Ketua Jurusan" + (opts.jurusan ? " " + opts.jurusan : ""), n: (kajur && kajur.nama) || "(.............................................)", nip: nip(kajur && kajur.nip) })];
    }
    /* laporan institusi: dibuat Kapusbangdik, diperiksa Wadir I, diketahui Direktur */
    const kb = (PJ ? PJ.aktif("pimpinan", "kapusbangdik") : null) || PENYUSUN;
    const w = PJ ? PJ.aktif("pimpinan", "wadir1") : null;
    const d = PJ ? PJ.aktif("pimpinan", "direktur") : null;
    const blok = [B.sign(
      { a: `Makassar, ${tglID(new Date())}`, b: "Dibuat oleh,\nKepala Pusat Pengembangan Pendidikan", n: kb.nama, nip: nip(kb.nip) },
      { a: "Diperiksa oleh,", b: "Wakil Direktur I Bidang Akademik", n: w ? w.nama : "(.............................................)", nip: nip(w && w.nip) })];
    blok.push(B.p("", { after: 200 }));
    blok.push(B.sign1("Diketahui,", "Direktur", d ? d.nama : "(.............................................)", nip(d && d.nip)));
    return blok;
  }

  /* ================= laporan per program studi ================= */
  function prodiBlocks(sem, id, withCharts) {
    const p = Data.prodi(id), rec = Data.get(sem, id);
    if (!rec) throw new Error("Belum ada data untuk program studi ini");
    const P = rec.payload, m = metrics(P), s = Data.semester(sem), I = P.identitas || {};
    const prevSem = Data.previousSemester(sem), prev = prevSem ? Data.get(prevSem, id) : null, pm = prev ? metrics(prev.payload) : null;
    const out = [kop("LAPORAN MONITORING DAN EVALUASI PEMBELAJARAN", [`SEMESTER ${s.label.toUpperCase()}`], [`JURUSAN ${p.jurusan.toUpperCase()}`, `PROGRAM STUDI ${p.nama.toUpperCase()}`])];
    out.push(...pendahuluan(s.label, `pada Program Studi ${p.nama}`, `diisi oleh ${I.kaprodi || "Ketua Program Studi"}${I.tanggal ? ", tanggal " + tglID(I.tanggal) : ""}`));

    out.push(B.h1("BAB II HASIL MONITORING"));
    out.push(B.h2("2.1 Identitas Program Studi"));
    out.push(B.table(["Uraian", "Keterangan"], [["Program studi", p.nama], ["Jenjang", p.jenjang], ["Jurusan", p.jurusan], ["Semester", s.label], ["Ketua Program Studi", `${val(I.kaprodi)} (NIP ${val(I.nipKaprodi)})`], ["Ketua Jurusan", `${val(I.kajur)} (NIP ${val(I.nipKajur)})`], ["Tanggal pengisian", I.tanggal ? tglID(I.tanggal) : "–"], ["Status isian", rec.status === "final" ? "Final" : "Draf"]], { widths: [30, 70] }));

    out.push(B.h2("2.2 Ringkasan Indikator"));
    const d = (a, b, dd) => a === null || b === null || a === undefined || b === undefined ? "–" : (a - b >= 0 ? "+" : "") + fmt(a - b, dd);
    const sumRows = [
      ["Rata-rata kehadiran dosen", pct(m.dosenAvg), "100%", status(m.dosenAvg, 100)],
      ["Rata-rata kehadiran mahasiswa", pct(m.mhsAvg), `≥ ${A.kehadiranMhs}%`, status(m.mhsAvg, A.kehadiranMhs)],
      ["Mata kuliah dengan kehadiran mahasiswa < " + A.kehadiranMhs + "%", String(m.mhsBawah.length), "0", m.mhsBawah.length ? "Perlu pembinaan" : "Tercapai"],
      ["Rata-rata IPK", fmt(m.ipkAvg, 2), `≥ ${A.ipkMin}`, status(m.ipkAvg, A.ipkMin)],
      ["Ketaatan pembayaran UKT", pct(m.uktPct), "100%", status(m.uktPct, 100)],
      ["Mahasiswa berhenti/pindah", `${m.keluar} (${pct(m.keluarPct)})`, "0", m.keluar ? "Perlu analisis" : "Tercapai"],
      ["Kelulusan tepat waktu", pct(m.tepatWaktu), T.tepatWaktu.target + "%", status(m.tepatWaktu, T.tepatWaktu.target)],
      ["Kelulusan Uji Kompetensi/Try Out", pct(m.ukom), fmt(T.ukom.target) + "%", status(m.ukom, T.ukom.target)],
      ["Rasio dosen tetap : mahasiswa", m.rasio ? "1:" + fmt(m.rasio) : "–", "1:" + T.rasio.target, m.rasio ? (m.rasioCapaian === 100 ? "Tercapai" : "Capaian " + m.rasioCapaian + "%") : "Tidak ada data"],
      ["Prestasi mahasiswa", String(m.prestasi), String(T.prestasi.target), status(m.prestasi, T.prestasi.target)],
      ["Kepatuhan RPS (F)", `${m.rps.s} sesuai / ${m.rps.b} belum / ${m.rps.kosong} kosong`, `${m.rps.n} sesuai`, m.rps.s === m.rps.n ? "Tercapai" : "Belum tercapai"],
      ["Evaluasi hasil belajar (H)", `${m.eval.s} sesuai / ${m.eval.b} belum / ${m.eval.kosong} kosong`, `${m.eval.n} sesuai`, m.eval.s === m.eval.n ? "Tercapai" : "Belum tercapai"],
      ["Kelengkapan isian", m.kelengkapan + "%", "100%", status(m.kelengkapan, 90)]
    ];
    out.push(B.table(["Indikator", "Capaian", "Target/Ambang", "Status"], sumRows, { widths: [38, 26, 18, 18], statusCol: 3 }));
    if (pm) out.push(B.p(`Dibandingkan dengan Semester ${Data.semester(prevSem).label}: kehadiran mahasiswa ${d(m.mhsAvg, pm.mhsAvg, 2)} poin, IPK ${d(m.ipkAvg, pm.ipkAvg, 2)}, berhenti/pindah ${d(m.keluar, pm.keluar, 0)} orang.`, { i: true }));

    if (withCharts && (P.mhs || []).length) {
      const mhs = P.mhs;
      out.push(B.img(chartImg({ type: "bar", data: { labels: mhs.map(r => r[0].length > 45 ? r[0].slice(0, 43) + "…" : r[0]), datasets: [{ data: mhs.map(r => r[1]), backgroundColor: mhs.map(r => r[1] < A.kehadiranMhsKritis ? COL.red : r[1] < A.kehadiranMhs ? COL.amber : COL.kmk) }] },
        options: { indexAxis: "y", scales: { x: { min: Math.max(0, Math.min(80, ...mhs.map(r => r[1] || 100)) - 2), max: 100, grid: { color: COL.grid } }, y: { ticks: { autoSkip: false, font: { size: 11 } }, grid: { display: false } } }, plugins: { legend: { display: false }, title: { display: true, text: "Kehadiran mahasiswa per mata kuliah (%)" } } } }, 1100, Math.max(360, Math.min(1500, mhs.length * 22 + 80))), 16, Math.max(5.5, Math.min(22, (mhs.length * 22 + 80) / 1100 * 16)), "Gambar 1. Kehadiran mahasiswa per mata kuliah"));
    }

    out.push(B.h2("2.3 Kehadiran Dosen (Bagian B)"));
    out.push(B.table(["No", "Mata kuliah", "Dosen pengampu", "Kehadiran (%)", "Keterangan"], (P.dosen || []).map((r, i) => [i + 1, r[0], r[1] || "–", pct(r[2]), r[3] || ""]), { widths: [6, 34, 40, 8, 12] }));
    out.push(B.h2("2.4 Kehadiran Mahasiswa dan Prestasi (Bagian C)"));
    out.push(B.table(["No", "Mata kuliah", "Kehadiran (%)", "Keterangan"], (P.mhs || []).map((r, i) => [i + 1, r[0], pct(r[1]), r[2] || ""]), { widths: [6, 54, 12, 28] }));
    out.push(B.h3("Prestasi mahasiswa"));
    out.push((P.prestasi || []).length ? B.table(["No", "Nama", "Prestasi", "Tingkat", "Capaian"], P.prestasi.map((r, i) => [i + 1, r.nama, r.jenis, r.tingkat, r.capaian]), { widths: [6, 26, 40, 14, 14] }) : B.p("Tidak ada prestasi yang dilaporkan.", { i: true }));
    out.push(B.h2("2.5 Ketaatan Pembayaran UKT dan Retensi (Bagian D–E)"));
    out.push(B.table(["Tingkat/angkatan", "Jumlah", "Lunas", "Keterangan"], (P.ukt || []).map(r => [r.angkatan, val(r.jumlah), pct(r.lunasPct), r.ket || ""]), { widths: [30, 15, 15, 40] }));
    out.push(B.table(["Tingkat/angkatan", "Cuti", "Berhenti", "Skors", "Pindah", "Keterangan"], (P.retensi || []).map(r => [r.angkatan, r.cuti, r.do, r.skors, r.pindah, r.ket || ""]), { widths: [26, 10, 10, 10, 10, 34] }));
    out.push(B.h2("2.6 Capaian RPS dan Evaluasi Hasil Belajar (Bagian F dan H)"));
    const st = x => x === "S" ? "Sesuai" : x === "B" ? "Belum" : "Tidak diisi";
    out.push(B.table(["No", "Aspek RPS", "Status", "Keterangan"], M.RPS_ITEM.map((it, i) => [i + 1, it, st(P.rps && P.rps.status[i]), (P.rps && P.rps.ket[i]) || ""]), { widths: [6, 50, 14, 30], statusCol: 2 }));
    const ev = P.evaluasi || {}; const evI = ev.item || M.EVAL_ITEM;
    out.push(B.table(["No", "Aspek evaluasi hasil belajar", "Status", "Keterangan"], evI.map((it, i) => [i + 1, it, st(ev.status && ev.status[i]), (ev.ket && ev.ket[i]) || ""]), { widths: [6, 50, 14, 30], statusCol: 2 }));
    out.push(B.h2("2.7 Kendala Pelaksanaan Pembelajaran (Bagian G)"));
    out.push(B.table(["Jenis kendala", "MK terdampak", "Uraian"], KENDALA.map(k => { const x = (P.kendala || {})[k.id] || {}; return [k.label, x.mk || "–", x.uraian || "Tidak ada kendala"]; }), { widths: [22, 30, 48] }));
    out.push(B.h2("2.8 IPS, IPK, Uji Kompetensi dan Kelulusan Tepat Waktu"));
    out.push(B.table(["Angkatan", "IPS", "IPK", "Try Out/Uji Kompetensi", "Kendala"], (P.ipk || []).map(r => [r.angkatan, fmt(r.ips, 2), fmt(r.ipk, 2), r.ukom === null ? "–" : pct(r.ukom), r.kendala || ""]), { widths: [22, 10, 10, 13, 45] }));
    out.push((P.lulus || []).length ? B.table(["Angkatan wisuda", "Jumlah lulusan", "Lulus tepat waktu", "Persentase (%)", "Keterangan"], P.lulus.map(r => [r.tahun, val(r.jumlah), val(r.tepat), r.jumlah ? pct(r.tepat / r.jumlah * 100) : "–", r.ket || ""]), { widths: [22, 12, 13, 11, 42] }) : B.p("Data kelulusan tepat waktu tidak diisi.", { i: true }));
    out.push(B.h2("2.9 Keterkaitan dengan KPI Institusi (Bagian I)"));
    out.push(B.table(["Kode", "Indikator", "Target institusi", "Realisasi (program studi)", "Nilai terhitung", "Status"], Object.keys(T).map(k => {
      const x = (P.kpi || {})[k] || {}; const v = { ukom: m.ukom, tepatWaktu: m.tepatWaktu, rasio: m.rasio, inggris: m.inggris, prestasi: m.prestasi, akreditasi: m.akreditasi }[k];
      const tv = k === "rasio" ? "1:" + T[k].target : T[k].target + (T[k].satuan === "%" ? "%" : "");
      const vv = v === null || v === undefined ? "-" : k === "rasio" ? "1:" + fmt(v) + (M.rasioCapaian ? " (capaian " + M.rasioCapaian(v) + "%)" : "") : typeof v === "number" ? fmt(v) + (T[k].satuan === "%" ? "%" : "") : v;
      return [T[k].kode, T[k].label, tv, x.real || "–", vv, k === "akreditasi" ? (v === "Unggul" ? "Tercapai" : v ? "Belum tercapai" : "Tidak ada data") : status(v, T[k].target, T[k].arah)];
    }), { widths: [11, 33, 12, 18, 13, 13], statusCol: 5 }));
    out.push(B.h2("2.10 Rekomendasi Program Studi (Bagian J)"));
    out.push((P.rekomendasi || []).length ? B.table(["No", "Permasalahan / temuan", "Rekomendasi / tindak lanjut"], P.rekomendasi.map((r, i) => [i + 1, r[0], r[1]]), { widths: [6, 44, 50] }) : B.p("Tidak ada rekomendasi.", { i: true }));
    if ((P.tindakLanjut || []).length) {
      out.push(B.h2("2.11 Tindak Lanjut Rekomendasi Semester Sebelumnya (Bagian K)"));
      out.push(B.table(["No", "Rekomendasi", "Status", "Progres", "Bukti"], P.tindakLanjut.map((r, i) => [i + 1, r.masalah, r.status || "Belum", r.progres || "", r.bukti ? (r.bukti.startsWith("http") ? r.bukti : r.bukti) : ""]), { widths: [6, 40, 12, 26, 16] }));
    }
    if (P.tambahan && Object.values(P.tambahan).some(v => v !== "" && v !== null)) {
      const tb = P.tambahan;
      out.push(B.h2("2.12 Indikator Tambahan (Bagian L)"));
      out.push(B.table(["Indikator", "Nilai"], [["Dosen tetap / mahasiswa aktif", `${val(tb.dosenTetap)} / ${val(tb.mhsAktif)}`], ["Mata kuliah aktif di LMS Edlink", `${val(tb.mkEdlink)} dari ${val(tb.mkTotal)} mata kuliah`], ["Indeks EDOM (1–4) / partisipasi", `${val(tb.edom)} / ${val(tb.edomResponden)}%`], ["Dosen terlatih RPS/asesmen OBE", val(tb.dosenObe)]], { widths: [55, 45] }));
    }
    /* Bagian M (Bukti Dukung) dihapus; bukti per bagian sudah wajib diisi pada tiap bagian */

    out.push(B.h1("BAB III ANALISIS DAN PERINGATAN DINI"));
    out.push(B.h2("3.1 Peringatan Dini"));
    out.push(m.flags.length ? B.ul(m.flags.map(f => `[${f.lv === "merah" ? "MERAH" : f.lv === "kuning" ? "KUNING" : "DATA"}] ${f.t}`)) : B.p("Tidak ditemukan peringatan dini."));
    if (m.mhsBawah.length) { out.push(B.h3("Mata kuliah dengan kehadiran mahasiswa di bawah ambang")); out.push(B.table(["Mata kuliah", "Kehadiran (%)", "Keterangan"], m.mhsBawah.map(r => [r[0], pct(r[1]), r[2] || ""]), { widths: [55, 15, 30] })); }
    if ((P.catatanData || []).length) { out.push(B.h2("3.2 Catatan Verifikasi Data")); out.push(B.p("Hal-hal berikut ditemukan saat verifikasi isian dan perlu dikonfirmasi oleh program studi:")); out.push(B.ul(P.catatanData)); }

    out.push(B.h1("BAB IV KESIMPULAN DAN REKOMENDASI"));
    out.push(B.h2("4.1 Kesimpulan"));
    out.push(B.ul(kesimpulanProdi(p, m)));
    out.push(B.h2("4.2 Rekomendasi Tindak Lanjut"));
    out.push(B.ul(rekomProdi(P, m)));
    const cat = rec.catatanPimpinan || Data.catatanLokal(sem, id);
    if (cat) { out.push(B.h2("4.3 Catatan dan Arahan Pimpinan")); out.push(B.p(cat)); }
    const PJr = window.MONEV.Pejabat;
    const kpAktif = PJr ? PJr.aktif("kaprodi", id) : null;
    const kjAktif = PJr ? PJr.aktif("kajur", p.jurusan) : null;
    out.push(...pengesahan("prodi", { kaprodi: { nama: kpAktif ? kpAktif.nama : I.kaprodi, nip: kpAktif ? kpAktif.nip : I.nipKaprodi }, kajur: { nama: kjAktif ? kjAktif.nama : I.kajur, nip: kjAktif ? kjAktif.nip : I.nipKajur } }));
    return { blocks: out, fname: `${window.MONEV.today()}_LaporanMonitoringEvaluasi_${p.nama.replace(/[^A-Za-z0-9]+/g, "")}_${s.label.replace(/[^A-Za-z0-9]+/g, "")}_v1` };
  }

  function kesimpulanProdi(p, m) {
    const k = [];
    k.push(`Keterlaksanaan proses belajar mengajar (PBM) ditunjukkan oleh rata-rata kehadiran dosen ${pct(m.dosenAvg)} dan kehadiran mahasiswa ${pct(m.mhsAvg)}${m.mhsBawah.length ? `, dengan ${m.mhsBawah.length} mata kuliah di bawah ambang ${A.kehadiranMhs}%` : ""}.`);
    if (m.dosenAvg === 100) k.push("Kehadiran dosen dilaporkan 100% pada seluruh mata kuliah. Angka ini perlu diverifikasi dengan rekap presensi SIAKAD agar tidak menjadi angka normatif.");
    k.push(`Capaian akademik: rata-rata IPK ${fmt(m.ipkAvg, 2)}; Uji Kompetensi/Try Out ${pct(m.ukom)} (target ${fmt(T.ukom.target)}%); kelulusan tepat waktu ${pct(m.tepatWaktu)}.`);
    if (m.rasio) k.push(`Rasio dosen tetap terhadap mahasiswa 1:${fmt(m.rasio)} ${m.rasioCapaian === 100 ? "berada dalam rentang ideal 1:27 s.d. 1:30 (capaian 100%)" : "berada di luar rentang ideal 1:27 s.d. 1:30 (capaian " + m.rasioCapaian + "%)"}.`);
    if (m.nKendala) k.push(`Kendala dilaporkan pada ${m.nKendala} dari 5 kategori: ${KENDALA.filter(x => m.kendala[x.id]).map(x => x.label).join(", ")}.`);
    if (m.rps.kosong || m.eval.kosong) k.push(`Sebanyak ${m.rps.kosong + m.eval.kosong} aspek kepatuhan RPS/evaluasi tidak diisi, sehingga kepatuhan program studi belum dapat disimpulkan.`);
    k.push(`Kelengkapan isian ${m.kelengkapan}%.`);
    return k;
  }
  const REKOM_TEMA = {
    rps: "Tetapkan batas pengumpulan RPS paling lambat H-14 sebelum perkuliahan dalam kalender akademik, dipantau melalui SIAKAD, dan ikutkan dosen dalam workshop RPS dan asesmen berbasis OBE.",
    lms: "Ikutkan dosen dalam pelatihan dan pendampingan LMS Sevima Edlink bersama Unit TI, dengan target minimal setiap mata kuliah memiliki materi dan tugas di Edlink.",
    sarpras: "Usulkan kebutuhan alat/ruang melalui APKAL agar masuk RBA tahun berikutnya, diprioritaskan berdasarkan dampaknya terhadap capaian CPMK praktikum.",
    sdm: "Susun analisis beban kerja dan kebutuhan dosen/PLP/tendik sebagai dasar usulan formasi (CPNS/PPPK/pegawai BLU).",
    ukom: "Laksanakan program penguatan Uji Kompetensi terstruktur: try out berkala, analisis butir soal, remedial, dan pendampingan mahasiswa berisiko oleh dosen Pembimbing Akademik (PA).",
    lain: "Tindak lanjuti temuan lain (tracer study, lahan praktik, layanan administrasi) melalui unit terkait dan laporkan progresnya pada monitoring dan evaluasi berikutnya."
  };
  function rekomProdi(P, m) {
    const r = [];
    const temas = new Set((P.rekomendasi || []).map(x => temaOf(x[0] + " " + x[1])));
    if (m.kendala.lms) temas.add("lms");
    if (m.kendala.sarpras) temas.add("sarpras");
    if (m.kendala.dosen) temas.add("sdm");
    if (m.ukom !== null && m.ukom < T.ukom.target) temas.add("ukom");
    TEMA.forEach(t => { if (temas.has(t.id)) r.push(REKOM_TEMA[t.id]); });
    if (m.mhsBawah.length) r.push(`Lakukan pembinaan oleh dosen Pembimbing Akademik (PA) untuk mahasiswa pada ${m.mhsBawah.length} mata kuliah dengan kehadiran di bawah ${A.kehadiranMhs}%, dan terapkan ketentuan syarat kehadiran ujian secara konsisten.`);
    if (m.keluar) r.push(`Analisis penyebab ${m.keluar} mahasiswa berhenti/pindah (akademik, ekonomi, minat), lalu susun program retensi.`);
    if (m.rps.kosong || m.eval.kosong || m.kelengkapan < 90) r.push("Lengkapi seluruh bagian format monitoring dan evaluasi berdasarkan data SIAKAD dan lampirkan tautan bukti dukung, dengan validasi oleh Ketua Jurusan sebelum dikirim.");
    r.push("Laporkan status tindak lanjut seluruh rekomendasi ini pada Bagian K monitoring dan evaluasi semester berikutnya.");
    return r;
  }

  /* ================= laporan kelompok (jenjang / keseluruhan) ================= */
  function groupBlocks(sem, jenjang, jurusan, withCharts) {
    jurusan = jurusan || "all";
    const s = Data.semester(sem);
    const rowsAll = M.rowsFor(sem, jenjang, jurusan), rows = rowsAll.filter(r => r.m), ag = M.aggregate(rowsAll);
    if (!rows.length) throw new Error("Belum ada data pada cakupan ini");
    const jurKet = jurusan !== "all" ? "Jurusan " + jurusan : "";
    const cakupan = jurusan !== "all" ? "program studi Jurusan " + jurusan : (jenjang === "all" ? "seluruh program studi" : "program studi jenjang " + jenjang);
    let unitLines, subLines;
    if (jurusan !== "all") {
      unitLines = [`JURUSAN ${jurusan.toUpperCase()}`];
      subLines = jenjang !== "all" ? [`PROGRAM STUDI JENJANG ${jenjang.toUpperCase()}`, `SEMESTER ${s.label.toUpperCase()}`] : [`SEMESTER ${s.label.toUpperCase()}`];
    } else if (jenjang === "all") {
      unitLines = ["PUSAT PENGEMBANGAN PENDIDIKAN"];
      subLines = ["PROGRAM STUDI DI LINGKUNGAN POLTEKKES KEMENKES MAKASSAR", `SEMESTER ${s.label.toUpperCase()}`];
    } else {
      unitLines = ["PUSAT PENGEMBANGAN PENDIDIKAN"];
      subLines = [`PROGRAM STUDI JENJANG ${jenjang.toUpperCase()}`, `SEMESTER ${s.label.toUpperCase()}`];
    }
    const out = [kop("LAPORAN MONITORING DAN EVALUASI PEMBELAJARAN", subLines, unitLines)];
    out.push(...pendahuluan(s.label, `pada ${cakupan} (${ag.n} dari ${ag.total} program studi melapor)`, `${ag.n} isian Ketua Program Studi`));
    out.push(B.h2("1.5 Cakupan"));
    out.push(B.table(["No", "Kode", "Program studi", "Jurusan", "Jenjang", "Status isian"], rowsAll.map((r, i) => [i + 1, r.p.kode || "", r.p.nama, r.p.jurusan, r.p.jenjang, r.rec ? (r.rec.status === "final" ? "Final" : "Draf") : "Belum melapor"]), { widths: [6, 9, 37, 24, 13, 11] }));
    out.push(B.p("Kode program studi dipakai sebagai label pada grafik. Huruf pertama menunjukkan jenjang (D = D-III, S = Sarjana Terapan, P = Profesi).", { i: true }));

    /* ringkasan eksekutif */
    out.push(B.h1("BAB II RINGKASAN EKSEKUTIF"));
    const kendCount = KENDALA.map(k => ({ k, n: rows.filter(r => r.m.kendala[k.id]).length })).sort((a, b) => b.n - a.n);
    const merah = rows.filter(r => r.m.flags.some(f => f.lv === "merah"));
    const rasioOver = rows.filter(r => r.m.rasio !== null && r.m.rasio > 30);
    const kosongFH = rows.filter(r => r.m.rps.kosong === r.m.rps.n || r.m.eval.kosong === r.m.eval.n);
    out.push(B.ul([
      `${ag.n} dari ${ag.total} program studi menyampaikan isian monitoring dan evaluasi; rata-rata kelengkapan isian ${fmt(ag.kelengkapan, 0)}%.`,
      `Rata-rata kehadiran dosen ${pct(ag.dosen)} dan mahasiswa ${pct(ag.mhs)}; ${ag.mhsBawah} mata kuliah memiliki kehadiran mahasiswa di bawah ${A.kehadiranMhs}%.`,
      `Rata-rata IPK ${fmt(ag.ipk, 2)}; ketaatan UKT ${pct(ag.ukt)} dari ${fmt(ag.totalMhs, 0)} mahasiswa tercatat; ${ag.keluar} mahasiswa berhenti/pindah dan ${ag.cuti} cuti.`,
      `Kelulusan tepat waktu tertimbang ${pct(ag.tepat)}; jumlah prestasi mahasiswa ${ag.prestasi}.`,
      `${rasioOver.length} program studi memiliki rasio dosen di atas rentang ideal 1:27 s.d. 1:30${rasioOver.length ? " (" + rasioOver.map(r => `${shortName(r.p.nama)} 1:${fmt(r.m.rasio)}`).join("; ") + ")" : ""}.`,
      `Kendala yang paling sering dilaporkan: ${kendCount.filter(x => x.n).map(x => `${x.k.label} (${x.n} program studi)`).join(", ") || "tidak ada"}.`,
      `${merah.length} program studi memiliki minimal satu peringatan merah${merah.length ? ": " + merah.map(r => shortName(r.p.nama)).join(", ") : ""}.`,
      kosongFH.length ? `${kosongFH.length} program studi tidak mengisi Bagian F dan/atau H (kepatuhan RPS dan evaluasi), sehingga kepatuhan tidak dapat dinilai: ${kosongFH.map(r => shortName(r.p.nama)).join(", ")}.` : "Seluruh program studi mengisi Bagian F dan H."
    ]));

    /* hasil */
    out.push(B.h1("BAB III HASIL MONITORING"));
    if (jenjang === "all") {
      out.push(B.h2("3.1 Rekapitulasi per Jenjang"));
      out.push(B.table(["Jenjang", "Melapor", "Kehadiran dosen", "Kehadiran mahasiswa", "IPK", "UKT lunas", "Tepat waktu", "Berhenti/pindah", "Prestasi"], ["D-III", "Sarjana Terapan", "Profesi"].map(j => { const a = M.aggregate(M.rowsFor(sem, j, "all")); return [j, `${a.n}/${a.total}`, pct(a.dosen), pct(a.mhs), fmt(a.ipk, 2), pct(a.ukt), pct(a.tepat), a.keluar, a.prestasi]; }), { widths: [16, 10, 11, 11, 8, 11, 11, 11, 11] }));
    }
    const n0 = jenjang === "all" ? 2 : 1;
    out.push(B.h2(`3.${n0} Indikator Utama per Program Studi`));
    out.push(B.table(["Program studi", "Kehadiran dosen", "Kehadiran mahasiswa", "Mata kuliah < 90%", "IPK", "UKT", "Berhenti/ pindah", "Tepat waktu", "Kelengkapan"], rows.map(r => [r.p.nama, pct(r.m.dosenAvg), pct(r.m.mhsAvg), r.m.mhsBawah.length, fmt(r.m.ipkAvg, 2), pct(r.m.uktPct), r.m.keluar, pct(r.m.tepatWaktu), r.m.kelengkapan + "%"]), { widths: [28, 9, 9, 8, 7, 10, 8, 11, 10], small: true }));
    if (withCharts) {
      const labels = rows.map(r => r.p.kode || r.p.nama), hh = Math.max(380, rows.length * 34 + 90);
      out.push(B.img(chartImg({ type: "bar", data: { labels, datasets: [{ label: "Rata-rata", data: rows.map(r => r.m.mhsAvg), backgroundColor: COL.kmk }, { label: "MK terendah", data: rows.map(r => r.m.mhsMin), backgroundColor: COL.accent }] }, options: { indexAxis: "y", scales: { x: { min: 70, max: 100, grid: { color: COL.grid } }, y: { ticks: { autoSkip: false }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, title: { display: true, text: "Kehadiran mahasiswa per program studi (%)" } } } }, 1100, hh), 16, hh / 1100 * 16, "Gambar 1. Kehadiran mahasiswa per program studi"));
      out.push(B.img(chartImg({ type: "bar", data: { labels, datasets: [{ label: "IPK", data: rows.map(r => r.m.ipkAvg), backgroundColor: COL.kmk }, { label: "IPS", data: rows.map(r => r.m.ipsAvg), backgroundColor: COL.kmk2 }] }, options: { scales: { y: { min: 2.5, max: 4, grid: { color: COL.grid } }, x: { ticks: { autoSkip: false, maxRotation: 0 }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, title: { display: true, text: "Rata-rata IPK dan IPS per program studi" } } } }, 1100, 520), 16, 7.6, "Gambar 2. Rata-rata IPK dan IPS"));
    }
    out.push(B.h2(`3.${n0 + 1} Capaian KPI Institusi`));
    out.push(B.table(["Program studi", `Uji Kompetensi (${fmt(T.ukom.target)}%)`, `Tepat waktu (${fmt(T.tepatWaktu.target)}%)`, `Rasio (1:${T.rasio.target})`, `Bahasa Inggris (${fmt(T.inggris.target)}%)`, `Prestasi (${T.prestasi.target})`, "Akreditasi"], rows.map(r => [r.p.nama, pct(r.m.ukom), pct(r.m.tepatWaktu), r.m.rasio ? "1:" + fmt(r.m.rasio) : "–", pct(r.m.inggris), r.m.prestasi, r.m.akreditasi || "–"]), { widths: [28, 12, 12, 12, 12, 11, 13], small: true }));
    if (withCharts) {
      const labels = rows.map(r => r.p.kode || r.p.nama), hh = Math.max(380, rows.length * 34 + 90);
      out.push(B.img(chartImg({ type: "bar", data: { labels, datasets: [{ label: "Rasio 1:n", data: rows.map(r => r.m.rasio), backgroundColor: rows.map(r => window.MONEV.rasioCapaianColor(r.m.rasio)) }, { type: "line", label: `Target 1:${T.rasio.target}`, data: rows.map(() => T.rasio.target), borderColor: COL.red, borderDash: [6, 4], pointRadius: 0 }] }, options: { indexAxis: "y", scales: { x: { beginAtZero: true, grid: { color: COL.grid } }, y: { ticks: { autoSkip: false }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, title: { display: true, text: "Rasio dosen tetap : mahasiswa" } } } }, 1100, hh), 16, hh / 1100 * 16, "Gambar 3. Rasio dosen tetap terhadap mahasiswa"));
    }
    out.push(B.h2(`3.${n0 + 2} Kepatuhan RPS dan Evaluasi Hasil Belajar`));
    out.push(B.table(["Program studi", "RPS sesuai", "RPS belum", "RPS kosong", "Evaluasi sesuai", "Evaluasi belum", "Evaluasi kosong"], rows.map(r => [r.p.nama, r.m.rps.s, r.m.rps.b, r.m.rps.kosong, r.m.eval.s, r.m.eval.b, r.m.eval.kosong]), { widths: [34, 11, 11, 11, 11, 11, 11], small: true }));
    out.push(B.h2(`3.${n0 + 3} Peta Kendala Pembelajaran`));
    out.push(B.table(["Program studi"].concat(KENDALA.map(k => k.label)), rows.map(r => [r.p.nama].concat(KENDALA.map(k => r.m.kendala[k.id] ? "Ada" : "–"))).concat([["Jumlah program studi"].concat(KENDALA.map(k => String(rows.filter(r => r.m.kendala[k.id]).length)))]), { widths: [30, 14, 14, 14, 14, 14], small: true }));
    out.push(B.h2(`3.${n0 + 4} Retensi Mahasiswa`));
    out.push(B.table(["Program studi", "Mahasiswa tercatat", "Cuti", "Berhenti/pindah", "Persentase berhenti/pindah"], rows.map(r => [r.p.nama, val(r.m.totalMhs), r.m.cuti, r.m.keluar, pct(r.m.keluarPct)]), { widths: [40, 15, 15, 15, 15], small: true }));
    out.push(B.h2(`3.${n0 + 5} Peringatan Dini`));
    out.push(B.table(["Program studi", "Skor", "Temuan"], rows.slice().sort((a, b) => b.m.skorRisiko - a.m.skorRisiko).map(r => [r.p.nama, fmt(r.m.skorRisiko, 1), r.m.flags.map(f => `[${f.lv === "merah" ? "M" : f.lv === "kuning" ? "K" : "D"}] ${f.t}`).join("\n") || "Tidak ada"]), { widths: [28, 8, 64], small: true }));
    out.push(B.p("Keterangan: [M] merah = prioritas pembahasan; [K] kuning = perlu perhatian; [D] = data tidak lengkap.", { i: true }));
    out.push(B.h2(`3.${n0 + 6} Rekomendasi Program Studi menurut Tema`));
    const items = []; rows.forEach(r => (r.rec.payload.rekomendasi || []).forEach(x => items.push({ p: r.p, a: x[0], b: x[1], t: temaOf(x[0] + " " + x[1]) })));
    TEMA.forEach(t => { const it = items.filter(i => i.t === t.id); if (!it.length) return; out.push(B.h3(`${t.label} (${it.length} temuan, ${new Set(it.map(i => i.p.id)).size} program studi)`)); out.push(B.table(["Program studi", "Permasalahan", "Usulan tindak lanjut"], it.map(i => [shortName(i.p.nama), i.a, i.b]), { widths: [18, 41, 41], small: true })); });

    /* profil program studi */
    out.push(B.h1("BAB IV PROFIL SINGKAT PROGRAM STUDI"));
    rows.forEach((r, i) => {
      out.push(B.h3(`4.${i + 1} ${r.p.nama}`));
      out.push(B.p(kesimpulanProdi(r.p, r.m).join(" ")));
      if (r.m.flags.filter(f => f.lv !== "abu").length) out.push(B.ul(r.m.flags.filter(f => f.lv !== "abu").map(f => f.t)));
    });

    /* kesimpulan */
    out.push(B.h1("BAB V KESIMPULAN DAN REKOMENDASI"));
    out.push(B.h2("5.1 Kesimpulan"));
    out.push(B.ul([
      `Proses belajar mengajar Semester ${s.label} pada ${cakupan} secara umum terlaksana: kehadiran dosen ${pct(ag.dosen)}, kehadiran mahasiswa ${pct(ag.mhs)}, dan IPK rata-rata ${fmt(ag.ipk, 2)}.`,
      ag.dosen >= 99.5 ? "Kehadiran dosen 100% dilaporkan hampir seragam di seluruh program studi. Ini mengindikasikan pelaporan normatif, sehingga ke depan data perlu diambil langsung dari rekap presensi SIAKAD." : `Kehadiran dosen belum seragam 100%.`,
      `Kendala utama bersifat sistemik lintas program studi: ${kendCount.filter(x => x.n >= 2).map(x => `${x.k.label} (${x.n} program studi)`).join(", ") || "tidak ada kendala sistemik"}.`,
      `Kualitas data masih perlu ditingkatkan: rata-rata kelengkapan isian ${fmt(ag.kelengkapan, 0)}%, ${kosongFH.length} program studi tidak mengisi Bagian F/H, dan program studi mencantumkan target KPI yang berbeda-beda untuk indikator yang sama.`
    ]));
    out.push(B.h2("5.2 Rekomendasi kepada Pimpinan"));
    const temaCount = {}; items.forEach(i => { temaCount[i.t] = (temaCount[i.t] || new Set()); temaCount[i.t].add(i.p.id); });
    const rek = TEMA.filter(t => temaCount[t.id]).sort((a, b) => temaCount[b.id].size - temaCount[a.id].size).map(t => `${t.label} (${temaCount[t.id].size} program studi): ${REKOM_TEMA[t.id]}`);
    rek.push(`Menetapkan target KPI institusi 2026 secara resmi (Uji Kompetensi ${fmt(T.ukom.target)}%, rasio 1:${T.rasio.target}, Bahasa Inggris ${fmt(T.inggris.target)}%, prestasi ${T.prestasi.target}) dan menyosialisasikannya kepada program studi agar target tidak lagi ditulis berbeda-beda.`);
    rek.push("Mewajibkan data monitoring dan evaluasi bersumber dari SIAKAD dan divalidasi Ketua Jurusan, serta setiap isian melampirkan tautan bukti dukung.");
    rek.push("Mengagendakan pembahasan khusus bagi program studi dengan peringatan merah pada rapat monitoring dan evaluasi bersama Direktur, dan memantau tindak lanjutnya pada Bagian K semester berikutnya.");
    out.push(B.ul(rek));
    const miss = rowsAll.filter(r => !r.rec);
    if (miss.length) { out.push(B.h2("5.3 Program Studi yang Belum Melapor")); out.push(B.ul(miss.map(r => `${r.p.nama} (Jurusan ${r.p.jurusan})`))); }

    out.push(B.h1("LAMPIRAN. CATATAN VERIFIKASI DATA"));
    rows.forEach(r => { const c = r.rec.payload.catatanData || []; if (c.length) { out.push(B.h3(r.p.nama)); out.push(B.ul(c)); } });
    out.push(...pengesahan(jurusan !== "all" ? "jurusan" : "institusi", { jurusan: jurusan !== "all" ? jurusan : "" }));
    const tag = jurusan !== "all" ? jurusan.replace(/[^A-Za-z0-9]+/g, "") : (jenjang === "all" ? "Keseluruhan" : jenjang.replace(/[^A-Za-z0-9]+/g, ""));
    return { blocks: out, fname: `${window.MONEV.today()}_LaporanMonitoringEvaluasi_${tag}_${s.label.replace(/[^A-Za-z0-9]+/g, "")}_v1` };
  }

  /* ================= renderer DOCX ================= */
  const xe = s => String(s === null || s === undefined ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  function run(text, o) {
    o = o || {};
    const rp = `<w:rPr>${o.b ? "<w:b/>" : ""}${o.i ? "<w:i/>" : ""}${o.color ? `<w:color w:val="${o.color}"/>` : ""}${o.sz ? `<w:sz w:val="${o.sz}"/><w:szCs w:val="${o.sz}"/>` : ""}</w:rPr>`;
    return String(text).split("\n").map((ln, i) => `${i ? "<w:r><w:br/></w:r>" : ""}<w:r>${rp}<w:t xml:space="preserve">${xe(ln)}</w:t></w:r>`).join("");
  }
  function para(text, o) {
    o = o || {};
    const pp = `<w:pPr>${o.style ? `<w:pStyle w:val="${o.style}"/>` : ""}${o.keep ? "<w:keepNext/>" : ""}${o.num ? `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>` : ""}<w:spacing w:before="${o.before || 0}" w:after="${o.after === undefined ? 120 : o.after}"/>${o.jc ? `<w:jc w:val="${o.jc}"/>` : ""}${o.shd ? `<w:shd w:val="clear" w:color="auto" w:fill="${o.shd}"/>` : ""}</w:pPr>`;
    return `<w:p>${pp}${run(text, o)}</w:p>`;
  }
  function docxTable(head, rows, o) {
    const W = 9638; // lebar isi (dxa) A4 margin 2 cm
    const widths = (o.widths || head.map(() => 100 / head.length)).map(w => Math.round(W * w / 100));
    const sz = o.small ? 16 : 18;
    const cell = (t, w, hdr, fill, bold) => `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${fill}"/>` : ""}</w:tcPr><w:p><w:pPr><w:spacing w:before="20" w:after="20"/></w:pPr>${run(t, { b: hdr || bold, color: hdr ? "FFFFFF" : null, sz })}</w:p></w:tc>`;
    const stFill = t => /^(Tercapai|Sesuai)$/.test(t) ? "E6F6EC" : /^(Belum|Belum tercapai|Perlu)/.test(t) ? "FDECEC" : /Tidak (diisi|ada data)/.test(t) ? "F1F4F4" : null;
    return `<w:tbl><w:tblPr><w:tblW w:w="${W}" w:type="dxa"/><w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"].map(b => `<w:${b} w:val="single" w:sz="4" w:space="0" w:color="BFD3D2"/>`).join("")}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr>
      <w:tblGrid>${widths.map(w => `<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>
      <w:tr><w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>${head.map((h, i) => cell(h, widths[i], true, KMK)).join("")}</w:tr>
      ${rows.map((r, ri) => `<w:tr><w:trPr><w:cantSplit/></w:trPr>${r.map((c, i) => cell(c === null || c === undefined ? "" : c, widths[i], false, o.statusCol === i ? stFill(String(c)) : (ri % 2 ? "F5FAFA" : null), i === 0 && o.boldFirst)).join("")}</w:tr>`).join("")}
      </w:tbl>${para("", { after: 120 })}`;
  }
  async function toDocx(doc, title) {
    const zip = new JSZip(); const media = [];
    let body = "";
    doc.blocks.forEach(b => {
      if (b.t === "title") {
        const blankIdx = b.lines.indexOf("");
        b.lines.forEach((l, i) => { const hdr = blankIdx >= 0 && i < blankIdx; body += para(l, { jc: "center", b: true, sz: hdr ? 24 : 30, color: hdr ? KMK_D : KMK, after: i === blankIdx - 1 ? 60 : 40 }); if (blankIdx >= 0 && i === blankIdx - 1) body += `<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="18" w:space="1" w:color="${KMK}"/></w:pBdr><w:spacing w:after="240"/></w:pPr></w:p>`; });
        body += para("", { after: 200 });
      } else if (b.t === "h1") body += para(b.x, { style: "Heading1", keep: true });
      else if (b.t === "h2") body += para(b.x, { style: "Heading2", keep: true });
      else if (b.t === "h3") body += para(b.x, { style: "Heading3", keep: true });
      else if (b.t === "p") body += para(b.x, { jc: "both", i: b.o.i });
      else if (b.t === "ul") b.items.forEach(it => { body += para(it, { num: true, jc: "both", after: 60 }); });
      else if (b.t === "table") body += b.rows.length ? docxTable(b.head, b.rows, b.o) : para("Tidak ada data.", { i: true });
      else if (b.t === "pb") body += `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
      else if (b.t === "img") {
        const n = media.length + 1; media.push(b.src.split(",")[1]);
        const cx = Math.round(b.w * 360000), cy = Math.round(b.h * 360000);
        body += `<w:p><w:pPr><w:jc w:val="center"/><w:keepNext/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${n}" name="Gambar ${n}"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${n}" name="img${n}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rImg${n}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
        if (b.cap) body += para(b.cap, { jc: "center", i: true, sz: 18, color: "4A5F5E" });
      } else if (b.t === "sign") {
        const col = x => `<w:tc><w:tcPr><w:tcW w:w="4819" w:type="dxa"/></w:tcPr>${para(x.a, { jc: "center", after: 0 })}${para(x.b, { jc: "center", after: 1100 })}${para(x.n, { jc: "center", b: true, after: 0 })}${para(x.nip, { jc: "center", after: 0 })}</w:tc>`;
        body += para("", { after: 300 }) + `<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="4819"/><w:gridCol w:w="4819"/></w:tblGrid><w:tr><w:trPr><w:cantSplit/></w:trPr>${col(b.left)}${col(b.right)}</w:tr></w:tbl>`;
      } else if (b.t === "sign1") {
        body += para(b.a, { jc: "center", after: 0 }) + para(b.b, { jc: "center", after: 1100 }) + para(b.n, { jc: "center", b: true, after: 0 }) + para(b.nip, { jc: "center", after: 0 });
      }
    });
    const NS = `xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"`;
    const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${body}<w:sectPr><w:headerReference w:type="default" r:id="rHdr"/><w:footerReference w:type="default" r:id="rFtr"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
    const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="id-ID"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
      <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
      <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="2" w:color="${KMK}"/></w:pBdr><w:spacing w:before="360" w:after="160"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="${KMK_D}"/><w:sz w:val="28"/></w:rPr></w:style>
      <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="100"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="${KMK}"/><w:sz w:val="24"/></w:rPr></w:style>
      <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="160" w:after="80"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:color w:val="${KMK_D}"/><w:sz w:val="22"/></w:rPr></w:style>
      </w:styles>`;
    const numbering = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="567" w:hanging="283"/></w:pPr><w:rPr><w:color w:val="${KMK}"/></w:rPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="right"/><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="${KMK}"/></w:pBdr></w:pPr>${run("Poltekkes Kemenkes Makassar · " + title, { sz: 16, color: "7C8E8D" })}</w:p></w:hdr>`;
    const footer = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/></w:pPr>${run("Halaman ", { sz: 16, color: "7C8E8D" })}<w:r><w:rPr><w:sz w:val="16"/><w:color w:val="7C8E8D"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="7C8E8D"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="7C8E8D"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;
    zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`);
    zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`);
    zip.file("docProps/core.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xe(title)}</dc:title><dc:creator>Pusat Pengembangan Pendidikan Poltekkes Kemenkes Makassar</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString().slice(0, 19)}Z</dcterms:created></cp:coreProperties>`);
    zip.file("word/document.xml", document);
    zip.file("word/styles.xml", styles);
    zip.file("word/numbering.xml", numbering);
    zip.file("word/header1.xml", header);
    zip.file("word/footer1.xml", footer);
    zip.file("word/_rels/document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rSty" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rNum" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/><Relationship Id="rHdr" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rFtr" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>${media.map((_, i) => `<Relationship Id="rImg${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/img${i + 1}.png"/>`).join("")}</Relationships>`);
    media.forEach((b64, i) => zip.file(`word/media/img${i + 1}.png`, b64, { base64: true }));
    return zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  }

  /* ================= renderer PDF ================= */
  function toPdf(doc, title) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, L = 18, R = 18, CW = W - L - R, BOT = 280;
    let y = 18;
    const san = t => String(t === null || t === undefined ? "" : t).replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/→/g, "->").replace(/[▲]/g, "+").replace(/[▼]/g, "-").replace(/[^\x00-\xFF–—…•‘’“”€]/g, "");
    const need = h => { if (y + h > BOT) { pdf.addPage(); y = 18; } };
    const text = (t, size, style, color, align) => {
      pdf.setFont("helvetica", style || "normal"); pdf.setFontSize(size || 10); pdf.setTextColor(...(color || [22, 48, 47]));
      const lines = pdf.splitTextToSize(san(t), CW);
      lines.forEach(l => { need(size * 0.45); pdf.text(l, align === "center" ? W / 2 : L, y, { align: align === "center" ? "center" : "left", maxWidth: CW }); y += size * 0.45; });
    };
    doc.blocks.forEach(b => {
      if (b.t === "title") {
        const blankIdxPdf = b.lines.indexOf("");
        b.lines.forEach((l, i) => { if (!l) { y += 3; return; } const hdr = blankIdxPdf >= 0 && i < blankIdxPdf; text(l, hdr ? 11 : 14, "bold", hdr ? [0, 79, 76] : [0, 163, 157], "center"); y += 1; if (blankIdxPdf >= 0 && i === blankIdxPdf - 1) { pdf.setDrawColor(0, 163, 157); pdf.setLineWidth(0.8); pdf.line(L, y, W - R, y); y += 5; } });
        y += 4;
      } else if (b.t === "h1") { need(16); y += 4; text(b.x, 13, "bold", [0, 79, 76]); pdf.setDrawColor(0, 163, 157); pdf.setLineWidth(0.4); pdf.line(L, y - 2, W - R, y - 2); y += 3; }
      else if (b.t === "h2") { need(12); y += 2; text(b.x, 11.5, "bold", [0, 130, 125]); y += 1; }
      else if (b.t === "h3") { need(10); y += 1; text(b.x, 10.5, "bold", [0, 79, 76]); y += 0.5; }
      else if (b.t === "p") { text(b.x, 10, b.o.i ? "italic" : "normal", null, b.o.jc === "center" ? "center" : undefined); y += 2; }
      else if (b.t === "ul") { b.items.forEach(it => { pdf.setFont("helvetica", "normal"); pdf.setFontSize(10); const ls = pdf.splitTextToSize(san(it), CW - 6); need(ls.length * 4.5); pdf.setTextColor(0, 163, 157); pdf.text("•", L + 1, y); pdf.setTextColor(22, 48, 47); ls.forEach(l => { pdf.text(l, L + 6, y); y += 4.5; }); y += 0.8; }); y += 1.5; }
      else if (b.t === "table") {
        if (!b.rows.length) { text("Tidak ada data.", 10, "italic"); return; }
        const widths = (b.o.widths || b.head.map(() => 100 / b.head.length)).map(w => CW * w / 100);
        pdf.autoTable({ startY: y, head: [b.head.map(san)], body: b.rows.map(r => r.map(san)), margin: { left: L, right: R },
          styles: { fontSize: b.o.small ? 7.5 : 8.5, cellPadding: 1.4, lineColor: [191, 211, 210], lineWidth: 0.15, textColor: [22, 48, 47], overflow: "linebreak" },
          headStyles: { fillColor: [0, 163, 157], textColor: 255, fontStyle: "bold" }, alternateRowStyles: { fillColor: [245, 250, 250] },
          columnStyles: Object.fromEntries(widths.map((w, i) => [i, { cellWidth: w }])),
          didParseCell: d => { if (d.section === "body" && b.o.statusCol === d.column.index) { const t = String(d.cell.raw); if (/^(Tercapai|Sesuai)$/.test(t)) d.cell.styles.fillColor = [230, 246, 236]; else if (/^(Belum|Perlu)/.test(t)) d.cell.styles.fillColor = [253, 236, 236]; } } });
        y = pdf.lastAutoTable.finalY + 4;
      } else if (b.t === "img") {
        const w = Math.min(CW, b.w * 10), h = b.h * 10 * (w / (b.w * 10));
        if (h > BOT - 18) { const s = (BOT - 24) / h; need(BOT); pdf.addImage(b.src, "PNG", L + (CW - w * s) / 2, y, w * s, h * s, undefined, "FAST"); y += h * s + 2; }
        else { need(h + 6); pdf.addImage(b.src, "PNG", L + (CW - w) / 2, y, w, h, undefined, "FAST"); y += h + 2; }
        if (b.cap) { text(b.cap, 8.5, "italic", [74, 95, 94], "center"); y += 2; }
      } else if (b.t === "pb") { pdf.addPage(); y = 18; }
      else if (b.t === "sign") {
        need(48); y += 6; const cx = [L + CW * 0.25, L + CW * 0.75];
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(10); pdf.setTextColor(22, 48, 47);
        [b.left, b.right].forEach((s, i) => { pdf.text(s.a, cx[i], y, { align: "center" }); pdf.text(pdf.splitTextToSize(s.b, CW / 2 - 6), cx[i], y + 5, { align: "center" }); pdf.setFont("helvetica", "bold"); pdf.text(s.n, cx[i], y + 32, { align: "center" }); pdf.setFont("helvetica", "normal"); pdf.text(s.nip, cx[i], y + 37, { align: "center" }); });
        y += 42;
      } else if (b.t === "sign1") {
        need(48); y += 6;
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(10); pdf.setTextColor(22, 48, 47);
        pdf.text(b.a, W / 2, y, { align: "center" }); y += 5;
        pdf.text(b.b, W / 2, y, { align: "center" }); y += 32;
        pdf.setFont("helvetica", "bold"); pdf.text(b.n, W / 2, y, { align: "center" }); y += 5;
        pdf.setFont("helvetica", "normal"); pdf.text(b.nip, W / 2, y, { align: "center" }); y += 12;
      }
    });
    const n = pdf.getNumberOfPages();
    for (let i = 1; i <= n; i++) { pdf.setPage(i); pdf.setFontSize(7.5); pdf.setTextColor(124, 142, 141); pdf.text("Poltekkes Kemenkes Makassar · " + title, W - R, 10, { align: "right" }); pdf.text(`Halaman ${i} dari ${n}`, W / 2, 290, { align: "center" }); }
    return pdf.output("blob");
  }

  /* ================= API publik ================= */
  const busy = msg => { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); return () => t.remove(); };
  const wait = () => new Promise(r => setTimeout(r, 30));
  window.MONEV_REPORT = {
    prodiBlocks, groupBlocks, toDocx, toPdf,
    async prodiDocx(sem, id) { const done = busy("Menyusun laporan DOCX…"); await wait(); try { const d = prodiBlocks(sem, id, true); const title = `Laporan Monitoring dan Evaluasi ${Data.prodi(id).nama} ${Data.semester(sem).label}`; M.download(d.fname + ".docx", await toDocx(d, title)); } finally { done(); } },
    async prodiPdf(sem, id) { const done = busy("Menyusun laporan PDF…"); await wait(); try { const d = prodiBlocks(sem, id, true); const title = `Laporan Monitoring dan Evaluasi ${Data.prodi(id).nama} ${Data.semester(sem).label}`; M.download(d.fname + ".pdf", toPdf(d, title)); } finally { done(); } },
    async groupDocx(sem, jenjang, jurusan) {
      jurusan = jurusan || "all";
      const done = busy("Menyusun laporan DOCX…"); await wait();
      try { const d = groupBlocks(sem, jenjang, jurusan, true); const title = `Laporan Monitoring dan Evaluasi ${jurusan !== "all" ? "Jurusan " + jurusan : (jenjang === "all" ? "Keseluruhan" : jenjang)} ${Data.semester(sem).label}`; M.download(d.fname + ".docx", await toDocx(d, title)); } finally { done(); } },
    async groupPdf(sem, jenjang, jurusan) {
      jurusan = jurusan || "all";
      const done = busy("Menyusun laporan PDF…"); await wait();
      try { const d = groupBlocks(sem, jenjang, jurusan, true); M.download(d.fname + ".pdf", toPdf(d, `Laporan Monitoring dan Evaluasi ${jurusan !== "all" ? "Jurusan " + jurusan : (jenjang === "all" ? "Keseluruhan" : jenjang)} ${Data.semester(sem).label}`)); } finally { done(); } }
  };
})();
