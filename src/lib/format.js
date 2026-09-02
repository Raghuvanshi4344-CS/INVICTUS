export function formatDate(date) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
  return String(date);
}

export function dateValue(date) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.getTime();
  }
  if (typeof date === "string") {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
  }
  const value = Number(date);
  return Number.isFinite(value) ? value : 0;
}
