import { Check } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about.jpg";

const stats = [
  { target: 25, suffix: "+", label: "Years in business" },
  { target: 300, suffix: "+", label: "Vehicles in stock" },
  { target: 12, suffix: "k", label: "Vehicles supplied" },
  { target: 3, suffix: "", label: "Branches UK & Ireland" },
];

const points = [
  "Fully inspected & documented stock",
  "In-house finance & part-exchange",
  "Worldwide export & shipping support",
];

function Stat({ target, suffix, label }: (typeof stats)[number]) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="reveal">
      <p className="text-3xl font-extrabold text-gold sm:text-4xl">
        <span ref={ref}>{value}</span>
        {suffix}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal relative">
          <div className="overflow-hidden rounded-2xl border border-border">
            <img
              src={aboutImg}
              alt="A&M Commercials dealership at night"
              loading="lazy"
              width={1024}
              height={1024}
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-xl border border-gold/30 bg-card px-7 py-5 shadow-[var(--shadow-gold)] sm:block">
            <p className="text-2xl font-extrabold text-gold">A&amp;M</p>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Commercials Ltd
            </p>
          </div>
        </div>

        <div>
          <p className="reveal eyebrow">Who We Are</p>
          <h2 className="reveal mt-3 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            A trusted name in commercial vehicles
          </h2>
          <div className="reveal gold-divider mt-5" />
          <p className="reveal mt-6 text-muted-foreground">
            For over two decades we've supplied trucks, trailers, vans and plant
            to operators across the UK, Ireland and beyond. Our reputation is
            built on honest advice, immaculate stock and a level of service that
            keeps customers coming back fleet after fleet.
          </p>

          <ul className="reveal mt-7 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm text-foreground">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>

          <div className="reveal mt-10">
            <Button asChild variant="gold" size="lg">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
