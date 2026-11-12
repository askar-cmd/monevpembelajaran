/**
 * BACKEND MONEV PEMBELAJARAN PRODI — Google Apps Script
 * Pusat Pengembangan Pendidikan, Poltekkes Kemenkes Makassar
 *
 * Penyimpanan: Google Sheet (sheet "Akun", "Isian", "Pejabat", "CatatanKajur", "Log").
 * Login: NIP pejabat yang sedang menjabat + PIN (PIN awal 123456 wajib diganti).
 *   Ketua Program Studi → isi instrumen; Ketua Jurusan → dashboard jurusannya + catatan;
 *   Direktur, Wakil Direktur I, Kapus Penjaminan Mutu, Kapusbangdik → seluruh dashboard + catatan pimpinan;
 *   Kapusbangdik juga mencatat pergantian pejabat. Kunci admin (ADMIN_KEY) = akses darurat.
 * Cara pasang: lihat README.md bagian "Mengaktifkan server".
 *   1. Buat Google Sheet baru → Ekstensi → Apps Script → tempel berkas ini.
 *   2. Jalankan fungsi setup() sekali (izinkan akses).
 *   3. Deploy → New deployment → Web app → Execute as: Me,
 *      Who has access: Anyone → salin URL ke assets/js/config.js (apiUrl).
 */

const PRODI = [
  ["d3-kep-mks", "D-III Keperawatan Makassar", "Keperawatan"], ["d3-kep-pare", "D-III Keperawatan Parepare", "Keperawatan"], ["str-kep", "Sarjana Terapan Keperawatan", "Keperawatan"],
  ["d3-bidan", "D-III Kebidanan", "Kebidanan"], ["str-bidan", "Sarjana Terapan Kebidanan", "Kebidanan"], ["profesi-bidan", "Pendidikan Profesi Bidan", "Kebidanan"],
  ["d3-farmasi", "D-III Farmasi", "Farmasi"], ["str-farmasi", "Sarjana Terapan Farmasi", "Farmasi"],
  ["d3-fisio", "D-III Fisioterapi", "Fisioterapi"], ["str-fisio", "Sarjana Terapan Fisioterapi", "Fisioterapi"], ["profesi-fisio", "Profesi Fisioterapi", "Fisioterapi"],
  ["d3-gizi", "D-III Gizi", "Gizi"], ["str-gizi", "Sarjana Terapan Gizi dan Dietetika", "Gizi"], ["profesi-dietisien", "Profesi Dietisien", "Gizi"],
  ["d3-sanitasi", "D-III Sanitasi", "Kesehatan Lingkungan"], ["str-sanling", "Sarjana Terapan Sanitasi Lingkungan", "Kesehatan Lingkungan"],
  ["d3-tlm", "D-III Teknologi Laboratorium Medis", "Teknologi Laboratorium Medis"], ["str-tlm", "Sarjana Terapan Teknologi Laboratorium Medis", "Teknologi Laboratorium Medis"],
  ["d3-kesgi", "D-III Kesehatan Gigi", "Kesehatan Gigi"], ["str-terapi-gigi", "Sarjana Terapan Terapi Gigi", "Kesehatan Gigi"]
];
const JURUSAN = ["Keperawatan", "Kebidanan", "Farmasi", "Fisioterapi", "Gizi", "Kesehatan Lingkungan", "Teknologi Laboratorium Medis", "Kesehatan Gigi"];
/* Jabatan pimpinan yang dapat login (kunci dipakai pada sheet Pejabat tipe "pimpinan" dan sheet Akun "pimpinan:<kunci>") */
const PIMPINAN = { direktur: "Direktur", wadir1: "Wakil Direktur I Bidang Akademik", kapusbangdik: "Kepala Pusat Pengembangan Pendidikan", kapusmutu: "Kepala Pusat Penjaminan Mutu" };
/* Pimpinan awal (informasi Kapusbangdik, 7 November 2026). NIP tidak ditulis di repositori (publik); NIP diisi melalui
 * menu Pejabat atau langsung pada sheet Pejabat. Ditulis ke sheet Pejabat oleh setup() bila belum ada. */
const PIMPINAN_AWAL = [
  ["direktur", "Addi Mardi Harnanto, MN", ""],
  ["wadir1", "Dr. Siti Nurul Fajriah, S.Pd., S.Ft.Physio., M.Kes", ""],
  ["kapusbangdik", "M. Askar, S.Kep., Ns., M.Kes", ""],
  ["kapusmutu", "Zaenab, SKM., M.Kes", ""]
];
const jurusanProdi_ = id => (PRODI.find(p => p[0] === id) || [])[2] || "";
const CHUNK = 45000; // batas aman isi sel Google Sheets (maks 50.000 karakter)
/* PIN awal standar untuk semua program studi. Ketua Program Studi WAJIB menggantinya pada login pertama. */
const PIN_STANDAR = "123456";
/* Semester yang sudah diarsipkan: isian tidak dapat diubah lagi (data laporan terkunci). */
const SEMESTER_TERKUNCI = ["genap-2025-2026"];

/* Periode pengisian: semester Ganjil 1 Juli s.d. 15 Januari; semester Genap 1 Januari s.d. 15 Juli (waktu Makassar).
 * Di luar periode, penyimpanan isian ditolak; perbaikan data sesudahnya melalui usulan koreksi. */
function periodeSemester_(sem) {
  const m = /^(ganjil|genap)-(\d{4})-(\d{4})$/.exec(String(sem || "")); if (!m) return null;
  return m[1] === "ganjil" ? { mulai: m[2] + "-07-01", batas: m[3] + "-01-15" } : { mulai: m[3] + "-01-01", batas: m[3] + "-07-15" };
}

