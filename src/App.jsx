import { useState, useEffect } from "react";

const SURAHS = [
  {n:1,name:"Al-Fatihah",ar:"الفاتحة",ayahs:7,juz:1,pages:1},
  {n:2,name:"Al-Baqarah",ar:"البقرة",ayahs:286,juz:"1-3",pages:49},
  {n:3,name:"Ali 'Imran",ar:"آل عمران",ayahs:200,juz:"3-4",pages:20},
  {n:18,name:"Al-Kahf",ar:"الكهف",ayahs:110,juz:"15-16",pages:12},
  {n:36,name:"Ya-Sin",ar:"يس",ayahs:83,juz:22,pages:8},
  {n:55,name:"Ar-Rahman",ar:"الرحمن",ayahs:78,juz:27,pages:6},
  {n:56,name:"Al-Waqi'ah",ar:"الواقعة",ayahs:96,juz:27,pages:7},
  {n:67,name:"Al-Mulk",ar:"الملك",ayahs:30,juz:29,pages:4},
  {n:78,name:"An-Naba",ar:"النبأ",ayahs:40,juz:30,pages:3},
  {n:87,name:"Al-A'la",ar:"الأعلى",ayahs:19,juz:30,pages:1},
  {n:93,name:"Ad-Duha",ar:"الضحى",ayahs:11,juz:30,pages:1},
  {n:94,name:"Ash-Sharh",ar:"الشرح",ayahs:8,juz:30,pages:1},
  {n:95,name:"At-Tin",ar:"التين",ayahs:8,juz:30,pages:1},
  {n:97,name:"Al-Qadr",ar:"القدر",ayahs:5,juz:30,pages:1},
  {n:103,name:"Al-Asr",ar:"العصر",ayahs:3,juz:30,pages:1},
  {n:108,name:"Al-Kawthar",ar:"الكوثر",ayahs:3,juz:30,pages:1},
  {n:110,name:"An-Nasr",ar:"النصر",ayahs:3,juz:30,pages:1},
  {n:112,name:"Al-Ikhlas",ar:"الإخلاص",ayahs:4,juz:30,pages:1},
  {n:113,name:"Al-Falaq",ar:"الفلق",ayahs:5,juz:30,pages:1},
  {n:114,name:"An-Nas",ar:"الناس",ayahs:6,juz:30,pages:1},
];

const STATUS = {
  not_started:{label:"Not Started",color:"#37474f",icon:"○"},
  in_progress:{label:"In Progress",color:"#f39c12",icon:"◐"},
  memorised:{label:"Memorised",color:"#27ae60",icon:"●"},
  reviewing:{label:"Reviewing",color:"#3498db",icon:"↻"},
};

const KEY = "qul-hifdh";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)||"{}"); } catch { return {}; } };
const save = p => localStorage.setItem(KEY, JSON.stringify(p));

