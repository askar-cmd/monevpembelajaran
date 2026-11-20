/* Pemilih tema tampilan. Pilihan disimpan di peramban (localStorage) dan diterapkan lewat atribut
 * data-theme pada <html>; warna tiap tema didefinisikan di assets/css/style.css.
 * Tanpa atribut = "Otomatis" (mengikuti pengaturan terang/gelap perangkat). */
(function () {
  "use strict";
  const KUNCI = "monev.tema";
  const TEMA = [
    { id: "auto",   nama: "Otomatis",        ket: "Mengikuti pengaturan terang/gelap perangkat", sw: ["#E6F6F5", "#00A39D", "#0D1C1C"], bar: "#004A46" },
    { id: "light",  nama: "Tosca Kemenkes",  ket: "Warna bawaan, terang",                        sw: ["#00302E", "#00A39D", "#E6F6F5"], bar: "#004A46" },
    { id: "biru",   nama: "Biru Laut",       ket: "Terang, nuansa biru",                         sw: ["#0A2540", "#1F6FB5", "#E8F1FA"], bar: "#0F3F6E" },
    { id: "hijau",  nama: "Hijau Daun",      ket: "Terang, nuansa hijau",                        sw: ["#0F2E13", "#2E7D32", "#E8F5E9"], bar: "#1B4D20" },
    { id: "ungu",   nama: "Ungu Lavender",   ket: "Terang, nuansa ungu",                         sw: ["#231640", "#6A4BB5", "#F0EBFA"], bar: "#3A2670" },
    { id: "jingga", nama: "Jingga Hangat",   ket: "Terang, nuansa jingga",                       sw: ["#3A1A06", "#B84C08", "#FDEFE3"], bar: "#6B300A" },
    { id: "dark",   nama: "Gelap",           ket: "Nyaman untuk ruangan redup",                  sw: ["#0D1C1C", "#2CC3BC", "#132726"], bar: "#004A46" }
  ];
  const ADA = id => TEMA.some(t => t.id === id);
  const baca = () => { try { const v = localStorage.getItem(KUNCI); return ADA(v) ? v : "auto"; } catch (e) { return "auto"; } };
  const simpan = id => { try { localStorage.setItem(KUNCI, id); } catch (e) { /* peramban memblokir penyimpanan: pilihan berlaku sementara */ } };

  function terapkan(id) {
    const el = document.documentElement;
    if (id === "auto") el.removeAttribute("data-theme"); else el.setAttribute("data-theme", id);
    const meta = document.querySelector('meta[name="theme-color"]');
    const t = TEMA.find(x => x.id === id);
    if (meta && t) meta.setAttribute("content", t.bar);
  }
  const swatch = t => `<span class="sw" aria-hidden="true">${t.sw.map(c => `<i style="background:${c}"></i>`).join("")}</span>`;
  const ikon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A3.6 3.6 0 0 0 21 10.8C21 6.5 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15.5" cy="7.5" r="1"/></svg>`;

  function pasang() {
    const host = document.getElementById("tema");
    if (!host) return;
    let aktif = baca();
    host.className = "tema";
    host.innerHTML = `<button type="button" class="tema-btn" id="temaBtn" aria-haspopup="true" aria-expanded="false" aria-controls="temaMenu" title="Pilih tema tampilan">${ikon}<span>Tema</span></button>
      <div class="tema-menu" id="temaMenu" role="radiogroup" aria-label="Pilih tema tampilan" hidden>
        <h3>Tema tampilan</h3>
        ${TEMA.map(t => `<button type="button" class="tema-opt" role="radio" data-id="${t.id}" aria-checked="false">${swatch(t)}<span><b>${t.nama}</b><small>${t.ket}</small></span><span class="ck" aria-hidden="true">✓</span></button>`).join("")}
      </div>`;
    const btn = host.querySelector("#temaBtn"), menu = host.querySelector("#temaMenu");
    const tandai = () => menu.querySelectorAll(".tema-opt").forEach(o => o.setAttribute("aria-checked", String(o.dataset.id === aktif)));
    /* menu dijaga tetap di dalam layar: rata kiri tombol bila muat, selain itu digeser ke dalam */
    const atur = () => {
      const vw = document.documentElement.clientWidth, mw = menu.offsetWidth, hl = host.getBoundingClientRect().left;
      const tujuan = Math.max(8, Math.min(hl, vw - 8 - mw));
      menu.style.right = "auto"; menu.style.left = Math.round(tujuan - hl) + "px";
    };
    const buka = b => { menu.hidden = !b; btn.setAttribute("aria-expanded", String(b)); if (b) atur(); if (b) { const o = menu.querySelector('[aria-checked="true"]') || menu.querySelector(".tema-opt"); o.focus(); } };
    tandai();

    btn.addEventListener("click", () => buka(menu.hidden));
    menu.addEventListener("click", e => {
      const o = e.target.closest(".tema-opt"); if (!o) return;
      aktif = o.dataset.id; simpan(aktif); terapkan(aktif); tandai();
      /* grafik membaca warna saat digambar, jadi digambar ulang; halaman isian/pengelolaan tidak disentuh agar ketikan tidak hilang */
      const h = location.hash;
      if (window.MONEV && window.MONEV.route && !/^#\/(isi|koreksi|kontrol|pejabat|pengumuman)/.test(h)) window.MONEV.route();
    });
    menu.addEventListener("keydown", e => {
      const op = [...menu.querySelectorAll(".tema-opt")], i = op.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); op[(i + 1) % op.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); op[(i - 1 + op.length) % op.length].focus(); }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { buka(false); btn.focus(); } });
    document.addEventListener("click", e => { if (!menu.hidden && !host.contains(e.target)) buka(false); });
    /* mode Otomatis: ikuti perubahan pengaturan perangkat, grafik ikut digambar ulang */
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (mq && mq.addEventListener) mq.addEventListener("change", () => {
      if (aktif === "auto" && window.MONEV && window.MONEV.route && !/^#\/(isi|koreksi|kontrol|pejabat|pengumuman)/.test(location.hash)) window.MONEV.route();
    });
  }
  window.MONEV_TEMA = { TEMA, terapkan, baca };
  window.addEventListener("DOMContentLoaded", pasang);
})();
