
const MinHeap = require('../libs/min-heap');

function slidingWindowMedian(nums, k) { 
  const medians = [];
  const outgoingValues = {};
  const minHeapForLarge = new MinHeap();
  const maxHeapForSmall = new MinHeap();

  for (let i = 0; i < k; i++) { 
    maxHeapForSmall.offer(-1 * nums[i]);
  }

  for (let i = 0; i < Math.floor(k / 2); i++) { 
    minHeapForLarge.offer(-1 * maxHeapForSmall.poll());
  }

  let balance = 0;
  let exclusiveEnd = k;

  while (true) { 
    let currMedian = null;

    if (maxHeapForSmall.size() === minHeapForLarge.size()) {
      currMedian = (-1 * maxHeapForSmall.peek() + minHeapForLarge.peek()) / 2.0;
    } else { 
      currMedian = (-1 * maxHeapForSmall.peek()) / 1.0;
    }

    medians.push(currMedian);

    if (exclusiveEnd >= nums.length) { 
      break;
    }

    let outgoingNum = nums[exclusiveEnd - k];
    let incomingNum = nums[exclusiveEnd];
    exclusiveEnd += 1;

    if (outgoingNum <= (-1 * maxHeapForSmall.peek())) {
      balance -= 1;
    } else { 
      balance += 1;
    }

    if (outgoingValues[outgoingNum]) {
      outgoingValues[outgoingNum] += 1;
    } else { 
      outgoingValues[outgoingNum] = 1;
    }

    if (maxHeapForSmall.size() > 0 && (-1 * maxHeapForSmall.peek() > incomingNum)) {
      maxHeapForSmall.offer(-1 * incomingNum);
      balance += 1;
    } else { 
      minHeapForLarge.offer(incomingNum);
      balance -= 1;
    }

    if (balance < 0) {
      maxHeapForSmall.offer(-1 * minHeapForLarge.poll());
    } else if (balance > 0) { 
      minHeapForLarge.offer(-1 * maxHeapForSmall.poll());
    }

    balance = 0;

    while (maxHeapForSmall.size() > 0
            && (-1 * maxHeapForSmall.peek()) in outgoingValues
            && outgoingValues[(-1 * maxHeapForSmall.peek())] > 0
    ) { 
      const removedValue = -1 * maxHeapForSmall.poll();
      outgoingValues[removedValue] -= 1;
    }

    while (minHeapForLarge.size() > 0
            && minHeapForLarge.peek() in outgoingValues
            && outgoingValues[minHeapForLarge.peek()] > 0
    ) { 
      const removedValue = minHeapForLarge.poll();
      outgoingValues[removedValue] -= 1;
    }
  }


  return medians;
}

const testCases = [
  [[-1, 1, 3, 4, 5, 6, -10], 1, [-1, 1, 3, 4, 5, 6, -10]],
  [[1, 3, -1, -3, 5, 3, 6, 7], 5, [1.0, 3.0, 3.0, 5.0]],
  [[1, 1, 1, 1, 1, 1], 3, [1.0, 1.0, 1.0, 1.0]],
];

testCases.forEach(([nums, k, expectedOutput]) => { 
  const result = slidingWindowMedian(nums, k);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => { 
    if (value !== result[index]) { 
      passes = false;
    }
  });

  console.log({ nums, k, expectedOutput, result, passes });
});

