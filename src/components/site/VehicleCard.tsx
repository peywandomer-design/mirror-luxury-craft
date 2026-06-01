import { Calendar, Gauge, Fuel, Cog, ArrowRight } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Calendar, value: vehicle.year },
    { icon: Gauge, value: vehicle.mileage },
    { icon: Fuel, value: vehicle.fuel },
    { icon: Cog, value: vehicle.transmission },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[var(--shadow-elevate)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-sm">
          {vehicle.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          {vehicle.name}
        </h3>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-5">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <spec.icon className="size-4 shrink-0 text-gold" />
              <dd className="text-xs font-medium text-muted-foreground">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Price
            </p>
            <p className="text-xl font-extrabold text-gold">{vehicle.price}</p>
          </div>
          <Button asChild variant="goldOutline" size="sm">
            <a href="#contact" aria-label={`View details for ${vehicle.name}`}>
              Details <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
