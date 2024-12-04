/**
 * Find Right Interval
 * 
 * You are given an array of intervals where each interval is represented by a pair [starti, endi].
 * The starti values are unique, meaning no two intervals begin at the same time.
 * 
 * The task is to find the right interval for each interval in the list.  The right interval for an
 * interval i is an interval j such that startj >= endi and startj is minimized (it is the smallest
 * start time of all valid intervals that is greater than or equal to endi).  Note that i may equal
 * j.
 * 
 * Return an array of right interval indexes for each interval i.  If no right interval exists for
 * interval i, then put -1 at index i.
 * 
 */

const MinHeap = require('../libs/min-heap');


const testCases = [
  [[[1, 3], [4, 6], [7, 9], [10, 12]], [1, 2, 3, -1]],
  [[[5, 10], [11, 15], [1, 4]], [1, -1, 0]],
];

testCases.forEach(([intervals, expectedOutput]) => { 
  const result = findRightIntervals(intervals);
  let passes = result.length = expectedOutput.length;

  expectedOutput.forEach((intervalIdx, idx) => { 
    if (result[idx] !== intervalIdx) { 
      passes = false;
    }
  });

  console.log({ intervals, expectedOutput, result, passes });
});

function findRightIntervals(intervals) { 
  const output = new Array(intervals.length).fill(-1);
  const minComparator = (a, b) => a[0] - b[0];
  const startHeap = new MinHeap([], minComparator);
  const endHeap = new MinHeap([], minComparator);

  intervals.forEach((interval, index) => { 
    const [start, end] = interval;
    startHeap.offer([start, index]);
    endHeap.offer([end, index]);
  });

  console.log(startHeap.display());
  console.log(endHeap.display());

  while (endHeap.size() > 0) { 
    const [end, index] = endHeap.poll();

    while (startHeap.size() > 0 && startHeap.peek()[0] < end) { 
      startHeap.poll();
    }

    if (startHeap.size() > 0) {
      output[index] = startHeap.peek()[1];
    }
  }

  return output;
}