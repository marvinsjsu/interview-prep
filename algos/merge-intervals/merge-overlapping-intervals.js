/**
 * Merge intervals: Given a sorted list of intervals, merge all overlapping intervals.
 * 
 * Questions:
 * - Will an interval always be represented as [currStart, currEnd]?
 * 
 * Test-cases:
 * - [[1, 3], [3, 7], [9, 12], [10, 14], [15, 17], [16, 18]], [[1, 7], [9, 14], [15, 18]]
 * 
 * 
 * Algos:
 * 
 * 
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

function mergeOverlappingIntervalsBrute (intervals) {

  if (intervals.length <= 1) {
    return intervals;
  }

  const overlappingIntervals = [intervals[0]];

  intervals.forEach(([ currStart, currEnd ]) => {
    const prevInterval = overlappingIntervals[overlappingIntervals.length - 1];

    const [ prevStart, prevEnd ] = prevInterval;
            
    if (currStart > prevEnd || currEnd < prevStart) {
      overlappingIntervals.push([currStart, currEnd]);
    } else {
      let mergedStart = prevStart;
      let mergedEnd = prevEnd;

      if (currStart <= prevStart) {
        mergedStart = currStart;
      } else if (currStart > prevStart && currStart < prevEnd) {
        mergedStart = prevStart;
      }

      if (currEnd > prevStart && currEnd < prevEnd) {
        mergedEnd = prevEnd;
      } else if (currEnd >= prevEnd) {
        mergedEnd = currEnd;
      }

      overlappingIntervals.pop();
      overlappingIntervals.push([mergedStart, mergedEnd]);
    }
  });

  return overlappingIntervals;
}


function mergeOverlappingIntervalsOptimal (intervals) {
  if (intervals.length < 2) {
    return intervals;
  }

  // if intervals is unsorted, let's sort it by start of each interval
  // intervals.sort((a, b) => a[0] - b[0]);

  const output = [intervals[0]];

  let idx = 1;

  while (idx < intervals.length) {
    const [_, prevEnd] = output[output.length - 1];
    const [currStart, currEnd] = intervals[idx];

    if (prevEnd >= currStart) {
      output[output.length - 1][1] = Math.max(prevEnd, currEnd);
    } else {
      output.push(intervals[idx]);
    }

    idx++;
  }
    
  return output;
}



const testCases = [
  [[[1, 3], [3, 7], [9, 12], [10, 14], [15, 17], [16, 18]], [[1, 7], [9, 14], [15, 18]]],
  [[[1, 5], [3, 7], [4, 6], [6, 8]], [[1, 8]]],
  [[[10, 12], [12, 15]], [[10, 15]]],
  [[[1, 3], [2, 6], [8, 10], [15, 18], [18, 20]], [[1, 6], [8, 10], [15, 20]]],
  [[[1, 6], [2, 4] ], [[1, 6]]],
  [[[1, 8]], [[1, 8]]],
  [[[2, 9], [3, 5], [4, 8]], [[2, 9]]],
  [[[2, 4], [3, 5], [4, 5], [6, 10], [12, 14] ], [[2, 5], [6, 10], [12, 14]]],
];

testCases.forEach(([ intervals, expectedOutput ]) => {
  // const result = mergeOverlappingIntervalsBrute(intervals);
  const result = mergeOverlappingIntervalsOptimal(intervals);

    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((expectedInterval, index) => {
    const resultInterval = result[index];

    expectedInterval.forEach((value, idx) => {
      if (resultInterval[idx] !== value) {
        passes = false;
      }
    });
  });

  console.log({ intervals, expectedOutput, result, passes });
});

