/**
 * Reorganize a string
 * 
 * Given a string, str, rearrange it so that any two adjacent characters are not the same. 
 * If such a reorganization of the characters is possible, output any possible valid 
 * arrangement. Otherwise, return an empty string.
 * 
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  ['aaabc', 'acaba'], // can also be "abaca"
  ['abaacdda', 'adacadba'], // can also be "abacadad"
  ['aaab', ' '],
];

testCases.forEach(([str, expectedOutput]) => { 
  const result = reorganizeString(str);
  const passes = result === expectedOutput;

  console.log({ str, expectedOutput, result, passes });
});

function reorganizeString(str) { 
  if (!str) { 
    return null;
  }

  if (str.length === 0 || str.length === 1) { 
    return str;
  }

  const charFrequency = new Map();

  str.split('').forEach((char) => { 
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
  });

  const maxHeap = new MinHeap([], (a, b) => b[0] - a[0]);

  [...charFrequency.entries()].forEach(([char, frequency]) => { 
    maxHeap.offer([frequency, char]);
  });

  let output = '';
  let prev = null;

  while (maxHeap.size() > 0) { 
    const [frequency, char] = maxHeap.poll();
        
    output += char;

    if (prev) { 
      maxHeap.offer(prev);
      prev = null;
    }

    if (frequency - 1 > 0) { 
      prev = [frequency - 1, char];
    }
  }

  return output.length === str.length
    ? output
    : ' ';
}