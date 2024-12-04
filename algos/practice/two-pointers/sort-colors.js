
function sortColors(colors) { 
  if (!colors || colors.length === 0) { 
    return colors;
  }

  // Space-complexity of O(c)
  const colorsValues = {
    'red': 0,
    'white': 1,
    'blue': 2,
  };

  // Time-complexity of O(n), n = # of elements in colors
  for (let i = 0; i < colors.length - 1; i++) { 
    let ptr1 = i;
    let ptr2 = i + 1;

    // Time-complexity of O(n - 1)
    while (ptr2 < colors.length) { 
      const ptr1Value = colorsValues[colors[ptr1]];
      const ptr2Value = colorsValues[colors[ptr2]];

      if (ptr1Value > ptr2Value) {
        [colors[ptr1], colors[ptr2]] = [colors[ptr2], colors[ptr1]];
      }
            
      ptr2++;
    }
  }

  return colors;
}

/**
 * Time-complexity
 *  = O(n - 1) * O(n - 1)
 *  = O(n^2), n = # of elements in colors
 * 
 * Space-complexity
 *  = O(1), constant because we know the number of unique colors we are sorting
 */

const MinHeap = require('./lib/min-heap');

function sortColorsWithHeap(colors) { 
  if (!colors || colors.length === 0) { 
    return colors;
  }
    
  const colorsValues = {
    'red': 0,
    'white': 1,
    'blue': 2,
  };

  const compareFunc = (a, b) => {
    const colorValueA = colorsValues[a];
    const colorValueB = colorsValues[b];

    return colorValueA - colorValueB;
  };

  // Time-complexity of O(nlogn)
  const minHeap = new MinHeap(colors, compareFunc);
    
  // Space-complexity of O(n)
  const output = [];

  // Time-complexity of O(n)
  while (minHeap.data.length > 0) {
    const color = minHeap.poll();
    output.push(color);
  }

  return output;
}

/**
 * Time-complexity:
 *  = O(n logn) + O(n)
 *  = O(n)
 * 
 * Space-complexity:
 *  = O(n)
 */

const testCases = [
  [['red', 'white', 'blue'], ['red', 'white', 'blue']],
  [['blue', 'white', 'red'], ['red', 'white', 'blue']],
  [['red', 'red', 'white'], ['red', 'red', 'white']], 
  [['red', 'blue', 'red'], ['red', 'red', 'blue']],
  [['red', 'red', 'blue', 'red', 'white', 'white', 'red'], ['red', 'red', 'red', 'red', 'white', 'white', 'blue']],
];

testCases.forEach(([colors, expectedOutput]) => {
  const result = sortColors(colors);
  // const result = sortColorsWithHeap(colors);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => {
    if (result[index] !== value) {
      passes = false;
    }
  });

  console.log({ colors, expectedOutput, result, passes });

  console.log('*'.repeat(50));
});