import DOMPurify from 'dompurify';

/**
 * Strips all HTML tags from input, returning safe plain text.
 * Use this for all user-supplied text that will be stored or displayed.
 */
export function sanitizeText(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * Sanitizes HTML, allowing only safe tags.
 * Use this only when rich text display is intentional.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}

/**
 * Sanitizes a plain object's string values recursively.
 * Use this to clean untrusted data before persisting.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeText(value);
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      (result as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  return result;
}
