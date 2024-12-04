/**
 * Sort characters by frequency
 * 
 * Sort a string in increasing order based on the frequency of its characters.
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  ['buubble', 'bbbuule'],
];

testCases.forEach(([str, expectedOutput]) => { 
  const result = sortCharsByFrequency(str);
  const passes = result === expectedOutput;

  console.log({ str, expectedOutput, result, passes });
});

function sortCharsByFrequency(str) { 
  if (!str) { 
    return null;
  }

  if (str.length === 0) { 
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

  while (maxHeap.size() > 0) {  
    const [frequency, char] = maxHeap.poll();
        
    for (let i = 0; i < frequency; i++) { 
      output += char;
    }
  }

  return output;
}