/* ---------------- setup awal ---------------- */
function setup() {
  const ss = SpreadsheetApp.getActive();
  const akun = ss.getSheetByName("Akun") || ss.insertSheet("Akun");
  if (akun.getLastRow() < 2) {
    akun.clear();
    akun.appendRow(["prodiId", "Program Studi", "PIN", "Aktif (TRUE/FALSE)"]);
    PRODI.forEach(p => akun.appendRow([p[0], p[1], PIN_STANDAR, true]));
    akun.setFrozenRows(1); akun.autoResizeColumns(1, 4);
  }
  const ada = akun.getDataRange().getValues().map(r => r[0]);
  JURUSAN.map(j => ["jurusan:" + j, "Ketua Jurusan " + j]).concat(Object.keys(PIMPINAN).map(k => ["pimpinan:" + k, PIMPINAN[k]]))
    .forEach(a => { if (ada.indexOf(a[0]) < 0) akun.appendRow([a[0], a[1], PIN_STANDAR, true]); });
  const ck = ss.getSheetByName("CatatanKajur") || ss.insertSheet("CatatanKajur");
  if (ck.getLastRow() < 1) { ck.appendRow(["semester", "prodiId", "nama Ketua Jurusan", "catatan", "waktu"]); ck.setFrozenRows(1); }
  const kr = ss.getSheetByName("Koreksi") || ss.insertSheet("Koreksi");
  if (kr.getLastRow() < 1) { kr.appendRow(["semester", "prodiId", "diajukanOleh", "diajukanAt", "status", "catatanKaprodi", "payload", "keputusanOleh", "keputusanAt", "catatanKapusbangdik"]); kr.setFrozenRows(1); }
  const kc = ss.getSheetByName("KontrolCatatan") || ss.insertSheet("KontrolCatatan");
  if (kc.getLastRow() < 1) { kc.appendRow(["id", "semester", "prodiId", "tipe", "pemberi", "tanggal", "catatan", "status", "tanggalTindakLanjut", "bukti", "keterangan", "tanggapanProdi", "tanggalTanggapan"]); kc.setFrozenRows(1); }
  else {
    const hdr = kc.getRange(1,1,1,kc.getLastColumn()).getValues()[0];
    if (hdr.indexOf("tanggapanProdi") < 0) {
      const c = kc.getLastColumn() + 1;
      kc.getRange(1, c).setValue("tanggapanProdi");
      kc.getRange(1, c + 1).setValue("tanggalTanggapan");
    }
  }
  getCatatanPimpinanSheet_();
  const isian = ss.getSheetByName("Isian") || ss.insertSheet("Isian");
  if (isian.getLastRow() < 1) {
    isian.appendRow(["semester", "prodiId", "status", "updatedAt", "catatanPimpinan", "reviewedAt", "jumlahBagian", "payload_1"]);
    isian.setFrozenRows(1);
  }
  const pj = ss.getSheetByName("Pejabat") || ss.insertSheet("Pejabat");
  if (pj.getLastRow() < 1) { pj.appendRow(["tipe (prodi/jurusan/pimpinan)", "kunci (prodiId/nama jurusan/jabatan)", "nama", "nip", "mulai (TMT)", "sampai", "nomor SK", "tautan SK", "sumber", "dicatat"]); pj.setFrozenRows(1); }
  const adaPj = pj.getDataRange().getValues().filter(r => r[0] === "pimpinan").map(r => String(r[1]));
  PIMPINAN_AWAL.forEach(a => { if (adaPj.indexOf(a[0]) < 0) {
    const inSk = (a[0] === "kapusbangdik" || a[0] === "kapusmutu" || a[0] === "wadir1");
    pj.appendRow(["pimpinan", a[0], a[1], a[2], inSk ? "2026-07-24" : "", "", inSk ? "KP.03.01/F.XII/4760/2026" : "", inSk ? "https://drive.google.com/file/d/1s7SwjF_JmmY0zShJ0iQnz9aS3AFKYZi5/view?usp=drive_link" : "", inSk ? "SK Direktur Poltekkes Kemenkes Makassar Nomor KP.03.01/F.XII/4760/2026 (pejabat pengelola periode 2026-2030)" : "Informasi Kapusbangdik, 7 November 2026", ""]);
    pj.getRange(pj.getLastRow(), 4).setNumberFormat("@").setValue(a[2]);
  } });
  const log = ss.getSheetByName("Log") || ss.insertSheet("Log");
  if (log.getLastRow() < 1) log.appendRow(["waktu", "aksi", "semester", "prodiId", "keterangan"]);
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("ADMIN_KEY")) props.setProperty("ADMIN_KEY", randomKey_());
  Logger.log("Kunci akses pimpinan (ADMIN_KEY): " + props.getProperty("ADMIN_KEY"));
  Logger.log("Login: NIP pejabat yang sedang menjabat (sheet Pejabat) + PIN (sheet Akun). PIN awal " + PIN_STANDAR + " wajib diganti pada login pertama.");
}
function gantiKunciPimpinan() { const k = randomKey_(); PropertiesService.getScriptProperties().setProperty("ADMIN_KEY", k); Logger.log("Kunci baru: " + k); }
function randomPin_() { return String(Math.floor(100000 + Math.random() * 900000)); }
/* Kembalikan PIN satu akun ke PIN standar (lupa PIN atau serah terima jabatan). Nama akun sesuai kolom A sheet Akun:
 *   resetPin("d3-tlm")  ·  resetPin("jurusan:Gizi")  ·  resetPin("pimpinan:direktur") */
function resetPin(akun) { return resetPinProdi(akun); }
function resetPinProdi(prodiId) {
  const sh = SpreadsheetApp.getActive().getSheetByName("Akun"), v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (v[i][0] === prodiId) { sh.getRange(i + 1, 3).setNumberFormat("@").setValue(PIN_STANDAR); Logger.log(prodiId + " PIN dikembalikan ke PIN standar"); return; }
  Logger.log("Akun tidak ditemukan: " + prodiId);
}
function randomKey_() { return Utilities.getUuid().replace(/-/g, "").slice(0, 16); }

/* ---------------- koreksi (helper) ---------------- */
function getKoreksiSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("Koreksi");
  if (!sh) { sh = ss.insertSheet("Koreksi"); sh.appendRow(["semester", "prodiId", "diajukanOleh", "diajukanAt", "status", "catatanKaprodi", "payload", "keputusanOleh", "keputusanAt", "catatanKapusbangdik"]); sh.setFrozenRows(1); }
  if (sh.getLastRow() < 1) { sh.appendRow(["semester", "prodiId", "diajukanOleh", "diajukanAt", "status", "catatanKaprodi", "payload", "keputusanOleh", "keputusanAt", "catatanKapusbangdik"]); sh.setFrozenRows(1); }
  return sh;
}

