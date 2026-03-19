import { sanitizeText, sanitizeHtml, sanitizeObject } from '../../utils/sanitize';

describe('sanitize utils', () => {
  describe('sanitizeText', () => {
    it('returns plain text unchanged', () => {
      expect(sanitizeText('Hello World')).toBe('Hello World');
    });

    it('strips HTML tags', () => {
      expect(sanitizeText('<b>bold</b>')).toBe('bold');
    });

    it('strips script tags and content', () => {
      const result = sanitizeText('<script>alert("xss")</script>');
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert');
    });

    it('strips attributes', () => {
      const result = sanitizeText('<a href="evil.com">link</a>');
      expect(result).toBe('link');
    });

    it('returns empty string for empty input', () => {
      expect(sanitizeText('')).toBe('');
    });

    it('handles nested HTML tags', () => {
      expect(sanitizeText('<div><p><b>text</b></p></div>')).toBe('text');
    });
  });

  describe('sanitizeHtml', () => {
    it('allows safe tags like <b>', () => {
      const result = sanitizeHtml('<b>bold</b>');
      expect(result).toContain('bold');
    });

    it('strips script tags', () => {
      const result = sanitizeHtml('<script>alert(1)</script>safe');
      expect(result).not.toContain('<script>');
      expect(result).toContain('safe');
    });

    it('returns empty string for empty input', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('passes through plain text', () => {
      expect(sanitizeHtml('plain text')).toBe('plain text');
    });
  });

  describe('sanitizeObject', () => {
    it('sanitizes string values', () => {
      const result = sanitizeObject({ name: '<b>Omar</b>', age: 30 } as unknown as Record<
        string,
        unknown
      >);
      expect(result.name).toBe('Omar');
      expect(result.age).toBe(30);
    });

    it('leaves non-string primitives unchanged', () => {
      const input = { count: 5, flag: true, value: null } as unknown as Record<string, unknown>;
      const result = sanitizeObject(input);
      expect(result.count).toBe(5);
      expect(result.flag).toBe(true);
      expect(result.value).toBeNull();
    });

    it('recursively sanitizes nested objects', () => {
      const input = { outer: { inner: '<script>xss</script>' } } as unknown as Record<
        string,
        unknown
      >;
      const result = sanitizeObject(input) as { outer: { inner: string } };
      expect(result.outer.inner).not.toContain('<script>');
    });

    it('does not mutate the original object', () => {
      const input = { name: '<b>test</b>' };
      sanitizeObject(input);
      expect(input.name).toBe('<b>test</b>');
    });

    it('handles empty object', () => {
      expect(sanitizeObject({})).toEqual({});
    });

    it('skips array values (does not recurse into arrays)', () => {
      const input = { tags: ['<b>tag</b>', 'normal'] } as unknown as Record<string, unknown>;
      const result = sanitizeObject(input) as { tags: string[] };
      // Arrays are not recursed, should remain unchanged
      expect(result.tags).toEqual(['<b>tag</b>', 'normal']);
    });
  });
});
