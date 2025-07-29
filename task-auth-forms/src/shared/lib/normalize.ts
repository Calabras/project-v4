export function normalizeBirthDate(date?: string) {
  // На форму приходит YYYY-MM-DD (или пусто)
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
  // Отправляем ISO: 2002-02-05T00:00:00.000Z
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}