/* ---------------- kontrol catatan (helper) ---------------- */
function perbaikiHeaderKontrol() {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName("KontrolCatatan");
  if (!sh) return;
  const hdr = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  // hapus kolom kosong yang tidak diharapkan
  for (let i = hdr.length - 1; i >= 0; i--) {
    if (String(hdr[i] || "").trim() === "") sh.deleteColumn(i + 1);
  }
  // pastikan header lengkap
  const h2 = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const need = ["id", "semester", "prodiId", "tipe", "pemberi", "tanggal", "catatan", "status", "tanggalTindakLanjut", "bukti", "keterangan", "tanggapanProdi", "tanggalTanggapan"];
  need.forEach((name, idx) => {
    if (h2[idx] !== name) sh.getRange(1, idx + 1).setValue(name);
  });
  Logger.log("Header KontrolCatatan diperbaiki.");
}

function syncKontrolDariCatatan() {
  const ss = SpreadsheetApp.getActive();
  const isian = ss.getSheetByName("Isian");
  const ck = ss.getSheetByName("CatatanKajur");
  const sh = getKontrolSheet_();
  const existing = sh.getDataRange().getValues();
  function ada(sem, pid, tipe, cat) {
    for (let i = 1; i < existing.length; i++) {
      if (existing[i][1] === sem && existing[i][2] === pid && existing[i][3] === tipe && String(existing[i][6]) === String(cat || "")) return true;
    }
    return false;
  }
  let n = 0;
  if (isian) {
    const v = isian.getDataRange().getValues();
    for (let i = 1; i < v.length; i++) {
      const sem = v[i][0], pid = v[i][1], cat = v[i][4];
      if (sem && pid && cat) {
        if (!ada(sem, pid, "pimpinan", cat)) {
          sh.appendRow([Utilities.getUuid(), sem, pid, "pimpinan", "Pimpinan", v[i][5] || new Date().toISOString(), String(cat).slice(0,5000), "belum", "", "", "", "", ""]);
          n++;
        }
      }
    }
  }
  if (ck) {
    const v = ck.getDataRange().getValues();
    for (let i = 1; i < v.length; i++) {
      const sem = v[i][0], pid = v[i][1], nama = v[i][2], cat = v[i][3], waktu = v[i][4];
      if (sem && pid && cat) {
        if (!ada(sem, pid, "kajur", cat)) {
          sh.appendRow([Utilities.getUuid(), sem, pid, "kajur", nama || "Ketua Jurusan", waktu || new Date().toISOString(), String(cat).slice(0,5000), "belum", "", "", "", "", ""]);
          n++;
        }
      }
    }
  }
  Logger.log("Sync selesai: " + n + " catatan ditambahkan ke KontrolCatatan.");
}

function getKontrolSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("KontrolCatatan");
  if (!sh) { sh = ss.insertSheet("KontrolCatatan"); sh.appendRow(["id", "semester", "prodiId", "tipe", "pemberi", "tanggal", "catatan", "status", "tanggalTindakLanjut", "bukti", "keterangan", "tanggapanProdi", "tanggalTanggapan"]); sh.setFrozenRows(1); }
  if (sh.getLastRow() < 1) { sh.appendRow(["id", "semester", "prodiId", "tipe", "pemberi", "tanggal", "catatan", "status", "tanggalTindakLanjut", "bukti", "keterangan", "tanggapanProdi", "tanggalTanggapan"]); sh.setFrozenRows(1); }
  const hdr = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  if (hdr.indexOf("tanggapanProdi") < 0) { const c = sh.getLastColumn()+1; sh.getRange(1,c).setValue("tanggapanProdi"); sh.getRange(1,c+1).setValue("tanggalTanggapan"); }
  return sh;
}
function upsertKontrol_(sem, pid, tipe, pemberi, catatan) {
  const sh = getKontrolSheet_();
  const v = sh.getDataRange().getValues();
  let r = -1;
  for (let i = 1; i < v.length; i++) if (v[i][1] === sem && v[i][2] === pid && v[i][3] === tipe && v[i][7] === "belum" && (tipe !== "pimpinan" || kunciPemberi_(v[i][4]) === kunciPemberi_(pemberi))) r = i + 1;
  const lama = r < 0 ? null : v[r - 1];
  const row = [lama ? lama[0] : Utilities.getUuid(), sem, pid, tipe, pemberi, new Date().toISOString(), String(catatan || "").slice(0, 5000), "belum", "", "", "", lama ? (lama[11] || "") : "", lama ? (lama[12] || "") : ""];
  if (r < 0) sh.appendRow(row); else sh.getRange(r, 1, 1, 13).setValues([row]);
}

/* ---------------- catatan pimpinan per jabatan ---------------- */
/* Setiap pimpinan (Direktur, Wakil Direktur I, Kapus Penjaminan Mutu, Kapusbangdik) memiliki catatannya sendiri per
 * program studi dan semester (sheet "CatatanPimpinan"), sehingga catatan satu pimpinan tidak menimpa catatan pimpinan lain.
 * Catatan lama pada sheet Isian kolom E tetap terbaca dan dipindahkan ke sheet ini saat ada penyimpanan berikutnya. */
