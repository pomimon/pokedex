export const getFlavorText = (speciesData: any): string | null => {
  const entry = speciesData.flavor_text_entries.find(
    (e: any) => e.language.name === "en",
  );

  // Replace form-feeds with regular spaces - because Poké API...
  return entry ? entry.flavor_text.replace(/\f/g, " ") : null;
};
