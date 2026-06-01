import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaImg from "@/assets/cta.jpg";

export function CtaBanner() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <img
        src={ctaImg}
        alt="Black tractor unit at night"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />

      <div className="container-luxe relative z-10">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Ready When You Are</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Find your next vehicle with{" "}
            <span className="text-gold">A&amp;M Commercials</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Speak to our team today for honest advice, competitive finance and
            stock prepared to the highest standard.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <a href="tel:+441925811188">
                <Phone className="size-4" /> Call +44 (0)1925 811 188
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="mailto:sales@amcommercials.com">
                Email Our Team <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