export default function App() {
  const [prog, setProg] = useState(load);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);

  useEffect(()=>{ save(prog); }, [prog]);

  const setStatus = (n,s) => setProg(p=>({...p,[n]:{...p[n],status:s}}));
  const setNotes = (n,v) => setProg(p=>({...p,[n]:{...p[n],notes:v}}));

  const filtered = SURAHS.filter(s=>{
    const st = prog[s.n]?.status||"not_started";
    return (filter==="all"||st===filter) && (s.name.toLowerCase().includes(search.toLowerCase())||s.ar.includes(search)||String(s.n).includes(search));
  });

  const totalAyahs = SURAHS.reduce((a,s)=>a+s.ayahs,0);
  const memAyahs = SURAHS.filter(s=>prog[s.n]?.status==="memorised").reduce((a,s)=>a+s.ayahs,0);
  const memSurahs = SURAHS.filter(s=>prog[s.n]?.status==="memorised").length;
  const inProg = SURAHS.filter(s=>prog[s.n]?.status==="in_progress").length;
  const pct = Math.round(memAyahs/totalAyahs*100);

  return (
    <div style={{minHeight:"100vh",background:"#0b1520",fontFamily:"'Segoe UI',sans-serif",color:"#dce8f0"}}>
      <div style={{background:"rgba(0,0,0,0.5)",borderBottom:"1px solid rgba(39,174,96,0.3)",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#27ae60,#1abc9c)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🌙</div>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:"#27ae60"}}>QUL Hifdh Tracker</div>
            <div style={{fontSize:11,color:"#546e7a"}}>Mushaf metadata from Quranic Universal Library · Tarteel</div>
          </div>
        </div>
        <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{fontSize:12,color:"#546e7a",textDecoration:"none",border:"1px solid rgba(84,110,122,0.3)",padding:"4px 10px",borderRadius:20}}>qul.tarteel.ai ↗</a>
      </div>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
          {[["📊 Progress",pct+"%",memAyahs+" / "+totalAyahs+" ayahs","#27ae60"],["Memorised",memSurahs,"surahs","#1abc9c"],["In Progress",inProg,"surahs active","#f39c12"],["Juz 30",SURAHS.filter(s=>s.juz===30&&prog[s.n]?.status==="memorised").length+" / "+SURAHS.filter(s=>s.juz===30).length,"surahs","#3498db"]].map(([l,v,s,c])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${c}33`,borderRadius:14,padding:"18px 20px"}}>
              <div style={{fontSize:11,color:"#546e7a",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>{l}</div>
              <div style={{fontSize:28,fontWeight:700,color:c,marginBottom:4}}>{v}</div>
              <div style={{fontSize:12,color:"#546e7a"}}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:28}}>
          <div style={{height:10,background:"rgba(255,255,255,0.07)",borderRadius:10,overflow:"hidden"}}>
            <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#27ae60,#1abc9c)",borderRadius:10,transition:"width 0.5s"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap",alignItems:"center"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search surah..." style={{flex:1,minWidth:200,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",color:"#dce8f0",fontSize:14}}/>
          {["all",...Object.keys(STATUS)].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"8px 16px",borderRadius:20,border:"1px solid",fontSize:13,cursor:"pointer",background:filter===f?(f==="all"?"#27ae60":STATUS[f]?.color||"#27ae60"):"transparent",borderColor:f==="all"?"#27ae60":(STATUS[f]?.color||"#27ae60"),color:filter===f?"#0b1520":(f==="all"?"#27ae60":STATUS[f]?.color||"#27ae60"),fontWeight:filter===f?700:400}}>
              {f==="all"?"All":STATUS[f].label}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
          {filtered.map(surah=>{
            const st=prog[surah.n]?.status||"not_started", s=STATUS[st], isSel=sel===surah.n;
            return <div key={surah.n} onClick={()=>setSel(isSel?null:surah.n)} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${isSel?s.color:"rgba(255,255,255,0.08)"}`,borderRadius:14,padding:16,cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div><span style={{fontSize:11,color:"#546e7a",marginRight:8}}>#{surah.n}</span><span style={{fontSize:15,fontWeight:600}}>{surah.name}</span></div>
                <div style={{fontSize:20,fontFamily:"'Amiri','Traditional Arabic',serif",color:"#c8b87a"}}>{surah.ar}</div>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                {[surah.ayahs+" ayahs","Juz "+surah.juz,surah.pages+"p"].map(t=><span key={t} style={{fontSize:11,color:"#546e7a",background:"rgba(255,255,255,0.05)",borderRadius:6,padding:"3px 8px"}}>{t}</span>)}
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {Object.entries(STATUS).map(([key,val])=>(
                  <button key={key} onClick={e=>{e.stopPropagation();setStatus(surah.n,key);}} style={{fontSize:11,padding:"4px 10px",borderRadius:20,cursor:"pointer",background:st===key?val.color:"transparent",border:`1px solid ${val.color}`,color:st===key?"#0b1520":val.color,fontWeight:st===key?700:400}}>
                    {val.icon} {val.label}
                  </button>
                ))}
              </div>
              {isSel&&<div style={{marginTop:14}} onClick={e=>e.stopPropagation()}>
                <textarea placeholder="Notes..." value={prog[surah.n]?.notes||""} onChange={e=>setNotes(surah.n,e.target.value)} style={{width:"100%",background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:10,color:"#dce8f0",fontSize:13,resize:"vertical",minHeight:72,boxSizing:"border-box"}}/>
              </div>}
            </div>;
          })}
        </div>
        <div style={{marginTop:32,padding:16,background:"rgba(39,174,96,0.05)",border:"1px solid rgba(39,174,96,0.15)",borderRadius:12,textAlign:"center"}}>
          <div style={{fontSize:12,color:"#546e7a"}}>Surah metadata from <a href="https://qul.tarteel.ai" target="_blank" rel="noreferrer" style={{color:"#27ae60",textDecoration:"none"}}>QUL by Tarteel</a>. Progress saved locally.</div>
        </div>
      </div>
    </div>
  );
}