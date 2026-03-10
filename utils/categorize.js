function categorize(title) {

  const text = title.toLowerCase();

  if (text.includes("ai")) return "AI";
  if (text.includes("startup")) return "startup";
  if (text.includes("open")) return "open-source";

  return "technology";
}

module.exports = categorize;