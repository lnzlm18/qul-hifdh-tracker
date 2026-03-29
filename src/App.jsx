import { useState, useEffect } from "react";

const SURAHS = [
  {n:1,name:"Al-Fatihah",ar:"الفاتحة",ayahs:7,juz:1,pages:1},{n:2,name:"Al-Baqarah",ar:"البقرة",ayahs:286,juz:1,pages:48},{n:3,name:"Ali 'Imran",ar:"آل عمران",ayahs:200,juz:3,pages:20},{n:4,name:"An-Nisa",ar:"النساء",ayahs:176,juz:4,pages:23},{n:5,name:"Al-Ma'idah",ar:"المائدة",ayahs:120,juz:6,pages:16},{n:6,name:"Al-An'am",ar:"الأنعام",ayahs:165,juz:7,pages:21},{n:7,name:"Al-A'raf",ar:"الأعراف",ayahs:206,juz:8,pages:24},{n:8,name:"Al-Anfal",ar:"الأنفال",ayahs:75,juz:9,pages:10},{n:9,name:"At-Tawbah",ar:"التوبة",ayahs:129,juz:10,pages:16},{n:10,name:"Yunus",ar:"يونس",ayahs:109,juz:11,pages:11},{n:11,name:"Hud",ar:"هود",ayahs:123,juz:11,pages:11},{n:12,name:"Yusuf",ar:"يوسف",ayahs:111,juz:12,pages:12},{n:13,name:"Ar-Ra'd",ar:"الرعد",ayahs:43,juz:13,pages:6},{n:14,name:"Ibrahim",ar:"إبراهيم",ayahs:52,juz:13,pages:6},{n:15,name:"Al-Hijr",ar:"الحجر",ayahs:99,juz:14,pages:6},{n:16,name:"An-Nahl",ar:"النحل",ayahs:128,juz:14,pages:13},{n:17,name:"Al-Isra",ar:"الإسراء",ayahs:111,juz:15,pages:12},{n:18,name:"Al-Kahf",ar:"الكهف",ayahs:110,juz:15,pages:12},{n:19,name:"Maryam",ar:"مريم",ayahs:98,juz:16,pages:7},{n:20,name:"Ta-Ha",ar:"طه",ayahs:135,juz:16,pages:8},{n:21,name:"Al-Anbiya",ar:"الأنبياء",ayahs:112,juz:17,pages:8},{n:22,name:"Al-Hajj",ar:"الحج",ayahs:78,juz:17,pages:8},{n:23,name:"Al-Mu'minun",ar:"المؤمنون",ayahs:118,juz:18,pages:7},{n:24,name:"An-Nur",ar:"النور",ayahs:64,juz:18,pages:9},{n:25,name:"Al-Furqan",ar:"الفرقان",ayahs:77,juz:18,pages:6},{n:26,name:"Ash-Shu'ara",ar:"الشعراء",ayahs:227,juz:19,pages:11},{n:27,name:"An-Naml",ar:"النمل",ayahs:93,juz:19,pages:8},{n:28,name:"Al-Qasas",ar:"القصص",ayahs:88,juz:20,pages:9},{n:29,name:"Al-Ankabut",ar:"العنكبوت",ayahs:69,juz:20,pages:7},{n:30,name:"Ar-Rum",ar:"الروم",ayahs:60,juz:21,pages:6},{n:31,name:"Luqman",ar:"لقمان",ayahs:34,juz:21,pages:4},{n:32,name:"As-Sajdah",ar:"السجدة",ayahs:30,juz:21,pages:3},{n:33,name:"Al-Ahzab",ar:"الأحزاب",ayahs:73,juz:21,pages:9},{n:34,name:"Saba",ar:"سبأ",ayahs:54,juz:22,pages:6},{n:35,name:"Fatir",ar:"فاطر",ayahs:45,juz:22,pages:5},{n:36,name:"Ya-Sin",ar:"يس",ayahs:83,juz:22,pages:5},{n:37,name:"As-Saffat",ar:"الصافات",ayahs:182,juz:23,pages:7},{n:38,name:"Sad",ar:"ص",ayahs:88,juz:23,pages:6},{n:39,name:"Az-Zumar",ar:"الزمر",ayahs:75,juz:23,pages:8},{n:40,name:"Ghafir",ar:"غافر",ayahs:85,juz:24,pages:9},{n:41,name:"Fussilat",ar:"فصلت",ayahs:54,juz:24,pages:6},{n:42,name:"Ash-Shura",ar:"الشورى",ayahs:53,juz:25,pages:6},{n:43,name:"Az-Zukhruf",ar:"الزخرف",ayahs:89,juz:25,pages:7},{n:44,name:"Ad-Dukhan",ar:"الدخان",ayahs:59,juz:25,pages:3},{n:45,name:"Al-Jathiyah",ar:"الجاثية",ayahs:37,juz:25,pages:4},{n:46,name:"Al-Ahqaf",ar:"الأحقاف",ayahs:35,juz:26,pages:4},{n:47,name:"Muhammad",ar:"محمد",ayahs:38,juz:26,pages:4},{n:48,name:"Al-Fath",ar:"الفتح",ayahs:29,juz:26,pages:4},{n:49,name:"Al-Hujurat",ar:"الحجرات",ayahs:18,juz:26,pages:2},{n:50,name:"Qaf",ar:"ق",ayahs:45,juz:26,pages:3},{n:51,name:"Adh-Dhariyat",ar:"الذاريات",ayahs:60,juz:26,pages:3},{n:52,name:"At-Tur",ar:"الطور",ayahs:49,juz:27,pages:3},{n:53,name:"An-Najm",ar:"النجم",ayahs:62,juz:27,pages:3},{n:54,name:"Al-Qamar",ar:"القمر",ayahs:55,juz:27,pages:3},{n:55,name:"Ar-Rahman",ar:"الرحمن",ayahs:78,juz:27,pages:4},{n:56,name:"Al-Waqi'ah",ar:"الواقعة",ayahs:96,juz:27,pages:4},{n:57,name:"Al-Hadid",ar:"الحديد",ayahs:29,juz:27,pages:5},{n:58,name:"Al-Mujadila",ar:"المجادلة",ayahs:22,juz:28,pages:3},{n:59,name:"Al-Hashr",ar:"الحشر",ayahs:24,juz:28,pages:3},{n:60,name:"Al-Mumtahanah",ar:"الممتحنة",ayahs:13,juz:28,pages:3},{n:61,name:"As-Saf",ar:"الصف",ayahs:14,juz:28,pages:2},{n:62,name:"Al-Jumu'ah",ar:"الجمعة",ayahs:11,juz:28,pages:2},{n:63,name:"Al-Munafiqun",ar:"المنافقون",ayahs:11,juz:28,pages:2},{n:64,name:"At-Taghabun",ar:"التغابن",ayahs:18,juz:28,pages:2},{n:65,name:"At-Talaq",ar:"الطلاق",ayahs:12,juz:28,pages:2},{n:66,name:"At-Tahrim",ar:"التحريم",ayahs:12,juz:28,pages:2},{n:67,name:"Al-Mulk",ar:"الملك",ayahs:30,juz:29,pages:3},{n:68,name:"Al-Qalam",ar:"القلم",ayahs:52,juz:29,pages:3},{n:69,name:"Al-Haqqah",ar:"الحاقة",ayahs:52,juz:29,pages:3},{n:70,name:"Al-Ma'arij",ar:"المعارج",ayahs:44,juz:29,pages:2},{n:71,name:"Nuh",ar:"نوح",ayahs:28,juz:29,pages:2},{n:72,name:"Al-Jinn",ar:"الجن",ayahs:28,juz:29,pages:2},{n:73,name:"Al-Muzzammil",ar:"المزمل",ayahs:20,juz:29,pages:2},{n:74,name:"Al-Muddaththir",ar:"المدثر",ayahs:56,juz:29,pages:2},{n:75,name:"Al-Qiyamah",ar:"القيامة",ayahs:40,juz:29,pages:2},{n:76,name:"Al-Insan",ar:"الإنسان",ayahs:31,juz:29,pages:2},{n:77,name:"Al-Mursalat",ar:"المرسلات",ayahs:50,juz:29,pages:2},{n:78,name:"An-Naba",ar:"النبأ",ayahs:40,juz:30,pages:2},{n:79,name:"An-Nazi'at",ar:"النازعات",ayahs:46,juz:30,pages:2},{n:80,name:"Abasa",ar:"عبس",ayahs:42,juz:30,pages:1},{n:81,name:"At-Takwir",ar:"التكوير",ayahs:29,juz:30,pages:1},{n:82,name:"Al-Infitar",ar:"الانفطار",ayahs:19,juz:30,pages:1},{n:83,name:"Al-Mutaffifin",ar:"المطففين",ayahs:36,juz:30,pages:2},{n:84,name:"Al-Inshiqaq",ar:"الانشقاق",ayahs:25,juz:30,pages:1},{n:85,name:"Al-Buruj",ar:"البروج",ayahs:22,juz:30,pages:1},{n:86,name:"At-Tariq",ar:"الطارق",ayahs:17,juz:30,pages:1},{n:87,name:"Al-A'la",ar:"الأعلى",ayahs:19,juz:30,pages:1},{n:88,name:"Al-Ghashiyah",ar:"الغاشية",ayahs:26,juz:30,pages:1},{n:89,name:"Al-Fajr",ar:"الفجر",ayahs:30,juz:30,pages:2},{n:90,name:"Al-Balad",ar:"البلد",ayahs:20,juz:30,pages:1},{n:91,name:"Ash-Shams",ar:"الشمس",ayahs:15,juz:30,pages:1},{n:92,name:"Al-Layl",ar:"الليل",ayahs:21,juz:30,pages:1},{n:93,name:"Ad-Duha",ar:"الضحى",ayahs:11,juz:30,pages:1},{n:94,name:"Ash-Sharh",ar:"الشرح",ayahs:8,juz:30,pages:1},{n:95,name:"At-Tin",ar:"التين",ayahs:8,juz:30,pages:1},{n:96,name:"Al-Alaq",ar:"العلق",ayahs:19,juz:30,pages:1},{n:97,name:"Al-Qadr",ar:"القدر",ayahs:5,juz:30,pages:1},{n:98,name:"Al-Bayyinah",ar:"البينة",ayahs:8,juz:30,pages:2},{n:99,name:"Az-Zalzalah",ar:"الزلزلة",ayahs:8,juz:30,pages:1},{n:100,name:"Al-Adiyat",ar:"العاديات",ayahs:11,juz:30,pages:1},{n:101,name:"Al-Qari'ah",ar:"القارعة",ayahs:11,juz:30,pages:1},{n:102,name:"At-Takathur",ar:"التكاثر",ayahs:8,juz:30,pages:1},{n:103,name:"Al-Asr",ar:"العصر",ayahs:3,juz:30,pages:1},{n:104,name:"Al-Humazah",ar:"الهمزة",ayahs:9,juz:30,pages:1},{n:105,name:"Al-Fil",ar:"الفيل",ayahs:5,juz:30,pages:1},{n:106,name:"Quraysh",ar:"قريش",ayahs:4,juz:30,pages:1},{n:107,name:"Al-Ma'un",ar:"الماعون",ayahs:7,juz:30,pages:1},{n:108,name:"Al-Kawthar",ar:"الكوثر",ayahs:3,juz:30,pages:1},{n:109,name:"Al-Kafirun",ar:"الكافرون",ayahs:6,juz:30,pages:1},{n:110,name:"An-Nasr",ar:"النصر",ayahs:3,juz:30,pages:1},{n:111,name:"Al-Masad",ar:"المسد",ayahs:5,juz:30,pages:1},{n:112,name:"Al-Ikhlas",ar:"الإخلاص",ayahs:4,juz:30,pages:1},{n:113,name:"Al-Falaq",ar:"الفلق",ayahs:5,juz:30,pages:1},{n:114,name:"An-Nas",ar:"الناس",ayahs:6,juz:30,pages:1}
];

