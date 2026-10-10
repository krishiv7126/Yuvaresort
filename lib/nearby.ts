import { site } from "@/lib/site";

// Towns within ~150 km that guests drive in from. Coordinates are each town's
// centre; distances are worked out from the resort's map pin, so they stay
// honest ("as the crow flies") rather than guessed drive times.
const towns = [
  { name: "Talod", district: "Sabarkantha", lat: 23.35, lng: 72.95 },
  { name: "Prantij", district: "Sabarkantha", lat: 23.438, lng: 72.857 },
  { name: "Bayad", district: "Aravalli", lat: 23.22, lng: 73.22 },
  { name: "Dehgam", district: "Gandhinagar", lat: 23.168, lng: 72.81 },
  { name: "Himmatnagar", district: "Sabarkantha", lat: 23.598, lng: 72.966 },
  { name: "Modasa", district: "Aravalli", lat: 23.4625, lng: 73.2985 },
  { name: "Kapadvanj", district: "Kheda", lat: 23.02, lng: 73.07 },
  { name: "Vijapur", district: "Mehsana", lat: 23.56, lng: 72.75 },
  { name: "Gandhinagar", district: "Gandhinagar", lat: 23.2156, lng: 72.6369 },
  { name: "Ahmedabad", district: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Idar", district: "Sabarkantha", lat: 23.84, lng: 73.0 },
  { name: "Kalol", district: "Gandhinagar", lat: 23.246, lng: 72.5 },
  { name: "Shamlaji", district: "Aravalli", lat: 23.69, lng: 73.385 },
  { name: "Lunawada", district: "Mahisagar", lat: 23.128, lng: 73.61 },
  { name: "Visnagar", district: "Mehsana", lat: 23.698, lng: 72.548 },
  { name: "Nadiad", district: "Kheda", lat: 22.6916, lng: 72.8634 },
  { name: "Kadi", district: "Mehsana", lat: 23.3, lng: 72.33 },
  { name: "Mehsana", district: "Mehsana", lat: 23.588, lng: 72.369 },
  { name: "Sanand", district: "Ahmedabad", lat: 22.99, lng: 72.38 },
  { name: "Unjha", district: "Mehsana", lat: 23.8, lng: 72.39 },
  { name: "Anand", district: "Anand", lat: 22.5645, lng: 72.9289 },
  { name: "Godhra", district: "Panchmahal", lat: 22.7788, lng: 73.6143 },
  { name: "Patan", district: "Patan", lat: 23.8493, lng: 72.1266 },
  { name: "Vadodara", district: "Vadodara", lat: 22.3072, lng: 73.1812 },
  { name: "Palanpur", district: "Banaskantha", lat: 24.1725, lng: 72.4381 },
] as const;

function kmBetween(lat1: number, lng1: number, lat2: number, lng2: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

export type NearbyTown = {
  name: string;
  district: string;
  km: number;
  directionsHref: string;
};

export const nearbyTowns: NearbyTown[] = towns
  .map((t) => ({
    name: t.name,
    district: t.district,
    km: Math.max(1, Math.round(kmBetween(t.lat, t.lng, site.geo.lat, site.geo.lng))),
    directionsHref: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      `${t.name}, Gujarat`
    )}&destination=${site.geo.lat},${site.geo.lng}`,
  }))
  .sort((a, b) => a.km - b.km);
