import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * dir;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const featured = vehicles.filter((v) => v.featured);

  return (
    <section id="featured" className="border-y border-border bg-surface py-20 sm:py-28">
      <div className="container-luxe">
        <div className="reveal mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Hand-Picked</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured Vehicles
            </h2>
            <div className="gold-divider mt-5" />
          </div>
          <div className="hidden gap-3 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 border-border bg-card text-foreground hover:border-gold/50 hover:text-gold"
              onClick={() => scrollBy(-1)}
              aria-label="Previous vehicles"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 border-border bg-card text-foreground hover:border-gold/50 hover:text-gold"
              onClick={() => scrollBy(1)}
              aria-label="Next vehicles"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="reveal flex snap-x snap-mandatory gap-7 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featured.map((vehicle) => (
            <div
              key={vehicle.id}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[31%]"
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
