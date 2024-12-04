/**
 * Reverse String
 * 
 * Write a program to reverse the given string. The program's output would
 * be a string with all characters in reverse order.
 * 
 * Questions:
 * - Will our input always be a string or do we need to handle null inputs? always a string
 * - Will our string have empty spaces and do we need to handle adjacent empty spaces in a certain way? no, reverse each character
 * 
 * Test cases:
 * - "hello world", "dlrow olleh"
 * - "aba", "aba"
 * - "ab", "ba"
 * 
 * Algos:
 * - use Two-Pointer approach:
 *      - split my string into an array
 *      - use two pointers:
 *          - "pointer1" set to the first element of the array
 *          - "pointer2" set to the last element of the array
 *      - use a loop so pointer1 and pointer2 values are swapped,
 *        then pointer1 is moved forward one position, and 
 *        pointer2 is moved backward one position
 *      - we stop our loop when pointer1 is at the same position
 *        as pointer2
 *      - return the joined array
 * 
 * Trade-offs:
 * - with Two-Pointer approach:
 *      - time-complexity: O(n), n = total number of characters in the string
 *      - space-complexity: O(n)
 * 
 */

function reverseString(str) { 
  const strArray = str.split('');

  let pointer1 = 0;
  let pointer2 = strArray.length - 1;

  while (pointer1 < pointer2) {
    [strArray[pointer1], strArray[pointer2]] = [strArray[pointer2], strArray[pointer1]];
    pointer1++;
    pointer2--;
  }

  return strArray.join('');
}

const testCases = [
  ['hello world', 'dlrow olleh'],
  ['aba', 'aba'],
  ['ab', 'ba'],
];

testCases.forEach(([input, expectedOutput]) => { 
  const result = reverseString(input);
  const passes = result === expectedOutput;

  console.log({ input, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});