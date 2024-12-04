/**
 * Meeting Rooms II
 * 
 * We are given an input array of meeting time intervals,
 * intervals, where each interval has a start time and
 * an end time. Your task is to find the minimum
 * number of meeting rooms required to hold
 * these meetings.
 * 
 * 
 * Questions:
 * - If we have an empty input array, what should we return? 0
 * - If we have overlapping intervals, this means we need to have another room.  Can we have multiple
 *   intervals overlapping each other - is it possible to have more than 2 intervals overlap? Yes
 * - Is the array of intervals sorted? No
 * 
 * 
 * Test cases:
 * - [[2, 8], [3, 4], [4, 9], [5, 11], [8, 20], [11, 15]], 3
 * - [[1, 7], [2, 6], [3, 7], [4, 8], [5, 8], [2, 9], [1, 8]], 7
 * - [[1, 6], [4, 8], [1, 5], [6, 8], [8, 11], [8, 9], [5, 10]], 3
 * - [[1, 3], [2, 6], [8, 10], [9, 15], [12, 14]], 2 
 * - [[3, 17], [19, 20], [20, 22], [1, 18], [9, 19], [21, 22], [3, 4], [7, 22]], 
 * - [], 
 * 
 * Algos:
 * - use Merge Intervals approach with MinHeap
 * 
 * Trade-offs:
 * - time-complexity: O(n logn), n = # of intervals
 * - space-complexity: O(n), n = # of intervals
 * 
 */

const MinHeap = require('./lib/min-heap');

function findMeetingRoomsCount(intervals) { 
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
  const minHeap = new MinHeap([], (a, b) => a - b);

  minHeap.insert(sortedIntervals[0][1]);

  for (let i = 1; i < sortedIntervals.length; i++) { 
    const currInterval = sortedIntervals[i];
    const [currStart, currEnd] = currInterval;
    const earliestEnd = minHeap.peek();

    if (earliestEnd <= currStart) {
      minHeap.poll();
      minHeap.insert(currEnd);
    } else {
      minHeap.insert(currEnd);
    }
  }

  return minHeap.data.length;
}

const testCases = [
  [[[2, 8], [3, 4], [4, 9], [5, 11], [8, 20], [11, 15]], 3],
  [[[1, 7], [2, 6], [3, 7], [4, 8], [5, 8], [2, 9], [1, 8]], 7],
  [[[1, 6], [4, 8], [1, 5], [6, 8], [8, 11], [8, 9], [5, 10]], 3],
  [[[1, 3], [2, 6], [8, 10], [9, 15], [12, 14]], 2 ],
  // [[[3, 17], [19, 20], [20, 22], [1, 18], [9, 19], [21, 22], [3, 4], [7, 22]], ],
];

testCases.forEach(([intervals, expectedOutput]) => { 
  const result = findMeetingRoomsCount(intervals);
  const passes = result === expectedOutput;

  console.log({ intervals, expectedOutput, result, passes });
});