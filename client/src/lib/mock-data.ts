export type MaterialType = 
  | "Plastic (PET)"
  | "Plastic (HDPE)"
  | "Glass (Clear)"
  | "Glass (Colored)"
  | "Metal (Aluminum)"
  | "Metal (Steel)"
  | "Paper/Cardboard"
  | "E-Waste"
  | "Organic";

export interface RecyclerMaterial {
  id: string;
  type: MaterialType;
  pricePerKg: number; // in local currency
}

export interface Recycler {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  materials: RecyclerMaterial[];
  acceptingMore: boolean;
  methods: string[]; // "Drop-off", "Pickup", "Buy-back"
  description?: string;
  image?: string;
  verified: boolean;
  capacityStatus: 'low' | 'medium' | 'high';
}

export const MATERIALS: MaterialType[] = [
  "Plastic (PET)", "Plastic (HDPE)", "Glass (Clear)", "Glass (Colored)", 
  "Metal (Aluminum)", "Metal (Steel)", "Paper/Cardboard", "E-Waste", "Organic"
];

export const MOCK_RECYCLERS: Recycler[] = [
  {
    id: "1",
    name: "GreenCycle Hub",
    address: "123 Eco Lane, Green City",
    lat: 40.7128,
    lng: -74.0060,
    phone: "+1 555-0101",
    materials: [
      { id: "m1", type: "Plastic (PET)", pricePerKg: 0.5 },
      { id: "m2", type: "Metal (Aluminum)", pricePerKg: 1.2 },
    ],
    acceptingMore: true,
    methods: ["Drop-off", "Buy-back"],
    description: "Central processing facility for household plastics and metals. Best prices for clean PET bottles.",
    verified: true,
    capacityStatus: 'medium'
  },
  {
    id: "2",
    name: "Urban Reclaimers",
    address: "45 Industrial Blvd, Sector 7",
    lat: 40.7282,
    lng: -73.9942,
    phone: "+1 555-0102",
    materials: [
      { id: "m3", type: "E-Waste", pricePerKg: 5.0 },
      { id: "m4", type: "Metal (Steel)", pricePerKg: 0.8 },
    ],
    acceptingMore: false,
    methods: ["Drop-off"],
    description: "Specialized in electronics and heavy metals. Currently full capacity for large appliances.",
    verified: true,
    capacityStatus: 'high'
  },
  {
    id: "3",
    name: "PaperLoop Solutions",
    address: "88 Cardboard Ave, Westside",
    lat: 40.7589,
    lng: -73.9851,
    phone: "+1 555-0103",
    materials: [
      { id: "m5", type: "Paper/Cardboard", pricePerKg: 0.15 },
    ],
    acceptingMore: true,
    methods: ["Pickup", "Drop-off"],
    description: "We recycle all grades of paper. Bulk pickup available for businesses.",
    verified: false,
    capacityStatus: 'low'
  },
  {
    id: "4",
    name: "Glass Guardians",
    address: "99 Crystal Way, North End",
    lat: 40.7829,
    lng: -73.9654,
    materials: [
      { id: "m6", type: "Glass (Clear)", pricePerKg: 0.1 },
      { id: "m7", type: "Glass (Colored)", pricePerKg: 0.05 },
    ],
    acceptingMore: true,
    methods: ["Drop-off"],
    description: "Dedicated glass recycling facility. Please separate by color.",
    verified: true,
    capacityStatus: 'low'
  },
  {
    id: "5",
    name: "Compost Community",
    address: "12 Garden Path, Suburbs",
    lat: 40.6782,
    lng: -73.9442,
    materials: [
      { id: "m8", type: "Organic", pricePerKg: 0 },
    ],
    acceptingMore: true,
    methods: ["Drop-off"],
    description: "Community compost site. No meat or dairy products accepted.",
    verified: false,
    capacityStatus: 'low'
  },
  {
    id: "6",
    name: "Total Scrap Co.",
    address: "200 Ironworks Rd, Industrial District",
    lat: 40.7428,
    lng: -73.9160,
    phone: "+1 555-0106",
    materials: [
      { id: "m9", type: "Metal (Steel)", pricePerKg: 0.75 },
      { id: "m10", type: "Metal (Aluminum)", pricePerKg: 1.1 },
      { id: "m11", type: "Plastic (HDPE)", pricePerKg: 0.4 },
    ],
    acceptingMore: false,
    methods: ["Buy-back", "Pickup"],
    description: "Large scale scrap yard. We buy everything metal.",
    verified: true,
    capacityStatus: 'high'
  }
];

// Haversine formula for distance
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(1));
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
