// Resort details used across the site — edit here to update everywhere.

export const site = {
  name: "MESWO Riverside Resort",
  shortName: "MESWO",
  byline: "by YUVA",
  fullName: "MESWO Riverside Resort by YUVA",
  phoneDisplay: "+91 99798 89953",
  phoneHref: "tel:+919979889953",
  whatsappHref: "https://wa.me/919979889953",
  address:
    "At-Javanpura Chekdem Road, near Meswo River, Javanpura, Badodara, Talod, Gujarat 383215",
  mapsHref: "https://maps.google.com/?cid=12761338425423140161",
  // Opens turn-by-turn directions (the Google Maps app on phones)
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=23.3131093,73.0095894",
  // Keyless Google Maps embed centred on the resort
  mapEmbedSrc:
    "https://www.google.com/maps?q=MESWO+Riverside+Resort+by+YUVA&ll=23.3131093,73.0095894&z=14&output=embed",
  googleRating: "4.4",
};

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

export const stayTypes = ["Room Stay", "Day Visit", "Event / Party"] as const;
export type StayType = (typeof stayTypes)[number];

export const eventGuestRanges = ["Up to 25", "25–50", "50–100", "100–250", "250+"] as const;
