/**
 * 
 * Questions:
 * - do we consider an empty string a palindrome?
 * - do we consider a single character string a palindrome?
 * 
 * Algos:
 * - use two-pointers strategy, one pointer starts at the first element
 * of the string array, the second pointer starts at the last element
 * of the string array.
 * 
 * - we compare the element at first pointer and second pointer
 *    - if elements are not equal, we return false
 *    - if elements are equal, we move the first pointer forward by one
 *      and move the second pointer backward by one
 *    - then compare elements again
 * - we continue to follow this sequence until the first pointer has
 * passed the second pointer
 * - we return true since we didn't find any mismatched elements
 * 
 * Tradeoffs:
 *   - space-complexity: O(1)
 *   - time-complexity: O(n)
 */


function isPalindrome(str) {
    if (str.length === 0) {
        return false;
    }

    let ptr1 = 0;
    let ptr2 = str.length - 1;

    while (ptr1 < ptr2) {

        if (str[ptr1] !== str[ptr2]) {
            return false;
        }

        ptr1++;
        ptr2--;
    }

    return true;
}

const testStrings = [
    'test',
    'madam',
    'maddam',
    'ada',
    'a',
    'adam',
    'sadam',
];

testStrings.forEach(str => {
    console.log(`${str} is a palindrome: ${isPalindrome(str)}`);
});

