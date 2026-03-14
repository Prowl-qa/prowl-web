export function formatBlogDate(date: string | Date): string {
  const value = date instanceof Date ? date : new Date(date);

  return value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
