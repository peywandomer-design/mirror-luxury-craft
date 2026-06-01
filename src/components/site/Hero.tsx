import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Fleet of premium commercial trucks at dusk"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />

      <div className="container-luxe relative z-10 flex flex-col items-center text-center">
        <p
          className="eyebrow animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Established Commercial Vehicle Specialists
        </p>

        <h1
          className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground animate-fade-up sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          Quality commercial vehicles,{" "}
          <span className="text-gold">ready for work</span>
        </h1>

        <p
          className="mt-7 max-w-2xl text-base text-muted-foreground animate-fade-up sm:text-lg"
          style={{ animationDelay: "0.35s" }}
        >
          Carefully selected trucks, trailers, vans and plant — supplied with
          expert support from a team that understands the industry.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-4 animate-fade-up sm:flex-row"
          style={{ animationDelay: "0.5s" }}
        >
          <Button asChild variant="gold" size="xl">
            <a href="#stock">View Our Stock</a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#contact">Speak To Our Team</a>
          </Button>
        </div>
      </div>

      <a
        href="#stock"
        aria-label="Scroll to stock"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-gold"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </a>
    </section>
  );
}
