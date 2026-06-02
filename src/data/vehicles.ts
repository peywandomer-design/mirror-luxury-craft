export interface Vehicle {
  id: string;
  name: string;
  type: string;
  year: number | null;
  mileage: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
  featured: boolean;
  sort_order: number;
}

export const categories = [
  { label: "Tractor Units", count: 86 },
  { label: "Rigids", count: 54 },
  { label: "Trailers", count: 42 },
  { label: "Tippers", count: 23 },
  { label: "Plant", count: 31 },
  { label: "Vans", count: 47 },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "James Harrington",
    role: "Fleet Manager, Northline Haulage",
    quote:
      "From first enquiry to keys in hand, the team were faultless. The truck was prepped to an immaculate standard and delivered ahead of schedule.",
    rating: 5,
    initials: "JH",
  },
  {
    name: "Sofia Marchetti",
    role: "Director, Marchetti Logistics",
    quote:
      "We've sourced three units here now. Honest advice, transparent history files and the finance side was handled seamlessly. Genuinely premium service.",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Daniel O'Brien",
    role: "Owner Operator",
    quote:
      "Export to Ireland was effortless. They handled the shipping paperwork end to end and kept me updated the whole way. Couldn't recommend higher.",
    rating: 5,
    initials: "DO",
  },
  {
    name: "Priya Nair",
    role: "Operations Lead, Vantage Freight",
    quote:
      "The quality of the inventory is a cut above. Every vehicle felt hand-picked. This is how buying commercial vehicles should feel.",
    rating: 5,
    initials: "PN",
  },
];