const STATUSES = [
  { key: "not_started", label: "Not Started", color: "#546e7a" },
  { key: "in_progress", label: "In Progress", color: "#f39c12" },
  { key: "memorised", label: "Memorised", color: "#27ae60" },
  { key: "reviewing", label: "Reviewing", color: "#3498db" },
];

const load = () => { try { return JSON.parse(localStorage.getItem("hifdh_v2") || "{}"); } catch { return {}; } };
const save = (d) => localStorage.setItem("hifdh_v2", JSON.stringify(d));

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function App() {
  const [prog, setProg] = useState(load);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [juzFilter, setJuzFilter] = useState("all");
  const [view, setView] = useState("surah"); // surah | juz
  const [draftNotes, setDraftNotes] = useState({});
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { save(prog); }, [prog]);

  const setStatus = (n, s) => {
    setProg(p => ({ ...p, [n]: { ...p[n], status: s, lastRevised: new Date().toISOString() } }));
  };

  const submitNote = (n) => {
    const note = draftNotes[n] ?? prog[n]?.notes ?? "";
    setProg(p => ({ ...p, [n]: { ...p[n], notes: note } }));
    setDraftNotes(d => { const copy = { ...d }; delete copy[n]; return copy; });
  };

  const setAyahProgress = (n, ayahsDone) => {
    setProg(p => ({ ...p, [n]: { ...p[n], ayahsDone } }));
  };

  const totalAyahs = SURAHS.reduce((a, s) => a + s.ayahs, 0);
  const memAyahs = SURAHS.filter(s => prog[s.n]?.status === "memorised").reduce((a, s) => a + s.ayahs, 0);
  const partialAyahs = SURAHS.reduce((a, s) => a + (prog[s.n]?.ayahsDone || 0), 0);
  const memSurahs = SURAHS.filter(s => prog[s.n]?.status === "memorised").length;
  const inProgSurahs = SURAHS.filter(s => prog[s.n]?.status === "in_progress").length;
  const pct = Math.round(((memAyahs + partialAyahs) / (totalAyahs * 2)) * 100 * 2);
  const clampedPct = Math.min(pct, 100);

  // Juz 30 surahs are 78-114
  const juz30Mem = SURAHS.filter(s => s.juz === 30 && prog[s.n]?.status === "memorised").length;
  const juz30Total = SURAHS.filter(s => s.juz === 30).length;

  const filtered = SURAHS.filter(s => {
    const st = prog[s.n]?.status || "not_started";
    const matchStatus = filter === "all" || st === filter;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.ar.includes(search) || String(s.n).includes(search);
    const matchJuz = juzFilter === "all" || String(s.juz) === juzFilter;
    return matchStatus && matchSearch && matchJuz;
  });

  // Group by juz for juz view
  const juzGroups = {};
  filtered.forEach(s => {
    if (!juzGroups[s.juz]) juzGroups[s.juz] = [];
    juzGroups[s.juz].push(s);
  });

  const S = { // styles
    page: { minHeight: "100vh", background: "#0b1520", fontFamily: "'Segoe UI', sans-serif", color: "#dce8f0" },
    header: { background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(39,174,96,0.3)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 16 },
    statVal: (c) => ({ fontSize: 28, fontWeight: 800, color: c }),
    statLabel: { fontSize: 11, color: "#546e7a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
    tag: (c) => ({ fontSize: 11, background: `${c}22`, color: c, border: `1px solid ${c}44`, borderRadius: 20, padding: "2px 8px" }),
    btn: (active, c) => ({ fontSize: 12, padding: "5px 14px", borderRadius: 20, border: `1px solid ${active ? c : "rgba(255,255,255,0.1)"}`, background: active ? `${c}22` : "transparent", color: active ? c : "#546e7a", cursor: "pointer", fontWeight: active ? 600 : 400 }),
    statusBtn: (active, c) => ({ fontSize: 11, padding: "4px 10px", borderRadius: 16, border: `1px solid ${active ? c : "rgba(255,255,255,0.1)"}`, background: active ? `${c}22` : "transparent", color: active ? c : "#546e7a", cursor: "pointer", fontWeight: active ? 600 : 400 }),
    input: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#dce8f0", fontSize: 13, width: "100%", boxSizing: "border-box" },
    submitBtn: { fontSize: 12, padding: "7px 16px", borderRadius: 8, border: "1px solid rgba(39,174,96,0.4)", background: "rgba(39,174,96,0.15)", color: "#27ae60", cursor: "pointer", fontWeight: 600 },
  };

  const SurahCard = ({ s }) => {
    const p = prog[s.n] || {};
    const status = p.status || "not_started";
    const statusInfo = STATUSES.find(x => x.key === status);
    const isExp = expanded === s.n;
    const note = draftNotes[s.n] ?? p.notes ?? "";
    const hasDraft = draftNotes[s.n] !== undefined;
    const ayahsDone = p.ayahsDone || 0;
    const ayahPct = status === "memorised" ? 100 : Math.round((ayahsDone / s.ayahs) * 100);

    return (
      <div style={{ ...S.card, marginBottom: 10, borderColor: isExp ? `${statusInfo.color}44` : "rgba(255,255,255,0.08)" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setExpanded(isExp ? null : s.n)}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${statusInfo.color}22`, border: `1px solid ${statusInfo.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: statusInfo.color, fontWeight: 700 }}>{s.n}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name} <span style={{ fontFamily: "serif", color: "#a0c4d8", marginLeft: 6 }}>{s.ar}</span></div>
              <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                <span style={S.tag("#546e7a")}>{s.ayahs} ayahs</span>
                <span style={S.tag("#546e7a")}>Juz {s.juz}</span>
                <span style={S.tag("#546e7a")}>{s.pages}p</span>
                <span style={S.tag(statusInfo.color)}>{statusInfo.label}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {p.lastRevised && <span style={{ fontSize: 11, color: "#546e7a" }}>Revised {fmt(p.lastRevised)}</span>}
            <span style={{ color: "#546e7a", fontSize: 16 }}>{isExp ? "▲" : "▼"}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginTop: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${ayahPct}%`, background: statusInfo.color, borderRadius: 4, transition: "width 0.3s" }} />
        </div>

        {/* Expanded */}
        {isExp && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>

            {/* Status buttons */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Status</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {STATUSES.map(st => (
                  <button key={st.key} style={S.statusBtn(status === st.key, st.color)} onClick={() => setStatus(s.n, st.key)}>{st.label}</button>
                ))}
              </div>
            </div>

            {/* Ayah-level progress */}
            {status === "in_progress" && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Ayahs memorised: {ayahsDone} / {s.ayahs}</div>
                <input
                  type="range" min={0} max={s.ayahs} value={ayahsDone}
                  onChange={e => setAyahProgress(s.n, Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#f39c12" }}
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Notes</div>
              <textarea
                rows={3}
                value={note}
                onChange={e => setDraftNotes(d => ({ ...d, [s.n]: e.target.value }))}
                placeholder="Add revision notes, teacher feedback..."
                style={{ ...S.input, resize: "vertical" }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                {p.notes && !hasDraft && <span style={{ fontSize: 11, color: "#27ae60" }}>✓ Saved</span>}
                {hasDraft && <span style={{ fontSize: 11, color: "#f39c12" }}>Unsaved changes</span>}
                {!hasDraft && !p.notes && <span />}
                <button style={S.submitBtn} onClick={() => submitNote(s.n)}>Save note</button>
              </div>
            </div>

            {/* Teacher notes */}
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Teacher feedback</div>
              <textarea
                rows={2}
                value={prog[s.n]?.teacherNotes || ""}
                onChange={e => setProg(p => ({ ...p, [s.n]: { ...p[s.n], teacherNotes: e.target.value } }))}
                placeholder="What did your teacher say?"
                style={{ ...S.input, resize: "vertical" }}
              />
            </div>

          </div>
        )}
      </div>
    );
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #27ae60, #1abc9c)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌙</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#27ae60" }}>QUL Hifdh Tracker</div>
            <div style={{ fontSize: 11, color: "#546e7a" }}>Mushaf metadata from Quranic Universal Library · Tarteel</div>
          </div>
        </div>
        <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#546e7a", textDecoration: "none", border: "1px solid rgba(84,110,122,0.3)", padding: "4px 10px", borderRadius: 20 }}>qul.tarteel.ai ↗</a>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Overall Progress", value: `${clampedPct}%`, sub: `${memAyahs} / ${totalAyahs} ayahs`, color: "#27ae60" },
            { label: "Memorised", value: memSurahs, sub: `of 114 surahs`, color: "#1abc9c" },
            { label: "In Progress", value: inProgSurahs, sub: "surahs active", color: "#f39c12" },
            { label: "Juz 30", value: `${juz30Mem} / ${juz30Total}`, sub: "surahs memorised", color: "#3498db" },
          ].map(st => (
            <div key={st.label} style={S.card}>
              <div style={S.statLabel}>{st.label}</div>
              <div style={S.statVal(st.color)}>{st.value}</div>
              <div style={{ fontSize: 12, color: "#546e7a", marginTop: 4 }}>{st.sub}</div>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div style={{ ...S.card, marginBottom: 24, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#546e7a" }}>
            <span>Overall Hifdh Progress</span><span>{clampedPct}%</span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${clampedPct}%`, background: "linear-gradient(90deg, #27ae60, #1abc9c)", borderRadius: 8, transition: "width 0.5s" }} />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search surah..." style={{ ...S.input, width: 220 }} />

          <select value={juzFilter} onChange={e => setJuzFilter(e.target.value)} style={{ ...S.input, width: 120 }}>
            <option value="all">All Juz</option>
            {Array.from({ length: 30 }, (_, i) => i + 1).map(j => <option key={j} value={j}>Juz {j}</option>)}
          </select>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["all", ...STATUSES.map(s => s.key)].map(f => {
              const info = STATUSES.find(s => s.key === f);
              return <button key={f} style={S.btn(filter === f, info?.color || "#27ae60")} onClick={() => setFilter(f)}>{info?.label || "All"}</button>;
            })}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <button style={S.btn(view === "surah", "#27ae60")} onClick={() => setView("surah")}>By Surah</button>
            <button style={S.btn(view === "juz", "#27ae60")} onClick={() => setView("juz")}>By Juz</button>
          </div>
        </div>

        {/* Surah list */}
        {view === "surah" && filtered.map(s => <SurahCard key={s.n} s={s} />)}

        {/* Juz view */}
        {view === "juz" && Object.keys(juzGroups).sort((a, b) => a - b).map(juz => {
          const surahs = juzGroups[juz];
          const juzMem = surahs.filter(s => prog[s.n]?.status === "memorised").length;
          return (
            <div key={juz} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#27ae60" }}>Juz {juz}</div>
                <span style={S.tag("#27ae60")}>{juzMem}/{surahs.length} memorised</span>
                <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round((juzMem / surahs.length) * 100)}%`, background: "#27ae60", borderRadius: 4 }} />
                </div>
              </div>
              {surahs.map(s => <SurahCard key={s.n} s={s} />)}
            </div>
          );
        })}

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "#546e7a" }}>
          Surah metadata from <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{ color: "#27ae60" }}>QUL by Tarteel</a>. Progress saved locally.
        </div>
      </div>
    </div>
  );
}