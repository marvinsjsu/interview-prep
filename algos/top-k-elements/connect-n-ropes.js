/**
 * Connect n ropes with minimum cost
 * 
 * Connect n ropes into one rope with minimum cost, such that the
 * cost to connect two ropes is equal to the sum of their lengths.
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[6, 4, 3, 2], 29],
];

testCases.forEach(([ropes, expectedOutput]) => {
  const result = connectNRopes(ropes);
  const passes = result === expectedOutput;

  console.log({ ropes, expectedOutput, result, passes });
});

function connectNRopes(ropes) { 
  const minHeap = new MinHeap([], (a, b) => a - b);

  ropes.forEach(length => { 
    minHeap.offer(length);
  });

  const sums = [];

  while (minHeap.size() > 1) { 
    const val1 = minHeap.poll();
    const val2 = minHeap.poll();
    const sum = val1 + val2;

    sums.push(sum);
    minHeap.offer(sum);
  }

  return sums.reduce((acc, val) => { 
    acc += val;
    return acc;
  }, 0);
}

