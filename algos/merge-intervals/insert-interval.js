/**
 * Insert Interval
 * 
 * Given a sorted list of nonoverlapping intervals and a new interval,
 * your task is to insert the new interval into the correct position
 * while ensuring that the resulting list of intervals remains
 * sorted and nonoverlapping. Each interval is a pair of
 * nonnegative numbers, the first being the start time
 * and the second being the end time of the interval.
 * 
 * 
 * Questions:
 * - Do intervals always take this shape, [start, end], meaning end > start?
 * - We have two inputs, list of intervals, "intervals", and a new interval, "newInterval":
 *      - What if intervals is an empty array?  Should we automatically return [newInterval]?
 *      - If newInterval has a start that begins before another interval ends, do we merge 
 *        these two intervals?
 *              intervals = [[1, 4], [5, 7]]
 *              newInterval = [2, 5]
 *              output = [[1, 7]]
 * - Our input intervals, can we expect this to always be sorted by start time? 
 * 
 * Test cases:
 * - [[1, 3], [5, 7], [8, 9], [10, 13]], [2, 6], [[1, 7], [8, 9], [10, 13]]
 * - [[1, 3], [6, 9]], [2, 5], [[1, 5], [6, 9]] 
 * - [[1, 3], [4, 5], [7, 8], [9, 12], [13, 14]], [2, 10], [[1, 12], [13, 14]]
 * - [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8], [[1, 2], [3, 10], [12, 16]]
 * - [[1, 2], [5, 7], [8, 10]], [3, 4], [[1, 2], [3, 4], [5, 7], [8, 10]]
 * - [[3, 5]], [1, 10], [[1, 10]]
 * 
 * Algos:
 * - Use Merging Intervals approach:
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

function insertInterval (intervals, newInterval) {

  if (intervals.length === 0) {
    return [[newInterval[0], newInterval[1]]];
  }

  const output = [];
  const [newStart, newEnd] = newInterval;

  let idx = 0;

  while (idx < intervals.length && newStart > intervals[idx][0]) {
    const [currStart, currEnd] = intervals[idx];
    output.push([currStart, currEnd]);
    idx++;
  }

  const lastIntervalInOutput = output[output.length - 1];

  // make sure we have an interval in output
  if (lastIntervalInOutput && lastIntervalInOutput[1] >= newStart) {
    lastIntervalInOutput[1] = Math.max(
      lastIntervalInOutput[1],
      newEnd
    );
  } else {
    output.push([newStart, newEnd]);
  }

  while (idx < intervals.length) {
    const [prevStart, prevEnd] = output[output.length - 1];
    const [currStart, currEnd] = intervals[idx];

    if (prevEnd >= currStart) {
      output[output.length - 1][1] = Math.max(prevEnd, currEnd);
    } else {
      output.push([currStart, currEnd]);
    }

    idx++;
  }


  return output;
}

const testCases = [
  [[[1, 3], [5, 7], [8, 9], [10, 13]], [2, 6], [[1, 7], [8, 9], [10, 13]]],
  [[[1, 3], [6, 9]], [2, 5], [[1, 5], [6, 9]]],
  [[[1, 3], [4, 5], [7, 8], [9, 12], [13, 14]], [2, 10], [[1, 12], [13, 14]]],
  [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8], [[1, 2], [3, 10], [12, 16]]],
  [[[1, 2], [5, 7], [8, 10]], [3, 4], [[1, 2], [3, 4], [5, 7], [8, 10]]],
  [[[3, 5]], [1, 10], [[1, 10]]],
];

testCases.forEach(([intervals, newInterval, expectedOutput]) => {
  const result = insertInterval(intervals, newInterval);
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach(([start, end], index) => {
    const [resStart, resEnd] = result[index];
    if (resStart !== start || resEnd !== end) {
      passes = false;
    }
  });

  console.log({ intervals, newInterval, expectedOutput, result, passes });
});
