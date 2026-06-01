import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import v1 from "@/assets/vehicle-1.jpg";
import v2 from "@/assets/vehicle-2.jpg";
import v3 from "@/assets/vehicle-3.jpg";
import v4 from "@/assets/vehicle-4.jpg";
import v5 from "@/assets/vehicle-5.jpg";
import v6 from "@/assets/vehicle-6.jpg";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";

interface GItem {
  src: string;
  alt: string;
  span: string;
}

const items: GItem[] = [
  { src: hero, alt: "Fleet of trucks at dusk", span: "sm:col-span-2 sm:row-span-2" },
  { src: v1, alt: "Volvo tractor unit", span: "" },
  { src: v3, alt: "Articulated curtainsider", span: "" },
  { src: v5, alt: "Tipper truck", span: "sm:col-span-2" },
  { src: v6, alt: "Tracked excavator", span: "" },
  { src: v2, alt: "Box rigid truck", span: "" },
  { src: about, alt: "Dealership at night", span: "sm:col-span-2" },
  { src: v4, alt: "Panel van", span: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, move]);

  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="container-luxe">
        <div className="reveal mb-14 text-center">
          <p className="eyebrow">Forecourt Showcase</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Gallery
          </h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[220px]">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className={`reveal group relative overflow-hidden rounded-xl border border-border ${item.span}`}
              aria-label={`Open ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ZoomIn className="size-8 text-gold" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 animate-fade-in backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <X className="size-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); move(-1); }}
            aria-label="Previous image"
            className="absolute left-4 flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold/50 hover:text-gold sm:left-8"
          >
            <ChevronLeft className="size-6" />
          </button>
          <img
            src={items[open].src}
            alt={items[open].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-xl border border-border object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); move(1); }}
            aria-label="Next image"
            className="absolute right-4 flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold/50 hover:text-gold sm:right-8"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  );
}
