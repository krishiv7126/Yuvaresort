// Catches misspelt email providers ("gmial.com", "gmail.con") so a guest's
// typo doesn't send the resort's reply into a bounce.

const knownDomains = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.in",
  "ymail.com",
  "rediffmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "protonmail.com",
];

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return row[b.length];
}

/** The corrected address if the domain looks like a typo of a common provider, else null. */
export function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).trim().toLowerCase();
  if (!domain || knownDomains.includes(domain)) return null;

  let best: string | null = null;
  let bestScore = Infinity;
  for (const candidate of knownDomains) {
    const score = distance(domain, candidate);
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  // Short domains need a closer match so a real address (e.g. a company's
  // own domain) isn't "corrected"
  const limit = (best?.length ?? 0) <= 8 ? 1 : 2;
  return best && bestScore > 0 && bestScore <= limit ? `${local}@${best}` : null;
}
