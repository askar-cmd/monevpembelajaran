/* =====================================================================
 * PENGUMUMAN: informasi terbaru dari Pusbangdik untuk Ketua Program Studi
 * ---------------------------------------------------------------------
 * - Kapusbangdik menulis pengumuman (judul, isi, sasaran program studi,
 *   berlaku sampai) dan memantau siapa yang sudah membaca.
 * - Ketua Program Studi melihat pengumuman yang belum dibaca dalam jendela
 *   setelah masuk, lalu menekan "Saya sudah membaca dan memahami".
 * - Pimpinan dan Ketua Jurusan dapat melihat daftar dan rekap baca.
 * Tidak ada NIP yang disimpan atau ditampilkan pada pengumuman.
 * ===================================================================== */
(function () {
  const M = window.MONEV;
  const { C, Api, Data, Session } = M;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toast = (m, ms) => M.toast(m, ms);
  /* isi pengumuman: teks biasa; baris baru menjadi paragraf, baris diawali "- " menjadi butir */
  const isiHtml = t => {
    const out = []; let ul = [];
    const tutup = () => { if (ul.length) { out.push("<ul>" + ul.map(x => "<li>" + x + "</li>").join("") + "</ul>"); ul = []; } };
    String(t || "").split(/\r?\n/).forEach(b => {
      const s = b.trim(); if (!s) { tutup(); return; }
      const m = /^[-•*]\s+(.*)$/.exec(s);
      if (m) ul.push(esc(m[1])); else { tutup(); out.push("<p>" + esc(s) + "</p>"); }
    });
    tutup(); return out.join("");
  };
  const tgl = s => { if (!s) return "-"; const d = new Date(s.length === 10 ? s + "T00:00:00" : s); return isNaN(d) ? s : d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); };
  const namaProdi = id => (Data.prodi(id) || {}).nama || id;
  const sasaranLabel = s => s === "semua" ? "Semua program studi" : s.split(",").map(namaProdi).join(", ");
  const sasaranIds = s => s === "semua" ? C.prodi.map(p => p.id) : s.split(",");

  /* ---------- data ---------- */
  let cache = null, cacheKey = "";
  const keyOf = ses => ses ? (ses.key ? "admin" : ses.nip + "|" + (ses.prodiId || "")) : "";
  async function muat(force) {
    const ses = Session.get(); if (!ses || !Api.enabled()) { cache = null; cacheKey = ""; return null; }
    if (!force && cache && cacheKey === keyOf(ses)) return cache;
    const q = Object.assign({ action: "pengumuman" }, Api.auth(ses));
    if (ses.role === "prodi") q.prodiId = ses.prodiId;
    cache = await Api.get(q); cacheKey = keyOf(ses); return cache;
  }

  /* ---------- jendela wajib baca untuk Ketua Program Studi ---------- */
  let sedangTampil = false;
  async function cekBaru() {
    const ses = Session.get();
    if (sedangTampil && !document.querySelector("[data-pengumuman]")) sedangTampil = false;
    if (!ses || ses.role !== "prodi" || sedangTampil || /^#\/pengumuman/.test(location.hash)) return;
    let j; try { j = await muat(); } catch (e) { return; }
    const belum = ((j && j.data) || []).filter(x => !x.dibaca);
    if (!belum.length || document.querySelector(".modal-bg")) return;
    tampilkan(belum, 0);
  }
  function tampilkan(list, i) {
    const x = list[i]; if (!x) { sedangTampil = false; return; }
    sedangTampil = true;
    const bg = document.createElement("div"); bg.className = "modal-bg"; bg.dataset.pengumuman = "1";
    bg.innerHTML = `<div class="modal" role="dialog" aria-labelledby="pgJudul" style="max-width:640px;max-height:calc(100vh - 32px);overflow:auto">
      <p class="hint" style="margin:0 0 4px">Pengumuman Pusbangdik${list.length > 1 ? ` · ${i + 1} dari ${list.length}` : ""} · ${esc(tgl(x.dibuat))}</p>
      <h2 id="pgJudul" style="margin-top:0">${esc(x.judul)}</h2>
      <div class="pg-isi" style="max-height:55vh;overflow:auto">${isiHtml(x.isi)}</div>
      ${x.berlakuSampai ? `<p class="hint">Berlaku sampai ${esc(tgl(x.berlakuSampai))}.</p>` : ""}
      <div class="row" style="justify-content:flex-end;gap:8px;margin-top:14px;flex-wrap:wrap">
        <button class="btn ghost" id="pgNanti">Baca nanti</button>
        <button class="btn" id="pgOk">Saya sudah membaca dan memahami</button></div></div>`;
    document.body.appendChild(bg);
    $("#pgNanti", bg).onclick = () => { bg.remove(); sedangTampil = false; toast("Pengumuman dapat dibuka kembali di menu Pengumuman.", 4000); };
    $("#pgOk", bg).onclick = async () => {
      const btn = $("#pgOk", bg); btn.disabled = true;
      try { await tandaiBaca(x); bg.remove(); tampilkan(list, i + 1); }
      catch (e) { btn.disabled = false; toast("Gagal menyimpan konfirmasi: " + e.message, 5000); }
    };
  }
  async function tandaiBaca(x) {
    const ses = Session.get();
    const j = await Api.post({ action: "pengumumanBaca", id: x.id, prodiId: ses.prodiId, nip: ses.nip, pin: ses.pin });
    x.dibaca = true; x.dibacaAt = j.waktu || new Date().toISOString();
    toast("Terima kasih, konfirmasi baca tersimpan.");
  }

  /* ---------- halaman menu Pengumuman ---------- */
  async function view() {
    const main = $("#main"), ses = Session.get();
    main.innerHTML = `<div class="pagehead"><div><h1>Pengumuman</h1><p>Informasi terbaru dari Pusat Pengembangan Pendidikan tentang pengisian instrumen monitoring dan evaluasi pembelajaran.</p></div></div><div id="pgBody"><div class="card">Memuat...</div></div>`;
    const body = $("#pgBody");
    if (!Api.enabled()) { body.innerHTML = `<div class="card empty">Pengumuman memerlukan server. Aplikasi sedang berjalan dalam mode lokal.</div>`; return; }
    if (!ses) { body.innerHTML = `<div class="card empty">Silakan <a href="#" id="pgMasuk">masuk</a> dengan NIP dan PIN untuk membaca pengumuman.</div>`; $("#pgMasuk").onclick = e => { e.preventDefault(); M.loginModal(null, view); }; return; }
    let j; try { j = await muat(true); } catch (e) { body.innerHTML = `<div class="card empty">Gagal memuat pengumuman: ${esc(e.message)}</div>`; return; }
    if (j.role === "prodi") return viewProdi(body, j.data || []);
    return viewKelola(body, j);
  }

  function viewProdi(body, list) {
    if (!list.length) { body.innerHTML = `<div class="card empty">Belum ada pengumuman untuk program studi Anda.</div>`; return; }
    body.innerHTML = list.map(x => `<div class="card" style="margin-bottom:14px">
      <div class="row" style="justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap"><h3 style="margin:0">${esc(x.judul)}</h3>
      ${x.dibaca ? `<span class="badge b-ok">Sudah dibaca ${esc(tgl(x.dibacaAt))}</span>` : `<span class="badge b-warn">Belum dikonfirmasi</span>`}</div>
      <p class="hint">${esc(tgl(x.dibuat))}${x.berlakuSampai ? " · berlaku sampai " + esc(tgl(x.berlakuSampai)) : ""}</p>
      <div class="pg-isi">${isiHtml(x.isi)}</div>
      ${x.dibaca ? "" : `<div class="row" style="justify-content:flex-end"><button class="btn" data-baca="${esc(x.id)}">Saya sudah membaca dan memahami</button></div>`}</div>`).join("");
    body.querySelectorAll("[data-baca]").forEach(b => b.onclick = async () => {
      const x = list.find(r => r.id === b.dataset.baca); b.disabled = true;
      try { await tandaiBaca(x); viewProdi(body, list); } catch (e) { b.disabled = false; toast("Gagal menyimpan konfirmasi: " + e.message, 5000); }
    });
  }

  function teksWa(x) {
    const polos = String(x.isi || "").split(/\r?\n/).map(s => s.replace(/^\s*[-•*]\s+/, "• ")).join("\n").trim();
    return `*${x.judul}*\n\n${polos}\n\nMohon Bapak/Ibu Ketua Program Studi membuka menu *Pengumuman* pada aplikasi Monev Pembelajaran (https://askar-cmd.github.io/monevpembelajaran/) lalu menekan "Saya sudah membaca dan memahami".\n\nPusat Pengembangan Pendidikan\nPoltekkes Kemenkes Makassar`;
  }

  function viewKelola(body, j) {
    const list = (j.data || []).slice().sort((a, b) => String(b.dibuat).localeCompare(String(a.dibuat)));
    const boleh = !!j.bolehUbah;
    const kartu = x => {
      const ids = sasaranIds(x.sasaran), sudah = ids.filter(id => x.baca.some(r => r.prodiId === id)), belum = ids.filter(id => sudah.indexOf(id) < 0);
      const status = !x.aktif ? `<span class="badge b-mute">Nonaktif</span>` : !x.berlaku ? `<span class="badge b-mute">Kedaluwarsa</span>` : `<span class="badge b-ok">Aktif</span>`;
      return `<div class="card" style="margin-bottom:14px">
        <div class="row" style="justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap"><h3 style="margin:0">${esc(x.judul)}</h3>${status}</div>
        <p class="hint">Dibuat ${esc(tgl(x.dibuat))} oleh ${esc(x.oleh)}${x.diubah ? " · diubah " + esc(tgl(x.diubah)) : ""}${x.berlakuSampai ? " · berlaku sampai " + esc(tgl(x.berlakuSampai)) : ""} · sasaran: ${esc(sasaranLabel(x.sasaran))}</p>
        <details><summary>Isi pengumuman</summary><div class="pg-isi" style="margin-top:8px">${isiHtml(x.isi)}</div></details>
        <p style="margin:10px 0 6px"><b>Konfirmasi baca: ${sudah.length} dari ${ids.length} program studi</b></p>
        <div class="bar" style="height:8px;background:var(--line,#e5e7eb);border-radius:6px;overflow:hidden"><div style="height:100%;width:${ids.length ? Math.round(sudah.length / ids.length * 100) : 0}%;background:var(--green,#1F9D55)"></div></div>
        <details style="margin-top:8px"><summary>Rincian per program studi</summary><div class="tbl-wrap"><table><thead><tr><th>Program studi</th><th>Status</th><th>Waktu</th></tr></thead><tbody>
          ${ids.map(id => { const r = x.baca.find(b => b.prodiId === id); return `<tr><td>${esc(namaProdi(id))}</td><td>${r ? `<span class="badge b-ok">Sudah dibaca</span>` : `<span class="badge b-warn">Belum</span>`}</td><td>${r ? esc(new Date(r.waktu).toLocaleString("id-ID")) : "-"}</td></tr>`; }).join("")}
        </tbody></table></div></details>
        ${belum.length ? `<p class="hint" style="margin-top:6px">Belum membaca: ${esc(belum.map(namaProdi).join(", "))}.</p>` : ""}
        <div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">
          <button class="btn sm ghost" data-wa="${esc(x.id)}">Salin teks WhatsApp</button>
          ${boleh ? `<button class="btn sm ghost" data-ubah="${esc(x.id)}">Ubah</button><button class="btn sm ${x.aktif ? "danger" : "ghost"}" data-status="${esc(x.id)}" data-v="${x.aktif ? "0" : "1"}">${x.aktif ? "Nonaktifkan" : "Aktifkan kembali"}</button>` : ""}</div></div>`;
    };
    body.innerHTML = (boleh ? `<div class="card" style="margin-bottom:14px"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div><h3 style="margin:0">Buat pengumuman</h3><p class="hint" style="margin:4px 0 0">Pengumuman muncul sebagai jendela saat Ketua Program Studi sasaran masuk, sampai mereka menekan "Saya sudah membaca dan memahami".</p></div><button class="btn" id="pgBaru">+ Pengumuman baru</button></div></div>` : "")
      + (list.length ? list.map(kartu).join("") : `<div class="card empty">Belum ada pengumuman.</div>`);
    const b = $("#pgBaru"); if (b) b.onclick = () => formulir(null);
    body.querySelectorAll("[data-ubah]").forEach(x => x.onclick = () => formulir(list.find(r => r.id === x.dataset.ubah)));
    body.querySelectorAll("[data-wa]").forEach(x => x.onclick = async () => {
      const t = teksWa(list.find(r => r.id === x.dataset.wa));
      try { await navigator.clipboard.writeText(t); toast("Teks WhatsApp tersalin. Tempel ke grup Ketua Program Studi."); }
      catch (e) { const bg = document.createElement("div"); bg.className = "modal-bg"; bg.innerHTML = `<div class="modal" style="max-width:640px;max-height:calc(100vh - 32px);overflow:auto"><h2>Teks WhatsApp</h2><textarea rows="12" style="width:100%">${esc(t)}</textarea><div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn">Tutup</button></div></div>`; bg.querySelector("button").onclick = () => bg.remove(); document.body.appendChild(bg); bg.querySelector("textarea").select(); }
    });
    body.querySelectorAll("[data-status]").forEach(x => x.onclick = async () => {
      const aktif = x.dataset.v === "1";
      if (!aktif && !confirm("Nonaktifkan pengumuman ini? Pengumuman tidak lagi muncul untuk Ketua Program Studi.")) return;
      try { await Api.post(Object.assign({ action: "pengumumanStatus", id: x.dataset.status, aktif }, Api.auth())); toast(aktif ? "Pengumuman diaktifkan kembali." : "Pengumuman dinonaktifkan."); view(); }
      catch (e) { toast(e.message, 5000); }
    });
  }

  /* formulir buat/ubah pengumuman (Kapusbangdik) */
  function formulir(x) {
    const JEN = ["D-III", "Sarjana Terapan", "Profesi"], JUR = [...new Set(C.prodi.map(p => p.jurusan))];
    const pilih = x ? sasaranIds(x.sasaran) : C.prodi.map(p => p.id);
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" role="dialog" style="max-width:720px;max-height:calc(100vh - 32px);overflow:auto"><h2>${x ? "Ubah pengumuman" : "Pengumuman baru"}</h2>
      <label class="field"><span>Judul</span><input id="pfJudul" maxlength="200" value="${esc(x ? x.judul : "")}"></label>
      <label class="field" style="margin-top:8px"><span>Isi pengumuman</span><textarea id="pfIsi" rows="10" maxlength="8000">${esc(x ? x.isi : "")}</textarea></label>
      <p class="hint">Tulis sebagai teks biasa. Pisahkan paragraf dengan baris kosong; awali baris dengan "- " untuk membuat butir.</p>
      <label class="field" style="margin-top:8px"><span>Berlaku sampai (opsional; kosongkan bila tanpa batas)</span><input type="date" id="pfSampai" value="${esc(x ? x.berlakuSampai : "")}"></label>
      <div class="field" style="margin-top:10px"><span>Sasaran program studi</span>
        <div class="row" style="gap:6px;flex-wrap:wrap;margin:6px 0">
          <button class="btn sm ghost" type="button" data-pilih="semua">Semua</button><button class="btn sm ghost" type="button" data-pilih="kosong">Kosongkan</button>
          ${JEN.map(j => `<button class="btn sm ghost" type="button" data-jen="${esc(j)}">${esc(j)}</button>`).join("")}
          <select id="pfJur"><option value="">+ Pilih per jurusan</option>${JUR.map(j => `<option>${esc(j)}</option>`).join("")}</select></div>
        <div id="pfProdi" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:4px 12px;max-height:30vh;overflow:auto;border:1px solid var(--line,#e5e7eb);border-radius:8px;padding:8px">
          ${C.prodi.map(p => `<label style="display:flex;gap:8px;align-items:flex-start;justify-content:flex-start;text-align:left;font-size:.9rem;font-weight:400;margin:0"><input type="checkbox" style="width:auto;flex:none;margin:3px 0 0;min-height:0" value="${esc(p.id)}" ${pilih.indexOf(p.id) >= 0 ? "checked" : ""}><span>${esc(p.nama)}</span></label>`).join("")}</div>
        <p class="hint" id="pfJumlah"></p></div>
      <div class="row" style="justify-content:flex-end;gap:8px;margin-top:12px"><button class="btn ghost" id="pfX">Batal</button><button class="btn" id="pfGo">${x ? "Simpan perubahan" : "Terbitkan pengumuman"}</button></div></div>`;
    document.body.appendChild(bg);
    const boxes = [...bg.querySelectorAll("#pfProdi input")];
    const hitung = () => { const n = boxes.filter(b => b.checked).length; $("#pfJumlah", bg).textContent = `${n} dari ${boxes.length} program studi dipilih.`; };
    const setIds = (ids, on) => boxes.forEach(b => { if (ids.indexOf(b.value) >= 0) b.checked = on; });
    bg.querySelectorAll("[data-pilih]").forEach(b => b.onclick = () => { boxes.forEach(c => c.checked = b.dataset.pilih === "semua"); hitung(); });
    bg.querySelectorAll("[data-jen]").forEach(b => b.onclick = () => { setIds(C.prodi.filter(p => p.jenjang === b.dataset.jen).map(p => p.id), true); hitung(); });
    $("#pfJur", bg).onchange = e => { if (e.target.value) setIds(C.prodi.filter(p => p.jurusan === e.target.value).map(p => p.id), true); e.target.value = ""; hitung(); };
    boxes.forEach(b => b.onchange = hitung); hitung();
    $("#pfX", bg).onclick = () => bg.remove();
    $("#pfGo", bg).onclick = async () => {
      const ids = boxes.filter(b => b.checked).map(b => b.value);
      const data = { id: x ? x.id : "", judul: $("#pfJudul", bg).value.trim(), isi: $("#pfIsi", bg).value.trim(), berlakuSampai: $("#pfSampai", bg).value, sasaran: ids.length === boxes.length ? "semua" : ids };
      if (data.judul.length < 3) return toast("Judul pengumuman wajib diisi.");
      if (data.isi.length < 3) return toast("Isi pengumuman wajib diisi.");
      if (!ids.length) return toast("Pilih minimal satu program studi sasaran.");
      const go = $("#pfGo", bg); go.disabled = true;
      try { await Api.post(Object.assign({ action: "pengumumanSimpan", data }, Api.auth())); bg.remove(); toast(x ? "Pengumuman diperbarui." : "Pengumuman diterbitkan."); view(); }
      catch (e) { go.disabled = false; toast("Gagal menyimpan: " + e.message, 5000); }
    };
  }

  window.MONEV_PENGUMUMAN = { view, cekBaru, reset: () => { cache = null; cacheKey = ""; } };
})();
