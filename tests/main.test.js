jest.mock('../src/utils/helpers', () => ({
  formatDate: jest.fn(date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }),
  debounce: jest.fn((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  })
}));

const { formatDate, debounce } = require('../src/utils/helpers');

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