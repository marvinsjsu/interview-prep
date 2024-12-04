/**
 * Interval List Intersections
 * 
 * For two arrays of closed intervals given as input, intervalListA and intervalListB,
 * where each interval has its own start and end time, write a function that returns
 * the intersection of the two interval arrays.
 * 
 * Questions:
 * - Are the list of intervals sorted? If no, we need to sort both intervals first, then use Merge Intervals approach
 * - 
 * 
 * 
 * Test cases:
 * - [[1, 4], [5, 6], [7, 9]], [[3, 5], [6, 7], [8, 9]], [[3, 4], [5, 5], [6, 6], [7, 7], [8, 9]]
 * - [[0, 4], [5, 7], [8, 12], [13, 15], [16, 18]], [[0, 18]], [[0, 4], [5, 7], [8, 12], [13, 15], [16, 18]]
 * - [[2, 6], [7, 9], [10, 13], [14, 19], [20, 24]], [[1, 4], [6, 8], [15, 18]], [[2, 4], [6, 6], [7, 8], [15, 18]]
 * - [[1, 29]], [[1, 5], [6, 10], [11, 14], [15, 18], [19, 20]], [[1, 5], [6, 10], [11, 14], [15, 18], [19, 20]]
 * 
 * Algos:
 * - use Merging Intervals approach:
 *      - 
 * 
 * Trade-offs:
 * 
 * 
 */

/**
     * Algos:
     * - use two pointers, one for intervalsA and another for intervalsB
     * - iterate through both intervalsA and intervalsB:
     *      - compare current interval from a and current interval from b:
     *          - if a's end is before b's start, there's no intersection
     *              - move pointer a forward one
     *          - if b's end is before a's start, there's no intersection
     *              - move pointer b forward one
     *          - there is an intersection:
     *              - if a's start is equal to b's start, this becomes start of the intersection
     *                  - else set start of the instersection as the greater of a and b's starts
     *              - if a's end is equal to b's end, this becomes end of the intersection
     *                  - else set end of the intersection as the lesser of a and b's ends
     *              - store the intersection in our intersections array
     *              - if a's end is before b's end, then move pointer a forward one
     *              - if b's end is before a's end, then move pointer b forward one
     *              - else move both pointer a and b forward one
     */

function findIntersections(intervalsA, intervalsB) { 
  if (intervalsA.length === 0 || intervalsB.length === 0) { 
    return [];
  }
    
  const intersections = [];

  let indexA = 0;
  let indexB = 0;

  while (indexA < intervalsA.length && indexB < intervalsB.length) { 
    const [aStart, aEnd] = intervalsA[indexA];
    const [bStart, bEnd] = intervalsB[indexB];

    if (aEnd < bStart) { 
      indexA++;
      continue;
    }

    if (bEnd < aStart) { 
      indexB++;
      continue;
    }

    let intersectionStart = Math.max(aStart, bStart);
    let intersectionEnd = Math.min(aEnd, bEnd);
        
    intersections.push([intersectionStart, intersectionEnd]);

    if (aEnd < bEnd) {
      indexA++;
    } else if (bEnd < aEnd) {
      indexB++;
    } else { 
      indexA++;
      indexB++;
    }
  }
 
  return intersections;
}

function findIntersectionsOptimal(intervalsA, intervalsB) { 
  const intersections = [];

  let idxA = 0;
  let idxB = 0;

  while (idxA < intervalsA.length && idxB < intervalsB.length) { 
    let start = Math.max(intervalsA[idxA][0], intervalsB[idxB][0]);
    let end = Math.min(intervalsA[idxA][1], intervalsB[idxB][1]);

    // When start is less than or equal to end, 
    // this means we have a valid intersection
    if (start <= end) { 
      intersections.push([start, end]);
    }

    // We move on to the next interval when the current interval's
    // end is before the other interval's end.  We still need to
    // evaluate the interval with the end that's the most recent
    // with regards to current intervals
    if (intervalsA[idxA][1] < intervalsB[idxB][1]) {
      idxA++;
    } else { 
      idxB++;
    }
  }

  return intersections;
}

const testCases = [
  [[[1, 4], [5, 6], [7, 9]], [[3, 5], [6, 7], [8, 9]], [[3, 4], [5, 5], [6, 6], [7, 7], [8, 9]]],
  [[[0, 4], [5, 7], [8, 12], [13, 15], [16, 18]], [[0, 18]], [[0, 4], [5, 7], [8, 12], [13, 15], [16, 18]]],
  [[[2, 6], [7, 9], [10, 13], [14, 19], [20, 24]], [[1, 4], [6, 8], [15, 18]], [[2, 4], [6, 6], [7, 8], [15, 18]]],
  [[[1, 29]], [[1, 5], [6, 10], [11, 14], [15, 18], [19, 20]], [[1, 5], [6, 10], [11, 14], [15, 18], [19, 20]]],
];

testCases.forEach(([intervalA, intervalB, expectedOutput]) => {
  // const result = findIntersections(intervalA, intervalB);
  const result = findIntersectionsOptimal(intervalA, intervalB);
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach(([expectedStart, expectedEnd], index) => {
    const resInterval = result[index];

    if (resInterval) {
      const [resStart, resEnd] = result[index];

      if (resStart !== expectedStart || resEnd !== expectedEnd) {
        passes = false;
      }
    } else { 
      passes = false;
    }

  });

  console.log({ intervalA, intervalB, expectedOutput, result, passes });
});



