import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-baseline gap-1 font-sans ${className}`}
      aria-label="A&M Commercials — home"
    >
      <span className="text-xl font-extrabold uppercase tracking-[0.18em] text-foreground sm:text-2xl">
        A
      </span>
      <span className="text-xl font-extrabold uppercase tracking-[0.18em] text-gold sm:text-2xl">
        &amp;
      </span>
      <span className="text-xl font-extrabold uppercase tracking-[0.18em] text-foreground sm:text-2xl">
        M
      </span>
      <span className="ml-1 hidden text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground sm:inline">
        Commercials
      </span>
    </Link>
  );
}
