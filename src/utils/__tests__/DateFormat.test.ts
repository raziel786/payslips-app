import { formatDate, formatPeriod } from '../../utils/DateFormat';

describe('Given the formatPeriod function', () => {
  test('Then it should correctly format a valid period from two valid ISO dates', () => {
    const fromIso = '2025-01-01T00:00:00Z';
    const toIso = '2025-01-31T00:00:00Z';
    const formattedPeriod = formatPeriod(fromIso, toIso);
    expect(formattedPeriod).toBe('1 Jan 2025 – 31 Jan 2025');
  });

  test('Then it should return the original date string when the from date is invalid', () => {
    const fromIso = 'invalid-date';
    const toIso = '2025-01-31T00:00:00Z';
    const formattedPeriod = formatPeriod(fromIso, toIso);
    expect(formattedPeriod).toBe('invalid-date – 31 Jan 2025');
  });

  test('Then it should return the original date string when the to date is invalid', () => {
    const fromIso = '2025-01-01T00:00:00Z';
    const toIso = 'invalid-date';
    const formattedPeriod = formatPeriod(fromIso, toIso);
    expect(formattedPeriod).toBe('1 Jan 2025 – invalid-date');
  });

  test('Then it should return the original date strings when both dates are invalid', () => {
    const fromIso = 'invalid-date';
    const toIso = 'invalid-date';
    const formattedPeriod = formatPeriod(fromIso, toIso);
    expect(formattedPeriod).toBe('invalid-date – invalid-date');
  });
});

describe('Given the formatDate function', () => {
  test('Then it should format a valid ISO date correctly', () => {
    const isoDate = '2025-01-01T00:00:00Z';
    const formattedDate = formatDate(isoDate);
    expect(formattedDate).toBe('1 Jan 2025');
  });

  test('Then it should return the original date string when the date is invalid', () => {
    const invalidDate = 'invalid-date';
    const formattedDate = formatDate(invalidDate);
    expect(formattedDate).toBe(invalidDate);
  });

  test('Then it should format another valid ISO date correctly', () => {
    const isoDate = '2025-12-31T23:59:59Z';
    const formattedDate = formatDate(isoDate);
    expect(formattedDate).toBe('31 Dec 2025');
  });
});
