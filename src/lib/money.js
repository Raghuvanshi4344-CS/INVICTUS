export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function normalizeMoney(amount) {
  return Math.round(Number(amount) * 100) / 100;
}

export function splitEqual(amount, ids) {
  const list = Array.from(ids || []);
  const n = list.length || 1;
  const cents = Math.round(Number(amount) * 100);
  const base = Math.floor(cents / n);
  const remainder = cents % n;
  const shares = {};

  list.forEach((id, index) => {
    const shareCents = base + (index < remainder ? 1 : 0);
    shares[id] = shareCents / 100;
  });

  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents || {}).map(Number);
  return values.reduce((a, b) => a + b, 0) === 100;
}

export function splitByPercent(amount, percents) {
  const ids = Object.keys(percents || {});
  if (!ids.length) return {};

  const totalPct = ids.reduce((sum, id) => sum + Number(percents[id] || 0), 0) || 1;
  const cents = Math.round(Number(amount) * 100);
  const shares = {};
  let remaining = cents;

  const allocations = ids
    .map((id) => {
      const pct = Number(percents[id] || 0);
      const rawCents = (cents * pct) / totalPct;
      const shareCents = Math.floor(rawCents);
      shares[id] = shareCents / 100;
      remaining -= shareCents;
      return {
        id,
        fraction: rawCents - shareCents,
      };
    })
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; i < remaining; i += 1) {
    const id = allocations[i]?.id;
    if (!id) break;
    shares[id] = Number((Number(shares[id] || 0) + 0.01).toFixed(2));
  }

  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
