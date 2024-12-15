import { sum } from '@utils/index';
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(1);
  expect(sum(2, 2)).toBe(4);
});
