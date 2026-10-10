import { amenities, occasions, packages, site } from "@/lib/site";
import { nearbyTowns } from "@/lib/nearby";

// Questions people actually type into Google ("resort near me with pool",
// "one day picnic price near Ahmedabad"). Every answer is built from the
// resort's own details in lib/site.ts, so changing a price there updates here.

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const km = (town: string) => nearbyTowns.find((t) => t.name === town)?.km;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: `Where is ${site.name}?`,
    a: `${site.name} is on the banks of the Meswo river at ${site.address}. It is near Talod and Prantij in Sabarkantha — ${site.fromCity.toLowerCase()} and under an hour from Himmatnagar.`,
  },
  {
    q: "Is there a resort near Ahmedabad, Gandhinagar or Himmatnagar for a one day picnic?",
    a: `Yes. ${site.name} is about ${km("Ahmedabad")} km from Ahmedabad, ${km("Gandhinagar")} km from Gandhinagar and ${km("Himmatnagar")} km from Himmatnagar (straight-line). Day picnics run ${packages.dayPicnic.hours} with ${packages.dayPicnic.includes.toLowerCase()}.`,
  },
  {
    q: "What is the one day picnic price?",
    a: `The ${packages.dayPicnic.name} is ${inr(packages.dayPicnic.adult)} per adult and ${inr(packages.dayPicnic.child)} per child, ${packages.dayPicnic.hours}, with ${packages.dayPicnic.includes.toLowerCase()}.`,
  },
  {
    q: "Does the resort have a swimming pool?",
    a: "Yes — there is a swimming pool, a separate baby pool for small children, and a rain dance with DJ.",
  },
  {
    q: "What activities are there?",
    a: `${amenities.join(", ")}.`,
  },
  {
    q: "Can we stay overnight? What is the room price?",
    a: `Yes. The ${packages.nightStay.name} is ${inr(packages.nightStay.perRoom)} per ${packages.nightStay.room.toLowerCase()}. There are only ${site.rooms} Heritage Suites, so booking early is best. Check-in is ${site.checkIn} and check-out ${site.checkOut}.`,
  },
  {
    q: "Can we book the resort for a birthday, corporate picnic or wedding?",
    a: `Yes. The resort hosts ${occasions
      .slice(0, 7)
      .map((o) => o.toLowerCase())
      .join(", ")} and more. Send an inquiry with your date and guest count.`,
  },
  {
    q: "Is it good for families with kids?",
    a: `Yes — there is a baby pool, a children's play area, garden and indoor games, and a lower child price of ${inr(packages.dayPicnic.child)} for the day picnic.`,
  },
  {
    q: "How do I book?",
    a: `Call ${site.phoneDisplay} or ${site.phone2Display}, message on WhatsApp, or send your dates through the inquiry form on this website and the resort will reply with availability.`,
  },
  {
    q: "What is the cancellation policy?",
    a: site.cancellation,
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