function kunciPemberi_(pemberi) {
  const s = String(pemberi || "").trim();
  for (const k in PIMPINAN) if (PIMPINAN[k] === s) return k;
  return s === "Kapusbangdik" ? "kapusbangdik" : s === "Admin" ? "admin" : "lama";
}
function labelPimpinan_(k) { return PIMPINAN[k] || (k === "admin" ? "Admin" : "Pimpinan"); }
function getCatatanPimpinanSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("CatatanPimpinan");
  if (!sh) sh = ss.insertSheet("CatatanPimpinan");
  if (sh.getLastRow() < 1) { sh.appendRow(["semester", "prodiId", "jabatanKey", "jabatan", "catatan", "waktu"]); sh.setFrozenRows(1); }
  return sh;
}
function nilaiKontrol_() { const sh = SpreadsheetApp.getActive().getSheetByName("KontrolCatatan"); return sh ? sh.getDataRange().getValues() : []; }
/* jabatan pemilik catatan lama (Isian kolom E), dikenali dari log KontrolCatatan */
function kunciLama_(sem, pid, kon) {
  for (let i = 1; i < kon.length; i++) if (kon[i][1] === sem && kon[i][2] === pid && kon[i][3] === "pimpinan") return kunciPemberi_(kon[i][4]);
  return "lama";
}
const iso_ = x => x instanceof Date ? x.toISOString() : String(x || "");
/* { prodiId: [ { jabatanKey, jabatan, catatan, waktu } ] } untuk satu semester */
function catatanPimpinan_(sem, isianValues) {
  const out = {};
  const v = getCatatanPimpinanSheet_().getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (v[i][0] === sem && String(v[i][4] || "").trim())
    (out[v[i][1]] = out[v[i][1]] || []).push({ jabatanKey: String(v[i][2]), jabatan: String(v[i][3] || labelPimpinan_(v[i][2])), catatan: String(v[i][4]), waktu: iso_(v[i][5]) });
  const kon = nilaiKontrol_();
  for (let i = 1; i < isianValues.length; i++) {
    const r = isianValues[i];
    if (r[0] !== sem || !String(r[4] || "").trim()) continue;
    const k = kunciLama_(sem, r[1], kon);
    if (!(out[r[1]] || []).some(e => e.jabatanKey === k)) (out[r[1]] = out[r[1]] || []).push({ jabatanKey: k, jabatan: labelPimpinan_(k), catatan: String(r[4]), waktu: iso_(r[5]) });
  }
  return out;
}
/* tempelkan daftar catatan pimpinan ke rekaman; catatanPimpinan (teks gabungan) dipertahankan untuk laporan */
function tempelCatatanPimpinan_(rec, list) {
  rec.catatanPimpinanList = list || [];
  rec.catatanPimpinan = rec.catatanPimpinanList.map(e => e.jabatan + ": " + e.catatan).join("\n\n");
  return rec;
}

/* ---------------- util ---------------- */
function out_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function isAdmin_(key) { const k = PropertiesService.getScriptProperties().getProperty("ADMIN_KEY"); return !!key && key === k; }
/* Login Ketua Program Studi = NIP Ketua Program Studi yang SEDANG menjabat (sheet Pejabat) + PIN program studi (sheet Akun).
 * Bila pergantian Ketua Program Studi dicatat di menu Pejabat, NIP pejabat lama otomatis tidak berlaku. */
function pinOk_(akun, pin) {
  const rows = SpreadsheetApp.getActive().getSheetByName("Akun").getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) if (rows[i][0] === akun) return String(rows[i][2]).trim() === String(pin || "").trim() && String(rows[i][3]).toUpperCase() !== "FALSE";
  return false;
}
/* PIN standar hanya berlaku untuk login pertama dan mengganti PIN; akses data mensyaratkan PIN pribadi */
function pinPribadi_(pin) { return String(pin || "").trim() !== PIN_STANDAR; }
function aktif_(list) {
  const t = Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd");
  const ok = (list || []).filter(e => (!e.mulai || e.mulai <= t) && (!e.sampai || e.sampai >= t));
  return ok.length ? ok[ok.length - 1] : null;
}
function kaprodiAktif_(prodiId, reg) { return aktif_((reg || readPejabat_()).prodi[prodiId]); }
/* Kenali pemilik NIP: pimpinan, Ketua Jurusan, atau Ketua Program Studi yang sedang menjabat */
function siapa_(nip) {
  const n = String(nip || "").replace(/\s+/g, ""); if (!/^\d{18}$/.test(n)) return null;
  const reg = readPejabat_();
  for (const k in reg.pimpinan) { const a = aktif_(reg.pimpinan[k]); if (a && a.nip === n) return { role: "pimpinan", akun: "pimpinan:" + k, jabatanKey: k, jabatan: PIMPINAN[k] || k, nama: a.nama }; }
  for (const j in reg.jurusan) { const a = aktif_(reg.jurusan[j]); if (a && a.nip === n) return { role: "kajur", akun: "jurusan:" + j, jurusan: j, jabatan: "Ketua Jurusan " + j, nama: a.nama }; }
  for (const id in reg.prodi) { const a = aktif_(reg.prodi[id]); if (a && a.nip === n) return { role: "prodi", akun: id, prodiId: id, jabatan: "Ketua Program Studi", nama: a.nama }; }
  return null;
}
/* Pengguna manajemen (pimpinan/Ketua Jurusan) atau kunci admin darurat */
function manajemen_(q) {
  if (isAdmin_(q.key)) return { role: "admin", jabatanKey: "admin", jabatan: "Admin" };
  const w = siapa_(q.nip);
  return w && w.role !== "prodi" && pinPribadi_(q.pin) && pinOk_(w.akun, q.pin) ? w : null;
}
function checkPin_(prodiId, pin, nip) {
  const a = kaprodiAktif_(prodiId);
  return !!a && a.nip === String(nip || "").replace(/\s+/g, "") && pinPribadi_(pin) && pinOk_(prodiId, pin);
}
/* Ganti PIN satu program studi (mis. saat serah terima jabatan): gantiPinProdi("d3-tlm") */
function gantiPinProdi(prodiId) {
  const sh = SpreadsheetApp.getActive().getSheetByName("Akun"), v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (v[i][0] === prodiId) { const p = randomPin_(); sh.getRange(i + 1, 3).setNumberFormat("@").setValue(p); Logger.log(prodiId + " PIN baru: " + p); return; }
  Logger.log("Akun tidak ditemukan: " + prodiId);
}
function log_(aksi, sem, pid, ket) { SpreadsheetApp.getActive().getSheetByName("Log").appendRow([new Date(), aksi, sem || "", pid || "", ket || ""]); }
function findRow_(sh, sem, pid) {
  const v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (v[i][0] === sem && v[i][1] === pid) return i + 1;
  return -1;
}
function readRec_(row) {
  const n = Number(row[6]) || 1; let json = "";
  for (let i = 0; i < n; i++) json += row[7 + i] || "";
  let payload = null; try { payload = JSON.parse(json); } catch (e) {}
  return { status: row[2], updatedAt: row[3] instanceof Date ? row[3].toISOString() : row[3], catatanPimpinan: row[4] || "", payload: payload };
}
function valid_(s) { return /^[a-z0-9-]{3,40}$/.test(String(s || "")); }

