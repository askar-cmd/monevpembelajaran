/* =====================================================================
 * APP — router, dashboard institusi, dashboard program studi, rekap dan laporan
 * ===================================================================== */
(function () {
  const { C, Session, Api, Data, metrics, fmt, rasioCapaianColor, TEMA, temaOf, KENDALA, safe } = window.MONEV;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = C.targetKpi, A = C.ambang;
  const syncTepatWaktuTarget = sem => { const m = (C.targetTepatWaktuBySemester || {})[sem]; if (m !== undefined) T.tepatWaktu.target = m; };
  const JENJANG = ["D-III", "Sarjana Terapan", "Profesi"];

  const state = Object.assign({ sem: C.semester[0].id, jenjang: "all", jurusan: "all" }, safe.get("monev.filter", {}));
  if (!Data.semester(state.sem)) state.sem = C.semester[0].id;
  const saveFilter = () => safe.set("monev.filter", { sem: state.sem, jenjang: state.jenjang, jurusan: state.jurusan });

  let charts = [];
  const killCharts = () => { charts.forEach(c => c.destroy()); charts = []; };

  /* ---------------- util UI ---------------- */
  function toast(msg, ms) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), ms || 3200);
  }
  function modal(html, onMount) {
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" role="dialog">${html}</div>`;
    bg.addEventListener("click", e => { if (e.target === bg) bg.remove(); });
    document.body.appendChild(bg); if (onMount) onMount(bg); return bg;
  }
  const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const statusBadge = rec => {
    if (!rec) return `<span class="badge b-mute">Belum mengisi</span>`;
    if (rec.status === "final") return `<span class="badge b-ok">Final</span>`;
    return `<span class="badge b-warn">Draf</span>`;
  };
  const sumberBadge = rec => rec ? `<span class="badge b-kmk" title="Sumber data">${({ baseline: "Arsip dokumen", server: "Server", impor: "Impor JSON", "draf-lokal": "Draf peramban" })[rec.sumber] || rec.sumber}</span>` : "";
  const cls = (v, good, warn, dir) => {
    if (v === null || v === undefined) return "";
    if (dir === "turun") return v <= good ? "good" : v <= warn ? "warn" : "bad";
    return v >= good ? "good" : v >= warn ? "warn" : "bad";
  };
  const kpiCard = (lbl, val, sub, c) => `<div class="kpi ${c || ""}"><div class="lbl">${lbl}</div><div class="val">${val}</div><div class="sub">${sub || ""}</div></div>`;
  const shortName = n => n;

  function rowsFor(sem, jenjang, jurusan) {
    return Data.prodiList()
      .filter(p => (jenjang === "all" || p.jenjang === jenjang) && (jurusan === "all" || p.jurusan === jurusan))
      .map(p => { const rec = Data.get(sem, p.id); return { p, rec, m: rec ? metrics(rec.payload, sem) : null }; });
  }
  function aggregate(rows) {
    const r = rows.filter(x => x.m);
    const avg = f => { const v = r.map(f).filter(x => x !== null && x !== undefined && !isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
    const tot = r.reduce((s, x) => s + (x.m.totalMhs || 0), 0);
    const totL = r.reduce((s, x) => s + (x.m.totalLulusan || 0), 0);
    return {
      n: r.length, total: rows.length,
      dosen: avg(x => x.m.dosenAvg), mhs: avg(x => x.m.mhsAvg), ipk: avg(x => x.m.ipkAvg), rasio: avg(x => x.m.rasio),
      ukt: tot ? r.reduce((s, x) => s + (x.m.uktPct || 0) * (x.m.totalMhs || 0), 0) / tot : null,
      totalMhs: tot, keluar: r.reduce((s, x) => s + x.m.keluar, 0), cuti: r.reduce((s, x) => s + x.m.cuti, 0),
      tepat: totL ? r.reduce((s, x) => s + (x.m.tepatWaktu || 0) * (x.m.totalLulusan || 0), 0) / totL : null,
      prestasi: r.reduce((s, x) => s + x.m.prestasi, 0),
      kelengkapan: avg(x => x.m.kelengkapan), nMerah: r.filter(x => x.m.flags.some(f => f.lv === "merah")).length,
      mhsBawah: r.reduce((s, x) => s + x.m.mhsBawah.length, 0)
    };
  }
  window.MONEV.rowsFor = rowsFor; window.MONEV.aggregate = aggregate;

  /* ---------------- header / nav ---------------- */
  function renderHeader(route) {
    const ses = Session.get();
    const sesNav = Session.get();
    const isKajur = !!(sesNav && sesNav.role === "kajur");
    const links = [["#/dasbor", "Dashboard Institusi"], ["#/prodi", "Dashboard Program Studi"]];
    if (!isKajur) links.push(["#/isi", "Pengisian Instrumen"]);
    links.push(["#/laporan", "Laporan"], ["#/pejabat", "Pejabat"], ["#/panduan", "Panduan"]);
    if (sesNav && (sesNav.jabatanKey === "kapusbangdik" || sesNav.jabatanKey === "admin")) links.splice(5, 0, ["#/koreksi", "Koreksi Data"]);
    if (sesNav && (sesNav.jabatanKey === "kapusbangdik" || sesNav.jabatanKey === "admin")) links.splice(6, 0, ["#/kontrol", "Kontrol Catatan"]);
    $("#nav").innerHTML = links.map(([h, t]) => `<a href="${h}" class="${route.startsWith(h.slice(1)) ? "on" : ""}">${t}</a>`).join("");
    const who = ses ? (ses.role === "prodi" ? (Data.prodi(ses.prodiId) || {}).nama : (ses.jabatan || "Pimpinan")) : (Api.enabled() ? "Belum masuk" : "Mode lokal");
    $("#user").innerHTML = `<span title="${esc(ses && ses.nama ? ses.nama + " — " + who : who)}">${esc(who)}</span>${ses ? `<button id="btnOut">Keluar</button>` : Api.enabled() ? `<button id="btnIn">Masuk</button>` : ""}`;
    const o = $("#btnOut"); if (o) o.onclick = () => { Session.clear(); Data.server = {}; Data.loadedSemesters = {}; if (window.MONEV.Pejabat) window.MONEV.Pejabat.reset(); route_(); };
    const i = $("#btnIn"); if (i) i.onclick = () => loginModal();
  }

  /* Satu pintu masuk: NIP pejabat yang sedang menjabat + PIN. Server mengenali peran dari NIP:
   * Ketua Program Studi, Ketua Jurusan, atau pimpinan (Direktur, Wakil Direktur I, Kapus Penjaminan Mutu, Kapusbangdik).
   * Kunci admin hanya untuk akses darurat. */
  function loginModal(roleHint, cb) {
    const ket = { prodi: "Ketua Program Studi untuk mengisi instrumen", pimpinan: "pimpinan untuk menulis catatan dan arahan", kajur: "Ketua Jurusan" }[roleHint] || "";
    modal(`<h2>Masuk</h2><p class="muted">Masuk dengan <b>NIP</b> dan <b>PIN</b>${ket ? " sebagai " + ket : ""}. Peran dikenali otomatis dari NIP pejabat yang sedang menjabat:
      Ketua Program Studi, Ketua Jurusan, Direktur, Wakil Direktur I, Kepala Pusat Penjaminan Mutu, atau Kepala Pusat Pengembangan Pendidikan.</p>
      <div id="lgS"><label class="field"><span>NIP</span><input id="lgNip" inputmode="numeric" autocomplete="username" placeholder="18 digit, boleh dengan spasi"></label>
      <label class="field" style="margin-top:8px"><span>PIN</span><input type="password" id="lgPin" inputmode="numeric" autocomplete="current-password"></label></div>
      <div id="lgP" class="field" style="display:none"><span>Kunci admin (akses darurat Pusbangdik)</span><input type="password" id="lgKey" autocomplete="off"></div>
      <p class="hint" style="margin-top:10px"><a href="#" id="lgMode">Masuk dengan kunci admin (darurat)</a></p>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="lgX">Batal</button><button class="btn" id="lgGo">Masuk</button></div>`,
      bg => {
        let admin = roleHint === "admin";
        const set = () => { $("#lgP", bg).style.display = admin ? "" : "none"; $("#lgS", bg).style.display = admin ? "none" : ""; $("#lgMode", bg).textContent = admin ? "Masuk dengan NIP dan PIN" : "Masuk dengan kunci admin (darurat)"; };
        set(); $("#lgMode", bg).onclick = e => { e.preventDefault(); admin = !admin; set(); };
        $("#lgX", bg).onclick = () => bg.remove();
        const go = async () => {
          let ses;
          if (admin) ses = { key: $("#lgKey", bg).value.trim() };
          else { ses = { nip: $("#lgNip", bg).value.replace(/\s+/g, ""), pin: $("#lgPin", bg).value.trim() }; if (!/^\d{18}$/.test(ses.nip)) { toast("NIP harus 18 digit angka."); return; } }
          try {
            const j = await Api.get(Object.assign({ action: "auth" }, ses));
            Object.assign(ses, { role: j.role, nama: j.nama || "", jabatan: j.jabatan || (j.role === "pimpinan" ? "Admin" : ""), jabatanKey: j.jabatanKey || (ses.key ? "admin" : ""), jurusan: j.jurusan || "", prodiId: j.prodiId || "" });
            if (j.role === "kajur") { state.jurusan = j.jurusan; saveFilter(); }
            if (j.wajibGantiPin) { bg.remove(); return gantiPinModal(ses, cb); }
            Session.set(ses); Data.server = {}; Data.loadedSemesters = {}; if (window.MONEV.Pejabat) window.MONEV.Pejabat.reset(); bg.remove(); toast("Selamat datang, " + (ses.nama || ses.jabatan)); (cb || route_)();
          } catch (e) { toast("Gagal masuk: " + e.message, 5000); }
        };
        $("#lgGo", bg).onclick = go;
        bg.querySelectorAll("input").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") go(); }));
      });
  }

  /* PIN standar wajib diganti pada login pertama */
  function gantiPinModal(ses, cb) {
    modal(`<h2>Ganti PIN</h2><p class="muted">Selamat datang, <b>${esc(ses.nama || "")}</b>${ses.jabatan ? " (" + esc(ses.jabatan) + ")" : ""}. Anda masih memakai PIN standar. Demi keamanan akun, buat PIN pribadi 6 digit (bukan 123456, bukan angka berurutan atau berulang).</p>
      <label class="field"><span>PIN baru</span><input type="password" id="gpBaru" inputmode="numeric" maxlength="6" autocomplete="new-password"></label>
      <label class="field" style="margin-top:8px"><span>Ulangi PIN baru</span><input type="password" id="gpUlang" inputmode="numeric" maxlength="6" autocomplete="new-password"></label>
      <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn ghost" id="gpX">Batal</button><button class="btn" id="gpGo">Simpan PIN</button></div>`,
      bg => {
        $("#gpX", bg).onclick = () => bg.remove();
        $("#gpGo", bg).onclick = async () => {
          const a = $("#gpBaru", bg).value.trim(), b = $("#gpUlang", bg).value.trim();
          if (!/^\d{6}$/.test(a)) return toast("PIN baru harus 6 digit angka.");
          if (a !== b) return toast("Ulangan PIN tidak sama.");
          try {
            await Api.post({ action: "gantiPin", nip: ses.nip, pin: ses.pin, pinBaru: a });
            ses.pin = a; Session.set(ses); Data.server = {}; Data.loadedSemesters = {}; if (window.MONEV.Pejabat) window.MONEV.Pejabat.reset(); bg.remove();
            toast("PIN berhasil diganti. Gunakan PIN baru ini untuk login berikutnya.", 5000); (cb || route_)();
          } catch (e) { toast("Gagal mengganti PIN: " + e.message, 5000); }
        };
      });
  }

  /* Ketua Jurusan hanya melihat program studi di jurusannya (mode server) */
  function kunciJurusan() { const ses = Session.get(); return Api.enabled() && ses && ses.role === "kajur" ? ses.jurusan : ""; }
  /* ---------------- filter bar ---------------- */
  function filterBar(withJurusan) {
    const sems = C.semester.map(s => `<option value="${s.id}" ${s.id === state.sem ? "selected" : ""}>${s.label}${s.status === "dibuka" ? " (pengisian dibuka)" : ""}</option>`).join("");
    const jur = ["all"].concat(C.jurusan).map(j => `<option value="${j}" ${j === state.jurusan ? "selected" : ""}>${j === "all" ? "Semua jurusan" : j}</option>`).join("");
    return `<div class="filters no-print">
      <label>Semester<select id="fSem">${sems}</select></label>
      <label>Jenjang<div class="seg" id="fJen">${["all"].concat(JENJANG).map(j => `<button data-j="${j}" class="${state.jenjang === j ? "on" : ""}">${j === "all" ? "Semua" : j}</button>`).join("")}</div></label>
      ${withJurusan ? `<label>Jurusan<select id="fJur" ${kunciJurusan() ? "disabled title='Ketua Jurusan melihat jurusannya sendiri'" : ""}>${jur}</select></label>` : ""}
    </div>`;
  }
  function bindFilters(rerender) {
    const s = $("#fSem"); if (s) s.onchange = () => { state.sem = s.value; syncTepatWaktuTarget(state.sem); saveFilter(); rerender(); };
    document.querySelectorAll("#fJen button").forEach(b => b.onclick = () => { state.jenjang = b.dataset.j; saveFilter(); rerender(); });
    const j = $("#fJur"); if (j) j.onchange = () => { state.jurusan = j.value; saveFilter(); rerender(); };
  }

  /* ================================================================
   * DASBOR INSTITUSI (20 PRODI)
   * ================================================================ */
  async function viewDasbor() {
    syncTepatWaktuTarget(state.sem);
    const main = $("#main");
    try { await Data.loadSemester(state.sem); } catch (e) { toast(e.message); }
    const rows = rowsFor(state.sem, state.jenjang, state.jurusan);
    const ag = aggregate(rows);
    const sem = Data.semester(state.sem);
    const withData = rows.filter(r => r.m);
    const lbl = state.jenjang === "all" ? "seluruh jenjang" : state.jenjang;

    main.innerHTML = `
      <div class="pagehead"><div><h1>Dashboard Monitoring dan Evaluasi Pembelajaran Program Studi Poltekkes Kemenkes Makassar</h1><p style="margin:0;font-weight:700;color:var(--kmk-700)">Semester ${esc(sem.label)}</p>
        <p>${ag.n} dari ${ag.total} program studi telah melapor · ${esc(lbl)}${state.jurusan !== "all" ? " · Jurusan " + esc(state.jurusan) : ""}</p></div>
        <div class="row no-print"><a class="btn ghost" href="#/laporan">Ekspor Laporan</a></div></div>
      ${filterBar(true)}
      ${ag.n === 0 ? `<div class="card empty">Belum ada data program studi untuk ${esc(sem.label)} pada filter ini.${sem.status === "dibuka" ? "<br>Pengisian sedang dibuka; data tampil setelah program studi mengirim isian." + (Api.enabled() && !Session.get() ? " Pimpinan dan Ketua Jurusan perlu <a href='#' id='lgLink'>masuk</a> untuk melihat isian di server." : "") : ""}</div>` : `
      <div class="kpis">
        ${kpiCard("Program studi melapor", `${ag.n}/${ag.total}`, `Kelengkapan rata-rata ${fmt(ag.kelengkapan, 0)}%`, cls(ag.n / ag.total * 100, 100, 70))}
        ${kpiCard("Kehadiran dosen", fmt(ag.dosen, 1) + "%", "Rata-rata seluruh mata kuliah", cls(ag.dosen, 100, 95))}
        ${kpiCard("Kehadiran mahasiswa", fmt(ag.mhs, 1) + "%", `${ag.mhsBawah} mata kuliah di bawah ${A.kehadiranMhs}%`, cls(ag.mhs, 95, A.kehadiranMhs))}
        ${kpiCard("Rata-rata IPK", fmt(ag.ipk, 2), "Rerata antar angkatan", cls(ag.ipk, 3.5, A.ipkMin))}
        ${kpiCard("UKT lunas", fmt(ag.ukt, 2) + "%", `${fmt(ag.totalMhs, 0)} mahasiswa tercatat`, cls(ag.ukt, 100, 98))}
        ${kpiCard("Lulus tepat waktu", fmt(ag.tepat, 1) + "%", "Tertimbang jumlah lulusan", cls(ag.tepat, 95, 85))}
        ${kpiCard("Berhenti / Pindah", fmt(ag.keluar, 0), `Cuti ${ag.cuti} mahasiswa`, cls(ag.keluar, 0, 20, "turun"))}
        ${kpiCard("Prestasi mahasiswa", fmt(ag.prestasi, 0), `Target ${T.prestasi.target} per program studi (IKM 17.3.13)`, "")}
      </div>
      <div class="grid g2">
        <div class="card"><h3>Kehadiran mahasiswa per program studi</h3><p class="hint">Rata-rata dan mata kuliah terendah; garis kuning = ambang ${A.kehadiranMhs}%</p><div class="chart tall"><canvas id="chHadir"></canvas></div></div>
        <div class="card"><h3>Rasio dosen tetap : mahasiswa</h3><p class="hint">Nilai n pada rasio 1:n; garis merah = target 1:${T.rasio.target}</p><div class="chart tall"><canvas id="chRasio"></canvas></div></div>
        <div class="card"><h3>Rata-rata IPK dan IPS per program studi</h3><div class="chart"><canvas id="chIpk"></canvas></div></div>
        <div class="card"><h3>Kepatuhan RPS (F) dan Evaluasi Hasil Belajar (H)</h3><p class="hint">Jumlah aspek sesuai / belum / tidak diisi</p><div class="chart"><canvas id="chPatuh"></canvas></div></div>
      </div>
      <div class="card"><h3>Keterangan kode program studi</h3><p class="hint">Kode dipakai pada label grafik; arahkan kursor ke batang grafik untuk melihat nama lengkap. Huruf pertama: D = D-III, S = Sarjana Terapan, P = Profesi.</p>
        <div class="kode-grid">${withData.map(r => `<a class="kode-item" href="#/prodi/${r.p.id}"><b>${esc(r.p.kode)}</b><span>${esc(r.p.nama)}</span></a>`).join("")}</div></div>
      <div class="card"><h3>Peringatan dini <span class="badge b-bad">${ag.nMerah} program studi merah</span></h3>
        <p class="hint">Diurutkan menurut skor risiko (merah = 3, kuning = 1, data kosong = 0,5). Klik nama program studi untuk membuka dashboardnya.</p>
        <div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Jenjang</th><th class="num">Skor</th><th>Temuan</th></tr></thead><tbody>
        ${withData.slice().sort((a, b) => b.m.skorRisiko - a.m.skorRisiko).map(r => `<tr><td><a href="#/prodi/${r.p.id}">${esc(r.p.nama)}</a></td><td>${r.p.jenjang}</td><td class="num"><b>${fmt(r.m.skorRisiko, 1)}</b></td>
          <td>${r.m.flags.length ? r.m.flags.map(f => `<div class="flag"><span class="dot ${f.lv}"></span>${esc(f.t)}</div>`).join("") : `<div class="flag"><span class="dot hijau"></span>Tidak ada temuan</div>`}</td></tr>`).join("")}
        </tbody></table></div></div>
      <div class="grid g2">
        <div class="card"><h3>Peta kendala pembelajaran (Bagian G)</h3>
          <div class="tbl-wrap"><table class="heat"><thead><tr><th>Program Studi</th>${KENDALA.map(k => `<th class="c">${k.label}</th>`).join("")}</tr></thead><tbody>
          ${withData.map(r => `<tr><td>${esc(shortName(r.p.nama))}</td>${KENDALA.map(k => `<td class="h ${r.m.kendala[k.id] ? "h1" : "h0"}">${r.m.kendala[k.id] ? "●" : "–"}</td>`).join("")}</tr>`).join("")}
          <tr><td><b>Jumlah program studi</b></td>${KENDALA.map(k => `<td class="c"><b>${withData.filter(r => r.m.kendala[k.id]).length}</b></td>`).join("")}</tr>
          </tbody></table></div></div>
        <div class="card"><h3>Rekomendasi program studi menurut tema (Bagian J)</h3>${temaBlock(withData)}</div>
      </div>
      <div class="card"><h3>Capaian indikator KPI institusi (Bagian I) — dihitung ulang</h3>
        <p class="hint">Nilai dihitung aplikasi dari data mentah bila tersedia; target institusi dari konfigurasi (perlu diverifikasi terhadap RSB/LKJ 2026).</p>
        ${kpiTable(withData)}</div>`}
      <div class="card"><h3>Status pengisian ${esc(sem.label)}</h3><div class="prodi-cards" style="margin-top:10px">
        ${rows.map(r => `<a class="pcard" href="#/prodi/${r.p.id}"><div class="row" style="justify-content:space-between"><span class="t">${esc(r.p.nama)}</span>${statusBadge(r.rec)}</div>
          <div class="meta">${esc(r.p.kode)} · ${esc(r.p.jurusan)} · ${r.p.jenjang}</div>
          ${r.m ? `<div class="mini"><div><b>${fmt(r.m.mhsAvg, 1)}%</b>kehadiran mahasiswa</div><div><b>${fmt(r.m.ipkAvg, 2)}</b>rata-rata IPK</div><div><b>${r.m.kelengkapan}%</b>kelengkapan isian</div></div>` : ""}</a>`).join("")}
      </div></div>`;
    bindFilters(viewDasbor);
    const ll = $("#lgLink"); if (ll) ll.onclick = e => { e.preventDefault(); loginModal("pimpinan"); };
    if (ag.n) drawDasborCharts(withData);
  }

  function temaBlock(rows) {
    const items = [];
    rows.forEach(r => (r.rec.payload.rekomendasi || []).forEach(x => items.push({ p: r.p, masalah: x[0], tl: x[1], tema: temaOf(x[0] + " " + x[1]) })));
    return TEMA.map(t => { const it = items.filter(i => i.tema === t.id); if (!it.length) return ""; const np = new Set(it.map(i => i.p.id)).size;
      return `<details style="margin-bottom:8px"><summary><b>${t.label}</b> <span class="badge b-kmk">${it.length} temuan · ${np} program studi</span></summary>
        <ul class="clean" style="margin-top:6px">${it.map(i => `<li><b>${esc(shortName(i.p.nama))}:</b> ${esc(i.masalah)} <span class="muted">→ ${esc(i.tl)}</span></li>`).join("")}</ul></details>`; }).join("") || `<p class="muted">Belum ada rekomendasi.</p>`;
  }

  function kpiTable(rows) {
    const c = (v, t, dir) => v === null ? "" : (dir === "turun" ? (v <= t ? "b-ok" : "b-bad") : (v >= t ? "b-ok" : "b-bad"));
    const cell = (v, t, dir, suf) => v === null || v === undefined ? `<td class="num muted">–</td>` : `<td class="num"><span class="badge ${c(v, t, dir)}">${suf === "rasio" ? "1:" + fmt(v) : fmt(v) + (suf || "")}</span></td>`;
    return `<div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th class="num">Uji Kompetensi/Try Out<br><small>target ${fmt(T.ukom.target)}%</small></th><th class="num">Tepat waktu<br><small>target ${fmt(T.tepatWaktu.target)}%</small></th>
      <th class="num">Rasio dosen<br><small>target 1:${T.rasio.target}</small></th><th class="num">Bahasa Inggris<br><small>target ${fmt(T.inggris.target)}%</small></th><th class="num">Prestasi<br><small>target ${T.prestasi.target}</small></th><th>Akreditasi</th></tr></thead><tbody>
      ${rows.map(r => `<tr><td><a href="#/prodi/${r.p.id}">${esc(r.p.nama)}</a></td>${cell(r.m.ukom, T.ukom.target, "naik", "%")}${cell(r.m.tepatWaktu, T.tepatWaktu.target, "naik", "%")}${r.m.rasio === null ? cell(null, T.rasio.target, "turun", "rasio") : `<td class="num"><span class="badge" style="background:${rasioCapaianColor(r.m.rasio)};color:#fff">1:${fmt(r.m.rasio)}${r.m.rasioCapaian !== null ? " (" + r.m.rasioCapaian + "%)" : ""}</span></td>`}${cell(r.m.inggris, T.inggris.target, "naik", "%")}${cell(r.m.prestasi, T.prestasi.target, "naik", "")}<td>${esc(r.m.akreditasi || "–")}</td></tr>`).join("")}
      </tbody></table></div>`;
  }

  function chartBase() {
    const ink = cssVar("--ink-2"), line = cssVar("--line");
    Chart.defaults.font.family = cssVar("--font") || "sans-serif"; Chart.defaults.color = ink; Chart.defaults.locale = "id-ID";
    return { line, ink, kmk: cssVar("--kmk"), kmk2: cssVar("--kmk-100"), red: cssVar("--red"), amber: cssVar("--amber"), accent: cssVar("--accent"), green: cssVar("--green"), mute: cssVar("--ink-3") };
  }
  function drawDasborCharts(rows) {
    killCharts(); const k = chartBase();
    const labels = rows.map(r => r.p.kode || r.p.nama);
    const tooltip = { callbacks: { title: it => { const p = rows[it[0].dataIndex].p; return `${p.kode} — ${p.nama}`; } } };
    const grid = { color: k.line };
    charts.push(new Chart($("#chHadir"), { type: "bar", data: { labels, datasets: [
      { label: "Rata-rata", data: rows.map(r => r.m.mhsAvg), backgroundColor: k.kmk, borderRadius: 4 },
      { label: "Mata kuliah terendah", data: rows.map(r => r.m.mhsMin), backgroundColor: k.accent, borderRadius: 4 },
      { type: "line", label: `Ambang ${A.kehadiranMhs}%`, data: rows.map(() => A.kehadiranMhs), borderColor: k.amber, borderDash: [5, 4], pointRadius: 0, borderWidth: 2 }] },
      options: { indexAxis: "y", maintainAspectRatio: false, scales: { x: { min: 70, max: 100, grid }, y: { ticks: { font: { weight: 600 } }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, tooltip } } }));
    charts.push(new Chart($("#chRasio"), { type: "bar", data: { labels, datasets: [
      { label: "Rasio 1:n", data: rows.map(r => r.m.rasio), backgroundColor: rows.map(r => rasioCapaianColor ? rasioCapaianColor(r.m.rasio) : (r.m.rasio > T.rasio.target ? k.red : k.kmk)), borderRadius: 4 },
      { type: "line", label: `Target 1:${T.rasio.target}`, data: rows.map(() => T.rasio.target), borderColor: k.red, borderDash: [5, 4], pointRadius: 0, borderWidth: 2 }] },
      options: { indexAxis: "y", maintainAspectRatio: false, scales: { x: { beginAtZero: true, grid }, y: { ticks: { font: { weight: 600 } }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, tooltip } } }));
    charts.push(new Chart($("#chIpk"), { type: "bar", data: { labels, datasets: [
      { label: "IPK", data: rows.map(r => r.m.ipkAvg), backgroundColor: k.kmk, borderRadius: 4 },
      { label: "IPS", data: rows.map(r => r.m.ipsAvg), backgroundColor: k.kmk2, borderRadius: 4 }] },
      options: { maintainAspectRatio: false, scales: { y: { min: 2.5, max: 4, grid }, x: { ticks: { autoSkip: false, maxRotation: 0, font: { weight: 600 } }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, tooltip } } }));
    charts.push(new Chart($("#chPatuh"), { type: "bar", data: { labels, datasets: [
      { label: "Sesuai", data: rows.map(r => r.m.rps.s + r.m.eval.s), backgroundColor: k.green, stack: "a" },
      { label: "Belum", data: rows.map(r => r.m.rps.b + r.m.eval.b), backgroundColor: k.red, stack: "a" },
      { label: "Tidak diisi", data: rows.map(r => r.m.rps.kosong + r.m.eval.kosong), backgroundColor: k.mute, stack: "a" }] },
      options: { maintainAspectRatio: false, scales: { y: { stacked: true, grid }, x: { stacked: true, ticks: { autoSkip: false, maxRotation: 0, font: { weight: 600 } }, grid: { display: false } } }, plugins: { legend: { position: "bottom" }, tooltip } } }));
  }

  /* ================================================================
   * DASBOR PRODI
   * ================================================================ */
  async function viewProdiPicker() {
    const ses = Session.get();
    if (ses && ses.role === "prodi" && ses.prodiId) { location.hash = "#/prodi/" + ses.prodiId; return; }
    try { await Data.loadSemester(state.sem); } catch (e) {}
    const rows = rowsFor(state.sem, state.jenjang, state.jurusan);
    $("#main").innerHTML = `<div class="pagehead"><div><h1>Dashboard Program Studi</h1><p>Pilih program studi untuk melihat hasil monitoring dan evaluasi pembelajaran secara rinci.</p></div></div>
      ${filterBar(true)}
      ${C.jurusan.filter(j => state.jurusan === "all" || j === state.jurusan).map(j => { const rr = rows.filter(r => r.p.jurusan === j); if (!rr.length) return "";
        return `<h3 style="margin:14px 0 8px">Jurusan ${esc(j)}</h3><div class="prodi-cards">${rr.map(r => `<a class="pcard" href="#/prodi/${r.p.id}"><div class="row" style="justify-content:space-between"><span class="t">${esc(r.p.nama)}</span>${statusBadge(r.rec)}</div><div class="meta">${r.p.jenjang}</div>
        ${r.m ? `<div class="mini"><div><b>${fmt(r.m.mhsAvg, 1)}%</b>kehadiran mahasiswa</div><div><b>${fmt(r.m.ipkAvg, 2)}</b>rata-rata IPK</div><div><b>${r.m.flags.filter(f => f.lv === "merah").length}</b>peringatan merah</div></div>` : ""}</a>`).join("")}</div>`; }).join("")}`;
    bindFilters(viewProdiPicker);
  }

  async function viewProdi(id) {
    syncTepatWaktuTarget(state.sem);
    const p = Data.prodi(id); if (!p) return viewProdiPicker();
    try { await Data.loadSemester(state.sem); } catch (e) { toast(e.message); }
    if (window.MONEV.Pejabat) { try { await window.MONEV.Pejabat.load(); } catch (e) {} }
    const prevSem = Data.previousSemester(state.sem);
    if (prevSem) { try { await Data.loadSemester(prevSem); } catch (e) {} }
    const rec = Data.get(state.sem, id);
    const prev = prevSem ? Data.get(prevSem, id) : null;
    const m = rec ? metrics(rec.payload, state.sem) : null, pm = prev ? metrics(prev.payload, Data.previousSemester(state.sem)) : null;
    const sem = Data.semester(state.sem);
    const sems = C.semester.map(s => `<option value="${s.id}" ${s.id === state.sem ? "selected" : ""}>${s.label}</option>`).join("");
    const sesNow = Session.get();
    const hideProdiSel = !!(sesNow && sesNow.role === "prodi");
    const isKajurNow = !!(sesNow && sesNow.role === "kajur");
    const prodiOpts = Data.prodiList().filter(x => !kunciJurusan() || x.jurusan === kunciJurusan()).map(x => `<option value="${x.id}" ${x.id === id ? "selected" : ""}>${esc(x.nama)}</option>`).join("");    const delta = (a, b, d, inv) => { if (a === null || b === null || a === undefined || b === undefined) return ""; const x = a - b; if (Math.abs(x) < 0.005) return " · tetap"; const up = x > 0; const good = inv ? !up : up; return ` · <span style="color:var(${good ? "--green" : "--red"})">${up ? "▲" : "▼"} ${fmt(Math.abs(x), d)}</span> dibandingkan semester lalu`; };

    let html = `<div class="pagehead"><div><h1>${esc(p.nama)}</h1><p>Jurusan ${esc(p.jurusan)} · ${p.jenjang} · ${esc(sem.label)} ${statusBadge(rec)} ${sumberBadge(rec)}</p></div>
      <div class="row no-print">${rec ? `<button class="btn ghost" id="xPdf">Unduh Laporan (PDF)</button><button class="btn" id="xDocx">Unduh Laporan (DOCX)</button>` : ""}${(!isKajurNow && prevSem) ? `<a class="btn ghost" href="#/isi/${id}?sem=${prevSem}&koreksi=1">Ajukan perbaikan data (semester sebelumnya)</a>` : ""}</div></div>
      <div class="filters no-print">${hideProdiSel ? "" : `<label>Program studi<select id="pSel">${prodiOpts}</select></label>`}<label>Semester<select id="pSem">${sems}</select></label>${isKajurNow ? "" : (sem.status === "arsip" ? `<a class="btn warn" href="#/isi/${id}?sem=${state.sem}&koreksi=1" style="align-self:end">Ajukan perbaikan data</a>` : `<a class="btn ghost" href="#/isi/${id}" style="align-self:end">Isi/Ubah instrumen</a>`)}</div>`;
    if (!rec) {
      html += `<div class="card empty">Belum ada isian monitoring dan evaluasi ${esc(p.nama)} untuk ${esc(sem.label)}.<br>${(!isKajurNow && sem.status === "dibuka") ? `<a class="btn" style="margin-top:10px" href="#/isi/${id}">Isi instrumen sekarang</a>` : ""}</div>`;
      $("#main").innerHTML = html; bindProdiFilters(id); return;
    }
    const P = rec.payload, I = P.identitas || {};
    const PJv = window.MONEV.Pejabat;
    const kpAktifV = PJv ? PJv.aktif("kaprodi", id) : null;
    const kjAktifV = PJv ? PJv.aktif("kajur", p.jurusan) : null;
    const namaKp = kpAktifV ? kpAktifV.nama : (I.kaprodi || "–");
    const nipKp = (kpAktifV ? kpAktifV.nip : I.nipKaprodi) || "";
    const namaKj = kjAktifV ? kjAktifV.nama : (I.kajur || "–");
    const nipKj = (kjAktifV ? kjAktifV.nip : I.nipKajur) || "";
    html += `<div class="kpis">
      ${kpiCard("Kehadiran dosen", fmt(m.dosenAvg, 1) + "%", `${(P.dosen || []).length} baris mata kuliah/dosen` + delta(m.dosenAvg, pm && pm.dosenAvg, 1), cls(m.dosenAvg, 100, 95))}
      ${kpiCard("Kehadiran mahasiswa", fmt(m.mhsAvg, 1) + "%", `Terendah ${fmt(m.mhsMin, 1)}%` + delta(m.mhsAvg, pm && pm.mhsAvg, 1), cls(m.mhsAvg, 95, A.kehadiranMhs))}
      ${kpiCard("Rata-rata IPK", fmt(m.ipkAvg, 2), `IPS ${fmt(m.ipsAvg, 2)}` + delta(m.ipkAvg, pm && pm.ipkAvg, 2), cls(m.ipkAvg, 3.5, A.ipkMin))}
      ${kpiCard("UKT lunas", fmt(m.uktPct, 2) + "%", `${fmt(m.totalMhs, 0)} mahasiswa`, cls(m.uktPct, 100, 98))}
      ${kpiCard("Berhenti / Pindah", m.keluar, `Cuti ${m.cuti}` + delta(m.keluar, pm && pm.keluar, 0, true), cls(m.keluarPct, 0, 2, "turun"))}
      ${kpiCard("Lulus tepat waktu", fmt(m.tepatWaktu, 1) + "%", m.lulusFormatLama ? "Format lama (gabungan beberapa tahun)" : m.totalLulusan ? `${m.totalLulusan} lulusan` + (m.lulusRpl ? ` (Reguler ${m.lulusReguler}, RPL ${m.lulusRpl})` : ` (${window.MONEV.labelLulus(state.sem)})`) : m.lulusDiisi ? "Tidak ada lulusan semester ini" : "Tidak diisi", cls(m.tepatWaktu, 95, 85))}
      ${kpiCard("Rasio dosen", m.rasio ? "1:" + fmt(m.rasio) : "-", `Ideal 1:27 s.d. 1:30 · Capaian ${m.rasioCapaian !== null ? m.rasioCapaian + "%" : "-"}`, m.rasioCapaian === null ? "" : m.rasioCapaian === 100 ? "good" : m.rasioCapaian >= 75 ? "warn" : "bad")}
      ${kpiCard("Kelengkapan isian", m.kelengkapan + "%", `${m.flags.length} temuan`, cls(m.kelengkapan, 90, 70))}
    </div>
    <div class="grid g2">
      <div class="card"><h3>Peringatan dini</h3>${m.flags.length ? m.flags.map(f => `<div class="flag"><span class="dot ${f.lv}"></span>${esc(f.t)}</div>`).join("") : `<div class="flag"><span class="dot hijau"></span>Tidak ada temuan</div>`}
        ${(P.catatanData || []).length ? `<h3 style="margin-top:14px">Catatan verifikasi data (Pusbangdik)</h3><ul class="clean">${P.catatanData.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}</div>
      <div class="card"><h3>Identitas dan pengesahan</h3><p class="hint">Sesuai isian semester ini; tidak berubah bila terjadi pergantian pejabat di kemudian hari.</p><table><tbody>
        <tr><th>Ketua Program Studi</th><td>${esc(namaKp)}${nipKp ? `<br><small>NIP ${esc(nipKp)}</small>` : ""}</td></tr>
        <tr><th>Ketua Jurusan</th><td>${esc(namaKj)}${nipKj ? `<br><small>NIP ${esc(nipKj)}</small>` : ""}</td></tr>
        <tr><th>Tanggal pengisian</th><td>${esc(I.tanggal || "–")}</td></tr>
        ${P.sumber ? `<tr><th>Dokumen sumber</th><td><a href="${esc(P.sumber.url)}" target="_blank" rel="noopener">${esc(P.sumber.file)}</a></td></tr>` : ""}
        ${P.bukti && P.bukti.folder ? `<tr><th>Folder bukti dukung</th><td><a href="${esc(P.bukti.folder)}" target="_blank" rel="noopener">Buka folder</a></td></tr>` : ""}
      </tbody></table></div>
    </div>
    <div class="grid g2">
      <div class="card"><h3>Kehadiran mahasiswa per mata kuliah</h3><div class="chart" style="height:${Math.max(300, Math.min(1400, (P.mhs || []).length * 18 + 60))}px"><canvas id="cMhs"></canvas></div></div>
      <div class="card"><h3>IPS, IPK, dan Uji Kompetensi per angkatan</h3><div class="chart"><canvas id="cIpk"></canvas></div>
        <h3 style="margin-top:14px">Ketaatan UKT per angkatan</h3><div class="chart" style="height:220px"><canvas id="cUkt"></canvas></div></div>
    </div>
    <div class="card"><div class="tabs no-print" id="tabs">${["B–C Kehadiran", "D–E UKT dan Retensi", "F dan H Kepatuhan", "G Kendala", "IPK, Uji Kompetensi, dan Kelulusan", "I KPI", "J Rekomendasi", "K–M Tambahan"].map((t, i) => `<button data-t="${i}" class="${i === 0 ? "on" : ""}">${t}</button>`).join("")}</div><div id="tabBody"></div></div>
    ${catatanCard(rec, id, p)}
    <div id="kontrolCard"></div>`;
    $("#main").innerHTML = html;
    bindProdiFilters(id);
    loadKontrolCard(id);
    const tabs = sectionTabs(P, m);
    const showTab = i => { $("#tabBody").innerHTML = tabs[i]; document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", +b.dataset.t === i)); };
    document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => showTab(+b.dataset.t)); showTab(0);
    document.querySelectorAll("[data-savecat]").forEach(btn => btn.onclick = async () => {
      const ses = Session.get(), peran = btn.dataset.savecat;
      if (Api.enabled() && (!ses || ses.role !== peran)) return loginModal(peran, () => viewProdi(id));
      try { await Data.review(state.sem, id, $(peran === "kajur" ? "#catK" : "#catP").value); toast(peran === "kajur" ? "Catatan Ketua Jurusan tersimpan" : "Catatan pimpinan tersimpan"); } catch (e) { toast(e.message, 5000); }
    });
    $("#xPdf").onclick = () => window.MONEV_REPORT.prodiPdf(state.sem, id).catch(e => toast("Gagal: " + e.message));
    $("#xDocx").onclick = () => window.MONEV_REPORT.prodiDocx(state.sem, id).catch(e => toast("Gagal: " + e.message));
    drawProdiCharts(P);
  }
  /* Catatan pimpinan (Direktur, Wakil Direktur I, Kapus) dan catatan Ketua Jurusan; masing-masing hanya dapat diubah pemiliknya */
  async function loadKontrolCard(id) {
    const el = $("#kontrolCard");
    if (!el) return;
    const ses = Session.get();
    if (!Api.enabled() || !ses) { el.innerHTML = ""; return; }
    const list = await Data.listKontrol();
    const mine = list.filter(x => x.prodiId === id);
    if (!mine.length) { el.innerHTML = ""; return; }
    const sesCard = Session.get();
    const isProdi = sesCard && sesCard.role === "prodi" && sesCard.prodiId === id;
    el.innerHTML = `<div class="card no-print"><h3>Catatan yang memerlukan tindak lanjut (${mine.length})</h3>
      <div class="tbl-wrap"><table><thead><tr><th>Pemberi</th><th>Semester</th><th>Tanggal</th><th>Catatan</th><th>Tanggapan Kaprodi</th><th>Status</th>${isProdi ? "<th class=\"no-print\">Aksi</th>" : ""}</tr></thead><tbody>
      ${mine.map(x => `<tr><td>${esc(/ketua jurusan|direktur|wakil|kapus/i.test(x.pemberi) ? x.pemberi : (x.tipe === "kajur" ? "Ketua Jurusan " + ((Data.prodi(x.prodiId) || {}).jurusan || "") : "Pimpinan"))}</td><td>${esc(Data.semester(x.semester) ? Data.semester(x.semester).label : x.semester)}</td><td>${esc(x.tanggal ? new Date(x.tanggal).toLocaleDateString("id-ID") : "")}</td><td>${esc(x.catatan)}</td><td>${esc(x.tanggapanProdi || "-")}</td><td><span class="badge ${x.status === "selesai" ? "b-ok" : "b-warn"}">${esc(x.status)}</span></td>${isProdi ? `<td class="no-print"><button class="btn sm" data-tanggapan="${x.id}">Beri tanggapan</button></td>` : ""}</tr>`).join("")}
      </tbody></table></div></div>`;
    el.querySelectorAll("[data-tanggapan]").forEach(b => b.onclick = async () => {
      const tanggapan = prompt("Tanggapan Kaprodi (tindak lanjut):") || "";
      if (!tanggapan.trim()) { toast("Tanggapan wajib diisi."); return; }
      try { await Data.submitTanggapan(b.dataset.tanggapan, id, tanggapan.trim()); toast("Tanggapan tersimpan."); loadKontrolCard(id); }
      catch (e) { toast(e.message, 5000); }
    });
  }

  function catatanCard(rec, id, p) {
    const ses = Session.get(), srv = Api.enabled();
    const bolehP = !srv || !ses || ses.role === "pimpinan";
    const bolehK = srv && (!ses || (ses.role === "kajur" && ses.jurusan === p.jurusan));
    /* mode server: setiap pimpinan memiliki catatannya sendiri; catatan pimpinan lain tampil sebagai bacaan */
    const daftarP = srv ? (rec.catatanPimpinanList || (rec.catatanPimpinan ? [{ jabatanKey: "lama", jabatan: "Pimpinan", catatan: rec.catatanPimpinan }] : [])) : [];
    const kunciSaya = srv && ses && ses.role === "pimpinan" ? (ses.jabatanKey || "admin") : null;
    const lainnya = daftarP.filter(e => e.jabatanKey !== kunciSaya && String(e.catatan || "").trim());
    const isiP = srv ? ((daftarP.find(e => e.jabatanKey === kunciSaya) || {}).catatan || "") : (rec.catatanPimpinan || Data.catatanLokal(state.sem, id) || "");
    const blokLain = lainnya.map(e => `<div style="margin:0 0 10px;padding:8px 10px;border-left:3px solid var(--kmk);background:var(--bg)"><b>${esc(e.jabatan)}</b>${e.waktu ? ` <small class="muted">· ${esc(new Date(e.waktu).toLocaleDateString("id-ID"))}</small>` : ""}<div style="white-space:pre-wrap;margin-top:2px">${esc(e.catatan)}</div></div>`).join("");
    const pimpinan = `<div class="card no-print"><h3>Catatan dan arahan pimpinan</h3>${blokLain}
      ${bolehP ? `<textarea id="catP" placeholder="Arahan tindak lanjut pimpinan untuk program studi ini...">${esc(isiP)}</textarea>
      <div class="row" style="margin-top:8px;justify-content:space-between"><span class="hint">${ses && ses.role === "pimpinan" ? "Ditulis sebagai " + esc(ses.jabatan) + (srv ? "; catatan pimpinan lain tidak berubah" : "") : "Direktur, Wakil Direktur I, Kepala Pusat Penjaminan Mutu, dan Kepala Pusat Pengembangan Pendidikan"}</span><button class="btn" data-savecat="pimpinan">Simpan catatan</button></div>`
        : (srv ? (blokLain ? "" : '<p class="muted">Belum ada catatan pimpinan.</p>') : `<p style="white-space:pre-wrap">${isiP ? esc(isiP) : '<span class="muted">Belum ada catatan pimpinan.</span>'}</p>`)}</div>`;
    if (!srv) return pimpinan;
    const isiK = rec.catatanKajur || "";
    const kajur = `<div class="card no-print"><h3>Catatan Ketua Jurusan ${esc(p.jurusan)}</h3>
      ${bolehK ? `<textarea id="catK" placeholder="Catatan pembinaan Ketua Jurusan untuk program studi ini...">${esc(isiK)}</textarea>
      <div class="row" style="margin-top:8px;justify-content:flex-end"><button class="btn" data-savecat="kajur">Simpan catatan</button></div>`
        : `<p style="white-space:pre-wrap">${isiK ? esc(isiK) : '<span class="muted">Belum ada catatan Ketua Jurusan.</span>'}</p>`}
      ${rec.catatanKajurOleh ? `<p class="hint">Oleh ${esc(/ketua jurusan|direktur|wakil|kapus/i.test(rec.catatanKajurOleh) ? rec.catatanKajurOleh : ("Ketua Jurusan " + p.jurusan))}</p>` : ""}</div>`;
    return pimpinan + kajur;
  }
  function bindProdiFilters(id) {
    const ps = $("#pSel"); if (ps) ps.onchange = e => { location.hash = "#/prodi/" + e.target.value; };
    const ss = $("#pSem"); if (ss) ss.onchange = e => { state.sem = e.target.value; syncTepatWaktuTarget(state.sem); saveFilter(); viewProdi(id); };
  }

  function tbl(head, rows, numCols) {
    numCols = numCols || [];
    if (!rows.length) return `<p class="muted">Tidak ada data.</p>`;
    return `<div class="tbl-wrap"><table><thead><tr>${head.map((h, i) => `<th class="${numCols.includes(i) ? "num" : ""}">${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td class="${numCols.includes(i) ? "num" : ""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  window.MONEV.tbl = tbl; window.MONEV.esc = esc;

  const RPS_ITEM = ["RPS tersedia dan disahkan sebelum semester berjalan", "Materi perkuliahan sesuai dengan RPS", "CPMK tercapai sesuai rencana", "Jumlah tatap muka sesuai minggu efektif (14–16 minggu)", "Metode pembelajaran sesuai RPS (PBL/PjBL/CBL/SCL, dsb.)", "Kontrak perkuliahan tersosialisasi ke mahasiswa"];
  const EVAL_ITEM = ["UTS terlaksana sesuai jadwal akademik", "UAS terlaksana sesuai jadwal akademik", "Soal ujian sesuai kisi-kisi / CPMK", "Nilai akhir diinput tepat waktu ke sistem akademik", "Rubrik penilaian digunakan secara konsisten", "Umpan balik hasil belajar diberikan ke mahasiswa"];
  window.MONEV.RPS_ITEM = RPS_ITEM; window.MONEV.EVAL_ITEM = EVAL_ITEM;
  const stBadge = s => s === "S" ? `<span class="badge b-ok">Sesuai</span>` : s === "B" ? `<span class="badge b-bad">Belum</span>` : `<span class="badge b-mute">Tidak diisi</span>`;

  function sectionTabs(P, m) {
    const pct = v => v === null || v === undefined ? "–" : fmt(v, 2) + "%";
    const t = [];
    t.push(`<div class="grid g2"><div><h3>B. Kehadiran dosen</h3>${tbl(["Mata kuliah", "Dosen pengampu", "Kehadiran (%)", "Keterangan"], (P.dosen || []).map(r => [esc(r[0]), esc(r[1]), pct(r[2]), esc(r[3])]), [2])}</div>
      <div><h3>C. Kehadiran mahasiswa</h3>${tbl(["Mata kuliah", "Kehadiran (%)", "Keterangan"], (P.mhs || []).map(r => [esc(r[0]), r[1] !== null && r[1] < A.kehadiranMhs ? `<span class="badge b-bad">${pct(r[1])}</span>` : pct(r[1]), esc(r[2])]), [1])}
      <h3 style="margin-top:14px">Prestasi mahasiswa</h3>${tbl(["Nama", "Jenis / nama prestasi", "Tingkat", "Capaian", "Bukti"], (P.prestasi || []).map(r => [esc(r.nama), esc(r.jenis), esc(r.tingkat), esc(r.capaian), r.bukti ? `<a href="${esc(r.bukti)}" target="_blank" rel="noopener">tautan</a>` : ""]))}</div></div>`);
    t.push(`<div class="grid g2"><div><h3>D. Ketaatan pembayaran UKT</h3>${tbl(["Tingkat/angkatan", "Jumlah", "Lunas %", "Keterangan"], (P.ukt || []).map(r => [esc(r.angkatan), fmt(r.jumlah, 0), pct(r.lunasPct), esc(r.ket)]), [1, 2])}</div>
      <div><h3>E. Retensi mahasiswa</h3>${tbl(["Tingkat/angkatan", "Cuti", "Berhenti/putus studi", "Skors", "Pindah", "Keterangan"], (P.retensi || []).map(r => [esc(r.angkatan), r.cuti, r.do, r.skors, r.pindah, esc(r.ket)]), [1, 2, 3, 4])}</div></div>`);
    const ev = P.evaluasi || {}; const evItems = ev.item || EVAL_ITEM;
    t.push(`<div class="grid g2"><div><h3>F. Capaian RPS / silabus</h3>${tbl(["Aspek", "Status", "Keterangan"], RPS_ITEM.map((it, i) => [it, stBadge((P.rps || {}).status && P.rps.status[i]), esc((P.rps || {}).ket && P.rps.ket[i])]))}</div>
      <div><h3>H. Evaluasi hasil belajar ${ev.varian === "profesi" ? '<span class="badge b-kmk">varian profesi</span>' : ""}</h3>${tbl(["Aspek", "Status", "Keterangan"], evItems.map((it, i) => [esc(it), stBadge(ev.status && ev.status[i]), esc(ev.ket && ev.ket[i])]))}</div></div>`);
    t.push(`<h3>G. Kendala pelaksanaan pembelajaran</h3>${tbl(["Jenis kendala", "Mata kuliah terdampak", "Uraian"], KENDALA.map(k => { const x = (P.kendala || {})[k.id] || {}; return [k.label, esc(x.mk), esc(x.uraian) || '<span class="muted">–</span>']; }))}`);
    t.push(`<div class="grid g2"><div><h3>Rekapitulasi IPS, IPK, dan Hasil Try Out/Uji Kompetensi</h3>${tbl(["Angkatan", "IPS", "IPK", "Try Out/Uji Kompetensi (%)", "Kendala"], (P.ipk || []).map(r => [esc(r.angkatan), fmt(r.ips, 2), fmt(r.ipk, 2), r.ukom === null ? "–" : fmt(r.ukom, 2), esc(r.kendala)]), [1, 2, 3])}</div>
      <div><h3>Kelulusan tepat waktu</h3>${m.lulusFormatLama ? `<p class="hint">Format lama: diisi beberapa tahun/angkatan, belum berupa lulusan ${esc(window.MONEV.labelLulus(state.sem))}. Perbaiki melalui usulan perbaikan data.</p>` : ""}${tbl(["Tahun lulus (yudisium)", "Jalur", "Jumlah lulusan", "Lulus tepat waktu", "Persentase (%)", "Keterangan"], (P.lulus || []).map(r => [esc(r.tahun), esc(r.jalur === "RPL" ? "RPL" + (r.masaStudi ? " (" + r.masaStudi + " semester)" : "") : r.jalur || "–"), r.jumlah, r.tepat, r.jumlah ? fmt(r.tepat / r.jumlah * 100, 2) + "%" : "–", esc(r.ket)]), [2, 3, 4])}</div></div>`);
    t.push(`<h3>I. Keterkaitan dengan KPI institusi 2026</h3>${tbl(["Kode", "Indikator", "Target (program studi)", "Realisasi (program studi)", "Target institusi", "Nilai terhitung"], Object.keys(T).map(k => { const x = (P.kpi || {})[k] || {}; const v = { ukom: m.ukom, tepatWaktu: m.tepatWaktu, rasio: m.rasio, inggris: m.inggris, prestasi: m.prestasi, akreditasi: m.akreditasi }[k];
      return [T[k].kode, T[k].label, esc(x.target) || "-", esc(x.real) || "-", k === "rasio" ? "1:" + T[k].target : T[k].target + (T[k].satuan === "%" ? "%" : ""), v === null || v === undefined ? "-" : k === "rasio" ? "1:" + fmt(v) + (m.rasioCapaian !== null ? " (capaian " + m.rasioCapaian + "%)" : "") : typeof v === "number" ? fmt(v) + (T[k].satuan === "%" ? "%" : "") : esc(v)]; }))}`);
    t.push(`<h3>J. Rekomendasi / tindak lanjut</h3>${tbl(["No", "Permasalahan / temuan", "Rekomendasi / tindak lanjut", "Tema"], (P.rekomendasi || []).map((r, i) => [i + 1, esc(r[0]), esc(r[1]), `<span class="badge b-kmk">${(TEMA.find(x => x.id === temaOf(r[0] + " " + r[1])) || {}).label}</span>`]))}`);
    const tl = P.tindakLanjut || [], tb = P.tambahan || {}, bk = P.bukti || {};
    t.push(`<div class="grid g2"><div><h3>K. Tindak lanjut rekomendasi semester sebelumnya</h3>${tl.length ? tbl(["Rekomendasi", "Status", "Progres", "Bukti"], tl.map(r => [esc(r.masalah) + `<br><small class="muted">${esc(r.tindak)}</small>`, `<span class="badge ${r.status === "Selesai" ? "b-ok" : r.status === "Proses" ? "b-warn" : "b-bad"}">${esc(r.status || "Belum")}</span>`, esc(r.progres), r.bukti ? `<a href="${esc(r.bukti)}" target="_blank" rel="noopener">tautan</a>` : ""])) : `<p class="muted">Bagian ini baru berlaku mulai Ganjil 2026/2027.</p>`}</div>
      <div><h3>L. Indikator tambahan</h3>${Object.keys(tb).length ? tbl(["Indikator", "Nilai"], [["Jumlah dosen tetap", tb.dosenTetap ?? "–"], ["Jumlah mahasiswa aktif", tb.mhsAktif ?? "–"], ["Dosen tetap bersertifikat/berkemampuan Bahasa Inggris", tb.dosenInggris ?? "–"], ["Mata kuliah yang memanfaatkan LMS Edlink", tb.mkEdlink !== undefined ? `${tb.mkEdlink} dari ${tb.mkTotal ?? "?"} mata kuliah` : "–"], ["Indeks EDOM (skala 1–4)", tb.edom ?? "–"], ["Responden EDOM (%)", tb.edomResponden ?? "–"], ["Dosen sudah pelatihan OBE/RPS OBE", tb.dosenObe ?? "–"]]) : `<p class="muted">Bagian ini baru berlaku mulai Ganjil 2026/2027.</p>`}
      <h3 style="margin-top:14px">M. Bukti dukung</h3>${Object.keys(bk).filter(k => bk[k]).length ? `<ul class="clean">${Object.keys(bk).filter(k => bk[k]).map(k => `<li><b>${esc(BUKTI_LABEL[k] || k)}:</b> <a href="${esc(bk[k])}" target="_blank" rel="noopener">${esc(bk[k])}</a></li>`).join("")}</ul>` : `<p class="muted">Belum ada tautan bukti dukung.</p>`}</div></div>`);
    return t;
  }
  const BUKTI_LABEL = { folder: "Folder bukti dukung (Google Drive)", B: "Rekapitulasi presensi dosen (SIAKAD)", C: "Rekapitulasi presensi mahasiswa", prestasi: "Sertifikat/piagam prestasi", D: "Rekapitulasi pembayaran UKT", E: "SK cuti/berhenti/pindah", F: "RPS dan berita acara pengesahan", G: "Dokumentasi kendala", H: "Berita acara UTS/UAS dan rubrik", ipk: "Rekap IPS/IPK dan hasil Try Out/Uji Kompetensi", lulus: "SK yudisium/kelulusan", I: "Data pendukung KPI", J: "Notulen rapat program studi", K: "Bukti tindak lanjut rekomendasi", L: "Data pendukung indikator tambahan (Edlink/EDOM/OBE)" };
  window.MONEV.BUKTI_LABEL = BUKTI_LABEL;

  function drawProdiCharts(P) {
    killCharts(); const k = chartBase(); const grid = { color: k.line };
    const mhs = P.mhs || [];
    if ($("#cMhs")) charts.push(new Chart($("#cMhs"), { type: "bar", data: { labels: mhs.map(r => r[0].length > 42 ? r[0].slice(0, 40) + "…" : r[0]), datasets: [{ label: "% kehadiran", data: mhs.map(r => r[1]), backgroundColor: mhs.map(r => r[1] < A.kehadiranMhsKritis ? k.red : r[1] < A.kehadiranMhs ? k.amber : k.kmk), borderRadius: 3 }] },
      options: { indexAxis: "y", maintainAspectRatio: false, scales: { x: { min: Math.min(80, ...mhs.map(r => r[1] || 100)) - 2, max: 100, grid }, y: { ticks: { autoSkip: false, font: { size: 10 } }, grid: { display: false } } }, plugins: { legend: { display: false } } } }));
    const ipk = P.ipk || [];
    if ($("#cIpk")) charts.push(new Chart($("#cIpk"), { data: { labels: ipk.map(r => r.angkatan), datasets: [
      { type: "bar", label: "IPS", data: ipk.map(r => r.ips), backgroundColor: k.kmk2, yAxisID: "y", borderRadius: 4 },
      { type: "bar", label: "IPK", data: ipk.map(r => r.ipk), backgroundColor: k.kmk, yAxisID: "y", borderRadius: 4 },
      { type: "line", label: "Try Out/Uji Kompetensi (%)", data: ipk.map(r => r.ukom), borderColor: k.accent, backgroundColor: k.accent, yAxisID: "y2", spanGaps: true, pointRadius: 5 }] },
      options: { maintainAspectRatio: false, scales: { y: { min: 2.5, max: 4, grid, title: { display: true, text: "IPS/IPK" } }, y2: { position: "right", min: 0, max: 100, grid: { display: false }, title: { display: true, text: "Uji Kompetensi (%)" } } }, plugins: { legend: { position: "bottom" } } } }));
    const ukt = P.ukt || [];
    if ($("#cUkt")) charts.push(new Chart($("#cUkt"), { type: "bar", data: { labels: ukt.map(r => r.angkatan), datasets: [{ label: "% lunas", data: ukt.map(r => r.lunasPct), backgroundColor: ukt.map(r => r.lunasPct < 100 ? k.amber : k.green), borderRadius: 4 }] },
      options: { maintainAspectRatio: false, scales: { y: { min: 90, max: 100, grid } }, plugins: { legend: { display: false } } } }));
  }

  /* ================================================================
   * LAPORAN dan EKSPOR
   * ================================================================ */
  async function viewLaporan() {
    syncTepatWaktuTarget(state.sem);
    try { await Data.loadSemester(state.sem); } catch (e) {}
    const ses = Session.get();
    const jurReport = kunciJurusan() || "all";
    const isKajur = !!(ses && ses.role === "kajur");
    const sems = C.semester.map(s => `<option value="${s.id}" ${s.id === state.sem ? "selected" : ""}>${s.label}</option>`).join("");
    const prodiOpts = Data.prodiList().filter(x => !kunciJurusan() || x.jurusan === kunciJurusan()).map(p => { const r = Data.get(state.sem, p.id); return `<option value="${p.id}" ${r ? "" : "disabled"}>${esc(p.nama)}${r ? "" : " (belum ada data)"}</option>`; }).join("");
    const card3Title = isKajur ? "3. Laporan jurusan" : "3. Laporan keseluruhan";
    const card3Hint = isKajur ? `Laporan seluruh program studi Jurusan ${esc(ses.jurusan)}: ringkasan eksekutif, analisis per jenjang dan per program studi, serta rekomendasi.` : "Laporan institusi 20 program studi: ringkasan eksekutif, analisis per jenjang dan per program studi, serta rekomendasi kepada pimpinan.";
    $("#main").innerHTML = `<div class="pagehead"><div><h1>Laporan</h1><p>Susun laporan monitoring dan evaluasi dalam format Word (DOCX) atau PDF dari data yang tersimpan.</p></div></div>
      <div class="filters"><label>Semester<select id="lSem">${sems}</select></label></div>
      <div class="grid g3">
        <div class="card"><h3>1. Laporan per program studi</h3><p class="hint">Hasil monitoring dan evaluasi lengkap satu program studi (Bagian A–M), grafik, peringatan dini, catatan verifikasi, dan lembar pengesahan.</p>
          <label class="field"><span>Program studi</span><select id="lProdi">${prodiOpts}</select></label>
          <div class="row" style="margin-top:10px"><button class="btn" id="lPd">DOCX</button><button class="btn ghost" id="lPp">PDF</button></div></div>
        <div class="card"><h3>2. Laporan per jenjang</h3><p class="hint">Perbandingan seluruh program studi pada satu jenjang: indikator, KPI, kendala, rekomendasi per tema, dan kesimpulan.</p>
          <label class="field"><span>Jenjang</span><select id="lJen">${JENJANG.map(j => `<option>${j}</option>`).join("")}</select></label>
          <div class="row" style="margin-top:10px"><button class="btn" id="lJd">DOCX</button><button class="btn ghost" id="lJp">PDF</button></div></div>
        <div class="card"><h3>${card3Title}</h3><p class="hint">${card3Hint}</p>
          <div class="row" style="margin-top:34px"><button class="btn" id="lAd">DOCX</button><button class="btn ghost" id="lAp">PDF</button></div></div>
      </div>
      <div class="card"><h3>Ekspor data mentah</h3><p class="hint">Seluruh data mentah (indikator per program studi dan isian lengkap) dalam satu berkas untuk diolah lebih lanjut atau diimpor kembali.</p>
        <div class="row"><button class="btn ghost" id="lXlsx">Unduh data mentah (XLSX)</button><button class="btn ghost" id="lJson">Unduh data mentah (JSON)</button></div></div>
      <div class="card"><h3>Impor isian program studi (mode lokal)</h3><p class="hint">Bila server belum diaktifkan, program studi mengirim berkas JSON hasil "Unduh berkas isian". Impor di sini agar masuk ke dashboard peramban ini.</p>
        <input type="file" id="lImp" accept=".json,application/json" multiple></div>`;
    $("#lSem").onchange = e => { state.sem = e.target.value; saveFilter(); viewLaporan(); };
    const R = window.MONEV_REPORT, run = f => f().catch(e => { console.error(e); toast("Gagal menyusun laporan: " + e.message, 5000); });
    $("#lPd").onclick = () => run(() => R.prodiDocx(state.sem, $("#lProdi").value));
    $("#lPp").onclick = () => run(() => R.prodiPdf(state.sem, $("#lProdi").value));
    $("#lJd").onclick = () => run(() => R.groupDocx(state.sem, $("#lJen").value, jurReport));
    $("#lJp").onclick = () => run(() => R.groupPdf(state.sem, $("#lJen").value, jurReport));
    $("#lAd").onclick = () => run(() => R.groupDocx(state.sem, "all", jurReport));
    $("#lAp").onclick = () => run(() => R.groupPdf(state.sem, "all", jurReport));
    $("#lXlsx").onclick = () => exportXlsx();
    $("#lJson").onclick = () => exportJson();
    $("#lImp").onchange = async e => {
      let n = 0;
      for (const f of e.target.files) { try { const j = JSON.parse(await f.text()); if (j.semester && j.prodiId && j.payload) { Data.importRecord(j.semester, j.prodiId, { payload: j.payload, status: j.status || "final", updatedAt: j.updatedAt }); n++; } else if (j.semester && j.isian) { Object.keys(j.isian).forEach(id => { Data.importRecord(j.semester, id, j.isian[id]); n++; }); } } catch (er) { toast("Berkas tidak valid: " + f.name); } }
      toast(`${n} isian berhasil diimpor`); viewLaporan();
    };
  }
  function download(name, content, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: type || "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  window.MONEV.download = download; window.MONEV.toast = toast; window.MONEV.loginModal = loginModal; window.MONEV.toXlsx = toXlsx;
  function toXlsx(sheets) {
    const zip = new JSZip();
    const escXml = s => String(s === null || s === undefined ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const sheetEntries = [];
    sheets.forEach((sh, idx) => {
      const rows = sh.rows || [];
      let rowsXml = "";
      rows.forEach((row, r) => {
        let cells = "";
        row.forEach((val, c) => {
          const ref = colName(c) + (r + 1);
          if (typeof val === "number" && isFinite(val)) {
            cells += `<c r="${ref}"><v>${val}</v></c>`;
          } else {
            cells += `<c r="${ref}" t="inlineStr"><is><t>${escXml(val)}</t></is></c>`;
          }
        });
        rowsXml += `<row r="${r + 1}">${cells}</row>`;
      });
      const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`;
      const part = `xl/worksheets/sheet${idx + 1}.xml`;
      zip.file(part, xml);
      sheetEntries.push({ name: sh.name || ("Sheet" + (idx + 1)), id: idx + 1 });
    });
    const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheetEntries.map(s => `<sheet name="${escXml(s.name)}" sheetId="${s.id}" r:id="rId${s.id}"/>`).join("")}</sheets></workbook>`;
    zip.file("xl/workbook.xml", workbook);
    const rels = `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheetEntries.map(s => `<Relationship Id="rId${s.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${s.id}.xml"/>`).join("")}</Relationships>`;
    zip.file("xl/_rels/workbook.xml.rels", rels);
    zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`);
    const types = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheetEntries.map(s => `<Override PartName="/xl/worksheets/sheet${s.id}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`;
    zip.file("[Content_Types].xml", types);
    return zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }
  function colName(n) {
    let s = "";
    n = n + 1;
    while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26); }
    return s;
  }
  function exportXlsx() {
    const rows = rowsFor(state.sem, "all", "all").filter(r => r.m);
    const h = ["prodi_id", "program_studi", "jurusan", "jenjang", "status", "kehadiran_dosen", "kehadiran_mhs", "kehadiran_mhs_min", "mk_bawah_90", "ipk", "ips", "ukt_lunas", "mhs_tercatat", "cuti", "do_pindah", "tepat_waktu", "ukom", "rasio_1_n", "b_inggris", "prestasi", "rps_sesuai", "rps_belum", "rps_kosong", "eval_sesuai", "eval_belum", "eval_kosong", "jumlah_kendala", "jumlah_rekomendasi", "kelengkapan", "skor_risiko"];
    const data = [h].concat(rows.map(r => { const m = r.m; return [r.p.id, r.p.nama, r.p.jurusan, r.p.jenjang, r.rec.status, m.dosenAvg, m.mhsAvg, m.mhsMin, m.mhsBawah.length, m.ipkAvg, m.ipsAvg, m.uktPct, m.totalMhs, m.cuti, m.keluar, m.tepatWaktu, m.ukom, m.rasio, m.inggris, m.prestasi, m.rps.s, m.rps.b, m.rps.kosong, m.eval.s, m.eval.b, m.eval.kosong, m.nKendala, m.nRekom, m.kelengkapan, m.skorRisiko]; }));
    toXlsx([
      { name: "Indikator", rows: data }
    ]).then(blob => download(`DataMentah_MonitoringEvaluasi_${state.sem}.xlsx`, blob, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
  }
  function exportJson() {
    const isian = {};
    Data.prodiList().forEach(p => {
      const r = Data.get(state.sem, p.id);
      if (r) isian[p.id] = { programStudi: p.nama, jurusan: p.jurusan, jenjang: p.jenjang, status: r.status, updatedAt: r.updatedAt, payload: r.payload };
    });
    const obj = { semester: state.sem, label: (Data.semester(state.sem) || {}).label, dieksporPada: new Date().toISOString(), isian };
    download(`DataMentah_MonitoringEvaluasi_${state.sem}.json`, JSON.stringify(obj, null, 2), "application/json");
  }

  /* ---------------- panduan ---------------- */
  function viewPanduan() {
    $("#main").innerHTML = `<div class="pagehead"><div><h1>Panduan Penggunaan</h1><p>Siklus PPEPP monitoring dan evaluasi pembelajaran program studi.</p></div></div>
    <div class="grid g2">
      <div class="card"><h3>Untuk Ketua Program Studi</h3><ol>
        <li>Buka menu <b>Pengisian Instrumen</b>, pilih program studi, lalu ${Api.enabled() ? "masuk dengan <b>NIP</b> Anda dan <b>PIN</b> dari Pusbangdik" : "isi formulir (mode lokal)"}.</li>
        <li>Gunakan <b>Salin daftar mata kuliah</b> atau <b>Tempel dari Excel</b> untuk tabel kehadiran yang panjang.</li>
        <li>Isi angka mentah (jumlah dosen, mahasiswa, peserta dan lulusan Uji Kompetensi); persentase dan rasio dihitung otomatis.</li>
        <li><b>Kelulusan tepat waktu</b> diisi dengan lulusan yang yudisium pada semester yang dilaporkan, kapan pun wisudanya (Semester Genap 2025/2026 = tahun lulus 2026). Jangan isi tahun masuk atau angkatan tahun sebelumnya. Lulusan Reguler dan lulusan RPL diisi terpisah; masa studi normal RPL mengikuti program RPL masing-masing program studi.</li>
        <li>Isi <b>Bagian K</b>: status tindak lanjut setiap rekomendasi semester lalu.</li>
        <li>Tempel tautan Google Drive bukti dukung di <b>Bagian M</b> (atur akses "Siapa saja di Poltekkes yang memiliki link").</li>
        <li><b>Simpan draf</b> kapan saja; <b>Kirim versi final</b> setelah Ketua Jurusan memeriksa isian dan memberi catatan (melalui Dashboard Program Studi).</li>
        <li>Setelah mengirim draf, <b>sampaikan kepada Ketua Jurusan</b> agar memeriksa isian dan memberi catatan melalui Dashboard Program Studi, sehingga versi final dapat diproses oleh Pusat Pengembangan Pendidikan.</li>
        ${Api.enabled() ? "" : "<li>Mode lokal: tekan <b>Unduh berkas isian</b> dan kirim berkas JSON ke Pusbangdik.</li>"}
      </ol></div>
      <div class="card"><h3>Untuk Ketua Jurusan</h3><ol>
        <li>Masuk dengan <b>NIP</b> dan <b>PIN</b>. Dashboard otomatis menampilkan program studi di jurusan Anda.</li>
        <li>Periksa isian program studi sebelum Ketua Program Studi menekan <b>Kirim versi final</b>.</li>
        <li>Tulis <b>Catatan Ketua Jurusan</b> pada Dashboard Program Studi sebagai bahan pembinaan dan tindak lanjut.</li>
      </ol></div>
      <div class="card"><h3>Untuk Pimpinan / Pusbangdik</h3><ol>
        <li>Direktur, Wakil Direktur I, Kepala Pusat Penjaminan Mutu, dan Kepala Pusat Pengembangan Pendidikan masuk dengan <b>NIP</b> dan <b>PIN</b>.</li>
        <li><b>Dashboard 20 Program Studi</b>: filter menurut semester, jenjang (D-III / Sarjana Terapan / Profesi), dan jurusan.</li>
        <li>Telaah <b>Peringatan dini</b> (merah = prioritas pembahasan rapat monitoring dan evaluasi).</li>
        <li>Buka <b>Dashboard Program Studi</b> untuk rincian, bandingkan dengan semester lalu, dan tulis <b>catatan pimpinan</b>.</li>
        <li><b>Laporan</b>: unduh laporan per program studi (DOCX/PDF), per jenjang (DOCX), dan keseluruhan (DOCX).</li>
        <li><b>Pejabat</b> (Kepala Pusat Pengembangan Pendidikan): catat pergantian pimpinan, Ketua Jurusan, dan Ketua Program Studi (nama, NIP, TMT, SK).</li>
      </ol></div>
      <div class="card"><h3>Perbaikan Data Semester yang Sudah Diarsipkan (Koreksi)</h3><ol>
        <li>Data semester arsip (mis. Genap 2025/2026) <b>tidak dapat diedit langsung</b>. Perubahan dilakukan melalui <b>usulan perbaikan data (koreksi)</b>.</li>
        <li>Ketua Program Studi: buka <b>Dashboard Program Studi</b>, pilih semester arsip, lalu klik <b>Ajukan perbaikan data</b> (tombol kuning) di samping filter semester. <b>Jangan</b> menekan "Kirim versi final" — server menolak pengisian langsung pada semester yang sudah diarsipkan.</li>
        <li>Formulir terbuka dengan banner "Mode usulan perbaikan data". Isi data yang perlu diperbaiki (mis. Bagian I: jumlah dosen tetap dan mahasiswa aktif untuk menghitung rasio), lalu wajib mengisi <b>Alasan perbaikan data</b>.</li>
        <li>Tekan <b>Kirim usulan perbaikan</b>. Pastikan muncul pesan pemberitahuan "Usulan perbaikan data terkirim ke Kapusbangdik ... <b>(server)</b>". Jika pesan berbunyi <b>(lokal)</b>, usulan hanya tersimpan di peramban dan tidak terlihat Pusbangdik; periksa koneksi/alamat server.</li>
        <li>Kapusbangdik: buka menu <b>Koreksi Data</b>, lalu <b>Setujui</b> atau <b>Tolak</b> (catatan wajib bila menolak).</li>
        <li>Perubahan baru terlihat setelah usulan <b>disetujui</b>. Setelah itu, dashboard dan laporan semester arsip akan memakai data yang diperbarui (data server diutamakan daripada arsip dokumen).</li>
        <li>Jika usulan <b>ditolak</b>, data tidak berubah; usulan tersimpan sebagai log/riwayat.</li>
        ${Api.enabled() ? "" : "<li>Mode lokal: usulan hanya tersimpan di peramban ini dan tidak sinkron antar perangkat.</li>"}
      </ol></div>
      <div class="card"><h3>Kode Program Studi (label grafik)</h3><div class="tbl-wrap"><table><thead><tr><th>Kode</th><th>Program studi</th><th>Jenjang</th><th>Jurusan</th></tr></thead><tbody>
        ${C.prodi.map(p => `<tr><td><b>${esc(p.kode)}</b></td><td>${esc(p.nama)}</td><td>${esc(p.jenjang)}</td><td>${esc(p.jurusan)}</td></tr>`).join("")}
      </tbody></table></div></div>
      <div class="card"><h3>Ambang dan target yang digunakan</h3><ul class="clean">
        <li>Periode pengisian instrumen: semester Ganjil 1 Juli s.d. 15 Januari; semester Genap 1 Januari s.d. 15 Juli. Di luar periode, server menolak penyimpanan.</li>
        <li>Rasio dosen tetap terhadap mahasiswa: rentang ideal 1:27 s.d. 1:30 (capaian 100%); di luar rentang itu peringatan mengikuti skala capaian.</li>
        <li>Kehadiran mahasiswa: kuning &lt; ${A.kehadiranMhs}%, merah &lt; ${A.kehadiranMhsKritis}%.</li>
        ${Object.values(T).map(t => `<li>${t.kode} ${t.label}: ${t.satuan === "1:n" ? "1:" + t.target : t.target + (t.satuan === "%" ? "%" : " " + t.satuan)}</li>`).join("")}
      </ul></div>
      <div class="card"><h3>Dasar acuan</h3><ul class="clean">
        <li>Permendikbudristek No. 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi (SN Dikti dan siklus PPEPP).</li>
        <li>Rencana Strategis Bisnis (RSB) BLU Poltekkes Kemenkes Makassar dan Bahan LKJ 2026 (IKM 17.3.x).</li>
        <li>Format Monitoring Pembelajaran TA 2025/2026 (Pusbangdik), dikembangkan menjadi Bagian A–M.</li></ul></div>
    </div>`;
  }

  /* ---------------- koreksi data ---------------- */
  async function viewKoreksi() {
    syncTepatWaktuTarget(state.sem);
    const main = $("#main");
    const ses = Session.get();
    if (!Api.enabled() || !ses || (ses.jabatanKey !== "kapusbangdik" && ses.jabatanKey !== "admin")) {
      main.innerHTML = `<div class="pagehead"><div><h1>Koreksi Data Semester Sebelumnya</h1><p>Verifikasi usulan perbaikan data oleh Kapusbangdik.</p></div></div><div class="card empty">Silakan <a href="#" id="lg">masuk sebagai Kepala Pusat Pengembangan Pendidikan</a> untuk mengakses halaman ini.</div>`;
      const lg = $("#lg"); if (lg) lg.onclick = e => { e.preventDefault(); loginModal("pimpinan", () => viewKoreksi()); };
      return;
    }
    const list = await Data.listKoreksi();
    const pending = list.filter(x => x.status === "menunggu");
    const decided = list.filter(x => x.status !== "menunggu");
    main.innerHTML = `<div class="pagehead"><div><h1>Koreksi Data Semester Sebelumnya</h1><p>Usulan perbaikan data dari Ketua Program Studi menunggu verifikasi Anda.</p></div></div>
      <div class="card"><h3>Usulan menunggu (${pending.length})</h3>
        ${pending.length ? `<div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Semester</th><th>Pengaju</th><th>Tanggal</th><th>Alasan</th><th class="no-print"></th></tr></thead><tbody>
        ${pending.map(x => `<tr><td>${esc(Data.prodi(x.prodiId) ? Data.prodi(x.prodiId).nama : x.prodiId)}</td><td>${esc(Data.semester(x.semester) ? Data.semester(x.semester).label : x.semester)}</td><td>${esc(x.diajukanOleh)}</td><td>${esc(x.diajukanAt ? new Date(x.diajukanAt).toLocaleString("id-ID") : "")}</td><td>${esc(x.catatanKaprodi || x.catatan || "")}</td>
        <td class="no-print"><div class="row nowrap"><button class="btn sm" data-approve="${x.semester}|${x.prodiId}">Setujui</button><button class="btn sm danger" data-reject="${x.semester}|${x.prodiId}">Tolak</button></div></td></tr>`).join("")}
        </tbody></table></div>` : `<p class="muted">Tidak ada usulan menunggu.</p>`}
      </div>
      <div class="card"><h3>Riwayat keputusan (${decided.length})</h3>
        ${decided.length ? `<div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Semester</th><th>Status</th><th>Pengaju</th><th>Keputusan oleh</th><th>Catatan</th></tr></thead><tbody>
        ${decided.map(x => `<tr><td>${esc(Data.prodi(x.prodiId) ? Data.prodi(x.prodiId).nama : x.prodiId)}</td><td>${esc(Data.semester(x.semester) ? Data.semester(x.semester).label : x.semester)}</td><td><span class="badge ${x.status === "disetujui" ? "b-ok" : "b-bad"}">${esc(x.status)}</span></td><td>${esc(x.diajukanOleh)}</td><td>${esc(x.keputusanOleh)}</td><td>${esc(x.catatanKapusbangdik)}</td></tr>`).join("")}
        </tbody></table></div>` : `<p class="muted">Belum ada riwayat.</p>`}
      </div>`;
    main.querySelectorAll("[data-approve]").forEach(b => b.onclick = async () => {
      const [sem, id] = b.dataset.approve.split("|");
      const cat = prompt("Catatan Kapusbangdik (opsional):") || "";
      try { await Data.decideKoreksi(sem, id, "setuju", cat); toast("Usulan disetujui; data diperbarui."); viewKoreksi(); } catch (e) { toast(e.message, 5000); }
    });
    main.querySelectorAll("[data-reject]").forEach(b => b.onclick = async () => {
      const [sem, id] = b.dataset.reject.split("|");
      const cat = prompt("Alasan penolakan (wajib):") || "";
      if (!cat.trim()) { toast("Alasan penolakan wajib diisi."); return; }
      try { await Data.decideKoreksi(sem, id, "tolak", cat); toast("Usulan ditolak; tersimpan sebagai log."); viewKoreksi(); } catch (e) { toast(e.message, 5000); }
    });
  }

  /* ---------------- kontrol catatan ---------------- */
  async function viewKontrol() {
    syncTepatWaktuTarget(state.sem);
    const main = $("#main");
    const ses = Session.get();
    if (!Api.enabled() || !ses || (ses.jabatanKey !== "kapusbangdik" && ses.jabatanKey !== "admin")) {
      main.innerHTML = `<div class="pagehead"><div><h1>Kontrol Catatan ke Program Studi</h1><p>Log catatan pimpinan/Ketua Jurusan dan status tindak lanjut.</p></div></div><div class="card empty">Silakan <a href="#" id="lg">masuk sebagai Kepala Pusat Pengembangan Pendidikan</a>.</div>`;
      const lg = $("#lg"); if (lg) lg.onclick = e => { e.preventDefault(); loginModal("pimpinan", () => viewKontrol()); };
      return;
    }
    const list = await Data.listKontrol();
    const belum = list.filter(x => x.status !== "selesai");
    const selesai = list.filter(x => x.status === "selesai");
    main.innerHTML = `<div class="pagehead"><div><h1>Kontrol Catatan ke Program Studi</h1><p>Log catatan yang diberikan ke program studi dan status tindak lanjutnya.</p></div></div>
      <div class="card"><h3>Belum ditindaklanjuti (${belum.length})</h3>
        ${belum.length ? `<div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Semester</th><th>Pemberi</th><th>Tanggal</th><th>Catatan</th><th>Tanggapan Kaprodi</th><th class="no-print">Aksi</th></tr></thead><tbody>
        ${belum.map(x => `<tr><td>${esc(Data.prodi(x.prodiId) ? Data.prodi(x.prodiId).nama : x.prodiId)}</td><td>${esc(Data.semester(x.semester) ? Data.semester(x.semester).label : x.semester)}</td><td>${esc(/ketua jurusan|direktur|wakil|kapus/i.test(x.pemberi) ? x.pemberi : (x.tipe === "kajur" ? "Ketua Jurusan " + ((Data.prodi(x.prodiId) || {}).jurusan || "") : "Pimpinan"))}</td><td>${esc(x.tanggal ? new Date(x.tanggal).toLocaleDateString("id-ID") : "")}</td><td>${esc(x.catatan)}</td><td>${esc(x.tanggapanProdi || "-")}</td>
        <td class="no-print"><div class="row nowrap"><button class="btn sm" data-done="${x.id}">Tandai selesai</button><button class="btn sm danger" data-del="${x.id}">Hapus</button></div></td></tr>`).join("")}
        </tbody></table></div>` : `<p class="muted">Tidak ada catatan yang belum ditindaklanjuti.</p>`}
      </div>
      <div class="card"><h3>Sudah ditindaklanjuti (${selesai.length})</h3>
        ${selesai.length ? `<div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Semester</th><th>Pemberi</th><th>Tanggal catatan</th><th>Tanggal selesai</th><th>Bukti</th><th>Keterangan</th><th class="no-print">Aksi</th></tr></thead><tbody>
        ${selesai.map(x => `<tr><td>${esc(Data.prodi(x.prodiId) ? Data.prodi(x.prodiId).nama : x.prodiId)}</td><td>${esc(Data.semester(x.semester) ? Data.semester(x.semester).label : x.semester)}</td><td>${esc(/ketua jurusan|direktur|wakil|kapus/i.test(x.pemberi) ? x.pemberi : (x.tipe === "kajur" ? "Ketua Jurusan " + ((Data.prodi(x.prodiId) || {}).jurusan || "") : "Pimpinan"))}</td><td>${esc(x.tanggal ? new Date(x.tanggal).toLocaleDateString("id-ID") : "")}</td><td>${esc(x.tanggalTindakLanjut ? new Date(x.tanggalTindakLanjut).toLocaleDateString("id-ID") : "")}</td><td>${x.bukti ? `<a href="${esc(x.bukti)}" target="_blank" rel="noopener">tautan</a>` : "-"}</td><td>${esc(x.keterangan)}</td><td class="no-print"><button class="btn sm danger" data-del="${x.id}">Hapus</button></td></tr>`).join("")}
        </tbody></table></div>` : `<p class="muted">Belum ada riwayat.</p>`}
      </div>`;
    main.querySelectorAll("[data-done]").forEach(b => b.onclick = async () => {
      const id = b.dataset.done;
      const bukti = prompt("Tautan bukti tindak lanjut (opsional):") || "";
      const ket = prompt("Keterangan tindak lanjut (opsional):") || "";
      try { await Data.updateKontrol(id, "selesai", bukti, ket); toast("Catatan ditandai selesai."); viewKontrol(); }
      catch (e) { toast(e.message, 5000); }
    });
    main.querySelectorAll("[data-del]").forEach(b => b.onclick = async () => {
      if (!confirm("Hapus catatan ini dari log?")) return;
      try { await Data.deleteKontrol(b.dataset.del); toast("Catatan dihapus."); viewKontrol(); }
      catch (e) { toast(e.message, 5000); }
    });
  }

  /* ---------------- router ---------------- */
  async function route_() {
    killCharts();
    document.querySelectorAll(".modal-bg").forEach(m => m.remove());
    if (kunciJurusan()) state.jurusan = kunciJurusan();
    const h = location.hash.replace(/^#/, "") || "/dasbor";
    const hPath = h.split("?")[0];
    const qs = h.split("?")[1] || "";
    renderHeader(hPath);
    const [, a, b] = hPath.split("/");
    window.scrollTo(0, 0);
    if (a === "prodi" && b) return viewProdi(b);
    if (a === "prodi") return viewProdiPicker();
    if (a === "isi") {
      const params = new URLSearchParams(qs);
      return window.MONEV_FORM.view(b, params.get("sem") || undefined, params.get("koreksi") === "1");
    }
    if (a === "koreksi") return viewKoreksi();
    if (a === "kontrol") return viewKontrol();
    if (a === "laporan") return viewLaporan();
    if (a === "pejabat") return window.MONEV_PEJABAT.view();
    if (a === "panduan") return viewPanduan();
    return viewDasbor();
  }
  window.MONEV.route = route_;
  window.MONEV.state = state;
  window.addEventListener("hashchange", route_);
  window.addEventListener("DOMContentLoaded", () => {
    $("#modeInfo").textContent = Api.enabled() ? "Terhubung ke server Google Apps Script" : "Mode lokal — data isian tersimpan di peramban ini";
    route_();
  });
})();
