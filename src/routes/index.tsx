import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { VehicleListings } from "@/components/site/VehicleListings";
import { FeaturedCarousel } from "@/components/site/FeaturedCarousel";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A&M Commercials — Quality Commercial Vehicles, Ready For Work" },
      {
        name: "description",
        content:
          "Premium commercial vehicle dealership. Carefully selected trucks, trailers, vans and plant supplied with expert support across the UK and Ireland.",
      },
      { property: "og:title", content: "A&M Commercials — Quality Commercial Vehicles" },
      {
        property: "og:description",
        content:
          "Carefully selected trucks, trailers, vans and plant, supplied with expert support from a team that understands the industry.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "A&M Commercials Ltd",
          description:
            "Premium commercial vehicle dealership supplying trucks, trailers, vans and plant.",
          telephone: "+44 (0)1925 811 188",
          email: "sales@amcommercials.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Clayton Road, Birchwood",
            addressLocality: "Warrington",
            addressCountry: "GB",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <VehicleListings />
        <FeaturedCarousel />
        <About />
        <Testimonials />
        <Gallery />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
