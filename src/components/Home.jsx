import { useState } from "react";
import { friends } from "../data/friends";
import { Doodle, photoSrc, onImgError } from "./Doodles";

const KINDS = ["heart", "star", "flower", "smile", "sparkle"];
const SECRETS = ["psiu... a dica está sempre no mural 👀", "tem gente que acerta de primeira ✦", "não vale pedir a senha pra ninguém ♡", "você achou um segredinho!"];
// ignora maiúsculas, acentos e o "@"
const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/^@+/, "").trim();

function Polaroid({ f }) {
  return (
    <a className="polaroid" href={`#/amigo/${f.id}`} style={{ "--r": ((f.id * 37) % 9) - 4 + "deg" }} title={`@${f.instagram}`}>
      <span className={"tape t" + (f.id % 3)} />
      <img src={photoSrc(f)} alt={f.name} loading="lazy" onError={(e) => onImgError(e, f.name)} />
      <b>♡ {f.name}</b>
      <small>@{f.instagram}</small>
      <Doodle k={KINDS[f.id % 5]} s={32} className="pd a" />
      <Doodle k={KINDS[(f.id + 2) % 5]} s={26} className="pd b" />
    </a>
  );
}

export default function Home() {
  const [q, setQ] = useState("");
  const [secret, setSecret] = useState(-1);
  const nq = norm(q);
  const results = nq ? friends.filter((f) => norm(f.name).includes(nq) || norm(f.instagram).includes(nq)).slice(0, 6) : [];
  const open = (e) => { e.preventDefault(); if (results[0]) location.hash = `#/amigo/${results[0].id}`; };

  return (
    <main className="page">
      <header className="hero">
        <Doodle k="star" s={54} className="fl f1" />
        <Doodle k="heart" s={46} className="fl f2" />
        <Doodle k="flower" s={60} className="fl f3" />
        <button className="fl f4 sticker" onClick={() => setSecret((secret + 1) % SECRETS.length)} aria-label="sticker secreto">
          <Doodle k="smile" s={52} />
        </button>
        {secret >= 0 && <p className="bubble" key={secret}>{SECRETS[secret]}</p>}
        <h1 className="title"><span>ADIVINHE</span> <span>A SENHA:</span> <span>GUSTAVO MOREIRA</span></h1>
        <Doodle k="squiggle" s={150} className="squig" />
        <ul className="steps">
          <li>1. escolha você no mural</li>
          <li>2. leia a dica</li>
          <li>3. acerte a senha e descubra sua mensagem</li>
        </ul>
      </header>

      <form className="search" onSubmit={open}>
        <label htmlFor="q" className="hand">Procure seu @ para começar...</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="@seunome" autoComplete="off" autoCapitalize="none" spellCheck="false" enterKeyHint="go" />
        <Doodle k="arrow" s={56} className="sarrow" />
        {nq && (
          <div className="results">
            {results.length === 0 && <p className="hand">hmm, não achei ninguém com "{q}" 🤔</p>}
            {results.map((f) => (
              <a key={f.id} className="res" href={`#/amigo/${f.id}`}>
                <img src={photoSrc(f)} alt="" onError={(e) => onImgError(e, f.name)} />
                <span><b>{f.name}</b><small>@{f.instagram}</small></span>
              </a>
            ))}
          </div>
        )}
      </form>

      <h2 className="hand mural-title">o mural ♡ <small>({friends.length} pessoas)</small></h2>
      <section className="mural">{friends.map((f) => <Polaroid key={f.id} f={f} />)}</section>
      <footer className="hand foot">feito à mão com carinho ✦</footer>
    </main>
  );
}