/* ---------------- GET ---------------- */
function doGet(e) {
  try {
    const p = e.parameter || {};
    if (p.action === "auth") {
      if (p.key) return isAdmin_(p.key) ? out_({ ok: true, role: "pimpinan" }) : out_({ ok: false, error: "Kunci akses salah" });
      const who = siapa_(p.nip);
      if (!who) return out_({ ok: false, error: "NIP tidak terdaftar sebagai pejabat yang sedang menjabat" });
      return pinOk_(who.akun, p.pin) ? out_(Object.assign({ ok: true, wajibGantiPin: String(p.pin).trim() === PIN_STANDAR }, who)) : out_({ ok: false, error: "PIN salah" });
    }
    if (p.action === "pejabat") {
      /* Direktori pejabat (nama, TMT, SK) dapat dibaca publik agar tampil sebelum login; NIP hanya untuk pengguna yang sudah login */
      const data = readPejabat_(), w = siapa_(p.nip);
      const sah = isAdmin_(p.key) || (!!w && pinPribadi_(p.pin) && pinOk_(w.akun, p.pin));
      if (!sah) ["prodi", "jurusan", "pimpinan"].forEach(t => Object.keys(data[t]).forEach(k => data[t][k].forEach(e => { e.nip = ""; })));
      return out_({ ok: true, data: data, denganNip: sah });
    }
    if (p.action === "kontrolList") {
      const m = manajemen_(p);
      let filterProdi = null;
      if (!m) {
        if (p.prodiId && checkPin_(p.prodiId, p.pin, p.nip)) filterProdi = p.prodiId;
        else return out_({ ok: false, error: "Akses ditolak" });
      }
      const filterJurusan = m && m.role === "kajur" ? m.jurusan : null;
      const sh = getKontrolSheet_();
      const v = sh.getDataRange().getValues();
      const data = [];
      for (let i = 1; i < v.length; i++) {
        if (!v[i][0]) continue;
        if (filterProdi && v[i][2] !== filterProdi) continue;
        if (filterJurusan && jurusanProdi_(v[i][2]) !== filterJurusan) continue;
        data.push({ id: v[i][0], semester: v[i][1], prodiId: v[i][2], tipe: v[i][3], pemberi: v[i][4], tanggal: v[i][5] instanceof Date ? v[i][5].toISOString() : v[i][5], catatan: v[i][6], status: v[i][7], tanggalTindakLanjut: v[i][8] instanceof Date ? v[i][8].toISOString() : v[i][8], bukti: v[i][9], keterangan: v[i][10], tanggapanProdi: v[i][11], tanggalTanggapan: v[i][12] instanceof Date ? v[i][12].toISOString() : v[i][12] });
      }
      return out_({ ok: true, data: data });
    }
    if (p.action === "koreksiList") {
      const m = manajemen_(p);
      if (!m || (m.role !== "admin" && m.jabatanKey !== "kapusbangdik")) return out_({ ok: false, error: "Akses Kapusbangdik diperlukan" });
      const sh = getKoreksiSheet_();
      const v = sh.getDataRange().getValues();
      const data = [];
      for (let i = 1; i < v.length; i++) {
        if (!v[i][0]) continue;
        let payload = null; try { payload = JSON.parse(String(v[i][6] || "{}")); } catch (e) {}
        data.push({ semester: v[i][0], prodiId: v[i][1], diajukanOleh: v[i][2], diajukanAt: v[i][3] instanceof Date ? v[i][3].toISOString() : v[i][3], status: v[i][4], catatanKaprodi: v[i][5], payload: payload, keputusanOleh: v[i][7], keputusanAt: v[i][8] instanceof Date ? v[i][8].toISOString() : v[i][8], catatanKapusbangdik: v[i][9] });
      }
      return out_({ ok: true, data: data });
    }
    if (!valid_(p.semester)) return out_({ ok: false, error: "Semester tidak valid" });
    const sh = SpreadsheetApp.getActive().getSheetByName("Isian");
    const v = sh.getDataRange().getValues();
    if (p.action === "list") {
      const m = manajemen_(p);
      if (!m) return out_({ ok: false, error: "Akses pimpinan diperlukan" });
      const ck = catatanKajur_(p.semester), data = {};
      for (let i = 1; i < v.length; i++) if (v[i][0] === p.semester && (m.role !== "kajur" || jurusanProdi_(v[i][1]) === m.jurusan)) { data[v[i][1]] = Object.assign(readRec_(v[i]), ck[v[i][1]] || {}); }
      /* catatan Ketua Jurusan atas program studi yang isiannya hanya ada di arsip (tanpa baris Isian) */
      Object.keys(ck).forEach(id => { if (!data[id] && (m.role !== "kajur" || jurusanProdi_(id) === m.jurusan)) data[id] = Object.assign({ payload: null }, ck[id]); });
      const cp = catatanPimpinan_(p.semester, v);
      Object.keys(cp).forEach(id => { if (!data[id] && (m.role !== "kajur" || jurusanProdi_(id) === m.jurusan)) data[id] = { payload: null }; });
      Object.keys(data).forEach(id => tempelCatatanPimpinan_(data[id], cp[id]));
      return out_({ ok: true, data: data });
    }
    if (p.action === "get") {
      if (!checkPin_(p.prodiId, p.pin, p.nip)) return out_({ ok: false, error: "NIP/PIN tidak valid atau masa jabatan telah berakhir" });
      const data = {};
      const ck = catatanKajur_(p.semester);
      for (let i = 1; i < v.length; i++) if (v[i][0] === p.semester && v[i][1] === p.prodiId) data[p.prodiId] = Object.assign(readRec_(v[i]), ck[p.prodiId] || {});
      if (!data[p.prodiId] && ck[p.prodiId]) data[p.prodiId] = Object.assign({ payload: null }, ck[p.prodiId]);
      const cp = catatanPimpinan_(p.semester, v);
      if (!data[p.prodiId] && cp[p.prodiId]) data[p.prodiId] = { payload: null };
      if (data[p.prodiId]) tempelCatatanPimpinan_(data[p.prodiId], cp[p.prodiId]);
      return out_({ ok: true, data: data });
    }
    return out_({ ok: false, error: "Aksi tidak dikenal" });
  } catch (err) { return out_({ ok: false, error: String(err) }); }
}

