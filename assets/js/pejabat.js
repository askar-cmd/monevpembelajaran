/* =====================================================================
 * PEJABAT — daftar dan riwayat Ketua Program Studi & Ketua Jurusan
 * ---------------------------------------------------------------------
 * Prinsip: isian monitoring dan evaluasi setiap semester MENYIMPAN
 * SALINAN nama/NIP pejabat pada saat pengisian (identitas). Laporan
 * semester mana pun selalu dibaca dari salinan tersebut, sehingga
 * pergantian jabatan di daftar ini TIDAK mengubah laporan semester
 * yang sudah diarsipkan. Daftar ini hanya dipakai untuk mengisi awal
 * formulir semester yang sedang dibuka.
 * ===================================================================== */
(function () {
  const M = window.MONEV;
  const { C, Api, Data, Session, safe } = M;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const LS = "monev.pejabat";
  const JAB = { kaprodi: "Ketua Program Studi", kajur: "Ketua Jurusan", pimpinan: "Pimpinan" };
  const JP = C.jabatanPimpinan || {};
  const bucketOf = kind => kind === "kajur" ? "jurusan" : kind === "pimpinan" ? "pimpinan" : "prodi";
  const jabLabel = (kind, key) => kind === "pimpinan" ? (JP[key] || key) : JAB[kind];

  /* Data awal dari isian Genap 2025/2026 (Ketua Jurusan ditetapkan dari berkas yang konsisten) */
  function seed() {
    const B = (window.MONEV_BASELINE || {}).isian || {};
    const src = "Isian monitoring dan evaluasi Genap 2025/2026";
    const r = { prodi: {}, jurusan: {}, pimpinan: {} };
    const SKURL = "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link";
    const SKSRC = "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026-2030)";
    const DALAM_SK = ["kapusbangdik", "kapusmutu", "wadir1"]; /* NIP tidak ditulis di repositori; NIP berasal dari server setelah login */
    const SKURL2023 = "https://drive.google.com/file/d/1-2mgiY20ap6wIIHOEMtAD4ez7vV4OAi4/view?usp=drive_link";
    const SKSRC2023 = "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/2.1/0395/2023 (periode 2023-2026)";
    const SKURL2022DIR = "https://drive.google.com/file/d/1029NarD9V7jixnyX3kzyxRbjkBtCLWwL/view?usp=drive_link";
    const SKURL2022WADIR = "https://drive.google.com/file/d/1rl5WSLc8tCwt2NsvYGmgh8ypITmKQPvi/view?usp=drive_link";
    (C.pimpinanAwal || []).forEach(k => {
      const inSk = DALAM_SK.includes(k.kunci);
      const list = [];
      if (k.kunci === "direktur") {
        list.push({ nama: "Dr. Drs. Rusli, Sp.FRS., Apt", nip: "", mulai: "2022-11-14", sampai: "2026-05-04", sk: "KP.03.03/F/2467/2022", skUrl: SKURL2022DIR, sumber: "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.03/F/2467/2022 (14 Nov 2022 s.d. 04 Mei 2026)" });
      }
      if (k.kunci === "wadir1") {
        list.push({ nama: k.nama, nip: normNip(k.nip), mulai: "2022-12-08", sampai: "2026-07-23", sk: "KP.03.03/F/2803/2022", skUrl: SKURL2022WADIR, sumber: "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.03/F/2803/2022 (08 Des 2022)" });
      }
      if (k.kunci === "kapusbangdik" || k.kunci === "kapusmutu") {
        list.push({ nama: k.nama, nip: normNip(k.nip), mulai: "2023-01-19", sampai: "2026-07-23", sk: "KP.03.01/2.1/0395/2023", skUrl: SKURL2023, sumber: SKSRC2023 });
      }
      let mulai = inSk ? "2026-07-24" : "";
      let sk = inSk ? "KP.03.01/F.XII/4760/2026" : "";
      let skUrl = inSk ? SKURL : "";
      let sumber = inSk ? SKSRC : "Informasi Kapusbangdik, 7 November 2026";
      if (k.kunci === "direktur") { mulai = "2026-05-05"; sk = "KP.03.04/F/1342/2026"; skUrl = ""; }
      if (k.kunci === "wadir1") { mulai = "2026-07-24"; sk = ""; skUrl = ""; sumber = "Informasi Kapusbangdik, 7 November 2026"; }
      list.push({ nama: k.nama, nip: normNip(k.nip), mulai, sampai: "", sk, skUrl, sumber });
      r.pimpinan[k.kunci] = list;
    });
    Object.keys(JP).forEach(k => { r.pimpinan[k] = r.pimpinan[k] || []; });
    const pergantianProdi = new Set((C.pergantianPejabat || []).filter(g => g.tipe !== "jurusan" && g.tipe !== "pimpinan").map(g => g.kunci));
    const pergantianJurusan = new Set((C.pergantianPejabat || []).filter(g => g.tipe === "jurusan").map(g => g.kunci));
    C.prodi.forEach(p => {
      const i = (B[p.id] || {}).identitas || {};
      const hasPergantian = pergantianProdi.has(p.id);
      r.prodi[p.id] = i.kaprodi ? [{ nama: i.kaprodi, nip: "", mulai: hasPergantian ? "" : "2026-07-24", sampai: "", sk: hasPergantian ? "" : "KP.03.01/F.XII/4760/2026", skUrl: hasPergantian ? "" : SKURL, sumber: hasPergantian ? src : SKSRC }] : [];
    });
    (C.kajurAwal || []).forEach(k => { const hasPergantian = pergantianJurusan.has(k.jurusan); r.jurusan[k.jurusan] = [{ nama: k.nama, nip: normNip(k.nip), mulai: hasPergantian ? "" : "2026-07-24", sampai: "", sk: hasPergantian ? "" : "KP.03.01/F.XII/4760/2026", skUrl: hasPergantian ? "" : SKURL, sumber: hasPergantian ? src : SKSRC }]; });
    C.jurusan.forEach(j => { r.jurusan[j] = r.jurusan[j] || []; });
    (C.pergantianPejabat || []).forEach(g => {
      const b = r[g.tipe === "jurusan" ? "jurusan" : g.tipe === "pimpinan" ? "pimpinan" : "prodi"]; (b[g.kunci] = b[g.kunci] || []);
      const list = b[g.kunci];
      const prev = list.length ? list[list.length - 1] : null;
      if (prev) {
        prev.sampai = "2026-07-23";
        prev.mulai = prev.mulai || "2023-01-19";
        prev.sk = prev.sk || "KP.03.01/2.1/0395/2023";
        prev.skUrl = prev.skUrl || "https://drive.google.com/file/d/1-2mgiY20ap6wIIHOEMtAD4ez7vV4OAi4/view?usp=drive_link";
        prev.sumber = prev.sumber || "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/2.1/0395/2023 (periode 2023-2026)";
      }
      list.push({ nama: g.nama, nip: normNip(g.nip), mulai: g.mulai || "2026-07-24", sampai: "", sk: g.sk || "KP.03.01/F.XII/4760/2026", skUrl: g.skUrl || "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link", sumber: g.sumber || "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026-2030)" });
    });
    return r;
  }
  const normNip = v => v ? String(v).replace(/\s+/g, "") : "";
  const fmtNip = v => { const n = normNip(v); return n.length === 18 ? `${n.slice(0, 8)} ${n.slice(8, 14)} ${n.slice(14, 15)} ${n.slice(15)}` : n; };

  let reg = null;
  const Pejabat = {
    async load(force) {
      if (reg && !force) return reg;
      if (Api.enabled()) {
        try {
          const ses = Session.get() || {};
          const j = await Api.get(Object.assign({ action: "pejabat" }, ses.role === "prodi" ? { prodiId: ses.prodiId, nip: ses.nip, pin: ses.pin } : ses.role ? Api.auth(ses) : {}));
          if (j.data) { reg = merge(seed(), j.data); try { safe.set(LS, { prodi: reg.prodi, jurusan: reg.jurusan, pimpinan: reg.pimpinan, local: true }); } catch (e) {} return reg; }
        } catch (e) { /* jatuh ke data lokal */ }
      }
      reg = merge(seed(), safe.get(LS, { prodi: {}, jurusan: {}, pimpinan: {} }));
      return reg;
    },
    /* pejabat yang menjabat pada tanggal tertentu (default: hari ini) */
    aktif(kind, key, tanggal) {
      const list = ((reg || seed())[bucketOf(kind)][key]) || [];
      const t = tanggal || M.today();
      const ok = list.filter(e => (!e.mulai || e.mulai <= t) && (!e.sampai || e.sampai >= t));
      return ok.length ? ok[ok.length - 1] : (list.length ? list[list.length - 1] : null);
    },
    riwayat(kind, key) { return (((reg || seed())[bucketOf(kind)][key]) || []).slice(); },
    async catat(kind, key, entry) {
      await this.load();
      const bucket = reg[bucketOf(kind)];
      const list = bucket[key] = bucket[key] || [];
      const prev = list.filter(e => !e.sampai).pop();
      if (prev && entry.mulai) { const d = new Date(entry.mulai); d.setDate(d.getDate() - 1); prev.sampai = d.toISOString().slice(0, 10); }
      list.push(Object.assign({ sampai: "", dicatat: new Date().toISOString() }, entry, { nip: normNip(entry.nip) }));
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post(Object.assign({ action: "pejabatSave", data: reg }, Api.auth(ses)));
      } else safe.set(LS, { prodi: reg.prodi, jurusan: reg.jurusan, pimpinan: reg.pimpinan, local: true });
      return list;
    },
    async edit(kind, key, idx, entry) {
      await this.load();
      const bucket = reg[bucketOf(kind)];
      const list = bucket[key] || [];
      if (!list[idx]) return list;
      const oldMulai = list[idx].mulai;
      Object.assign(list[idx], entry, { nip: normNip(entry.nip) });
      // sesuaikan sampai pejabat sebelumnya bila TMT berubah
      if (entry.mulai && idx > 0) {
        const d = new Date(entry.mulai); d.setDate(d.getDate() - 1);
        list[idx - 1].sampai = d.toISOString().slice(0, 10);
      }
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post(Object.assign({ action: "pejabatSave", data: reg }, Api.auth(ses)));
      } else safe.set(LS, { prodi: reg.prodi, jurusan: reg.jurusan, pimpinan: reg.pimpinan, local: true });
      return list;
    },
    async hapus(kind, key, idx) {
      await this.load();
      const bucket = reg[bucketOf(kind)];
      const list = bucket[key] || [];
      if (idx < 0 || idx >= list.length) return list;
      const removed = list[idx];
      list.splice(idx, 1);
      // jika yang dihapus adalah pejabat aktif, buka kembali pejabat sebelumnya
      if (list.length && (!removed.sampai)) {
        list[list.length - 1].sampai = "";
      }
      if (Api.enabled()) {
        const ses = Session.get();
        await Api.post(Object.assign({ action: "pejabatSave", data: reg }, Api.auth(ses)));
      } else safe.set(LS, { prodi: reg.prodi, jurusan: reg.jurusan, pimpinan: reg.pimpinan, local: true });
      return list;
    },
    reset() { reg = null; },
    fmtNip, normNip, JAB, jabLabel
  };
  function merge(base, saved) {
    ["prodi", "jurusan", "pimpinan"].forEach(k => Object.keys(saved[k] || {}).forEach(id => {
      const sl = saved[k][id] || [];
      if (!sl.length) return;
      const bl = base[k][id] || [];
      base[k][id] = sl.map((e, i) => {
        const b = bl[i] || bl[bl.length - 1] || {};
        return Object.assign({}, e, {
          mulai: e.mulai || b.mulai || "",
          sampai: e.sampai || b.sampai || "",
          sk: e.sk || b.sk || "",
          skUrl: (function (u) { u = u || b.skUrl || ""; if (/1qnqjEk1wPH97-VVQGLS_pZoG8EOICcSJ/.test(u)) return "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link"; return u; })(e.skUrl),
          sumber: e.sumber || b.sumber || ""
        });
      });
    }));
    return base;
  }

  /* ---------------- tampilan ---------------- */
  async function view() {
    const main = $("#main");
    await Pejabat.load(true);
    const ses = Session.get();
    /* pergantian pejabat dicatat oleh Kepala Pusat Pengembangan Pendidikan (atau kunci admin darurat) */
    const canEdit = !Api.enabled() || (ses && (ses.jabatanKey === "kapusbangdik" || ses.jabatanKey === "admin"));
    const rows = C.prodi.map(p => ({ p, kp: Pejabat.aktif("kaprodi", p.id), kj: Pejabat.aktif("kajur", p.jurusan) }));
    const pim = Object.keys(JP).map(k => ({ k, e: Pejabat.aktif("pimpinan", k) }));
    main.innerHTML = `<div class="pagehead"><div><h1>Pejabat Pimpinan, Jurusan, dan Program Studi</h1></div></div>
      <div class="card"><h3 style="margin:0 0 10px">Pimpinan</h3><div class="tbl-wrap"><table><thead><tr><th>Jabatan</th><th>Nama</th><th>TMT</th><th class="no-print"></th></tr></thead><tbody>
        ${pim.map(r => `<tr><td>${esc(JP[r.k])}</td><td>${esc(r.e ? r.e.nama : "-")}</td><td>${esc(r.e && r.e.mulai ? r.e.mulai : "-")}</td>
          <td class="no-print"><div class="row nowrap" style="flex-wrap:nowrap">${canEdit ? `<button class="btn sm" data-edit="pimpinan" data-key="${r.k}">Edit</button><button class="btn sm" data-ganti="pimpinan" data-key="${r.k}">Catat pergantian</button>` : ""}<button class="btn sm ghost" data-riwayat="pimpinan" data-key="${r.k}">Riwayat</button></div></td></tr>`).join("")}
      </tbody></table></div><p class="hint">Pimpinan dapat melihat seluruh dashboard dan menulis catatan pimpinan. NIP pejabat tidak ditampilkan; NIP hanya terlihat oleh Kepala Pusat Pengembangan Pendidikan pada Riwayat dan Edit.</p></div>
      ${C.jurusan.map(j => { const kj = Pejabat.aktif("kajur", j); const rr = rows.filter(r => r.p.jurusan === j);
        return `<div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Jurusan ${esc(j)}</h3>
          <div class="row"><span class="muted">Ketua Jurusan: <b style="color:var(--ink)">${esc(kj ? kj.nama : "-")}</b>${kj && kj.mulai ? ` · TMT ${esc(kj.mulai)}` : ""}</span>
          ${canEdit ? `<button class="btn sm" data-edit="kajur" data-key="${esc(j)}">Edit</button><button class="btn sm ghost" data-ganti="kajur" data-key="${esc(j)}">Catat pergantian Ketua Jurusan</button>` : ""}
          <button class="btn sm ghost" data-riwayat="kajur" data-key="${esc(j)}">Riwayat</button></div></div>
          <div class="tbl-wrap" style="margin-top:10px"><table><thead><tr><th>Program studi</th><th>Ketua Program Studi</th><th>TMT</th><th class="no-print"></th></tr></thead><tbody>
          ${rr.map(r => `<tr><td>${esc(r.p.nama)}</td><td>${esc(r.kp ? r.kp.nama : "-")}</td><td>${esc(r.kp && r.kp.mulai ? r.kp.mulai : "-")}</td>
            <td class="no-print"><div class="row nowrap" style="flex-wrap:nowrap">${canEdit ? `<button class="btn sm" data-edit="kaprodi" data-key="${r.p.id}">Edit</button><button class="btn sm" data-ganti="kaprodi" data-key="${r.p.id}">Catat pergantian</button>` : ""}<button class="btn sm ghost" data-riwayat="kaprodi" data-key="${r.p.id}">Riwayat</button></div></td></tr>`).join("")}
          </tbody></table></div></div>`; }).join("")}`;
    main.querySelectorAll("[data-ganti]").forEach(b => b.onclick = () => formModal(b.dataset.ganti, b.dataset.key));
    main.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => editModal(b.dataset.edit, b.dataset.key));
    main.querySelectorAll("[data-riwayat]").forEach(b => b.onclick = () => riwayatModal(b.dataset.riwayat, b.dataset.key));
  }
  const labelKey = (kind, key) => kind === "kajur" ? "Jurusan " + key : kind === "pimpinan" ? C.namaInstitusi : (Data.prodi(key) || {}).nama;

  function formModal(kind, key) {
    const now = Pejabat.aktif(kind, key);
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" style="max-width:520px"><h2>Catat Pergantian ${esc(jabLabel(kind, key))}</h2>
      <p class="muted">${esc(labelKey(kind, key))}${now ? `<br>Pejabat saat ini: <b>${esc(now.nama)}</b>` : ""}</p>
      <div class="fgrid" style="grid-template-columns:1fr">
        <label class="field"><span>Nama lengkap dan gelar</span><input id="pjNama" placeholder="mis. Dr. Nama Lengkap, S.Kep., Ns., M.Kes"></label>
        <label class="field"><span>NIP (18 digit)</span><input id="pjNip" inputmode="numeric" placeholder="19xxxxxx xxxxxx x xxx"></label>
        <label class="field"><span>Terhitung mulai tanggal (TMT)</span><input id="pjMulai" type="date"></label>
        <label class="field"><span>Nomor SK pengangkatan</span><input id="pjSk" placeholder="mis. HK.02.03/1/1234/2026"></label>
        <label class="field"><span>Tautan dokumen SK (Google Drive, opsional)</span><input id="pjSkUrl" type="url" placeholder="https://drive.google.com/..."></label>
      </div>
      <p class="hint">Pejabat sebelumnya otomatis dicatat berakhir sehari sebelum TMT. Isian semester yang sudah diarsipkan tidak berubah.</p>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="pjX">Batal</button><button class="btn" id="pjGo">Simpan</button></div></div>`;
    document.body.appendChild(bg);
    $("#pjX", bg).onclick = () => bg.remove();
    $("#pjGo", bg).onclick = async () => {
      const e = { nama: $("#pjNama", bg).value.trim(), nip: normNip($("#pjNip", bg).value), mulai: $("#pjMulai", bg).value, sk: $("#pjSk", bg).value.trim(), skUrl: $("#pjSkUrl", bg).value.trim(), sumber: "Dicatat Pusbangdik" };
      const err = [];
      if (e.nama.length < 3) err.push("Nama wajib diisi.");
      if (!/^\d{18}$/.test(e.nip)) err.push("NIP harus 18 digit angka.");
      if (!e.mulai) err.push("TMT wajib diisi.");
      if (now && now.mulai && e.mulai && e.mulai <= now.mulai) err.push("TMT harus setelah TMT pejabat sebelumnya (" + now.mulai + ").");
      if (err.length) { M.toast(err.join(" "), 5000); return; }
      try { await Pejabat.catat(kind, key, e); bg.remove(); M.toast(`${jabLabel(kind, key)} ${kind === "pimpinan" ? "" : labelKey(kind, key) + " "}tercatat: ${e.nama}`); view(); }
      catch (x) { M.toast("Gagal menyimpan: " + x.message, 6000); }
    };
  }
  function activeIndex(kind, key) {
    const list = Pejabat.riwayat(kind, key);
    const t = M.today();
    let idx = list.findIndex(e => (!e.mulai || e.mulai <= t) && (!e.sampai || e.sampai >= t));
    if (idx < 0) idx = list.length - 1;
    return idx;
  }

  function editModal(kind, key) {
    const list = Pejabat.riwayat(kind, key);
    const idx = activeIndex(kind, key);
    const cur = list[idx] || {};
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" style="max-width:520px"><h2>Edit Data ${esc(jabLabel(kind, key))}</h2>
      <p class="muted">${esc(labelKey(kind, key))}</p>
      <div class="fgrid" style="grid-template-columns:1fr">
        <label class="field"><span>Nama lengkap dan gelar</span><input id="edNama" value="${esc(cur.nama || "")}"></label>
        <label class="field"><span>NIP (18 digit)</span><input id="edNip" inputmode="numeric" value="${esc(cur.nip || "")}"></label>
        <label class="field"><span>Terhitung mulai tanggal (TMT)</span><input id="edMulai" type="date" value="${esc(cur.mulai || "")}"></label>
        <label class="field"><span>Sampai tanggal (kosongkan jika masih menjabat)</span><input id="edSampai" type="date" value="${esc(cur.sampai || "")}"></label>
        <label class="field"><span>Nomor SK pengangkatan</span><input id="edSk" value="${esc(cur.sk || "")}"></label>
        <label class="field"><span>Tautan dokumen SK (Google Drive, opsional)</span><input id="edSkUrl" type="url" value="${esc(cur.skUrl || "")}"></label>
        <label class="field"><span>Sumber data</span><input id="edSumber" value="${esc(cur.sumber || "")}"></label>
      </div>
      <p class="hint">Perubahan akan disimpan ke data pejabat. Pejabat sebelumnya (jika ada) otomatis dicatat berakhir sehari sebelum TMT baru.</p>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="edX">Batal</button><button class="btn" id="edGo">Simpan</button></div></div>`;
    document.body.appendChild(bg);
    $("#edX", bg).onclick = () => bg.remove();
    $("#edGo", bg).onclick = async () => {
      const e = { nama: $("#edNama", bg).value.trim(), nip: normNip($("#edNip", bg).value), mulai: $("#edMulai", bg).value, sampai: $("#edSampai", bg).value, sk: $("#edSk", bg).value.trim(), skUrl: $("#edSkUrl", bg).value.trim(), sumber: $("#edSumber", bg).value.trim() };
      const err = [];
      if (e.nama.length < 3) err.push("Nama wajib diisi.");
      if (!/^\d{18}$/.test(e.nip)) err.push("NIP harus 18 digit angka.");
      if (err.length) { M.toast(err.join(" "), 5000); return; }
      try { await Pejabat.edit(kind, key, idx, e); bg.remove(); M.toast("Data pejabat berhasil diperbarui."); view(); }
      catch (x) { M.toast("Gagal menyimpan: " + x.message, 6000); }
    };
  }

  function riwayatModal(kind, key) {
    const ses = Session.get();
    const canEdit = !Api.enabled() || (ses && (ses.jabatanKey === "kapusbangdik" || ses.jabatanKey === "admin"));
    const list = Pejabat.riwayat(kind, key).slice().reverse();
    const orig = Pejabat.riwayat(kind, key);
    const bg = document.createElement("div"); bg.className = "modal-bg";
    const lihatNip = Api.enabled() ? !!(ses && (ses.jabatanKey === "kapusbangdik" || ses.jabatanKey === "admin")) : true;
    const cols = ["Nama"].concat(lihatNip ? ["NIP"] : [], ["TMT mulai", "Sampai", "SK / sumber"], canEdit ? ["Aksi"] : []);
    const rows = list.map((e, i) => {
      const oi = orig.length - 1 - i;
      const aksi = canEdit ? `<button class="btn sm danger" data-del="${oi}">Hapus</button>` : "";
      const base = [esc(e.nama)].concat(lihatNip ? [esc(fmtNip(e.nip) || "-")] : [], [esc(e.mulai || "-"), esc(e.sampai || "sekarang"), e.sk ? (e.skUrl ? `<a href="${esc(e.skUrl)}" target="_blank" rel="noopener">${esc(e.sk)}</a>` : esc(e.sk)) : esc(e.sumber || "")]);
      if (canEdit) base.push(aksi);
      return base;
    });
    bg.innerHTML = `<div class="modal" style="max-width:720px"><h2>Riwayat ${esc(jabLabel(kind, key))}</h2><p class="muted">${esc(labelKey(kind, key))}</p>
      ${list.length ? M.tbl(cols, rows) : `<p class="muted">Belum ada data.</p>`}
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" id="pjClose">Tutup</button></div></div>`;
    document.body.appendChild(bg);
    bg.querySelector("#pjClose").onclick = () => bg.remove();
    bg.addEventListener("click", e => { if (e.target === bg) bg.remove(); });
    if (canEdit) {
      bg.querySelectorAll("[data-del]").forEach(b => b.onclick = async () => {
        const idx = +b.dataset.del;
        if (!confirm("Hapus data pejabat ini dari riwayat?")) return;
        try { await Pejabat.hapus(kind, key, idx); M.toast("Data pejabat dihapus."); bg.remove(); view(); }
        catch (x) { M.toast("Gagal menghapus: " + x.message, 6000); }
      });
    }
  }

  M.Pejabat = Pejabat;
  window.MONEV_PEJABAT = { view };
})();
