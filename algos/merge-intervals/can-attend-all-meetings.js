/**
 * 
 * Meeting rooms:
 * - Given an array of meeting time intervals consisting of start and end times,
 *   determine if a person could attend all meetings.
 * 
 * 
 * Questions:
 * - What should we return if the input array is empty?
 * - Will all intervals be represented by [start, end],
 *   so start will always be less than end? 
 * - If we have two intervals like [1, 2] and [2, 3], can the person attend back-to-back
 *   meetings like this?
 * - Is it ok to mutate our input array (I think sorting by start will help)?
 * 
 * Test-cases:
 * - [[9, 10], [15, 16], [5, 7], [1, 4], [12, 14]], true
 * 
 * 
 * Algos:
 * 
 * 
 * 
 * Trade-offs:
 * 
 * 
 */

function canMakeMeetings (intervals) {
  if (intervals.length <= 1) {
    return true;
  }

  let isPossible = true;

  intervals.sort((a, b) => a[0] - b[0]);
    
  let left = 0;

  while (left < intervals.length - 1) {
    let right = left + 1;

    const prevInterval = intervals[left];
    const currInterval = intervals[right];

    const [prevStart, prevEnd] = prevInterval;
    const [currStart, currEnd] = currInterval;
        
    if (prevStart >= currStart) {
      return false;
    }

    if (currEnd <= prevEnd) {
      return false;
    }

    left++;
  }

  return isPossible;
}

const testCases = [
  [[[9, 10], [15, 16], [5, 7], [1, 4], [12, 14]], true],
];

testCases.forEach(([ intervals, expectedOutput ]) => {
  const result = canMakeMeetings(intervals);
  const passes = result === expectedOutput;

  console.log({ intervals, expectedOutput, result, passes });
});