/* ---------------- POST ---------------- */
function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const b = JSON.parse(e.postData.contents || "{}");
    if (b.action === "gantiPin") {
      const who = siapa_(b.nip);
      if (!who || !pinOk_(who.akun, b.pin)) return out_({ ok: false, error: "NIP/PIN lama tidak valid" });
      const baru = String(b.pinBaru || "").trim();
      if (!/^\d{6}$/.test(baru)) return out_({ ok: false, error: "PIN baru harus 6 digit angka" });
      if (baru === PIN_STANDAR || /^(\d)\1{5}$/.test(baru) || "0123456789".indexOf(baru) >= 0 || "9876543210".indexOf(baru) >= 0) return out_({ ok: false, error: "PIN baru terlalu mudah ditebak" });
      const sh = SpreadsheetApp.getActive().getSheetByName("Akun"), v = sh.getDataRange().getValues();
      for (let i = 1; i < v.length; i++) if (v[i][0] === who.akun) sh.getRange(i + 1, 3).setNumberFormat("@").setValue(baru);
      log_("ganti-pin", "", who.akun, "");
      return out_({ ok: true });
    }
    if (b.action === "pejabatSave") {
      const m = manajemen_(b);
      if (!m || (m.role !== "admin" && m.jabatanKey !== "kapusbangdik")) return out_({ ok: false, error: "Pencatatan pejabat hanya oleh Kepala Pusat Pengembangan Pendidikan" });
      /* cegah daftar tanpa NIP (mis. dimuat sebelum login) menimpa NIP yang tersimpan */
      let tanpaNip = 0;
      ["pimpinan", "jurusan", "prodi"].forEach(t => Object.keys((b.data || {})[t] || {}).forEach(k => (b.data[t][k] || []).forEach(e => { if (!/^\d{18}$/.test(String(e.nip || "").replace(/\s+/g, ""))) tanpaNip++; })));
      if (tanpaNip) return out_({ ok: false, error: "Ada " + tanpaNip + " data pejabat tanpa NIP 18 digit. Muat ulang halaman Pejabat setelah login, lalu ulangi." });
      writePejabat_(b.data || {});
      log_("pejabat-simpan", "", "", "");
      return out_({ ok: true });
    }
    if (b.action === "kontrolTanggapan") {
      if (!checkPin_(b.prodiId, b.pin, b.nip)) return out_({ ok: false, error: "NIP/PIN tidak valid" });
      if (!b.id) return out_({ ok: false, error: "ID tidak valid" });
      const sh = getKontrolSheet_();
      const v = sh.getDataRange().getValues();
      let r = -1;
      for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(b.id) && v[i][2] === b.prodiId) r = i + 1;
      if (r < 0) return out_({ ok: false, error: "Data tidak ditemukan" });
      sh.getRange(r, 12).setValue(String(b.tanggapan || "").slice(0, 5000));
      sh.getRange(r, 13).setValue(new Date().toISOString());
      log_("kontrol-tanggapan", v[r-1][1], b.prodiId, "");
      return out_({ ok: true });
    }
    if (b.action === "syncKontrol") {
      const m = manajemen_(b);
      if (!m || (m.role !== "admin" && m.jabatanKey !== "kapusbangdik")) return out_({ ok: false, error: "Akses Kapusbangdik diperlukan" });
      const ss = SpreadsheetApp.getActive();
      const isian = ss.getSheetByName("Isian");
      const ck = ss.getSheetByName("CatatanKajur");
      const sh = getKontrolSheet_();
      const existing = sh.getDataRange().getValues();
      function ada(sem, pid, tipe, cat) {
        for (let i = 1; i < existing.length; i++) {
          if (existing[i][1] === sem && existing[i][2] === pid && existing[i][3] === tipe && String(existing[i][6]) === String(cat || "")) return true;
        }
        return false;
      }
      let n = 0;
      if (isian) {
        const v = isian.getDataRange().getValues();
        for (let i = 1; i < v.length; i++) {
          const sem = v[i][0], pid = v[i][1], cat = v[i][4];
          if (sem && pid && cat) {
            if (!ada(sem, pid, "pimpinan", cat)) {
              sh.appendRow([Utilities.getUuid(), sem, pid, "pimpinan", "Pimpinan", v[i][5] || new Date().toISOString(), String(cat).slice(0,5000), "belum", "", "", "", "", ""]);
              n++;
            }
          }
        }
      }
      if (ck) {
        const v = ck.getDataRange().getValues();
        for (let i = 1; i < v.length; i++) {
          const sem = v[i][0], pid = v[i][1], nama = v[i][2], cat = v[i][3], waktu = v[i][4];
          if (sem && pid && cat) {
            if (!ada(sem, pid, "kajur", cat)) {
              sh.appendRow([Utilities.getUuid(), sem, pid, "kajur", nama || "Ketua Jurusan", waktu || new Date().toISOString(), String(cat).slice(0,5000), "belum", "", "", "", "", ""]);
              n++;
            }
          }
        }
      }
      log_("sync-kontrol", "", "", n + " catatan");
      return out_({ ok: true, n: n });
    }
    if (b.action === "kontrolHapus") {
      const m = manajemen_(b);
      if (!m || (m.role !== "admin" && m.jabatanKey !== "kapusbangdik")) return out_({ ok: false, error: "Akses Kapusbangdik diperlukan" });
      const sh = getKontrolSheet_();
      const v = sh.getDataRange().getValues();
      if (b.hapusSemua) {
        if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).clearContent();
        log_("kontrol-hapus-semua", "", "", "");
        return out_({ ok: true });
      }
      let r = -1;
      for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(b.id)) r = i + 1;
      if (r < 0) return out_({ ok: false, error: "Data tidak ditemukan" });
      sh.deleteRow(r);
      log_("kontrol-hapus", v[r-1][1], v[r-1][2], "");
      return out_({ ok: true });
    }
    if (!valid_(b.semester) || !valid_(b.prodiId)) return out_({ ok: false, error: "Parameter tidak valid" });
    const sh = SpreadsheetApp.getActive().getSheetByName("Isian");
    if (b.action === "save") {
      if (!checkPin_(b.prodiId, b.pin, b.nip)) return out_({ ok: false, error: "NIP/PIN tidak valid atau masa jabatan telah berakhir" });
      if (SEMESTER_TERKUNCI.indexOf(b.semester) >= 0) return out_({ ok: false, error: "Semester sudah ditutup; isian tidak dapat diubah" });
      const pr = periodeSemester_(b.semester), hari = Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd");
      if (pr && (hari < pr.mulai || hari > pr.batas)) return out_({ ok: false, error: "Di luar periode pengisian (" + pr.mulai + " s.d. " + pr.batas + "); isian tidak dapat disimpan" });
      if (["draf", "final"].indexOf(b.status) < 0) return out_({ ok: false, error: "Status tidak valid" });
      const json = JSON.stringify(b.payload || {});
      const parts = []; for (let i = 0; i < json.length; i += CHUNK) parts.push(json.slice(i, i + CHUNK));
      let r = findRow_(sh, b.semester, b.prodiId);
      if (r > 0 && b.status === "draf" && sh.getRange(r, 3).getValue() === "final") return out_({ ok: false, error: "Isian sudah dikirim final dan tidak dapat diturunkan menjadi draf. Gunakan Kirim ulang versi final untuk memperbarui isian." });
      const now = new Date().toISOString();
      if (r < 0) { sh.appendRow([b.semester, b.prodiId]); r = sh.getLastRow(); }
      const keepCat = sh.getRange(r, 5, 1, 2).getValues()[0];
      const width = Math.max(sh.getLastColumn(), 7 + parts.length);
      if (width > sh.getMaxColumns()) sh.insertColumnsAfter(sh.getMaxColumns(), width - sh.getMaxColumns());
      const row = [b.semester, b.prodiId, b.status, now, keepCat[0], keepCat[1], parts.length].concat(parts);
      while (row.length < width) row.push("");
      sh.getRange(r, 1, 1, width).setValues([row]);
      log_("simpan-" + b.status, b.semester, b.prodiId, json.length + " karakter");
      return out_({ ok: true, updatedAt: now });
    }
    if (b.action === "review") {
      const m = manajemen_(b);
      if (!m) return out_({ ok: false, error: "Akses pimpinan diperlukan" });
      if (m.role === "kajur") {
        if (jurusanProdi_(b.prodiId) !== m.jurusan) return out_({ ok: false, error: "Program studi di luar jurusan Anda" });
        const ck = SpreadsheetApp.getActive().getSheetByName("CatatanKajur"), cv = ck.getDataRange().getValues();
        let rr = -1; for (let i = 1; i < cv.length; i++) if (cv[i][0] === b.semester && cv[i][1] === b.prodiId) rr = i + 1;
        const row = [b.semester, b.prodiId, m.jabatan || ("Ketua Jurusan " + m.jurusan), String(b.catatan || "").slice(0, 5000), new Date().toISOString()];
        if (rr < 0) ck.appendRow(row); else ck.getRange(rr, 1, 1, 5).setValues([row]);
        upsertKontrol_(b.semester, b.prodiId, "kajur", m.jabatan, b.catatan);
        log_("catatan-kajur", b.semester, b.prodiId, m.nama);
        return out_({ ok: true });
      }
      const kunci = m.jabatanKey || "admin", label = m.jabatan || labelPimpinan_(kunci);
      const teks = String(b.catatan || "").slice(0, 5000), waktu = new Date().toISOString();
      const cps = getCatatanPimpinanSheet_();
      let cv = cps.getDataRange().getValues();
      const barisCp = k => { for (let i = 1; i < cv.length; i++) if (cv[i][0] === b.semester && cv[i][1] === b.prodiId && cv[i][2] === k) return i + 1; return -1; };
      /* catatan lama (Isian kolom E): pindahkan ke sheet CatatanPimpinan atas nama pemiliknya, lalu kosongkan */
      const r = findRow_(sh, b.semester, b.prodiId);
      if (r > 0) {
        const lama = sh.getRange(r, 5, 1, 2).getValues()[0];
        if (String(lama[0] || "").trim()) {
          const kl = kunciLama_(b.semester, b.prodiId, nilaiKontrol_());
          if (kl !== kunci && barisCp(kl) < 0) { cps.appendRow([b.semester, b.prodiId, kl, labelPimpinan_(kl), String(lama[0]), iso_(lama[1])]); cv = cps.getDataRange().getValues(); }
          sh.getRange(r, 5, 1, 2).setValues([["", ""]]);
        }
      }
      const rc = barisCp(kunci), row = [b.semester, b.prodiId, kunci, label, teks, waktu];
      if (rc < 0) cps.appendRow(row); else cps.getRange(rc, 1, 1, 6).setValues([row]);
      if (teks.trim()) upsertKontrol_(b.semester, b.prodiId, "pimpinan", label, teks);
      log_("catatan-pimpinan", b.semester, b.prodiId, label);
      return out_({ ok: true, jabatanKey: kunci, jabatan: label, waktu: waktu });
    }
    if (b.action === "koreksiAjukan") {
      if (!checkPin_(b.prodiId, b.pin, b.nip)) return out_({ ok: false, error: "NIP/PIN tidak valid atau masa jabatan telah berakhir" });
      if (!valid_(b.semester) || !valid_(b.prodiId)) return out_({ ok: false, error: "Parameter tidak valid" });
      const sh = getKoreksiSheet_();
      const v = sh.getDataRange().getValues();
      let r = -1;
      for (let i = 1; i < v.length; i++) if (v[i][0] === b.semester && v[i][1] === b.prodiId && v[i][4] === "menunggu") r = i + 1;
      const who = siapa_(b.nip);
      const row = [b.semester, b.prodiId, (who ? who.nama : b.nip), new Date().toISOString(), "menunggu", String(b.catatan || "").slice(0, 5000), JSON.stringify(b.payload || {}), "", "", ""];
      if (r < 0) sh.appendRow(row); else sh.getRange(r, 1, 1, 10).setValues([row]);
      log_("koreksi-ajukan", b.semester, b.prodiId, "");
      return out_({ ok: true });
    }
    if (b.action === "kontrolUpdate") {
      const m = manajemen_(b);
      if (!m || (m.role !== "admin" && m.jabatanKey !== "kapusbangdik")) return out_({ ok: false, error: "Akses Kapusbangdik diperlukan" });
      const sh = getKontrolSheet_();
      const v = sh.getDataRange().getValues();
      let r = -1;
      for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(b.id)) r = i + 1;
      if (r < 0) return out_({ ok: false, error: "Data tidak ditemukan" });
      const status = b.status === "selesai" ? "selesai" : "belum";
      sh.getRange(r, 8).setValue(status);
      sh.getRange(r, 9).setValue(status === "selesai" ? new Date().toISOString() : "");
      sh.getRange(r, 10).setValue(String(b.bukti || "").slice(0, 2000));
      sh.getRange(r, 11).setValue(String(b.keterangan || "").slice(0, 5000));
      log_("kontrol-update", v[r-1][1], v[r-1][2], status);
      return out_({ ok: true });
    }
    if (b.action === "koreksiPutuskan") {
      const m = manajemen_(b);
      if (!m || (m.role !== "admin" && m.jabatanKey !== "kapusbangdik")) return out_({ ok: false, error: "Akses Kapusbangdik diperlukan" });
      if (!valid_(b.semester) || !valid_(b.prodiId)) return out_({ ok: false, error: "Parameter tidak valid" });
      const sh = getKoreksiSheet_();
      const v = sh.getDataRange().getValues();
      let r = -1;
      for (let i = 1; i < v.length; i++) if (v[i][0] === b.semester && v[i][1] === b.prodiId && v[i][4] === "menunggu") r = i + 1;
      if (r < 0) return out_({ ok: false, error: "Usulan tidak ditemukan" });
      const keputusan = b.keputusan === "setuju" ? "disetujui" : "ditolak";
      sh.getRange(r, 5).setValue(keputusan);
      sh.getRange(r, 8).setValue(m.nama);
      sh.getRange(r, 9).setValue(new Date().toISOString());
      sh.getRange(r, 10).setValue(String(b.catatan || "").slice(0, 5000));
      if (keputusan === "disetujui") {
        let payload = null; try { payload = JSON.parse(String(v[r - 1][6] || "{}")); } catch (e) {}
        const isian = SpreadsheetApp.getActive().getSheetByName("Isian");
        const json = JSON.stringify(payload || {});
        const parts = []; for (let i = 0; i < json.length; i += CHUNK) parts.push(json.slice(i, i + CHUNK));
        let rr = findRow_(isian, b.semester, b.prodiId);
        const now = new Date().toISOString();
        if (rr < 0) { isian.appendRow([b.semester, b.prodiId]); rr = isian.getLastRow(); }
        const keepCat = isian.getRange(rr, 5, 1, 2).getValues()[0];
        const width = Math.max(isian.getLastColumn(), 7 + parts.length);
        if (width > isian.getMaxColumns()) isian.insertColumnsAfter(isian.getMaxColumns(), width - isian.getMaxColumns());
        const row = [b.semester, b.prodiId, "final", now, keepCat[0], keepCat[1], parts.length].concat(parts);
        while (row.length < width) row.push("");
        isian.getRange(rr, 1, 1, width).setValues([row]);
        log_("koreksi-disetujui", b.semester, b.prodiId, "");
      } else {
        log_("koreksi-ditolak", b.semester, b.prodiId, "");
      }
      return out_({ ok: true });
    }
    return out_({ ok: false, error: "Aksi tidak dikenal" });
  } catch (err) { return out_({ ok: false, error: String(err) }); }
  finally { lock.releaseLock(); }
}

