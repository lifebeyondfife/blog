import { formatDate, debounce } from '../src/utils/helpers';

describe('Helper functions', () => {
  describe('formatDate', () => {
    test('formats date correctly', () => {
      const testDate = new Date('2023-01-01');
      expect(formatDate(testDate)).toBeTruthy();
      expect(typeof formatDate(testDate)).toBe('string');
    });
  });

  describe('debounce', () => {
    test('debounce calls function only once within time period', () => {
      jest.useFakeTimers();
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      jest.runAllTimers();

      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});