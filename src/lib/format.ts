/**
 * Capitalize the first letter of a string
 * Example: "pikachu" -> "Pikachu"
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format Pokemon ID with leading zeros
 * Example: 1 -> "#001", 25 -> "#025", 151 -> "#151"
 */
export function formatId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}
