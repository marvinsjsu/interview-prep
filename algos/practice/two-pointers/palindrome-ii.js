

/**
 * 
 * Write a function that takes a string as input and checks whether it can
 * be a valid palindrome by removing at most one character from it.
 * 
 * 
 * Questions:
 * - Do we consider an empty string a valid palindrome? yes
 * - If we have string that does not need a character removed, what should we return?
 * 
 * 
 * Test cases:
 * - "abbaa", true
 * - "aabbba", false
 * - "aba", true
 * - "aa", true
 * - "a", true
 * - "abbac", true
 * 
 * Algos:
 * - use Two-Pointer approach
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

function isPalindromeII(str) { 
  if (str.length === 0) { 
    return true;
  }

  let isPalindrome = true;
    
  let ptr1 = 0;
  let ptr2 = str.length - 1;
  let skipCount = 1;

  while (ptr1 < ptr2) { 
    if (str[ptr1] !== str[ptr2]) { 
            
      if (skipCount < 1) { 
        return false;
      }

      ptr2--;
      skipCount--;
      continue;
    }

    ptr1++;
    ptr2--;
  }

  return isPalindrome;
}

const testCases = [
  ['abbaa', true],
  ['aabbba', false],
  ['aba', true],
  ['aa', true],
  ['a', true],
  ['abbac', true],
  ['', true],
  ['a', true],
  ['aa', true],
  ['ae', true],
  ['aba', true],
  ['abab', true],
  ['aabb', false],
  ['madame', true],
];

testCases.forEach(([str, expectedOutput]) => { 
  const result = isPalindromeII(str);
  const passes = result === expectedOutput;

  console.log({ str, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});