import { Link } from "react-router-dom";
function Button({ text, link }) {
  const baseClass =
    "inline-flex min-w-[220px] items-center justify-center border border-white/15 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:border-white/35 hover:bg-white/5";

  return link ? (
    <Link to={link} className={baseClass}>
      {text}
    </Link>
  ) : (
    <button className={baseClass}>{text}</button>
  );
}

export default Button;
