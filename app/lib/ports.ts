export interface BunkerPort {
  slug: string;
  name: string;
  city: string;
  country: string;
  region: string;
  coordinates: { lat: number; lng: number };
}

/**
 * Port guide locations only. These records intentionally do not assert port
 * rankings, annual volumes, local mandates, or product availability. Check
 * current requirements with the relevant authority and survey stakeholders.
 */
export const BUNKER_PORTS: Record<string, BunkerPort> = {
  singapore: {
    slug: "singapore",
    name: "Port of Singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Southeast Asia",
    coordinates: { lat: 1.29027, lng: 103.851959 },
  },
  rotterdam: {
    slug: "rotterdam",
    name: "Port of Rotterdam",
    city: "Rotterdam",
    country: "Netherlands",
    region: "Northwest Europe",
    coordinates: { lat: 51.92442, lng: 4.477733 },
  },
  fujairah: {
    slug: "fujairah",
    name: "Port of Fujairah",
    city: "Fujairah",
    country: "United Arab Emirates",
    region: "Gulf of Oman",
    coordinates: { lat: 25.12881, lng: 56.326484 },
  },
  houston: {
    slug: "houston",
    name: "Port of Houston",
    city: "Houston, Texas",
    country: "United States",
    region: "US Gulf Coast",
    coordinates: { lat: 29.7604, lng: -95.3698 },
  },
  piraeus: {
    slug: "piraeus",
    name: "Port of Piraeus",
    city: "Piraeus",
    country: "Greece",
    region: "Mediterranean",
    coordinates: { lat: 37.94299, lng: 23.64698 },
  },
  shanghai: {
    slug: "shanghai",
    name: "Port of Shanghai & Zhoushan",
    city: "Shanghai / Zhoushan",
    country: "China",
    region: "East Asia",
    coordinates: { lat: 31.2304, lng: 121.4737 },
  },
};

export const ALL_PORTS = Object.values(BUNKER_PORTS);
