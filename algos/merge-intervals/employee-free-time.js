/**
 * Employee Free Time
 * 
 * 
 * You’re given a list containing the schedules of multiple employees.
 * Each person’s schedule is a list of non-overlapping intervals in
 * sorted order. An interval is specified with the start and end
 * time, both being positive integers. Your task is to find the
 * list of finite intervals representing the free time for all
 * the employees.
 * 
 * 
 * Questions:
 * - We are looking for intervals that do not exist in any of the interval lists we're given? Yes
 * - Is there a window of main interval where we need to base the free time against? No
 * - Intervals that have either an infinite start or end times are to be discarded or ignored? Yes
 * - We want intervals that are with the range of all schedules of multiple employees? Yes
 * - I would like confirm:  our input is a list of lists of intervals? Yes
 * 
 * Test cases:
 * - [[[1, 2], [5, 6]], [[1, 3]], [[4, 10]]], [[3, 4]]
 * - [[[1, 3], [6, 7]], [[2, 4]], [[2, 5], [9, 12]]], [[5, 6], [7, 9]]
 * - [[[2, 3], [7, 9]], [[1, 4], [6, 7]]], [[4, 6]]
 * 
 * Algos:
 * - use Merge Intervals approach:
 *      - set freeTime array to empty
 *      - set an allIntervals array to store all intervals from all employee schedules
 *      - sort allIntervals based on interval start times
 *      - set a mergedIntervals array to the first interval from allIntervals
 *      - iterate through all intervals in allIntervals (excluding the first interval) and merge any overlapping intervals:
 *          - take the last interval from mergedIntervals (prevInterval)
 *          - take the current interval from allIntervals (currInterval)
 *          - compare prevInterval and currInterval:
 *              - if prevInterval's end is greater than or equal to currInterval's start:
 *                  - set prevInterval's end time to the max of prevInterval's end and currInterval's end
 *              - else, push currInterval to mergedIntervals
 *      - use two pointers to iterate through the mergedIntervals array to get free times:
 *          - take the first pointer's end and store as free time start
 *          - take the second pointer's start and store as free time end
 *          - store free time in freeTime array
 *      - return freeTime array
 * 
 * - use MinHeap
 * 
 * Trade-offs:
 * - findFreeTimes non-optimal:
 *      - time-complexity:
 *          = O(logn) + O(n) + O(n)
 *          = O(n)
 *      - space-complexity:
 *          = O(n)
 * 
 * - findFreeTimesOptimal with MinHeap:
 *      - time-complexity:
 *          = O(m log(n)), m = # of employees, n = total # of intervals
 *      - space-complexity:
 *          = O(n), n = # of employees
 *      
 *      - notes:
 *          - heapify takes O(log(n)), so each insert of an interval or value we get O(n log(n))
 *          - processing the heap takes O(m log(n)), m = # of employees, n = total # of intervals
 * 
 */

const Interval = require('./lib/interval');
const MinHeap = require('./lib/min-heap');

function findFreeTimes(schedules) { 
  if (schedules.length === 0) { 
    return [];
  }

  const freeTimes = [];
  const allIntervals = schedules.reduce((allIntervals, schedule) => {
    schedule.forEach(interval => allIntervals.push(interval));
    return allIntervals;
  }, []);

  allIntervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [allIntervals[0]];

  let idx = 1;

  while (idx < allIntervals.length) { 
    const [_, prevEnd] = mergedIntervals[mergedIntervals.length - 1];
    const [currStart, currEnd] = allIntervals[idx];

    if (prevEnd >= currStart) {
      mergedIntervals[mergedIntervals.length - 1][1] = Math.max(prevEnd, currEnd);
    } else { 
      mergedIntervals.push([currStart, currEnd]);
    }

    idx++;
  }

  let ptr1 = 0;
    
  while (ptr1 < mergedIntervals.length - 1) { 
    let ptr2 = ptr1 + 1;

    const [ptr1Start, ptr1End] = mergedIntervals[ptr1];
    const [ptr2Start, ptr2End] = mergedIntervals[ptr2];

    freeTimes.push([ptr1End, ptr2Start]);

    ptr1++;
  }

  return freeTimes;
}

function findFreeTimesOptimal(schedules) { 
  if (schedules.length === 0) { 
    return [];
  }

  const freeTimes = [];
  const minHeap = new MinHeap();

  for (let i = 0; i < schedules.length; i++) { 
    const [start, end] = schedules[i][0];
    minHeap.insert([start, i, 0]);
  }

  const [firstIntervalStart, scheduleIdx, intervalIdx] = minHeap.peek();
    
  let prevInterval = firstIntervalStart;

  while (minHeap.size() > 0) { 
    const [currStart, currScheduleIdx, currIntervalIdx] = minHeap.poll();

    if (currStart > prevInterval) { 
      const freeTimeInterval = new Interval(prevInterval, currStart);
      freeTimes.push(freeTimeInterval);
    }

    prevInterval = Math.max(prevInterval, schedules[currScheduleIdx][currIntervalIdx][1]);

    if (currIntervalIdx + 1 < schedules[currScheduleIdx].length) { 
      const [start, _] = schedules[currScheduleIdx][currIntervalIdx + 1];
      minHeap.insert([start, currScheduleIdx, currIntervalIdx + 1]);
    }
  }

  return freeTimes;
}

const testCases = [
  [[[[1, 2], [5, 6]], [[1, 3]], [[4, 10]]], [[3, 4]]],
  [[[[1, 3], [6, 7]], [[2, 4]], [[2, 5], [9, 12]]], [[5, 6], [7, 9]]],
  [[[[2, 3], [7, 9]], [[1, 4], [6, 7]]], [[4, 6]]],
  [[[[3, 5], [8, 10]], [[4, 6], [9, 12]], [[5, 6], [8, 10]]], [[6, 8]]],
  [[[[1, 3], [5, 6], [9, 10]], [[2, 4], [7, 8]], [[8, 11], [12, 14]]], [[4, 5], [6, 7], [11, 12]]],
  [[[[1, 2], [3, 4]], [[2, 3]], [[4, 6]]], []],
  [[[[1,2],[5,6]],[[1,3]],[[4,10]]], []],
];

testCases.forEach(([schedules, expectedOutput]) => { 
  // const result = findFreeTimes(schedules);
  const result = findFreeTimesOptimal(schedules);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach(([expectedStart, expectedEnd], index) => { 
    const resInterval = result[index];

    if (resInterval) {
      const resStart = resInterval.start;
      const resEnd = resInterval.end;
      if (resStart !== expectedStart || resEnd !== expectedEnd) { 
        passes = false;
      }
    } else { 
      passes = false;
    }
  });


  console.log({ schedules, expectedOutput, result, passes });
});

