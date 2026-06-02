import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

import { Logo } from "./Logo";

const columns = [
  {
    title: "Inventory",
    links: ["Tractor Units", "Rigids", "Trailers", "Tippers", "Plant", "Vans"],
  },
  {
    title: "Company",
    links: ["About Us", "We Buy Trucks", "Export & Shipping", "Finance", "Vacancies", "Reviews"],
  },
];

const branches = [
  { label: "UK Branch", phone: "+44 (0)1925 811 188" },
  { label: "NI Branch", phone: "+44 (0)28 3753 8532" },
  { label: "ROI Branch", phone: "+353 (0)47 85908" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-luxe py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              Quality commercial vehicles, ready for work — supplied with expert
              support across the UK and Ireland.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#stock"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Get In Touch
            </h3>
            <ul className="mt-5 space-y-4">
              {branches.map((b) => (
                <li key={b.label} className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {b.label}
                    </span>
                    <a
                      href={`tel:${b.phone.replace(/[^+\d]/g, "")}`}
                      className="text-sm text-foreground transition-colors hover:text-gold"
                    >
                      {b.phone}
                    </a>
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a
                  href="mailto:sales@amcommercials.com"
                  className="text-sm text-foreground transition-colors hover:text-gold"
                >
                  sales@amcommercials.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="text-sm text-muted-foreground">
                  Clayton Road, Birchwood, Warrington
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} A&amp;M Commercials Ltd. All rights reserved.</p>
          <p className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
