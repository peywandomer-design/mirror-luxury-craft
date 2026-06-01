import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Stock", href: "#stock" },
  { label: "Featured", href: "#featured" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/85 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="container-luxe flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+441925811188"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-gold md:flex"
          >
            <Phone className="size-4 text-gold" />
            +44 (0)1925 811 188
          </a>
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Contact Us</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="min-h-11 min-w-11 border-border bg-card/40 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-border bg-surface text-foreground"
            >
              <div className="mb-10 mt-2">
                <Logo />
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="border-b border-border py-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button asChild variant="gold" className="mt-8 w-full">
                  <a href="#contact">Contact Us</a>
                </Button>
              </SheetClose>
              <a
                href="tel:+441925811188"
                className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                <Phone className="size-4 text-gold" />
                +44 (0)1925 811 188
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
