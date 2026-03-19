import {
  formatDistanceToNow,
  formatDate,
  formatForInput,
  isPast,
  isFuture,
  getDaysDifference,
} from '../../utils/dateUtils';

function dateSecondsAgo(s: number) {
  return new Date(Date.now() - s * 1000).toISOString();
}
function dateDaysAgo(d: number) {
  return new Date(Date.now() - d * 86400 * 1000).toISOString();
}
function dateMonthsAgo(m: number) {
  return new Date(Date.now() - m * 30 * 86400 * 1000).toISOString();
}
function dateYearsAgo(y: number) {
  return new Date(Date.now() - y * 365 * 86400 * 1000).toISOString();
}

describe('formatDistanceToNow', () => {
  it('returns "just now" for <60 seconds', () => {
    expect(formatDistanceToNow(dateSecondsAgo(30))).toBe('just now');
  });

  it('returns "1 minute ago" for ~1 minute', () => {
    expect(formatDistanceToNow(dateSecondsAgo(65))).toBe('1 minute ago');
  });

  it('returns plural minutes', () => {
    expect(formatDistanceToNow(dateSecondsAgo(180))).toBe('3 minutes ago');
  });

  it('returns "1 hour ago" for ~1 hour', () => {
    expect(formatDistanceToNow(dateSecondsAgo(3700))).toBe('1 hour ago');
  });

  it('returns plural hours', () => {
    expect(formatDistanceToNow(dateSecondsAgo(7400))).toBe('2 hours ago');
  });

  it('returns "1 day ago" for ~1 day', () => {
    expect(formatDistanceToNow(dateDaysAgo(1))).toBe('1 day ago');
  });

  it('returns plural days', () => {
    expect(formatDistanceToNow(dateDaysAgo(5))).toBe('5 days ago');
  });

  it('returns "1 month ago" for ~1 month', () => {
    expect(formatDistanceToNow(dateDaysAgo(31))).toBe('1 month ago');
  });

  it('returns plural months', () => {
    expect(formatDistanceToNow(dateMonthsAgo(3))).toBe('3 months ago');
  });

  it('returns "1 year ago" for ~1 year', () => {
    expect(formatDistanceToNow(dateYearsAgo(1))).toBe('1 year ago');
  });

  it('returns plural years', () => {
    expect(formatDistanceToNow(dateYearsAgo(3))).toBe('3 years ago');
  });
});

describe('formatDate', () => {
  it('formats a date string to readable form', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('2024');
    expect(result).toContain('Jan');
  });

  it('accepts custom options', () => {
    const result = formatDate('2024-06-01', { year: 'numeric', month: 'long' });
    expect(result).toContain('2024');
  });
});

describe('formatForInput', () => {
  it('returns yyyy-mm-dd format', () => {
    const result = formatForInput('2024-03-15T12:00:00.000Z');
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('isPast', () => {
  it('returns true for a past date', () => {
    expect(isPast('2020-01-01')).toBe(true);
  });

  it('returns false for a future date', () => {
    expect(isPast('2099-01-01')).toBe(false);
  });
});

describe('isFuture', () => {
  it('returns true for a future date', () => {
    expect(isFuture('2099-01-01')).toBe(true);
  });

  it('returns false for a past date', () => {
    expect(isFuture('2020-01-01')).toBe(false);
  });
});

describe('getDaysDifference', () => {
  it('returns 0 for the same date', () => {
    expect(getDaysDifference('2024-01-01', '2024-01-01')).toBe(0);
  });

  it('returns correct days between two dates', () => {
    expect(getDaysDifference('2024-01-01', '2024-01-11')).toBe(10);
  });

  it('is symmetric (order does not matter)', () => {
    const a = getDaysDifference('2024-01-01', '2024-01-11');
    const b = getDaysDifference('2024-01-11', '2024-01-01');
    expect(a).toBe(b);
  });
});
