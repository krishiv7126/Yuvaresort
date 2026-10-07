// Resort details used across the site — edit here to update everywhere.
// Source: details sent by the resort (Sep 2026) + its Google Business listing.

export const site = {
  name: "MESWO Riverside Resort",
  shortName: "MESWO",
  byline: "by YUVA",
  fullName: "MESWO Riverside Resort by YUVA",
  tagline: "Experience the Nature",
  managedBy: "YUVA Tours — Ek Anubhav",
  phoneDisplay: "+91 99798 89953",
  phoneHref: "tel:+919979889953",
  phone2Display: "+91 92650 89953",
  phone2Href: "tel:+919265089953",
  whatsappHref: "https://wa.me/919979889953",
  instagramHandle: "meswo_riversideresort_yuva",
  instagramHref: "https://www.instagram.com/meswo_riversideresort_yuva/",
  address:
    "At Javanpura, Near Javanpura Check Dam, Prantij Road, Near Talod, Gujarat 383215",
  fromCity: "Just 45 minutes from Ahmedabad",
  mapsHref: "https://maps.google.com/?cid=12761338425423140161",
  // Opens turn-by-turn directions (the Google Maps app on phones)
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=23.3131093,73.0095894",
  // Keyless Google Maps embed centred on the resort
  mapEmbedSrc:
    "https://www.google.com/maps?q=MESWO+Riverside+Resort+by+YUVA&ll=23.3131093,73.0095894&z=14&output=embed",
  googleRating: "4.4",
  rooms: 3,
  checkIn: "12 PM",
  checkOut: "10 AM",
  // As sent by the resort: "No cancellation Policy before 48 Hours cancellation"
  cancellation: "No cancellation within 48 hours of your visit.",
  geo: { lat: 23.3131093, lng: 73.0095894 },
  locality: "Talod",
  region: "Gujarat",
  postalCode: "383215",
  fromHimmatnagar: "Under an hour from Himmatnagar",
};

// Live address of the site, used for canonical URLs, the sitemap and social
// previews. Set NEXT_PUBLIC_SITE_URL once the custom domain is live; until
// then Vercel's production URL is used.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// Towns people search from — used in page copy and search metadata
export const nearbyCities = ["Ahmedabad", "Himmatnagar", "Gandhinagar", "Talod", "Prantij"] as const;

// Other ways people write the resort's name (incl. the common "Meshwo"
// misspelling) — used only in structured data, so the brand on the page
// stays "MESWO Riverside Resort"
export const brandAliases = [
  "MESWO Riverside Resort by YUVA",
  "Meswo Riverside Resort",
  "MESWO Resort",
  "Meswo Resort Talod",
  "Meshwo Riverside Resort",
  "Meshwo Resort",
] as const;

export const seoKeywords = [
  "MESWO Riverside Resort",
  "Meswo Riverside Resort Talod",
  "Meswo resort",
  "Meshwo riverside resort",
  "MESWO Riverside Resort by YUVA",
  "resort near Ahmedabad",
  "resort near Himmatnagar",
  "resort in Himmatnagar",
  "riverside resort Gujarat",
  "resort near Talod",
  "resort near Prantij",
  "resort near Gandhinagar",
  "one day picnic near Ahmedabad",
  "day picnic resort near Ahmedabad",
  "picnic spot near Himmatnagar",
  "water park resort near Ahmedabad",
  "resort with swimming pool near Ahmedabad",
  "weekend getaway near Ahmedabad",
  "birthday party venue near Ahmedabad",
  "corporate picnic near Ahmedabad",
  "pre-wedding shoot location near Ahmedabad",
  "YUVA resort",
];

export const packages = {
  dayPicnic: {
    name: "One Day Picnic",
    adult: 1150,
    child: 950,
    hours: "9:00 AM – 6:00 PM",
    includes: "Breakfast to hi-tea",
  },
  nightStay: {
    name: "Night Stay",
    perRoom: 5500,
    room: "Specially designed Heritage Suite room",
  },
};

// Everything the resort lists as amenities & activities
export const amenities = [
  "Swimming pool",
  "Baby pool",
  "Rain dance",
  "DJ dance",
  "Zip-line",
  "Adventure activities",
  "Outdoor activities",
  "Team building games",
  "Garden games",
  "Indoor games",
  "Children's play area",
  "Nature walk",
  "Riverside sit-out",
  "Photoshoot point",
] as const;

// Events the resort hosts (from its Google Business profile)
export const occasions = [
  "Birthday Party",
  "Anniversary Party",
  "Pool Party",
  "Kitty Party",
  "Corporate Party",
  "Get-Togethers",
  "Wedding Destination",
  "Pre-Wedding Destination",
  "Party Plots",
  "Farm",
] as const;

export const stayTypes = ["Night Stay", "Day Picnic", "Event / Party"] as const;
export type StayType = (typeof stayTypes)[number];
// Only the night stay needs a check-out date; picnics and events are single-day
export const isSingleDay = (type: string) => type !== "Night Stay";

export const eventGuestRanges = ["Up to 25", "25–50", "50–100", "100–250", "250+"] as const;
