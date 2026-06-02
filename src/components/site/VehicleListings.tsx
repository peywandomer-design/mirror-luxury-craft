import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/hooks/use-vehicles";

export function VehicleListings() {
  const { data: vehicles = [], isLoading } = useVehicles();

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

        {isLoading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[420px] animate-pulse rounded-xl border border-border bg-card"
              />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            No vehicles in stock right now. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="h-full">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        )}

        <div className="reveal mt-14 text-center">
          <Button asChild variant="gold" size="xl">
            <a href="#contact">View All Stock</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
