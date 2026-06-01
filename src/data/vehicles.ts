import vehicle1 from "@/assets/vehicle-1.jpg";
import vehicle2 from "@/assets/vehicle-2.jpg";
import vehicle3 from "@/assets/vehicle-3.jpg";
import vehicle4 from "@/assets/vehicle-4.jpg";
import vehicle5 from "@/assets/vehicle-5.jpg";
import vehicle6 from "@/assets/vehicle-6.jpg";

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
  featured?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "fh-540",
    name: "Volvo FH 540 Globetrotter",
    type: "Tractor Unit",
    year: 2021,
    mileage: "412,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    price: "£58,950",
    image: vehicle1,
    featured: true,
  },
  {
    id: "scania-r450",
    name: "Scania R450 Curtainsider",
    type: "Tractor & Trailer",
    year: 2020,
    mileage: "498,500 km",
    fuel: "Diesel",
    transmission: "Automatic",
    price: "£62,500",
    image: vehicle3,
    featured: true,
  },
  {
    id: "daf-lf260",
    name: "DAF LF 260 Box Rigid",
    type: "Rigid Truck",
    year: 2019,
    mileage: "286,300 km",
    fuel: "Diesel",
    transmission: "Manual",
    price: "£34,750",
    image: vehicle2,
    featured: true,
  },
  {
    id: "man-tgs",
    name: "MAN TGS 35.420 Tipper",
    type: "Tipper",
    year: 2022,
    mileage: "164,900 km",
    fuel: "Diesel",
    transmission: "Automatic",
    price: "£71,995",
    image: vehicle5,
    featured: true,
  },
  {
    id: "merc-sprinter",
    name: "Mercedes-Benz Sprinter 314",
    type: "Panel Van",
    year: 2021,
    mileage: "92,400 km",
    fuel: "Diesel",
    transmission: "Manual",
    price: "£21,450",
    image: vehicle4,
    featured: true,
  },
  {
    id: "cat-320",
    name: "CAT 320 Tracked Excavator",
    type: "Plant",
    year: 2020,
    mileage: "5,200 hrs",
    fuel: "Diesel",
    transmission: "Hydrostatic",
    price: "£84,000",
    image: vehicle6,
    featured: true,
  },
];

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
