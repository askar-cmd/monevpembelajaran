/* =====================================================================
 * FORM — isian Monitoring dan Evaluasi Pembelajaran oleh Ketua Program Studi
 * Bagian A–J mengikuti format Pusbangdik; K–M tambahan (PPEPP dan bukti)
 * ===================================================================== */
(function () {
  const M = window.MONEV;
  const { C, Session, Api, Data, fmt, num, KENDALA } = M;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = C.targetKpi;

  const EVAL_PROFESI = [
    "Pre/post conference atau morning report terlaksana sesuai jadwal",
    "Logbook capaian kompetensi diisi dan diverifikasi setiap stase",
    "Presentasi/seminar kasus (laporan kasus, LP, laporan komprehensif) setiap stase",
    "Journal reading / analisis artikel ilmiah terlaksana",
    "Ujian stase / ujian bagian terlaksana di lahan praktik",
    "Rubrik penilaian klinik digunakan konsisten (DOPS, Mini-CEX, Assessment 360°)",
    "OSCE/ujian kompetensi akhir sesuai pedoman nasional",
    "Umpan balik hasil belajar diberikan ke mahasiswa"
  ];
  const TINGKAT = ["Lokal/Institusi", "Wilayah/Regional", "Nasional", "Internasional"];
  const AKRED = ["", "Unggul", "Baik Sekali", "Baik", "Terakreditasi Internasional", "Belum/dalam proses"];

  let F = null, sem = null, pid = null, dirty = false, koreksiMode = false;

  /* ---------- model ---------- */
  function blank(p) {
    return {
      identitas: { prodi: p.nama, jenjang: p.jenjang, jurusan: p.jurusan, kaprodi: "", nipKaprodi: "", kajur: "", nipKajur: "", tanggal: M.today() },
      dosen: [], mhs: [], prestasi: [], ukt: [], retensi: [],
      rps: { status: Array(6).fill(null), ket: Array(6).fill("") },
      kendala: Object.fromEntries(KENDALA.map(k => [k.id, { mk: "", uraian: "" }])),
      evaluasi: p.jenjang === "Profesi" ? { varian: "profesi", item: EVAL_PROFESI.slice(), status: Array(8).fill(null), ket: Array(8).fill("") } : { varian: "reguler", status: Array(6).fill(null), ket: Array(6).fill("") },
      ipk: [], lulusBaru: { jumlah: "", tepat: "", ket: "" }, lulusLama: [], kpiInput: { ukomPeserta: "", ukomLulus: "", akreditasi: "", ukomKet: "" },
      rekomendasi: [], tindakLanjut: [],
      tambahan: { dosenTetap: "", mhsAktif: "", dosenInggris: "", mkTotal: "", mkEdlink: "", edom: "", edomResponden: "", dosenObe: "" },
      bukti: {}
    };
  }
  function fromPayload(P, p) {
    const f = blank(p);
    Object.assign(f.identitas, P.identitas || {});
    f.identitas.prodi = p.nama; f.identitas.jenjang = p.jenjang; f.identitas.jurusan = p.jurusan;
    f.dosen = (P.dosen || []).map(r => ({ mk: r[0], dosen: r[1], p: r[2], ket: r[3] }));
    f.mhs = (P.mhs || []).map(r => ({ mk: r[0], p: r[1], ket: r[2] }));
    f.prestasi = (P.prestasi || []).map(x => Object.assign({ bukti: "" }, x));
    f.ukt = (P.ukt || []).map(x => ({ angkatan: x.angkatan, jumlah: x.jumlah, lunas: x.lunas !== undefined ? x.lunas : (x.jumlah && x.lunasPct !== null ? Math.round(x.jumlah * x.lunasPct / 100) : ""), ket: x.ket || "" }));
    f.retensi = (P.retensi || []).map(x => Object.assign({}, x));
    if (P.rps) f.rps = JSON.parse(JSON.stringify(P.rps));
    if (P.kendala) f.kendala = Object.assign(f.kendala, JSON.parse(JSON.stringify(P.kendala)));
    if (P.evaluasi && (P.evaluasi.varian === f.evaluasi.varian)) f.evaluasi = Object.assign(f.evaluasi, JSON.parse(JSON.stringify(P.evaluasi)), f.evaluasi.varian === "profesi" ? { item: EVAL_PROFESI.slice() } : {});
    f.ipk = (P.ipk || []).map(x => Object.assign({}, x));
    /* kelulusan: hanya baris tahun lulus semester ini yang dipakai; baris lain (format lama) disimpan terpisah sebagai jejak */
    const kunci = M.tahunLulus(sem), semua = (P.lulus || []).concat(P.lulusLama || []);
    const cocok = semua.find(x => String(x.tahun).trim() === kunci);
    if (cocok) f.lulusBaru = { jumlah: cocok.jumlah === null || cocok.jumlah === undefined ? "" : cocok.jumlah, tepat: cocok.tepat === null || cocok.tepat === undefined ? "" : cocok.tepat, ket: cocok.ket || "" };
    f.lulusLama = semua.filter(x => x !== cocok && (x.tahun || num(x.jumlah) !== null)).map(x => Object.assign({}, x));
    if (P.kpiInput) f.kpiInput = Object.assign(f.kpiInput, P.kpiInput);
    f.rekomendasi = (P.rekomendasi || []).map(r => ({ masalah: r[0], tindak: r[1] }));
    f.tindakLanjut = (P.tindakLanjut || []).map(x => Object.assign({}, x));
    if (P.tambahan) f.tambahan = Object.assign(f.tambahan, P.tambahan);
    f.bukti = Object.assign({}, P.bukti || {});
    return f;
  }
  function computed(f) {
    const t = f.tambahan, k = f.kpiInput;
    const dt = num(t.dosenTetap), ma = num(t.mhsAktif), di = num(t.dosenInggris);
    const up = num(k.ukomPeserta), ul = num(k.ukomLulus);
    const lj = num(f.lulusBaru.jumlah) || 0, lt = num(f.lulusBaru.tepat) || 0;
    return {
      rasio: dt && ma ? ma / dt : null, inggris: dt && di !== null ? di / dt * 100 : null,
      ukom: up ? (ul || 0) / up * 100 : null, tepat: lj ? lt / lj * 100 : null,
      prestasi: f.prestasi.filter(x => x.nama || x.jenis).length,
      edlink: num(t.mkTotal) ? (num(t.mkEdlink) || 0) / num(t.mkTotal) * 100 : null
    };
  }
  function toPayload(f, kirim) {
    const c = computed(f);
    const s = (v, d, suf) => v === null ? "" : fmt(v, d) + (suf || "");
    return {
      identitas: Object.assign({}, f.identitas),
      dosen: f.dosen.filter(r => r.mk).map(r => [r.mk, r.dosen || "", num(r.p), r.ket || ""]),
      mhs: f.mhs.filter(r => r.mk).map(r => [r.mk, num(r.p), r.ket || ""]),
      prestasi: f.prestasi.filter(x => x.nama || x.jenis),
      ukt: f.ukt.filter(r => r.angkatan).map(r => ({ angkatan: r.angkatan, jumlah: num(r.jumlah), lunas: num(r.lunas), lunasPct: num(r.jumlah) ? (num(r.lunas) || 0) / num(r.jumlah) * 100 : null, ket: r.ket || "" })),
      retensi: f.retensi.filter(r => r.angkatan).map(r => ({ angkatan: r.angkatan, cuti: num(r.cuti) || 0, do: num(r.do) || 0, skors: num(r.skors) || 0, pindah: num(r.pindah) || 0, ket: r.ket || "" })),
      rps: f.rps, kendala: f.kendala, evaluasi: f.evaluasi,
      ipk: f.ipk.filter(r => r.angkatan).map(r => ({ angkatan: r.angkatan, ips: num(r.ips), ipk: num(r.ipk), ukom: num(r.ukom), kendala: r.kendala || "" })),
      lulus: num(f.lulusBaru.jumlah) === null ? [] : [{ tahun: M.tahunLulus(sem), jumlah: num(f.lulusBaru.jumlah), tepat: num(f.lulusBaru.jumlah) === 0 ? 0 : num(f.lulusBaru.tepat), ket: f.lulusBaru.ket || "" }],
      /* isian format lama ikut tersimpan pada draf sebagai jejak, dan dilepas saat kirim final / usulan perbaikan */
      ...(!kirim && f.lulusLama.length ? { lulusLama: f.lulusLama } : {}),
      kpiInput: f.kpiInput,
      kpi: {
        ukom: { target: T.ukom.target + "%", real: c.ukom === null ? (f.kpiInput.ukomKet || "") : s(c.ukom, 2, "%") },
        tepatWaktu: { target: T.tepatWaktu.target + "%", real: s(c.tepat, 2, "%") },
        rasio: { target: "1:" + T.rasio.target, real: c.rasio === null ? "" : "1:" + fmt(c.rasio, 2) },
        inggris: { target: T.inggris.target + "%", real: s(c.inggris, 2, "%") },
        prestasi: { target: String(T.prestasi.target), real: String(c.prestasi) },
        akreditasi: { target: "Unggul", real: f.kpiInput.akreditasi || "" }
      },
      rekomendasi: f.rekomendasi.filter(r => r.masalah).map(r => [r.masalah, r.tindak || ""]),
      tindakLanjut: f.tindakLanjut, tambahan: f.tambahan, bukti: f.bukti
    };
  }

  /* ---------- editor tabel generik ---------- */
  function tableEditor(key, cols, opts) {
    opts = opts || {};
    const rows = F[key];
    const cell = (c, r, i) => {
      const v = r[c.k] === null || r[c.k] === undefined ? "" : r[c.k];
      const a = `data-t="${key}" data-i="${i}" data-k="${c.k}"`;
      if (c.type === "select") return `<select ${a}>${c.opts.map(o => `<option ${String(o) === String(v) ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
      if (c.type === "area") return `<textarea ${a} rows="${c.rows || 1}" class="${c.rows ? "tall" : ""}">${esc(v)}</textarea>`;
      return `<input ${a} ${c.type === "num" ? 'type="number" step="any" min="0"' + (c.max ? ` max="${c.max}"` : "") : c.type === "url" ? 'type="url" placeholder="https://drive.google.com/..."' : 'type="text"'} value="${esc(v)}" ${c.ph ? `placeholder="${esc(c.ph)}"` : ""}>`;
    };
    return `<div class="tbl-wrap"><table class="tbl-edit"><thead><tr><th style="width:36px">No</th>${cols.map(c => `<th style="${c.w ? "width:" + c.w : ""}">${c.l}</th>`).join("")}<th style="width:40px"></th></tr></thead>
      <tbody>${rows.map((r, i) => `<tr><td class="c">${i + 1}</td>${cols.map(c => `<td>${cell(c, r, i)}</td>`).join("")}<td><button class="btn sm danger" data-del="${key}" data-i="${i}" title="Hapus baris">×</button></td></tr>`).join("") || `<tr><td colspan="${cols.length + 2}" class="muted c">Belum ada baris.</td></tr>`}</tbody></table></div>
      <div class="row" style="margin-top:8px"><button class="btn sm ghost" data-add="${key}">+ Tambah baris</button>
      ${opts.paste ? `<button class="btn sm ghost" data-paste="${key}">Tempel dari Excel</button>` : ""}${opts.extra || ""}</div>`;
  }
  const COLS = {
    dosen: [{ k: "mk", l: "Mata kuliah", ph: "Nama mata kuliah (semester/kelas)" }, { k: "dosen", l: "Dosen pengampu", ph: "Pisahkan dengan ;" }, { k: "p", l: "Kehadiran (%)", type: "num", max: 100, w: "90px" }, { k: "ket", l: "Keterangan / kendala" }],
    mhs: [{ k: "mk", l: "Mata kuliah" }, { k: "p", l: "Rata-rata kehadiran (%)", type: "num", max: 100, w: "120px" }, { k: "ket", l: "Keterangan / kendala" }],
    prestasi: [{ k: "nama", l: "Nama mahasiswa" }, { k: "jenis", l: "Jenis / nama prestasi" }, { k: "tingkat", l: "Tingkat", type: "select", opts: [""].concat(TINGKAT), w: "150px" }, { k: "capaian", l: "Capaian", w: "120px" }, { k: "bukti", l: "Tautan bukti", type: "url" }],
    ukt: [{ k: "angkatan", l: "Tingkat / angkatan", ph: "Tingkat I / 2026" }, { k: "jumlah", l: "Jumlah mahasiswa", type: "num", w: "100px" }, { k: "lunas", l: "Jumlah lunas", type: "num", w: "100px" }, { k: "ket", l: "Keterangan" }],
    retensi: [{ k: "angkatan", l: "Tingkat / angkatan" }, { k: "cuti", l: "Cuti", type: "num", w: "70px" }, { k: "do", l: "Berhenti/putus studi", type: "num", w: "90px" }, { k: "skors", l: "Skors", type: "num", w: "70px" }, { k: "pindah", l: "Pindah", type: "num", w: "70px" }, { k: "ket", l: "Keterangan / penyebab" }],
    ipk: [{ k: "angkatan", l: "Tingkat / angkatan" }, { k: "ips", l: "Rata-rata IPS", type: "num", max: 4, w: "100px" }, { k: "ipk", l: "Rata-rata IPK", type: "num", max: 4, w: "100px" }, { k: "ukom", l: "Hasil Try Out/Uji Kompetensi (%)", type: "num", max: 100, w: "110px" }, { k: "kendala", l: "Kendala" }],
    rekomendasi: [{ k: "masalah", l: "Permasalahan / temuan", type: "area", rows: 3, w: "45%" }, { k: "tindak", l: "Rekomendasi / tindak lanjut yang diusulkan", type: "area", rows: 3, w: "55%" }],
    tindakLanjut: [{ k: "masalah", l: "Rekomendasi semester lalu", type: "area", rows: 5, w: "44%" }, { k: "status", l: "Status", type: "select", opts: ["Belum", "Proses", "Selesai", "Tidak relevan"], w: "112px" }, { k: "progres", l: "Uraian progres / kendala", type: "area", rows: 4, w: "34%" }, { k: "bukti", l: "Tautan bukti", type: "url", w: "18%" }]
  };
  const blankRow = key => Object.fromEntries(COLS[key].map(c => [c.k, c.type === "select" ? c.opts[0] : ""]));

  /* ---------- tampilan ---------- */
  async function view(id, semOverride, koreksi) {
    koreksiMode = !!koreksi;
    const main = $("#main");
    sem = semOverride || C.semesterAktif;
    const _tw = (C.targetTepatWaktuBySemester || {})[sem]; if (_tw !== undefined) T.tepatWaktu.target = _tw;
    const semObj = Data.semester(sem);
    const ses = Session.get();
    if (!id) {
      if (ses && ses.role === "prodi") { location.hash = "#/isi/" + ses.prodiId; return; }
      main.innerHTML = `<div class="pagehead"><div><h1>Pengisian Instrumen Monitoring dan Evaluasi Pembelajaran - Semester ${esc(semObj.label)}</h1><p>Periode pengisian: <b>${esc((M.periode(sem) || {}).label || semObj.batasPengisian || C.batasPengisian)}</b>. Pilih program studi Anda.</p></div></div>
        ${Api.enabled() ? "" : `<div class="notice warn"><b>Mode lokal.</b> Server belum dikonfigurasi; isian tersimpan di peramban ini. Setelah selesai, tekan <b>Unduh berkas isian</b> dan kirim berkas JSON ke Pusbangdik.</div>`}
        ${C.jurusan.map(j => `<h3 style="margin:14px 0 8px">Jurusan ${esc(j)}</h3><div class="prodi-cards">${Data.prodiList().filter(p => p.jurusan === j).map(p => { const r = Data.get(sem, p.id); return `<a class="pcard" href="#/isi/${p.id}"><div class="row" style="justify-content:space-between"><span class="t">${esc(p.nama)}</span>${r ? (r.status === "final" ? '<span class="badge b-ok">Final</span>' : '<span class="badge b-warn">Draf</span>') : '<span class="badge b-mute">Belum</span>'}</div><div class="meta">${p.jenjang}</div></a>`; }).join("")}</div>`).join("")}`;
      return;
    }
    const p = Data.prodi(id); if (!p) { location.hash = "#/isi"; return; }
    if (Api.enabled() && (!ses || ses.role !== "prodi" || ses.prodiId !== id)) {
      main.innerHTML = `<div class="card empty">Silakan masuk dengan PIN ${esc(p.nama)} untuk ${koreksiMode ? "mengusulkan perbaikan data" : "mengisi instrumen monitoring dan evaluasi"} — <b>${esc(Data.semester(sem).label)}</b>.<br><button class="btn" id="goLogin" style="margin-top:10px">Masuk sebagai program studi</button></div>`;
      $("#goLogin").onclick = () => M.loginModal("prodi", () => view(id, semOverride, koreksi));
      return;
    }
    try { await Data.loadSemester(sem, true); } catch (e) { M.toast(e.message); }
    pid = id;
    const rec = Data.draftFor(sem, id) && (!Data.server[sem] || !Data.server[sem][id] || (Data.draftFor(sem, id).updatedAt > Data.server[sem][id].updatedAt)) ? Data.draftFor(sem, id) : Data.get(sem, id);
    F = rec ? fromPayload(rec.payload, p) : blank(p);
    // Bagian K: tarik rekomendasi semester sebelumnya bila belum ada
    const prevSem = Data.previousSemester(sem);
    const prev = prevSem ? Data.get(prevSem, id) : null;
    if (!F.tindakLanjut.length && prev && (prev.payload.rekomendasi || []).length) {
      F.tindakLanjut = prev.payload.rekomendasi.map(r => ({ masalah: r[0] + (r[1] ? " → " + r[1] : ""), status: "Belum", progres: "", bukti: "" }));
    }
    if (M.Pejabat) await M.Pejabat.load();
    if (!rec) applyPejabat(p); // pra-isi identitas dari daftar pejabat yang menjabat pada tanggal pengisian
    dirty = false;
    render(p, rec, prev);
  }

  function applyPejabat(p) {
    if (!M.Pejabat) return false;
    const kp = M.Pejabat.aktif("kaprodi", p.id, F.identitas.tanggal), kj = M.Pejabat.aktif("kajur", p.jurusan, F.identitas.tanggal);
    if (kp) { F.identitas.kaprodi = kp.nama; F.identitas.nipKaprodi = M.Pejabat.fmtNip(kp.nip); }
    if (kj) { F.identitas.kajur = kj.nama; F.identitas.nipKajur = M.Pejabat.fmtNip(kj.nip); }
    return !!(kp || kj);
  }

  function statusRadios(group, i, val) {
    return `<div class="seg"><button type="button" data-st="${group}" data-i="${i}" data-v="S" class="${val === "S" ? "on" : ""}">Sesuai</button><button type="button" data-st="${group}" data-i="${i}" data-v="B" class="${val === "B" ? "on" : ""}">Belum</button></div>`;
  }

  function render(p, rec, prev) {
    const c = computed(F);
    const sec = (lt, title, desc, body, isNew, open) => `<details class="sec" ${open ? "open" : ""}><summary><span class="lt ${isNew ? "new" : ""}">${lt}</span>${title}${isNew ? ' <span class="badge b-warn">baru</span>' : ""}</summary><div class="body">${desc ? `<p class="desc">${desc}</p>` : ""}${body}</div></details>`;
    const inp = (path, label, type, extra) => { const [a, b] = path.split("."); const v = F[a][b]; return `<label class="field"><span>${label}</span><input data-f="${path}" type="${type || "text"}" value="${esc(v === null || v === undefined ? "" : v)}" ${extra || ""}></label>`; };
    const bukti = k => `<label class="field" style="margin-top:10px"><span>Tautan bukti dukung — ${esc(M.BUKTI_LABEL[k])}</span><input type="url" data-bk="${k}" value="${esc(F.bukti[k] || "")}" placeholder="https://drive.google.com/..."></label>`;
    const RPS = M.RPS_ITEM, EV = F.evaluasi.item || M.EVAL_ITEM;
    /* isian yang sudah dikirim final tidak dapat diturunkan menjadi draf; hanya dapat dikirim ulang sebagai final */
    const sudahFinal = !koreksiMode && (((Data.server[sem] || {})[pid] || {}).status === "final" || (!Api.enabled() && rec && rec.status === "final"));

    $("#main").innerHTML = `<div id="fr">
      <div class="pagehead"><div><h1>${koreksiMode ? "Usulan Perbaikan Data Monitoring dan Evaluasi" : "Instrumen Monitoring dan Evaluasi Pembelajaran"} - ${esc(p.nama)}</h1><p>${esc(Data.semester(sem).label)} · Jurusan ${esc(p.jurusan)} · ${p.jenjang} ${rec ? (rec.status === "final" ? '<span class="badge b-ok">Terkirim final</span>' : '<span class="badge b-warn">Draf</span>') : ""}</p></div>
        <div class="row no-print"><button class="btn ghost" id="openAll" type="button">Buka semua bagian</button><a class="btn ghost" href="#/isi">Ganti program studi</a></div></div>
      ${Api.enabled() ? "" : `<div class="notice warn"><b>Mode lokal:</b> isian disimpan otomatis di peramban ini. Kirim ke Pusbangdik dengan <b>Unduh berkas isian</b>.</div>`}
      <div class="notice info">Bagian bertanda <span class="badge b-warn">baru</span> merupakan pengembangan dari format semester lalu untuk menutup siklus PPEPP (tindak lanjut), menghitung KPI dari data mentah, dan melampirkan bukti dukung. Persentase, rasio, dan capaian KPI dihitung otomatis.</div>

      ${!koreksiMode && M.periode(sem) && !M.periode(sem).terbuka ? `<div class="notice warn"><b>Periode pengisian ditutup.</b> Pengisian ${esc(Data.semester(sem).label)} hanya dibuka ${esc(M.periode(sem).label)}; isian tidak dapat disimpan ke server. Perbaikan data setelah periode berakhir diajukan melalui <b>Ajukan perbaikan data</b> pada Dashboard Program Studi.</div>` : ""}
      ${koreksiMode ? `<div class="notice warn"><b>Mode usulan perbaikan data.</b> Anda mengusulkan perbaikan data semester yang sudah diarsipkan. Perubahan tidak langsung diterapkan; Kapusbangdik akan memverifikasi (setuju/tolak). Bila disetujui, data diperbarui; bila ditolak, usulan tersimpan sebagai log.</div>
      <label class="field" style="margin:10px 0"><span>Alasan perbaikan data (wajib)</span><textarea id="catKoreksi" rows="3" placeholder="Jelaskan alasan dan sumber data perbaikan..."></textarea></label>` : ""}
      ${sec("A", "Identitas Program Studi", "", `<div class="fgrid">
        <label class="field"><span>Program studi</span><input value="${esc(p.nama)}" disabled></label>
        <label class="field"><span>Jenjang</span><input value="${p.jenjang}" disabled></label>
        ${inp("identitas.kaprodi", "Nama Ketua Program Studi")}${inp("identitas.nipKaprodi", "NIP Ketua Program Studi")}
        ${inp("identitas.kajur", "Nama Ketua Jurusan " + esc(p.jurusan))}${inp("identitas.nipKajur", "NIP Ketua Jurusan")}
        ${inp("identitas.tanggal", "Tanggal pengisian", "date")}</div>
        <div class="row" style="margin-top:10px"><button class="btn sm ghost" type="button" id="usePejabat">Gunakan data pejabat terbaru</button>
        <span class="hint">Nama dan NIP diambil dari menu Pejabat sesuai tanggal pengisian. Perubahan di sini hanya berlaku untuk isian semester ini; isian semester yang telah diarsipkan tidak berubah.</span></div>`, false, true)}

      ${sec("B", "Kehadiran Dosen dalam Perkuliahan", "Rekapitulasi per mata kuliah dari presensi SIAKAD (pertemuan terlaksana ÷ pertemuan terjadwal × 100). Isi seluruh mata kuliah semester ini.",
        tableEditor("dosen", COLS.dosen, { paste: true }) + bukti("B"))}
      ${sec("C", "Kehadiran Mahasiswa dan Prestasi", "Rata-rata persentase kehadiran mahasiswa per mata kuliah. Ambang pembinaan &lt; " + C.ambang.kehadiranMhs + "%.",
        tableEditor("mhs", COLS.mhs, { paste: true, extra: `<button class="btn sm ghost" id="copyMk">Salin daftar mata kuliah dari Bagian B</button>` }) + bukti("C") +
        `<h3 style="margin-top:16px">Rekapitulasi prestasi mahasiswa</h3>` + tableEditor("prestasi", COLS.prestasi) + bukti("prestasi"))}
      ${sec("D", "Ketaatan Pembayaran UKT", "Isi jumlah mahasiswa dan jumlah yang sudah lunas; persentase dihitung otomatis.",
        tableEditor("ukt", COLS.ukt) + `<p class="hint" id="uktCalc"></p>` + bukti("D"))}
      ${sec("E", "Cuti / Berhenti / Skors / Pindah (Retensi)", "Isi jumlah mahasiswa per kategori; tuliskan penyebab utama pada keterangan.",
        tableEditor("retensi", COLS.retensi) + bukti("E"))}
      ${sec("F", "Capaian RPS / Silabus Pembelajaran", "Pilih Sesuai/Belum untuk setiap aspek. Bila Belum, jelaskan persentase dan penyebabnya.",
        `<div class="tbl-wrap"><table class="tbl-edit"><thead><tr><th>No</th><th>Aspek yang dimonitor</th><th style="width:190px">Status</th><th>Keterangan</th></tr></thead><tbody>
        ${RPS.map((it, i) => `<tr><td class="c">${i + 1}</td><td>${it}</td><td>${statusRadios("rps", i, F.rps.status[i])}</td><td><input data-sk="rps" data-i="${i}" value="${esc(F.rps.ket[i] || "")}"></td></tr>`).join("")}</tbody></table></div>` + bukti("F"))}
      ${sec("G", "Kendala dalam Pelaksanaan Pembelajaran", "Kosongkan bila tidak ada kendala pada jenis tersebut.",
        `<div class="tbl-wrap"><table class="tbl-edit"><thead><tr><th>Jenis kendala</th><th>Mata kuliah terdampak</th><th>Uraian kendala</th></tr></thead><tbody>
        ${KENDALA.map(k => `<tr><td><b>${k.label}</b></td><td><textarea data-kd="${k.id}" data-k="mk" rows="1">${esc(F.kendala[k.id].mk)}</textarea></td><td><textarea data-kd="${k.id}" data-k="uraian" rows="1">${esc(F.kendala[k.id].uraian)}</textarea></td></tr>`).join("")}</tbody></table></div>` + bukti("G"))}
      ${sec("H", "Evaluasi Hasil Belajar", F.evaluasi.varian === "profesi" ? "Varian pendidikan profesi (pembelajaran klinik/lahan praktik)." : "",
        `<div class="tbl-wrap"><table class="tbl-edit"><thead><tr><th>No</th><th>Aspek yang dimonitor</th><th style="width:190px">Status</th><th>Keterangan</th></tr></thead><tbody>
        ${EV.map((it, i) => `<tr><td class="c">${i + 1}</td><td>${esc(it)}</td><td>${statusRadios("eval", i, F.evaluasi.status[i])}</td><td><input data-sk="eval" data-i="${i}" value="${esc(F.evaluasi.ket[i] || "")}"></td></tr>`).join("")}</tbody></table></div>` + bukti("H") +
        `<h3 style="margin-top:16px">Rekapitulasi IPS, IPK, dan Hasil Try Out/Uji Kompetensi</h3>` + tableEditor("ipk", COLS.ipk) + bukti("ipk") +
        `<h3 style="margin-top:16px">Kelulusan tepat waktu</h3><p class="hint">Isi <b>${esc(M.keteranganLulus(sem))}</b>. Jangan isi tahun masuk atau angkatan tahun sebelumnya. Tepat waktu = lulus dalam masa studi normal: D-III paling lama 6 semester, Sarjana Terapan paling lama 8 semester, Profesi sesuai masa studi program. Isi 0 bila tidak ada lulusan pada semester ini.</p>
        <div class="fgrid">${inp("lulusBaru.jumlah", "Jumlah lulusan (" + esc(M.labelLulus(sem)) + ")", "number", 'min="0"')}${inp("lulusBaru.tepat", "Lulus tepat waktu", "number", 'min="0"')}${inp("lulusBaru.ket", "Keterangan (mis. penyebab tidak tepat waktu)")}</div><p class="hint" id="lulusCalc"></p>` +
        (F.lulusLama.length ? `<div class="notice warn" id="lulusLamaBox" style="margin-top:10px"><b>Isian kelulusan format lama</b> (tidak dihitung dan dilepas saat dikirim): ${F.lulusLama.map(r => `${esc(r.tahun || "tanpa tahun")}: ${fmt(num(r.jumlah), 0)} lulusan, ${fmt(num(r.tepat), 0)} tepat waktu`).join("; ")}. Isi kembali kotak di atas dengan data ${esc(M.keteranganLulus(sem))}.</div>` : "") + bukti("lulus"))}
      ${sec("I", "Keterkaitan dengan KPI Institusi 2026", "Isi angka mentah; capaian dihitung otomatis dan dibandingkan dengan target institusi (bukan target yang diketik program studi).",
        `<div class="fgrid">
          ${inp("tambahan.dosenTetap", "Jumlah dosen tetap program studi", "number", 'min="0"')}${inp("tambahan.mhsAktif", "Jumlah mahasiswa aktif", "number", 'min="0"')}
          ${inp("tambahan.dosenInggris", "Dosen tetap berkemampuan Bahasa Inggris (bersertifikat)", "number", 'min="0"')}
          ${inp("kpiInput.ukomPeserta", "Peserta Uji Kompetensi (periode terakhir)", "number", 'min="0"')}${inp("kpiInput.ukomLulus", "Lulus Uji Kompetensi (periode terakhir)", "number", 'min="0"')}
          ${inp("kpiInput.ukomKet", "Keterangan Uji Kompetensi (bila belum ada peserta)")}
          <label class="field"><span>Status akreditasi program studi</span><select data-f="kpiInput.akreditasi">${AKRED.map(a => `<option ${a === F.kpiInput.akreditasi ? "selected" : ""}>${a}</option>`).join("")}</select></label>
        </div><div id="kpiCalc" style="margin-top:12px"></div>` + bukti("I"))}
      ${sec("J", "Rekomendasi / Tindak Lanjut", "Usulan tindak lanjut atas permasalahan yang ditemukan, untuk dibahas dalam rapat monitoring dan evaluasi bersama Direktur.",
        tableEditor("rekomendasi", COLS.rekomendasi) + bukti("J"))}
      ${sec("K", "Tindak Lanjut Rekomendasi Semester Sebelumnya", prev ? `Daftar diambil otomatis dari Bagian J ${esc(Data.semester(Data.previousSemester(sem)).label)}. Perbarui status setiap butir.` : "Tidak ada data semester sebelumnya.",
        tableEditor("tindakLanjut", COLS.tindakLanjut) + bukti("K"), true)}
      ${sec("L", "Indikator Tambahan Mutu Pembelajaran", "Kendala Edlink dilaporkan oleh 8 dari 12 program studi pada Genap 2025/2026, sehingga pemanfaatan LMS dan kepuasan mahasiswa (EDOM) perlu dipantau secara kuantitatif.",
        `<div class="fgrid">${inp("tambahan.mkTotal", "Jumlah mata kuliah semester ini", "number", 'min="0"')}${inp("tambahan.mkEdlink", "Mata kuliah yang aktif di LMS Edlink (materi/tugas/forum)", "number", 'min="0"')}
        ${inp("tambahan.edom", "Indeks EDOM rata-rata program studi (skala 1–4)", "number", 'min="1" max="4" step="0.01"')}${inp("tambahan.edomResponden", "Partisipasi responden EDOM (%)", "number", 'min="0" max="100"')}
        ${inp("tambahan.dosenObe", "Dosen yang sudah pelatihan RPS/asesmen OBE", "number", 'min="0"')}</div><p class="hint" id="lCalc"></p>` + bukti("L"), true)}

      <div class="stickybar no-print"><span class="hint" id="saveInfo" style="margin-right:auto;align-self:center"></span>
        <button class="btn ghost" id="fDl">Unduh berkas isian (JSON)</button>
        <button class="btn ghost" id="fXlsx">Unduh berkas isian (Excel)</button>
        ${koreksiMode ? `<button class="btn warn" id="fKoreksi">Kirim usulan perbaikan</button>` : `${sudahFinal ? "" : `<button class="btn ghost" id="fDraft">Simpan draf</button>`}<button class="btn warn" id="fFinal">${sudahFinal ? "Kirim ulang versi final" : "Kirim versi final"}</button>`}</div></div>`;
    bind(p); recalc();
  }

  function recalc() {
    const c = computed(F);
    const ok = (v, t, dir) => v === null ? "b-mute" : (dir === "turun" ? (v <= t ? "b-ok" : "b-bad") : (v >= t ? "b-ok" : "b-bad"));
    const k = $("#kpiCalc");
    if (k) k.innerHTML = `<div class="tbl-wrap"><table><thead><tr><th>Kode</th><th>Indikator</th><th class="num">Target institusi</th><th class="num">Capaian terhitung</th></tr></thead><tbody>
      <tr><td>${T.ukom.kode}</td><td>${T.ukom.label}</td><td class="num">${fmt(T.ukom.target)}%</td><td class="num"><span class="badge ${ok(c.ukom, T.ukom.target)}">${c.ukom === null ? (F.kpiInput.ukomKet || "–") : fmt(c.ukom, 2) + "%"}</span></td></tr>
      <tr><td>–</td><td>${T.tepatWaktu.label} (lulusan ${esc(M.labelLulus(sem))})</td><td class="num">${fmt(T.tepatWaktu.target)}%</td><td class="num"><span class="badge ${ok(c.tepat, T.tepatWaktu.target)}">${c.tepat === null ? "–" : fmt(c.tepat, 2) + "%"}</span></td></tr>
      <tr><td>${T.rasio.kode}</td><td>${T.rasio.label}</td><td class="num">1:${T.rasio.target}</td><td class="num"><span class="badge ${c.rasio === null ? "b-mute" : M.rasioCapaian(c.rasio) === 100 ? "b-ok" : M.rasioCapaian(c.rasio) >= 75 ? "b-warn" : "b-bad"}">${c.rasio === null ? "–" : "1:" + fmt(c.rasio, 2) + " (capaian " + M.rasioCapaian(c.rasio) + "%)"}</span></td></tr>
      <tr><td>${T.inggris.kode}</td><td>${T.inggris.label}</td><td class="num">${fmt(T.inggris.target)}%</td><td class="num"><span class="badge ${ok(c.inggris, T.inggris.target)}">${c.inggris === null ? "–" : fmt(c.inggris, 2) + "%"}</span></td></tr>
      <tr><td>${T.prestasi.kode}</td><td>${T.prestasi.label} (dari Bagian C)</td><td class="num">${T.prestasi.target}</td><td class="num"><span class="badge ${ok(c.prestasi, T.prestasi.target)}">${c.prestasi}</span></td></tr>
      <tr><td>${T.akreditasi.kode}</td><td>${T.akreditasi.label}</td><td class="num">Unggul</td><td class="num">${esc(F.kpiInput.akreditasi || "–")}</td></tr></tbody></table></div>`;
    const u = $("#uktCalc");
    if (u) { const j = F.ukt.reduce((s, r) => s + (num(r.jumlah) || 0), 0), l = F.ukt.reduce((s, r) => s + (num(r.lunas) || 0), 0); u.textContent = j ? `Total ${j} mahasiswa, ${l} lunas (${fmt(l / j * 100, 2)}%).` : ""; }
    const lu = $("#lulusCalc"); if (lu) { const j = num(F.lulusBaru.jumlah), t = num(F.lulusBaru.tepat); lu.textContent = j === null ? "" : j === 0 ? "Tidak ada lulusan pada semester ini." : (t || 0) > j ? "Periksa kembali: lulus tepat waktu melebihi jumlah lulusan." : `${fmt(t || 0, 0)} dari ${fmt(j, 0)} lulusan tepat waktu (${fmt((t || 0) / j * 100, 2)}%).`; }
    const lc = $("#lCalc"); if (lc) lc.textContent = c.edlink === null ? "" : `Pemanfaatan Edlink: ${fmt(c.edlink, 1)}% mata kuliah.`;
  }

  function bind(p) {
    const main = $("#fr");
    const mark = () => { dirty = true; autosave(); };
    main.addEventListener("input", e => {
      const t = e.target;
      if (t.dataset.t) { const r = F[t.dataset.t][+t.dataset.i]; r[t.dataset.k] = t.value; }
      else if (t.dataset.f) { const [a, b] = t.dataset.f.split("."); F[a][b] = t.value; }
      else if (t.dataset.sk) { (t.dataset.sk === "rps" ? F.rps : F.evaluasi).ket[+t.dataset.i] = t.value; }
      else if (t.dataset.kd) { F.kendala[t.dataset.kd][t.dataset.k] = t.value; }
      else if (t.dataset.bk) { F.bukti[t.dataset.bk] = t.value.trim(); }
      else return;
      if (t.type === "number" && t.value !== "") { const v = +t.value; const mx = t.max !== "" ? +t.max : null; t.style.borderColor = (v < 0 || (mx !== null && v > mx)) ? "var(--red)" : ""; }
      mark(); recalc();
    });
    main.querySelectorAll("select").forEach(s => s.addEventListener("change", () => s.dispatchEvent(new Event("input", { bubbles: true }))));
    main.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.add) { F[b.dataset.add].push(blankRow(b.dataset.add)); rerender(p); }
      else if (b.dataset.del) { F[b.dataset.del].splice(+b.dataset.i, 1); rerender(p); }
      else if (b.dataset.st) { const g = b.dataset.st === "rps" ? F.rps : F.evaluasi; const i = +b.dataset.i; g.status[i] = g.status[i] === b.dataset.v ? null : b.dataset.v; b.parentElement.querySelectorAll("button").forEach(x => x.classList.toggle("on", x.dataset.v === g.status[i])); mark(); }
      else if (b.dataset.paste) pasteModal(b.dataset.paste, p);
      else if (b.id === "copyMk") { const have = new Set(F.mhs.map(r => r.mk)); const mks = [...new Set(F.dosen.map(r => r.mk).filter(Boolean))].filter(m => !have.has(m)); mks.forEach(mk => F.mhs.push({ mk, p: "", ket: "" })); M.toast(`${mks.length} mata kuliah disalin`); rerender(p); }
    });
    $("#openAll").onclick = () => { const ds = [...document.querySelectorAll("details.sec")]; const open = !ds.every(d => d.open); ds.forEach(d => d.open = open); $("#openAll").textContent = open ? "Tutup semua bagian" : "Buka semua bagian"; };
    $("#usePejabat").onclick = () => { if (applyPejabat(p)) { rerender(p); M.toast("Identitas diperbarui dari daftar pejabat"); } else M.toast("Data pejabat belum tersedia"); };
    const fd = $("#fDraft"); if (fd) fd.onclick = () => save("draf");
    const ff = $("#fFinal"); if (ff) ff.onclick = () => { const err = validate(); if (err.length) { M.toast("Belum lengkap: " + err[0], 6000); showErrors(err); return; } save("final"); };
    const fk = $("#fKoreksi"); if (fk) fk.onclick = () => { const err = validate(); if (err.length) { M.toast("Belum lengkap: " + err[0], 6000); showErrors(err); return; } const cat = ($("#catKoreksi") || {}).value || ""; if (!cat.trim()) { M.toast("Alasan perbaikan data wajib diisi."); return; } saveKoreksi(cat.trim()); };
    $("#fDl").onclick = () => { const payload = toPayload(F); M.download(`Isian_MonitoringEvaluasi_${sem}_${pid}.json`, JSON.stringify({ semester: sem, prodiId: pid, prodi: p.nama, status: "final", updatedAt: new Date().toISOString(), payload }, null, 1), "application/json"); };
    const fx = $("#fXlsx"); if (fx) fx.onclick = () => exportFormXlsx();
  }
  function rerender(p) { const y = window.scrollY; const open = [...document.querySelectorAll("details.sec")].map(d => d.open); render(p, Data.get(sem, pid), Data.get(Data.previousSemester(sem), pid)); document.querySelectorAll("details.sec").forEach((d, i) => { d.open = open[i]; }); window.scrollTo(0, y); autosave(); }
  let tmr = null;
  function autosave() { clearTimeout(tmr); tmr = setTimeout(() => { const prev = Data.draftFor(sem, pid); Data.saveDraft(sem, pid, { payload: toPayload(F), status: prev && prev.status === "final" ? "final" : "draf", updatedAt: new Date().toISOString() }); const s = $("#saveInfo"); if (s) s.textContent = "Tersimpan otomatis di peramban " + new Date().toLocaleTimeString("id-ID"); }, 800); }

  function validate() {
    const e = [];
    if (!F.identitas.kaprodi) e.push("A — nama Ketua Program Studi");
    if (!F.identitas.tanggal) e.push("A — tanggal pengisian");
    if (!F.dosen.filter(r => r.mk).length) e.push("B — kehadiran dosen belum diisi");
    F.dosen.forEach((r, i) => { if (r.mk && (num(r.p) === null || num(r.p) > 100)) e.push(`B — baris ${i + 1}: persentase kehadiran harus 0–100`); });
    if (!F.mhs.filter(r => r.mk).length) e.push("C — kehadiran mahasiswa belum diisi");
    F.mhs.forEach((r, i) => { if (r.mk && (num(r.p) === null || num(r.p) > 100)) e.push(`C — baris ${i + 1}: persentase kehadiran harus 0–100`); });
    if (!F.ukt.filter(r => r.angkatan).length) e.push("D — ketaatan UKT belum diisi");
    F.ukt.forEach((r, i) => { if (num(r.lunas) > num(r.jumlah)) e.push(`D — baris ${i + 1}: jumlah lunas melebihi jumlah mahasiswa`); });
    F.rps.status.forEach((s, i) => { if (!s) e.push(`F — aspek ${i + 1} belum dipilih`); });
    F.rps.status.forEach((s, i) => { if (s === "B" && !F.rps.ket[i]) e.push(`F — aspek ${i + 1} Belum: isi keterangan`); });
    F.evaluasi.status.forEach((s, i) => { if (!s) e.push(`H — aspek ${i + 1} belum dipilih`); });
    if (!F.ipk.filter(r => r.angkatan).length) e.push("H — rekap IPS/IPK belum diisi");
    if (!num(F.tambahan.dosenTetap) || !num(F.tambahan.mhsAktif)) e.push("I — jumlah dosen tetap dan mahasiswa aktif");
    if (!F.kpiInput.akreditasi) e.push("I — status akreditasi");
    if (num(F.tambahan.dosenInggris) > num(F.tambahan.dosenTetap)) e.push("I — dosen berkemampuan Bahasa Inggris melebihi jumlah dosen tetap");
    if (num(F.kpiInput.ukomLulus) > (num(F.kpiInput.ukomPeserta) || 0)) e.push("I — lulus Uji Kompetensi melebihi jumlah peserta");
    { const j = num(F.lulusBaru.jumlah), t = num(F.lulusBaru.tepat), th = M.labelLulus(sem);
      if (j === null) e.push(`H — kelulusan tepat waktu: isi jumlah lulusan ${th} (isi 0 bila tidak ada lulusan)`);
      else if (j > 0 && t === null) e.push(`H — kelulusan tepat waktu: isi jumlah lulus tepat waktu`);
      else if (t > j) e.push("H — kelulusan tepat waktu: lulus tepat waktu melebihi jumlah lulusan"); }
    if (num(F.tambahan.mkEdlink) > (num(F.tambahan.mkTotal) || 0)) e.push("L — mata kuliah aktif di Edlink melebihi jumlah mata kuliah");
    F.tindakLanjut.forEach((r, i) => { if (r.status === "Selesai" && !r.bukti) e.push(`K — butir ${i + 1} Selesai: lampirkan tautan bukti`); });
    /* Tautan bukti dukung tidak diwajibkan sampai ada perintah lebih lanjut */
    return e;
  }
  function showErrors(err) {
    M.toast(`${err.length} isian perlu dilengkapi`);
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal"><h2>Isian belum lengkap</h2><ul class="clean" style="max-height:50vh;overflow:auto">${err.map(x => `<li>${esc(x)}</li>`).join("")}</ul><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn">Tutup</button></div></div>`;
    bg.querySelector("button").onclick = () => bg.remove(); document.body.appendChild(bg);
  }
  function exportFormXlsx() {
    const payload = toPayload(F);
    const c = computed(F);
    const T = C.targetKpi;
    const sheets = [];
    sheets.push({ name: "A_Identitas", rows: [["Field", "Nilai"], ...Object.entries(payload.identitas || {}).map(([k, v]) => [k, v])] });
    sheets.push({ name: "B_Dosen", rows: [["Mata kuliah", "Dosen pengampu", "Kehadiran (%)", "Keterangan"], ...(payload.dosen || []).map(r => [r[0], r[1], r[2], r[3]])] });
    sheets.push({ name: "C_Mahasiswa", rows: [["Mata kuliah", "Kehadiran (%)", "Keterangan"], ...(payload.mhs || []).map(r => [r[0], r[1], r[2]])] });
    sheets.push({ name: "C_Prestasi", rows: [["Nama", "Jenis", "Tingkat", "Capaian", "Bukti"], ...(payload.prestasi || []).map(r => [r.nama, r.jenis, r.tingkat, r.capaian, r.bukti])] });
    sheets.push({ name: "D_UKT", rows: [["Angkatan", "Jumlah", "Lunas", "Lunas %", "Keterangan"], ...(payload.ukt || []).map(r => [r.angkatan, r.jumlah, r.lunas, r.lunasPct, r.ket])] });
    sheets.push({ name: "E_Retensi", rows: [["Angkatan", "Cuti", "Berhenti", "Skors", "Pindah", "Keterangan"], ...(payload.retensi || []).map(r => [r.angkatan, r.cuti, r.do, r.skors, r.pindah, r.ket])] });
    const rpsItems = M.RPS_ITEM;
    sheets.push({ name: "F_RPS", rows: [["Aspek", "Status", "Keterangan"], ...rpsItems.map((it, i) => [it, payload.rps.status[i], payload.rps.ket[i]])] });
    sheets.push({ name: "G_Kendala", rows: [["Jenis", "Mata kuliah terdampak", "Uraian"], ...KENDALA.map(k => [k.label, (payload.kendala[k.id] || {}).mk, (payload.kendala[k.id] || {}).uraian])] });
    const evItems = (payload.evaluasi && payload.evaluasi.item) || M.EVAL_ITEM;
    sheets.push({ name: "H_Evaluasi", rows: [["Aspek", "Status", "Keterangan"], ...evItems.map((it, i) => [it, payload.evaluasi.status[i], payload.evaluasi.ket[i]])] });
    sheets.push({ name: "H_IPK", rows: [["Angkatan", "IPS", "IPK", "TryOut/Ukom", "Kendala"], ...(payload.ipk || []).map(r => [r.angkatan, r.ips, r.ipk, r.ukom, r.kendala])] });
    sheets.push({ name: "H_Kelulusan", rows: [["Tahun lulus (yudisium)", "Jumlah", "Tepat waktu", "Keterangan"], ...(payload.lulus || []).map(r => [r.tahun, r.jumlah, r.tepat, r.ket])] });
    const kpiVal = { ukom: c.ukom, tepatWaktu: c.tepat, rasio: c.rasio, inggris: c.inggris, prestasi: c.prestasi, akreditasi: F.kpiInput.akreditasi };
    sheets.push({ name: "I_KPI", rows: [["Kode", "Indikator", "Target", "Realisasi", "Nilai terhitung"], ...Object.keys(T).map(k => [T[k].kode, T[k].label, payload.kpi[k].target, payload.kpi[k].real, kpiVal[k]])] });
    sheets.push({ name: "J_Rekomendasi", rows: [["No", "Permasalahan", "Tindak lanjut"], ...(payload.rekomendasi || []).map((r, i) => [i + 1, r[0], r[1]])] });
    sheets.push({ name: "K_TindakLanjut", rows: [["Rekomendasi", "Status", "Progres", "Bukti"], ...(payload.tindakLanjut || []).map(r => [r.masalah, r.status, r.progres, r.bukti])] });
    const tb = payload.tambahan || {};
    sheets.push({ name: "L_Tambahan", rows: [["Indikator", "Nilai"], ["Jumlah dosen tetap", tb.dosenTetap], ["Jumlah mahasiswa aktif", tb.mhsAktif], ["Dosen berbahasa Inggris", tb.dosenInggris], ["Mata kuliah total", tb.mkTotal], ["Mata kuliah Edlink", tb.mkEdlink], ["Indeks EDOM", tb.edom], ["Responden EDOM", tb.edomResponden], ["Dosen terlatih OBE", tb.dosenObe]] });
    const bk = payload.bukti || {};
    sheets.push({ name: "M_Bukti", rows: [["Dokumen", "Tautan"], ...Object.keys(bk).filter(k => bk[k]).map(k => [M.BUKTI_LABEL[k] || k, bk[k]])] });
    M.toXlsx(sheets).then(blob => M.download(`Isian_${sem}_${pid}.xlsx`, blob, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
  }

  let sending = false;
  const lockBtns = on => { sending = on; ["#fDraft", "#fFinal", "#fKoreksi"].forEach(s => { const b = $(s); if (b) b.disabled = on; }); };
  async function save(status) {
    if (sending) return; lockBtns(true);
    try {
      const where = await Data.submit(sem, pid, toPayload(F, status === "final"), status);
      dirty = false; if (status === "final" && F.lulusLama.length) { F.lulusLama = []; const n = $("#lulusLamaBox"); if (n) n.remove(); }
      M.toast(status === "final" ? (where === "server" ? "Isian final terkirim ke server Pusbangdik" : "Tersimpan final di peramban - unduh berkas isian dan kirim ke Pusbangdik") : "Draf tersimpan" + (where === "server" ? " di server" : ""), 5000);
      $("#saveInfo").textContent = (status === "final" ? "Final" : "Draf") + " tersimpan " + new Date().toLocaleTimeString("id-ID");
      if (status === "final") { const fd = $("#fDraft"); if (fd) fd.remove(); const ff = $("#fFinal"); if (ff) ff.textContent = "Kirim ulang versi final"; }
    } catch (e) { M.toast("Gagal menyimpan: " + e.message, 6000); }
    finally { lockBtns(false); }
  }
  async function saveKoreksi(catatan) {
    if (sending) return; lockBtns(true);
    try {
      const where = await Data.submitKoreksi(sem, pid, toPayload(F, true), catatan);
      dirty = false;
      M.toast("Usulan perbaikan data terkirim ke Kapusbangdik untuk diverifikasi" + (where === "server" ? " (server)" : " (lokal)"), 5000);
      $("#saveInfo").textContent = "Usulan perbaikan terkirim " + new Date().toLocaleTimeString("id-ID");
    } catch (e) { M.toast("Gagal mengirim usulan: " + e.message, 6000); }
    finally { lockBtns(false); }
  }
  function pasteModal(key, p) {
    const cols = COLS[key];
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" style="max-width:640px"><h2>Tempel dari Excel</h2><p class="muted">Salin baris dari Excel/Google Sheets dengan urutan kolom: <b>${cols.map(c => c.l).join(" | ")}</b>, lalu tempel di bawah.</p>
      <textarea id="pasteTxt" style="min-height:200px;font-family:monospace;font-size:12px"></textarea>
      <label class="row" style="margin-top:8px"><input type="checkbox" id="pasteRep" style="width:auto"> Ganti seluruh baris yang ada</label>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="pX">Batal</button><button class="btn" id="pGo">Tambahkan</button></div></div>`;
    document.body.appendChild(bg);
    bg.querySelector("#pX").onclick = () => bg.remove();
    bg.querySelector("#pGo").onclick = () => {
      const lines = bg.querySelector("#pasteTxt").value.split(/\r?\n/).filter(l => l.trim());
      const rows = lines.map(l => { const parts = l.split("\t"); const o = blankRow(key); cols.forEach((c, i) => { let v = (parts[i] || "").trim(); if (c.type === "num") v = v.replace("%", "").replace(",", "."); o[c.k] = v; }); return o; });
      if (bg.querySelector("#pasteRep").checked) F[key] = rows; else F[key] = F[key].concat(rows);
      bg.remove(); M.toast(`${rows.length} baris ditambahkan`); rerender(p);
    };
  }
  window.addEventListener("beforeunload", e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });

  window.MONEV_FORM = { view, toPayload, fromPayload, blank };
})();