/* ---------------- pejabat (Ketua Program Studi & Ketua Jurusan) ---------------- */
function readPejabat_() {
  const sh = SpreadsheetApp.getActive().getSheetByName("Pejabat");
  const out = { prodi: {}, jurusan: {}, pimpinan: {} };
  if (!sh) return out;
  const v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) {
    const t = v[i][0] === "jurusan" ? "jurusan" : v[i][0] === "pimpinan" ? "pimpinan" : "prodi", k = String(v[i][1]);
    if (!k) continue;
    const d = x => x instanceof Date ? Utilities.formatDate(x, "Asia/Makassar", "yyyy-MM-dd") : String(x || "");
    (out[t][k] = out[t][k] || []).push({ nama: String(v[i][2]), nip: String(v[i][3]).replace(/\s+/g, ""), mulai: d(v[i][4]), sampai: d(v[i][5]), sk: String(v[i][6] || ""), skUrl: String(v[i][7] || ""), sumber: String(v[i][8] || ""), dicatat: d(v[i][9]) });
  }
  return out;
}
function writePejabat_(data) {
  const sh = SpreadsheetApp.getActive().getSheetByName("Pejabat");
  const rows = [];
  ["pimpinan", "jurusan", "prodi"].forEach(t => Object.keys(data[t] || {}).forEach(k => (data[t][k] || []).forEach(e => rows.push([t, k, e.nama || "", String(e.nip || ""), e.mulai || "", e.sampai || "", e.sk || "", e.skUrl || "", e.sumber || "", e.dicatat || ""]))));
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 10).clearContent();
  if (rows.length) { const r = sh.getRange(2, 1, rows.length, 10); r.setNumberFormat("@"); r.setValues(rows); }
}

function catatanKajur_(sem) {
  const sh = SpreadsheetApp.getActive().getSheetByName("CatatanKajur"), out = {};
  if (!sh) return out;
  sh.getDataRange().getValues().slice(1).forEach(r => { if (r[0] === sem) out[r[1]] = { catatanKajur: String(r[3] || ""), catatanKajurOleh: String(r[2] || ""), catatanKajurWaktu: r[4] instanceof Date ? r[4].toISOString() : String(r[4] || "") }; });
  return out;
}
