const extensions: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export function validImageTicket(filename: string, mimeType: string, bytes: number, kind: string) {
  const suffixes = extensions[mimeType];
  const limit = kind === "web" ? 15 * 1024 * 1024 : 50 * 1024 * 1024;
  return Boolean(
    suffixes &&
    (kind === "original" || (kind === "web" && mimeType === "image/webp")) &&
    suffixes.some((suffix) => filename.toLowerCase().endsWith(suffix)) &&
    Number.isSafeInteger(bytes) && bytes > 0 && bytes <= limit
  );
}
