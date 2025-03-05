export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove non-word characters
    .replace(/--+/g, "-"); // Replace multiple dashes with single dash
}