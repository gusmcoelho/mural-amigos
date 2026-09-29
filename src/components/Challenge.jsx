import { useCallback, useEffect, useMemo, useState } from "react";
import { Doodle, photoSrc, onImgError, assetUrl } from "./Doodles";

const WRONG = ["NÃOOO 😭 tenta de novo", "quase!! respira e vai de novo ✏️", "hmmm... não foi dessa vez 👀", "ops! releia a dica ♡"];
const KINDS = ["heart", "star", "flower", "smile", "sparkle"];
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0"];

function Media({ reward, name }) {
  const items = [].concat(reward.content || []).map(assetUrl);
  if (reward.type === "video") return items.map((src) => <video key={src} src={src} controls playsInline className="media" />);
  if (reward.type === "text") return null;
  return items.map((src, i) => (
    <figure key={src} className="media photo" style={{ "--r": (i % 2 ? 2 : -2) + "deg" }}>
      <span className="tape t1" />
      <img src={src} alt="" onError={(e) => onImgError(e, name)} />
    </figure>
  ));
}

function Reward({ friend }) {
  const burst = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    k: KINDS[i % 5], x: Math.round((Math.random() - 0.5) * 320), y: Math.round(-40 - Math.random() * 260), r: Math.round((Math.random() - 0.5) * 90),
  })), []);

  useEffect(() => {
    if (friend.instagram !== "kpugliess") return;
    const audio = new Audio(assetUrl("/audio/dance_for_you.mp3"));
    audio.volume = 0.75;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.currentTime = 0; };
  }, [friend.instagram]);

  return (
    <section className="reward">
      <div className="burst">
        {burst.map((b, i) => <Doodle key={i} k={b.k} s={30 + (i % 3) * 8} className="bit" style={{ "--x": b.x + "px", "--y": b.y + "px", "--rr": b.r + "deg", animationDelay: i * 40 + "ms" }} />)}
      </div>
      <h1 className="title win">ACERTOU!!! ♡</h1>
      {friend.instagram === "kpugliess" ? (
        <p className="hand" style={{ fontSize: "1.35rem" }}>oi, <b>Loraxzinho lindo, gostoso</b>, você acertou ♡</p>
      ) : (
        <p className="hand">oi, <b>{friend.name}</b>! você desbloqueou:</p>
      )}
      <div className="note big">{friend.reward.message}</div>
      <Media reward={friend.reward} name={friend.name} />
    </section>
  );
}

export default function Challenge({ friend }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | wrong | ok
  const [msg, setMsg] = useState("");

  const targetPassword = String(friend.password);
  const passLength = targetPassword.length || 4;

  const press = useCallback((k) => {
    if (status !== "idle") return;
    setCode((c) => (k === "⌫" ? c.slice(0, -1) : c.length < passLength ? c + k : c));
  }, [status, passLength]);

  useEffect(() => {
    const onKey = (e) => { if (/^\d$/.test(e.key)) press(e.key); else if (e.key === "Backspace") press("⌫"); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [press]);

  useEffect(() => {
    if (code.length < passLength) return;
    const t = setTimeout(() => {
      if (code === targetPassword) return setStatus("ok");
      setStatus("wrong");
      setMsg(WRONG[Math.floor(Math.random() * WRONG.length)]);
      setTimeout(() => { setCode(""); setStatus("idle"); }, 900);
    }, 250);
    return () => clearTimeout(t);
  }, [code, targetPassword, passLength]);

  return (
    <main className="page friend">
      <a className="back hand" href="#/">← voltar ao mural</a>
      {status === "ok" ? <Reward friend={friend} /> : (
        <>
          <div className="bigphoto" style={{ "--r": "-3deg" }}>
            <span className="tape t0" /><span className="tape t2" />
            <img src={photoSrc(friend)} alt="" onError={(e) => onImgError(e, friend.name)} />
            <Doodle k="arrow" s={70} className="pd a" style={{ left: -34, top: "40%" }} />
            <Doodle k="star" s={44} className="pd a" style={{ right: -14, top: -16 }} />
            <Doodle k="heart" s={38} className="pd a" style={{ right: 6, bottom: 40 }} />
          </div>
          <h1 className="title small">♡ {friend.name} ♡</h1>
          <p className="hand center" style={{ marginTop: "-12px", marginBottom: "12px", fontSize: "1.25rem", opacity: 0.85 }}>@{friend.instagram}</p>

          <div className="note hint"><span className="label">DICA</span>{friend.hint}</div>

          <p className="hand center">DIGITE A SENHA</p>
          <div className={"slots " + status + (passLength > 4 ? " slots-wide" : "")} aria-live="polite">
            {Array.from({ length: passLength }, (_, i) => <span key={i} className="slot">{code[i] ? "●" : ""}</span>)}
          </div>
          <p className="wrong hand" aria-live="assertive">{status === "wrong" ? msg : "\u00a0"}</p>

          <div className="keypad">
            {KEYS.map((k) => <button key={k} className={"key" + (k === "0" ? " zero" : "")} onClick={() => press(k)} aria-label={k === "⌫" ? "apagar" : k}>{k}</button>)}
          </div>
        </>
      )}
    </main>
  );
}
