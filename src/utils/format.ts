export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 100_000) return `${(n / 100_000).toFixed(1)}K`;
  return n.toString();
}

export function formatMoney(n: number): string {
  return `$${formatNumber(n)}`;
}
