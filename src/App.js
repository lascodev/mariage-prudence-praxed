import { useEffect, useState } from "react";
import GuestApp from "./GuestApp";
import AdminApp from "./AdminApp";

const MOT_DE_PASSE = "PP2026";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Nunito:wght@400;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0f0a05;}
`;

function LoginScreen({ onSuccess }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const check = () => {
    if (pwd === MOT_DE_PASSE) { onSuccess(); }
    else { setError(true); setPwd(""); }
  };

  return (
    <>
      <style>{S}</style>
      <div style={{
        minHeight:"100vh",
        background:"linear-gradient(135deg,#0f0a05 0%,#1f1008 50%,#0f0a05 100%)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:20
      }}>
        <div style={{
          background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(200,134,10,0.25)",
          borderRadius:20, padding:36, width:"100%", maxWidth:360, textAlign:"center"
        }}>
          <div style={{fontSize:48, marginBottom:16}}>🔐</div>
          <div style={{fontFamily:"'Playfair Display',serif", fontSize:26, color:"#fdf8f0", marginBottom:4}}>
            Espace Admin
          </div>
          <div style={{fontSize:12, letterSpacing:2, textTransform:"uppercase", color:"rgba(200,134,10,0.7)", marginBottom:28}}>
            Mariage Prudence & Praxèd
          </div>
          <div style={{position:"relative", marginBottom:14}}>
            <input
              type={show ? "text" : "password"}
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError(false); }}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder="Mot de passe..."
              autoFocus
              style={{
                width:"100%", padding:"13px 44px 13px 16px",
                background:"rgba(255,255,255,0.06)",
                border:`1px solid ${error ? "rgba(192,57,43,0.6)" : "rgba(200,134,10,0.25)"}`,
                borderRadius:12, color:"#fdf8f0",
                fontFamily:"'Nunito',sans-serif", fontSize:15,
                outline:"none", letterSpacing: show ? 1 : 4,
              }}
            />
            <button onClick={() => setShow(!show)} style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer", fontSize:18,
              color:"rgba(200,134,10,0.6)"
            }}>{show ? "🙈" : "👁"}</button>
          </div>
          {error && (
            <div style={{
              background:"rgba(192,57,43,0.15)", border:"1px solid rgba(192,57,43,0.3)",
              borderRadius:10, padding:"10px 14px", marginBottom:14,
              color:"#e74c3c", fontSize:13
            }}>❌ Mot de passe incorrect</div>
          )}
          <button onClick={check} style={{
            width:"100%", padding:"13px",
            background:"linear-gradient(135deg,#8B4513,#c8860a)",
            color:"#fdf8f0", border:"none", borderRadius:12,
            fontSize:14, fontWeight:700, cursor:"pointer",
            fontFamily:"'Nunito',sans-serif", letterSpacing:1, textTransform:"uppercase"
          }}>Accéder →</button>
          <div style={{marginTop:20, fontSize:11, color:"rgba(253,248,240,0.2)"}}>
            Accès réservé aux organisateurs
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifie si l'URL contient /admin
    const path = window.location.pathname;
    if (path === "/admin" || path === "/admin/") {
      setIsAdmin(true);
    }

    // Écoute les changements d'URL (navigation manuelle)
    const onPop = () => {
      const p = window.location.pathname;
      setIsAdmin(p === "/admin" || p === "/admin/");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // URL normale → app invités directement
  if (!isAdmin) return <GuestApp />;

  // URL /admin → écran de connexion puis dashboard
  if (!authenticated) return <LoginScreen onSuccess={() => setAuthenticated(true)} />;

  return <AdminApp />;
}
