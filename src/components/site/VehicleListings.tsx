import { vehicles } from "@/data/vehicles";
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";

export function VehicleListings() {
  return (
    <section id="stock" className="py-20 sm:py-28">
      <div className="container-luxe">
        <div className="reveal mb-14 flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <p className="eyebrow">Latest Arrivals</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Available Inventory
            </h2>
            <div className="gold-divider mt-5" />
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Every vehicle is inspected, fully documented and prepared to the
            highest standard before it reaches our forecourt.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, i) => (
            <div
              key={vehicle.id}
              className="reveal h-full"
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>

        <div className="reveal mt-14 text-center">
          <Button asChild variant="gold" size="xl">
            <a href="#contact">View All Stock</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
