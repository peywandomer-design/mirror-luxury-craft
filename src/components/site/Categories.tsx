import { Truck, Container, Package, Construction, CarFront, Boxes } from "lucide-react";
import { categories } from "@/data/vehicles";

const icons = [Truck, Boxes, Container, Package, Construction, CarFront];

export function Categories() {
  return (
    <section className="border-y border-border bg-surface py-16 sm:py-20">
      <div className="container-luxe">
        <div className="reveal mb-12 text-center">
          <p className="eyebrow">Browse The Range</p>
          <h2 className="mt-3 text-2xl font-bold uppercase tracking-[0.12em] text-foreground sm:text-3xl">
            See Our Stock
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <a
                key={cat.label}
                href="#stock"
                className="reveal group flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[var(--shadow-elevate)]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-border bg-surface text-gold transition-colors duration-500 group-hover:border-gold/60">
                  <Icon className="size-7" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                  {cat.label}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {cat.count} in stock
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
