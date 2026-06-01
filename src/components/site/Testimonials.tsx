import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/vehicles";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [active, setActive] = useState(0);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="border-y border-border bg-surface py-20 sm:py-28">
      <div className="container-luxe">
        <div className="reveal mb-14 text-center">
          <p className="eyebrow">What Our Customers Say</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Trusted By Operators
          </h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>

        <div className="reveal mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">
            <Quote className="mb-6 size-10 text-gold/40" />

            <div
              className="flex transition-transform duration-700 ease-[var(--ease-luxe)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t) => (
                <figure key={t.name} className="w-full shrink-0 px-1">
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-surface text-sm font-bold text-gold">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 border-border bg-card text-foreground hover:border-gold/50 hover:text-gold"
              onClick={() => go(-1)}
              aria-label="Previous review"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-gold" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 border-border bg-card text-foreground hover:border-gold/50 hover:text-gold"
              onClick={() => go(1)}
              aria-label="Next review"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
