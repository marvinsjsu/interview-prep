

/**
 * Longest Palindromic Substring
 * 
 * Given a string s, return the longest palindromic substring in s.
 * 
 * Questions:
 * 
 * 
 * Test cases:
 * - ["babad", "aba"]
 * - ["cbbd", "bb"]
 * 
 * Algos:
 * 
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

function findLongestPalindrome(str) { 
  if (str.length < 2) { 
    return str;
  }

  let start = 0;
  let end = 0;

  for (let i = 0; i < str.length; i++) { 
    const odd = getPalindromeLength(str, i, i);
    const even = getPalindromeLength(str, i, i + 1);
    const maxLength = Math.max(odd, even);

    if (maxLength > end - start) { 
      start = i - Math.floor((maxLength - 1) / 2);
      end = i + Math.floor(maxLength / 2);
    }
  }

  return str.substring(start, end + 1);
}

function getPalindromeLength(str, left, right) { 
  while (left >= 0 && right < str.length) { 
    if (str[left] !== str[right]) { 
      break;
    }

    left--;
    right++;
  }

  return right - left - 1;
}

const testCases = [
  ['babad', 'aba'],
  ['cbbd', 'bb'],
];

testCases.forEach(([str, expectedOutput]) => { 
  const result = findLongestPalindrome(str);
  const passes = result === expectedOutput;

  console.log({ str, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});

