import { useEffect, useState } from "react";
import { friends } from "./data/friends";
import Home from "./components/Home";
import Challenge from "./components/Challenge";

const LOCK_KEY = "scrapbook_locked_id";

// Cada amigo tem um link próprio: seusite.com/#/amigo/7
const getId = () => {
  const m = location.hash.match(/^#\/amigo\/(\d+)/);
  return m ? Number(m[1]) : null;
};

function BlockedScreen() {
  return (
    <main className="page friend" style={{ textAlign: "center", paddingTop: "60px" }}>
      <p style={{ fontSize: "4rem", margin: "0 0 16px" }}>🔒</p>
      <h1 className="title win" style={{ fontSize: "clamp(1.8rem,8vw,3rem)", color: "var(--purple)" }}>
        eita...
      </h1>
      <div className="note big" style={{ maxWidth: 400, margin: "24px auto" }}>
        você já abriu o seu, seu zoiudo, não é pra vc xeretar o dos outros
      </div>
      <a className="back hand" href="#/" style={{ display: "inline-block", marginTop: 24 }}>
        ← voltar
      </a>
    </main>
  );
}

export default function App() {
  const [id, setId] = useState(getId);

  useEffect(() => {
    const onHash = () => { setId(getId()); window.scrollTo(0, 0); };
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  // Se está na tela de um amigo, aplica o lock
  if (id !== null) {
    const stored = localStorage.getItem(LOCK_KEY);
    if (stored === null) {
      // Primeira vez — salva o ID
      localStorage.setItem(LOCK_KEY, String(id));
    } else if (Number(stored) !== id) {
      // Tentou acessar outro perfil → bloqueia
      return <BlockedScreen />;
    }
  }

  const friend = friends.find((f) => f.id === id);
  return friend ? <Challenge key={friend.id} friend={friend} /> : <Home />;
}
