import { useState } from "react";
import GuestApp from "./GuestApp";
import AdminApp from "./AdminApp";

export default function App() {
  const [mode, setMode] = useState(null);

  if (mode === "guest") return <GuestApp />;
  if (mode === "admin") return <AdminApp />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a0f05 0%, #3a1f08 50%, #1a0f05 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Nunito', sans-serif", padding: 20
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Nunito:wght@400;600;700&display=swap');`}</style>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>💍</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#fdf8f0", marginBottom: 4 }}>
          Prudence
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#c8860a", marginBottom: 4 }}>& </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#fdf8f0", marginBottom: 20 }}>
          Praxèd
        </div>
        <p style={{ color: "rgba(200,134,10,0.8)", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 32 }}>
          9 & 11 Juillet 2026
        </p>
        <button onClick={() => setMode("guest")} style={{
          width: "100%", padding: "16px", marginBottom: 12,
          background: "linear-gradient(135deg, #8B4513, #c8860a)",
          color: "#fdf8f0", border: "none", borderRadius: 14,
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          fontFamily: "'Nunito', sans-serif", letterSpacing: 1
        }}>
          💌 Application Invités
        </button>
        <button onClick={() => setMode("admin")} style={{
          width: "100%", padding: "14px",
          background: "transparent",
          color: "#c8860a", border: "1px solid rgba(200,134,10,0.4)",
          borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: "pointer",
          fontFamily: "'Nunito', sans-serif", letterSpacing: 1
        }}>
          🛠️ Admin (organisateurs)
        </button>
      </div>
    </div>
  );
}
