/* =====================================================================
 * STORE — sumber data, komunikasi server, dan perhitungan indikator
 * ===================================================================== */
(function () {
  const C = window.MONEV_CONFIG;
  const LS_DRAFT = "monev.draft.";          // isian program studi di peramban
  const LS_IMPORT = "monev.import";         // isian JSON yang diimpor Pusbangdik
  const SS_SESSION = "monev.session";

  const safe = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
    sget(k, d) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    sset(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    sdel(k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------------- sesi ---------------- */
  const Session = {
    get() { return safe.sget(SS_SESSION, null); },
    set(s) { safe.sset(SS_SESSION, s); },
    clear() { safe.sdel(SS_SESSION); }
  };

  /* ---------------- server (Google Apps Script) ---------------- */
  const Api = {
    enabled() { return !!(C.apiUrl && C.apiUrl.trim()); },
    /* kredensial sesi: kunci admin darurat, atau NIP + PIN pejabat */
    auth(ses) { ses = ses || Session.get() || {}; return ses.key ? { key: ses.key } : { nip: ses.nip, pin: ses.pin }; },
    /* fetch dengan pesan galat yang dapat dipahami pengguna bila server tidak dapat dihubungi */
    async _fetch(url, opt) {
      try { return await fetch(url, opt); }
      catch (e) {
        const pratinjau = /claude\.ai|claudeusercontent/.test(location.hostname);
        throw new Error(pratinjau
          ? "Halaman pratinjau claude.ai tidak diizinkan menghubungi server. Buka aplikasi dari berkas index.html di komputer atau dari alamat GitHub Pages."
          : "Server tidak dapat dihubungi. Periksa koneksi internet, lalu coba lagi.");
      }
    },
    async get(params) {
      const url = C.apiUrl + "?" + new URLSearchParams(params).toString();
      const r = await this._fetch(url, { method: "GET", redirect: "follow" });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "Gagal memuat data dari server");
      return j;
    },
    async post(body) {
      // text/plain menghindari preflight CORS pada Apps Script
      const r = await this._fetch(C.apiUrl, { method: "POST", redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "Gagal menyimpan ke server");
      return j;
    }
  };

  /* ---------------- data ---------------- */
  /* Data semester yang diarsipkan dibekukan agar tidak dapat diubah oleh proses apa pun di aplikasi */
  const deepFreeze = o => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); Object.values(o).forEach(deepFreeze); } return o; };
  if (window.MONEV_BASELINE) deepFreeze(window.MONEV_BASELINE);

  const Data = {
    server: {},     // { semester: { prodiId: {payload,status,updatedAt,catatanPimpinan} } }
    loadedSemesters: {},

    prodiList() { return C.prodi; },
    prodi(id) { return C.prodi.find(p => p.id === id); },
    semester(id) { return C.semester.find(s => s.id === id); },

    baselineFor(sem, id) {
      const B = window.MONEV_BASELINE;
      if (!B || B.semester !== sem) return null;
      const x = B.isian[id];
      return x ? { payload: x, status: "final", sumber: "baseline", updatedAt: x.identitas.tanggal } : null;
    },
    importedFor(sem, id) {
      const imp = safe.get(LS_IMPORT, {});
      return imp[sem] && imp[sem][id] ? imp[sem][id] : null;
    },
    draftFor(sem, id) { return safe.get(LS_DRAFT + sem + "." + id, null); },
    saveDraft(sem, id, rec) { return safe.set(LS_DRAFT + sem + "." + id, rec); },
    clearDraft(sem, id) { safe.del(LS_DRAFT + sem + "." + id); },

    importRecord(sem, id, rec) {
      const imp = safe.get(LS_IMPORT, {});
      imp[sem] = imp[sem] || {};
      imp[sem][id] = rec;
      return safe.set(LS_IMPORT, imp);
    },
    removeImport(sem, id) {
      const imp = safe.get(LS_IMPORT, {});
      if (imp[sem]) { delete imp[sem][id]; safe.set(LS_IMPORT, imp); }
    },

    /* Isian terbaik yang tersedia: server > impor > baseline > draf lokal */
    get(sem, id, opts) {
      opts = opts || {};
      const s = this.server[sem] && this.server[sem][id];
      if (s && s.payload) return Object.assign({ sumber: "server" }, s);
      /* rekaman server tanpa isian (mis. catatan pimpinan/Ketua Jurusan atas data arsip) hanya menumpang sebagai catatan */
      const cat = s ? { catatanPimpinan: s.catatanPimpinan || "", catatanPimpinanList: s.catatanPimpinanList || [], catatanKajur: s.catatanKajur || "", catatanKajurOleh: s.catatanKajurOleh || "" } : null;
      const withCat = r => cat ? Object.assign({}, r, cat) : r;
      const i = this.importedFor(sem, id);
      if (i) return withCat(Object.assign({ sumber: "impor" }, i));
      const b = this.baselineFor(sem, id);
      if (b) return withCat(b);
      if (opts.includeDraft !== false) {
        const d = this.draftFor(sem, id);
        if (d) return withCat(Object.assign({ sumber: "draf-lokal" }, d));
      }
      return null;
    },

    async loadSemester(sem, force) {
      if (!Api.enabled()) return;
      const ses = Session.get();
      if (this.loadedSemesters[sem] && !force) return;
      /* Semester arsip: hasil perbaikan yang sudah disetujui ditampilkan juga kepada pengunjung tanpa login dan kepada
       * program studi lain (tanpa NIP dan catatan). Tanpa ini, dashboard kembali ke arsip lama begitu sesi login berakhir. */
      if ((this.semester(sem) || {}).status === "arsip" && (!ses || ses.role === "prodi")) {
        try { const jp = await Api.get({ action: "publik", semester: sem }); this.server[sem] = this.server[sem] || {}; Object.assign(this.server[sem], jp.data || {}); } catch (e) { /* server lama: tetap memakai arsip */ }
      }
      if (!ses) { this.loadedSemesters[sem] = true; return; }
      const params = ses.role === "pimpinan" || ses.role === "kajur"
        ? Object.assign({ action: "list", semester: sem }, Api.auth(ses))
        : { action: "get", semester: sem, prodiId: ses.prodiId, nip: ses.nip, pin: ses.pin };
      const j = await Api.get(params);
      this.server[sem] = this.server[sem] || {};
      if (j.data) Object.assign(this.server[sem], j.data);
      this.loadedSemesters[sem] = true;
    },

    async submit(sem, id, payload, status) {
      if (sem !== C.semesterAktif) throw new Error("Semester " + ((C.semester.find(x => x.id === sem) || {}).label || sem) + " sudah ditutup; isian tidak dapat diubah.");
      const pr = periode(sem);
      if (pr && !pr.terbuka) throw new Error("Pengisian " + ((C.semester.find(x => x.id === sem) || {}).label || sem) + " hanya dibuka " + pr.label + ".");
      const rec = { payload, status, updatedAt: new Date().toISOString() };
      this.saveDraft(sem, id, rec);
      if (Api.enabled()) {
        const ses = Session.get();
        if (!ses || ses.role !== "prodi" || ses.prodiId !== id) throw new Error("Silakan masuk sebagai program studi terlebih dahulu.");
        if (status === "draf" && ((this.server[sem] || {})[id] || {}).status === "final") throw new Error("Isian sudah dikirim final dan tidak dapat diturunkan menjadi draf. Gunakan Kirim ulang versi final untuk memperbarui isian.");
        await Api.post({ action: "save", semester: sem, prodiId: id, nip: ses.nip, pin: ses.pin, status, payload });
        this.server[sem] = this.server[sem] || {};
        this.server[sem][id] = Object.assign({}, this.server[sem][id] || {}, rec);
        return "server";
      }
      return "lokal";
    },

    /* Usulan perbaikan data semester sebelumnya (verifikasi Kapusbangdik) */
    async submitKoreksi(sem, id, payload, catatan) {
      const rec = { payload, catatan: catatan || "", proposedAt: new Date().toISOString() };
      if (Api.enabled()) {
        const ses = Session.get();
        if (!ses || ses.role !== "prodi" || ses.prodiId !== id) throw new Error("Silakan masuk sebagai program studi terlebih dahulu.");
        await Api.post({ action: "koreksiAjukan", semester: sem, prodiId: id, nip: ses.nip, pin: ses.pin, payload, catatan: catatan || "" });
        return "server";
      }
      const k = safe.get("monev.koreksi", {});
      k[sem] = k[sem] || {};
      k[sem][id] = Object.assign({}, k[sem][id] || {}, rec, { status: "menunggu" });
      safe.set("monev.koreksi", k);
      return "lokal";
    },
    async listKoreksi() {
      if (Api.enabled()) {
        const ses = Session.get();
        if (!ses) return [];
        try {
          const j = await Api.get(Object.assign({ action: "koreksiList" }, Api.auth(ses)));
          return j.data || [];
        } catch (e) { return []; }
      }
      const k = safe.get("monev.koreksi", {});
      const out = [];
      Object.keys(k).forEach(sem => Object.keys(k[sem] || {}).forEach(id => {
        out.push(Object.assign({ semester: sem, prodiId: id }, k[sem][id]));
      }));
      return out;
    },
    async decideKoreksi(sem, id, keputusan, catatan) {
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post(Object.assign({ action: "koreksiPutuskan", semester: sem, prodiId: id, keputusan, catatan: catatan || "" }, Api.auth(ses)));
        return;
      }
      const k = safe.get("monev.koreksi", {});
      if (k[sem] && k[sem][id]) {
        k[sem][id].status = keputusan === "setuju" ? "disetujui" : "ditolak";
        k[sem][id].catatanKapusbangdik = catatan || "";
        k[sem][id].decidedAt = new Date().toISOString();
        safe.set("monev.koreksi", k);
      }
    },
    async listKontrol() {
      if (Api.enabled()) {
        const ses = Session.get();
        if (!ses) return [];
        const params = Object.assign({ action: "kontrolList" }, Api.auth(ses));
        if (ses.role === "prodi") params.prodiId = ses.prodiId;
        try {
          const j = await Api.get(params);
          return j.data || [];
        } catch (e) { return []; }
      }
      return safe.get("monev.kontrol", []);
    },
    async updateKontrol(id, status, bukti, keterangan) {
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post(Object.assign({ action: "kontrolUpdate", id, status, bukti: bukti || "", keterangan: keterangan || "" }, Api.auth(ses)));
        return;
      }
      const k = safe.get("monev.kontrol", []);
      const idx = k.findIndex(x => x.id === id);
      if (idx >= 0) {
        k[idx].status = status === "selesai" ? "selesai" : "belum";
        k[idx].tanggalTindakLanjut = status === "selesai" ? new Date().toISOString() : "";
        k[idx].bukti = bukti || "";
        k[idx].keterangan = keterangan || "";
        safe.set("monev.kontrol", k);
      }
    },
    async deleteKontrol(id) {
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post(Object.assign({ action: "kontrolHapus", id }, Api.auth(ses)));
        return;
      }
      const k = safe.get("monev.kontrol", []);
      const idx = k.findIndex(x => x.id === id);
      if (idx >= 0) { k.splice(idx, 1); safe.set("monev.kontrol", k); }
    },
    async submitTanggapan(id, prodiId, tanggapan) {
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post({ action: "kontrolTanggapan", id, prodiId, nip: ses.nip, pin: ses.pin, tanggapan: tanggapan || "" });
        return;
      }
      const k = safe.get("monev.kontrol", []);
      const idx = k.findIndex(x => x.id === id);
      if (idx >= 0) {
        k[idx].tanggapanProdi = tanggapan || "";
        k[idx].tanggalTanggapan = new Date().toISOString();
        safe.set("monev.kontrol", k);
      }
    },

    async review(sem, id, catatan) {
      const ses = Session.get();
      if (Api.enabled()) {
        await Api.post(Object.assign({ action: "review", semester: sem, prodiId: id, catatan }, Api.auth(ses)));
        this.server[sem] = this.server[sem] || {};
        const r = this.server[sem][id] = this.server[sem][id] || {};
        if (ses.role === "kajur") { r.catatanKajur = catatan; r.catatanKajurOleh = ses.jabatan || "Ketua Jurusan"; }
        else {
          /* setiap pimpinan memiliki catatannya sendiri; catatan pimpinan lain tidak berubah */
          const key = ses.jabatanKey || "admin";
          const list = (r.catatanPimpinanList || []).filter(e => e.jabatanKey !== key);
          if (String(catatan || "").trim()) list.push({ jabatanKey: key, jabatan: ses.jabatan || "Pimpinan", catatan, waktu: new Date().toISOString() });
          r.catatanPimpinanList = list;
          r.catatanPimpinan = list.map(e => e.jabatan + ": " + e.catatan).join("\n\n");
        }
      } else {
        const rec = this.get(sem, id);
        if (rec) {
          rec.catatanPimpinan = catatan;
          if (rec.sumber === "impor") this.importRecord(sem, id, rec);
          else { const note = safe.get("monev.catatan", {}); note[sem + "." + id] = catatan; safe.set("monev.catatan", note); }
        }
      }
    },
    catatanLokal(sem, id) { const n = safe.get("monev.catatan", {}); return n[sem + "." + id] || ""; },

    previousSemester(sem) {
      const i = C.semester.findIndex(s => s.id === sem);
      return i > 0 ? C.semester[i - 1].id : null;
    }
  };

  /* ---------------- util angka ---------------- */
  const num = v => {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "number") return isFinite(v) ? v : null;
    const m = String(v).replace(/\s/g, "").match(/-?\d+(?:[.,]\d+)?/);
    return m ? parseFloat(m[0].replace(",", ".")) : null;
  };
  const rasioN = v => { // "1:41" / "1 : 26,27" → 41 / 26.27
    if (!v) return null;
    const m = String(v).replace(/\s/g, "").match(/1[:;](\d+(?:[.,]\d+)?)/);
    return m ? parseFloat(m[1].replace(",", ".")) : null;
  };
  /* Capaian rasio dosen (1:n) menurut skala penilaian yang ditetapkan */
  const rasioCapaian = n => {
    if (n === null || n === undefined || isNaN(n)) return null;
    if (n >= 27 && n <= 30) return 100;
    if ((n >= 17 && n < 27) || (n > 30 && n <= 33)) return 85;
    if ((n >= 14 && n < 17) || (n > 33 && n <= 36)) return 75;
    if ((n >= 11 && n < 14) || (n > 36 && n <= 39)) return 65;
    return 55;
  };
  const rasioCapaianColor = n => {
    const c = rasioCapaian(n);
    if (c === 100) return "#1F9D55";
    if (c === 85) return "#00A39D";
    if (c === 75) return "#E39B00";
    if (c === 65) return "#F5B400";
    return "#D64545";
  };
  const mean = a => { const x = a.filter(v => v !== null && !isNaN(v)); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };
  const isFilled = t => { if (!t) return false; const s = String(t).trim().toLowerCase(); return !!s && !["-", "tidak ada", "tidak", "0"].includes(s); };

  /* ---------------- tema rekomendasi ---------------- */
  const TEMA = [
    { id: "rps", label: "RPS dan Dokumen Pembelajaran", re: /rps|bahan ajar|dokumen pembelajaran|kontrak|obe|cpl|kurikulum/i },
    { id: "sdm", label: "SDM Dosen, PLP, dan Tenaga Kependidikan", re: /dosen.*(kurang|tambah|purnabakti|kompeten|rasio)|rasio|plp|laboran|tendik|tenaga|sumber daya dosen|promosi jurusan/i },
    { id: "ukom", label: "Uji Kompetensi dan Kelulusan", re: /ukom|uji kompetensi|try ?out|kelulusan|ijazah|transkrip|skripsi|sidang|yudisium/i },
    { id: "lms", label: "LMS Edlink dan SIAKAD", re: /edlink|lms|siakad|sistem informasi/i },
    { id: "sarpras", label: "Sarana Prasarana dan Laboratorium", re: /ruang|lab|alat|reagen|kursi|lcd|listrik|plafon|wifi|dental unit|mikroskop|gedung|buku|perpustakaan/i },
    { id: "lain", label: "Tracer Study, Lahan Praktik, dan Lainnya", re: /./ }
  ];
  const temaOf = t => (TEMA.find(x => x.re.test(t)) || TEMA[TEMA.length - 1]).id;

  /* ---------------- perhitungan indikator ---------------- */
  const KENDALA = [
    { id: "sarpras", label: "Sarana dan Prasarana" }, { id: "dosen", label: "Sumber Daya Dosen" },
    { id: "lms", label: "Sistem Informasi / LMS" }, { id: "bahan", label: "Bahan Ajar / Referensi" }, { id: "lain", label: "Lainnya" }
  ];

  function metrics(p, sem) {
    if (!p) return null;
    const A = C.ambang;
    const m = {};
    const dosen = (p.dosen || []).map(r => num(r[2]));
    const mhs = (p.mhs || []).map(r => num(r[1]));
    m.nMk = (p.mhs || []).length || (p.dosen || []).length;
    m.dosenAvg = mean(dosen);
    m.dosenMin = dosen.filter(v => v !== null).length ? Math.min(...dosen.filter(v => v !== null)) : null;
    m.mhsAvg = mean(mhs);
    m.mhsMin = mhs.filter(v => v !== null).length ? Math.min(...mhs.filter(v => v !== null)) : null;
    m.mhsBawah = (p.mhs || []).filter(r => num(r[1]) !== null && num(r[1]) < A.kehadiranMhs);
    m.ipkAvg = mean((p.ipk || []).map(r => num(r.ipk)));
    m.ipsAvg = mean((p.ipk || []).map(r => num(r.ips)));
    const ukt = p.ukt || [];
    const tot = ukt.reduce((s, r) => s + (num(r.jumlah) || 0), 0);
    m.totalMhs = tot || null;
    m.uktPct = tot ? ukt.reduce((s, r) => s + (num(r.jumlah) || 0) * (num(r.lunasPct) ?? 0), 0) / tot : null;
    const ret = p.retensi || [];
    m.cuti = ret.reduce((s, r) => s + (num(r.cuti) || 0), 0);
    m.keluar = ret.reduce((s, r) => s + (num(r.do) || 0) + (num(r.pindah) || 0), 0);
    m.keluarPct = tot ? m.keluar / tot * 100 : null;
    /* Kelulusan tepat waktu: sejak 13 Nov 2026 satu semester = lulusan yang yudisium pada semester itu (kunci tahun = tahunLulus(sem)).
     * Isian format lama (beberapa tahun/angkatan, termasuk arsip Genap 2025/2026) tetap dihitung apa adanya dan ditandai formatLama. */
    const semuaLulus = (p.lulus || []).filter(r => num(r.jumlah) !== null);
    const kunci = sem ? tahunLulus(sem) : null;
    const baru = kunci ? semuaLulus.filter(r => String(r.tahun).trim() === kunci) : [];
    const lulus = baru.length ? baru : semuaLulus;
    const lj = lulus.reduce((s, r) => s + num(r.jumlah), 0), lt = lulus.reduce((s, r) => s + (num(r.tepat) || 0), 0);
    m.tepatWaktu = lj ? lt / lj * 100 : null;
    m.totalLulusan = lj || null;
    m.lulusDiisi = lulus.length > 0;
    m.lulusFormatLama = !!(kunci && semuaLulus.length && !baru.length);
    const k = p.kpi || {};
    m.rasio = rasioN(k.rasio && k.rasio.real);
    m.rasioCapaian = rasioCapaian(m.rasio);
    const kpiNum = v => (!v || /belum|jadwal|tidak|menunggu/i.test(String(v))) ? null : num(v);
    m.ukom = kpiNum(k.ukom && k.ukom.real);
    if (m.ukom === null) { const u = (p.ipk || []).map(r => num(r.ukom)).filter(v => v !== null); m.ukom = u.length ? u[u.length - 1] : null; }
    m.inggris = kpiNum(k.inggris && k.inggris.real);
    m.prestasi = (p.prestasi || []).length;
    const akr = String((k.akreditasi && k.akreditasi.real) || "").toLowerCase();
    m.akreditasi = !akr ? null : /unggul|internasional|100|^1$/.test(akr) ? "Unggul" : String(k.akreditasi.real).trim();
    const st = a => ({ s: a.filter(x => x === "S").length, b: a.filter(x => x === "B").length, kosong: a.filter(x => !x).length, n: a.length });
    m.rps = st((p.rps && p.rps.status) || []);
    m.eval = st((p.evaluasi && p.evaluasi.status) || []);
    m.kendala = {};
    KENDALA.forEach(kd => { const x = p.kendala && p.kendala[kd.id]; m.kendala[kd.id] = !!(x && (isFilled(x.uraian) || isFilled(x.mk))); });
    m.nKendala = Object.values(m.kendala).filter(Boolean).length;
    m.nRekom = (p.rekomendasi || []).length;

    /* kelengkapan isian (indikator kunci yang seharusnya terisi) */
    const cek = [
      !!(p.identitas && p.identitas.kaprodi), !!(p.identitas && p.identitas.tanggal),
      (p.dosen || []).length > 0, (p.mhs || []).length > 0, ukt.length > 0,
      m.rps.kosong === 0, m.eval.kosong === 0, (p.ipk || []).length > 0, lulus.length > 0,
      m.rasio !== null, m.inggris !== null, !!(k.ukom && k.ukom.real), !!(k.akreditasi && k.akreditasi.real),
      (p.rekomendasi || []).length > 0
    ];
    m.kelengkapan = Math.round(cek.filter(Boolean).length / cek.length * 100);

    /* peringatan dini */
    const T = C.targetKpi, f = [];
    if (m.mhsBawah.length) f.push({ lv: m.mhsMin < A.kehadiranMhsKritis ? "merah" : "kuning", t: `${m.mhsBawah.length} mata kuliah kehadiran mahasiswa < ${A.kehadiranMhs}% (terendah ${fmt(m.mhsMin)}%)` });
    /* peringatan rasio mengikuti skala capaian: 1:27 s.d. 1:30 = 100% (tanpa peringatan); 85% dan 75% kuning; 65% dan 55% merah */
    if (m.rasio !== null && m.rasioCapaian !== 100) f.push({ lv: m.rasioCapaian >= 75 ? "kuning" : "merah", t: `Rasio dosen 1:${fmt(m.rasio)} di luar rentang ideal 1:27 s.d. 1:30 (capaian ${m.rasioCapaian}%)` });
    if (m.ukom !== null && m.ukom < T.ukom.target) f.push({ lv: m.ukom < 80 ? "merah" : "kuning", t: `Uji Kompetensi/Try Out ${fmt(m.ukom)}% < target ${fmt(T.ukom.target)}%` });
    if (m.tepatWaktu !== null && m.tepatWaktu < 90) f.push({ lv: m.tepatWaktu < 80 ? "merah" : "kuning", t: `Lulus tepat waktu ${fmt(m.tepatWaktu)}%` });
    if (m.uktPct !== null && m.uktPct < A.uktLunas) f.push({ lv: m.uktPct < 95 ? "merah" : "kuning", t: `UKT lunas ${fmt(m.uktPct)}%` });
    if (m.keluarPct !== null && m.keluarPct >= 2) f.push({ lv: m.keluarPct >= 4 ? "merah" : "kuning", t: `${m.keluar} mahasiswa berhenti/pindah (${fmt(m.keluarPct)}% dari mahasiswa aktif)` });
    if (m.rps.b) f.push({ lv: "kuning", t: `${m.rps.b} aspek RPS belum sesuai` });
    if (m.eval.b) f.push({ lv: "kuning", t: `${m.eval.b} aspek evaluasi hasil belajar belum sesuai` });
    if (m.rps.kosong === m.rps.n && m.rps.n) f.push({ lv: "abu", t: "Capaian RPS (F) tidak diisi" });
    if (m.eval.kosong === m.eval.n && m.eval.n) f.push({ lv: "abu", t: "Evaluasi hasil belajar (H) tidak diisi" });
    if (m.lulusFormatLama) f.push({ lv: "abu", t: "Data kelulusan tepat waktu masih format lama (bukan lulusan yudisium semester ini)" });
    if (m.kelengkapan < 70) f.push({ lv: "abu", t: `Kelengkapan isian ${m.kelengkapan}%` });
    m.flags = f;
    m.skorRisiko = f.reduce((s, x) => s + (x.lv === "merah" ? 3 : x.lv === "kuning" ? 1 : 0.5), 0);
    return m;
  }

  function fmt(v, d) {
    if (v === null || v === undefined || isNaN(v)) return "–";
    d = d === undefined ? (Math.abs(v - Math.round(v)) < 0.005 ? 0 : 2) : d;
    return Number(v).toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  /* Periode pengisian: Ganjil 1 Juli s.d. 15 Januari; Genap 1 Januari s.d. 15 Juli (ditegakkan juga oleh server) */
  const periode = sem => {
    const m = /^(ganjil|genap)-(\d{4})-(\d{4})$/.exec(String(sem || "")); if (!m) return null;
    const p = m[1] === "ganjil" ? { mulai: m[2] + "-07-01", batas: m[3] + "-01-15" } : { mulai: m[3] + "-01-01", batas: m[3] + "-07-15" };
    const tgl = s => new Date(s + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    p.label = tgl(p.mulai) + " s.d. " + tgl(p.batas);
    p.terbuka = today() >= p.mulai && today() <= p.batas;
    return p;
  };
  /* Tahun lulus (yudisium) yang menjadi isian kelulusan tepat waktu sebuah semester.
   * Genap = lulusan yang yudisium pada akhir semester genap, kapan pun wisudanya (Genap 2025/2026 -> "2026").
   * Ganjil = lulusan yang yudisium selama semester ganjil (Ganjil 2026/2027 -> "Ganjil 2026/2027"). */
  const tahunLulus = sem => {
    const m = /^(ganjil|genap)-(\d{4})-(\d{4})$/.exec(String(sem || "")); if (!m) return null;
    return m[1] === "genap" ? m[3] : "Ganjil " + m[2] + "/" + m[3];
  };
  const labelLulus = sem => { const t = tahunLulus(sem); return !t ? "" : /^Ganjil/.test(t) ? "yudisium " + t.replace("Ganjil", "Semester Ganjil") : "tahun lulus " + t; };
  const keteranganLulus = sem => {
    const m = /^(ganjil|genap)-(\d{4})-(\d{4})$/.exec(String(sem || "")); if (!m) return "";
    return m[1] === "genap"
      ? `lulusan yang yudisium pada akhir Semester Genap ${m[2]}/${m[3]} (tahun lulus ${m[3]}), kapan pun wisudanya`
      : `lulusan yang yudisium selama Semester Ganjil ${m[2]}/${m[3]} (Agustus ${m[2]} s.d. Januari ${m[3]}), kapan pun wisudanya`;
  };
  /* tanggal hari ini menurut jam perangkat (bukan UTC), format yyyy-mm-dd */
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  window.MONEV = { today, periode, tahunLulus, labelLulus, keteranganLulus, C, Session, Api, Data, metrics, fmt, num, rasioN, rasioCapaian, rasioCapaianColor, mean, isFilled, TEMA, temaOf, KENDALA, safe };
})();
