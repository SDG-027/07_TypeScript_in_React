import { test, expect } from 'vitest';
import { awesum } from './easy_peasy.ts';

test('should return "awe20"', () => {
  // Arrange
  const a = 13;
  const b = 7;
  const expected = `awe20`;
  // Act
  const actual = awesum(a, b);

  // Assert
  expect(actual).toBe(expected);
});

test(' should return awesome sum ', () => {
  // Arrange
  const testTable = [
    { a: 13, b: 7, exp: 'awe20' },
    { a: 7, b: 13, exp: 'awe20' },
    { a: 7, b: -13, exp: 'awe-6' },
  ];

  for (const { a, b, exp } of testTable) {
    // Act
    const actual = awesum(a, b);

    // Assert
    expect(actual).toBe(exp);
  }
});
