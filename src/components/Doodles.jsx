const INK = "#141414";
const stroke = { stroke: INK, strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" };
const DEFAULT = { heart: "#ff4f9a", star: "#ffd23f", flower: "#ff4f9a", smile: "#ffd23f", arrow: "none", squiggle: "none", sparkle: "#2f7bff" };

// Rabiscos desenhados à mão em SVG. Use: <Doodle k="heart" s={40} />
export function Doodle({ k = "heart", s = 40, c, className = "", style }) {
  const fill = c || DEFAULT[k];
  let body;
  switch (k) {
    case "star":
      body = <path d="M25 4l6 14 15 1-11 10 4 15-14-8-14 8 4-15L4 19l15-1z" fill={fill} {...stroke} />; break;
    case "flower":
      body = <g {...stroke}>{[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={25 + 12 * Math.cos((a * Math.PI) / 180)} cy={25 + 12 * Math.sin((a * Math.PI) / 180)} r="8" fill={fill} />)}<circle cx="25" cy="25" r="6" fill="#ffd23f" /></g>; break;
    case "smile":
      body = <g {...stroke}><circle cx="25" cy="25" r="20" fill={fill} /><path d="M17 20v3M33 20v3M15 30q10 10 20 0" fill="none" /></g>; break;
    case "arrow":
      body = <path d="M5 42C10 14 30 8 44 20M44 20l-11-1M44 20l-4 10" fill="none" {...stroke} />; break;
    case "squiggle":
      body = <path d="M3 25q5-14 11 0t11 0 11 0 10 0" fill="none" {...stroke} stroke="#7b3fe4" strokeWidth="4" />; break;
    case "sparkle":
      body = <path d="M25 4q3 18 21 21-18 3-21 21-3-18-21-21 18-3 21-21z" fill={fill} {...stroke} />; break;
    default:
      body = <path d="M25 44C10 32 4 24 6 15c2-8 13-9 19-1 6-8 17-7 19 1 2 9-4 17-19 29z" fill={fill} {...stroke} />;
  }
  return <svg viewBox="0 0 50 50" width={s} height={s} className={"doodle " + className} style={style} aria-hidden="true">{body}</svg>;
}

// Foto provisória colorida (usada quando o amigo ainda não tem foto ou o arquivo não carrega)
export function placeholder(name = "?") {
  const cols = ["#ff4f9a", "#ffd23f", "#2f7bff", "#7b3fe4", "#e8262d"];
  const c = cols[name.length % cols.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='${c}'/><text x='150' y='195' font-size='140' text-anchor='middle' font-family='Arial' font-weight='700' fill='white'>${name[0].toUpperCase()}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
export const assetUrl = (path = "") => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
export const photoSrc = (f) => (f.photo ? `${assetUrl(f.photo)}?v=3` : placeholder(f.name));
export const onImgError = (e, name) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholder(name); };
