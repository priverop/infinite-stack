export function formatNumber(n: number): string {
  if (n < 1000) return n.toString();
  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];
  const unit = units.find((u) => n >= u.value)!;
  const scaled = n / unit.value;
  const str =
    scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2);
  return `${parseFloat(str)}${unit.symbol}`;
}

export function formatMoney(n: number): string {
  return `$${formatNumber(n)}`;
}
