#!/usr/bin/env node
/* =====================================================================
 * PEMERIKSAAN SEBELUM UNGGAH KE GITHUB
 * Dashboard Monitoring dan Evaluasi Pembelajaran — Pusbangdik Poltekkes Kemenkes Makassar
 *
 * Jalankan dari akar repositori:  node tools/cek.js
 * Keluar dengan kode 1 bila ada pemeriksaan WAJIB yang gagal.
 *
 * 1. Sintaks seluruh berkas JavaScript dan apps-script/Code.gs
 * 2. Data arsip Genap 2025/2026 tidak berubah (sidik jari SHA-256)
 * 3. Alamat server (apiUrl) terpasang
 * 4. Tidak ada berkas data pegawai / rahasia yang ikut terunggah
 * 5. Uji asap di peramban (bila Playwright tersedia): semua halaman terbuka tanpa galat
 * ===================================================================== */
const fs = require("fs"), path = require("path"), crypto = require("crypto"), { execSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const ARSIP = "data/baseline-genap-2025-2026.js";
/* Sidik jari arsip Genap 2025/2026 yang telah ditetapkan (7 November 2026); diperbarui 12 November 2026 atas permintaan
 * Kapusbangdik: seluruh NIP dihapus dari arsip karena repositori publik (data monitoring tidak berubah). JANGAN diubah kecuali
 * Kapusbangdik secara tertulis meminta koreksi data arsip. */
const ARSIP_SHA256 = "c87a01c51d85865630b916be2e9d861197a588a126e1451869cc9fe791b3b817";

let gagal = 0;
const ok = m => console.log("  ✔ " + m);
const salah = m => { gagal++; console.log("  ✘ " + m); };
const peringatan = m => console.log("  ! " + m);

console.log("1. Sintaks JavaScript");
const berkasJs = fs.readdirSync(path.join(ROOT, "assets/js")).filter(f => f.endsWith(".js")).map(f => "assets/js/" + f)
  .concat([ARSIP, "apps-script/Code.gs"]);
berkasJs.forEach(f => {
  try { new Function(fs.readFileSync(path.join(ROOT, f), "utf8")); ok(f); }
  catch (e) { salah(`${f}: ${e.message}`); }
});

console.log("2. Data arsip Genap 2025/2026");
const sha = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, ARSIP))).digest("hex");
if (sha === ARSIP_SHA256) ok("tidak berubah");
else if (process.env.IZIN_UBAH_ARSIP === "1") peringatan("BERUBAH — diizinkan (IZIN_UBAH_ARSIP=1). Perbarui ARSIP_SHA256 di tools/cek.js.");
else salah("BERUBAH. Arsip Genap 2025/2026 tidak boleh diubah. Batalkan perubahan pada " + ARSIP);

console.log("3. Alamat server");
const cfg = fs.readFileSync(path.join(ROOT, "assets/js/config.js"), "utf8");
const api = (cfg.match(/apiUrl:\s*"([^"]*)"/) || [])[1] || "";
if (/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(api)) ok("apiUrl terpasang");
else salah("apiUrl kosong atau tidak valid — aplikasi akan jatuh ke mode lokal");

console.log("4. Berkas terlarang dan rahasia");
const daftar = execSync("git ls-files --cached --others --exclude-standard", { cwd: ROOT }).toString().split("\n").filter(Boolean);
const terlarang = daftar.filter(f => /\.(xlsx|xls|csv|zip|docx|pdf)$/i.test(f) || /pegawai/i.test(f));
terlarang.length ? salah("berkas tidak boleh diunggah: " + terlarang.join(", ")) : ok("tidak ada berkas data pegawai/dokumen");
const rahasia = daftar.filter(f => !f.startsWith("assets/vendor/") && fs.existsSync(path.join(ROOT, f)) && fs.statSync(path.join(ROOT, f)).size < 2e6)
  .filter(f => /(ADMIN_KEY|kunci admin|Kunci baru)\W{0,6}[:=]?\s*["']?[0-9a-f]{16}\b/i.test(fs.readFileSync(path.join(ROOT, f), "utf8")));
rahasia.length ? salah("kemungkinan kunci admin tertulis di: " + rahasia.join(", ")) : ok("tidak ada kunci admin");

console.log("5. Uji asap di peramban");
let pw = null; try { pw = require("playwright"); } catch (e) { /* tidak tersedia */ }
(async () => {
  if (!pw) { peringatan("Playwright tidak tersedia — uji asap dilewati"); return; }
  const b = await pw.chromium.launch(); const pg = await b.newPage({ viewport: { width: 1366, height: 900 } });
  const err = []; pg.on("pageerror", e => err.push(e.message));
  /* blokir server agar uji tidak menyentuh data sungguhan */
  await pg.route("https://script.google.com/**", r => r.abort());
  const rute = ["#/dasbor", "#/prodi/d3-tlm", "#/isi", "#/laporan", "#/pejabat", "#/panduan"];
  for (const r of rute) {
    const n = err.length;
    await pg.goto("file://" + path.join(ROOT, "index.html") + r); await pg.waitForTimeout(1200);
    const h1 = await pg.$eval("h1", e => e.textContent.trim()).catch(() => "");
    err.length === n && h1 ? ok(`${r} — ${h1.slice(0, 60)}`) : salah(`${r}: ${err.slice(n).join(" | ") || "judul halaman tidak tampil"}`);
  }
  await b.close();
})().catch(e => salah("uji asap: " + e.message)).finally(() => {
  console.log(gagal ? `\nGAGAL: ${gagal} pemeriksaan. Perbaiki sebelum diunggah.` : "\nSEMUA PEMERIKSAAN LOLOS.");
  process.exit(gagal ? 1 : 0);
});
