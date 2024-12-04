/**
 * Meeting Rooms
 * 
 * Given a list of meetings, represented as tuples with a start and an end time, 
 * determine the minimum number of rooms required to schedule all the meetings.
 * 
 * Questions:
 * - What should we return when input array is empty? 0
 * - When we have two intervals, one with an end that is the same as the other's start,
 *   would we consider this overlapping? no
 * - Is it ok for us to mutate the input? yes
 * 
 * Test cases:
 * - [[5, 10], [2, 3]], 1
 * - [[1, 3], [5, 7], [4, 6], [7, 9], [9, 10]], 2
 * 
 * Algos:
 * - use Merge Intervals approach:
 *  - use a counter variable to store the minimum quantity of rooms needed
 *  - sort the intervals by start value in increasing order
 *  - use min heap to always know the earliest meeting (pop off intervals as time passes)
 *    this min heap will use the start value
 *  - load our min heap with the first interval 
 *  - visit each interval (after the first interval):
 *      - compare our current interval to the interval at the top of our min heap:
 *          - if current interval overlaps, then add a room, we want to update
 *            the interval in our heap so its end value is the maximum value
 *            between current and top interval
 *          - if current interval does not overlap, then pop the min heap and add
 *            the current interval
 *  - return the value of our counter
 * 
 * Trade-offs:
 * 
 * 
 */

const MinHeap = require('./lib/min-heap');

function findMinRooms(intervals) { 

  if (intervals.length < 1) { 
    return 0;
  }

  if (intervals.length === 1) { 
    return 1;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const rooms = new MinHeap([], (a, b) => a - b);
  const firstIntervalEnd = intervals[0][1];
    
  rooms.insert(firstIntervalEnd);

  for (let i = 1; i < intervals.length; i++) { 
    const [currStart, currEnd] = intervals[i];
    let earliestEnd = rooms.peek();

    if (earliestEnd <= currStart) {
      rooms.poll();
    }

    rooms.insert(currEnd);
  }

  return rooms.data.length;
}

function minMeetingRooms(meetings) {
  if (meetings.length < 1) return 0;
 
  // sort meetings in ascending order by start time
  const sorted = meetings.sort((a, b) => a[0] - b[0]);
  const rooms = new MinHeap([], (a, b) => a - b);
  rooms.insert(meetings[0][1]);
 
  for (let i = 1; i < sorted.length; i++) {
    const room = sorted[i];
    const soonestEnd = rooms.peek();
    if (soonestEnd <= room[0]) {
      rooms.poll();
    }
    rooms.insert(room[1]);
  }
  
  return rooms.data.length;
}

const testCases = [
  [[[5, 10], [2, 3]], 1],
  [[[1, 3], [5, 7], [4, 6], [7, 9], [9, 10]], 2],
];

testCases.forEach(([intervals, expectedOutput]) => { 
  const result = findMinRooms(intervals);
  // const result = minMeetingRooms(intervals);
  const passes = result === expectedOutput;

  console.log({ intervals, expectedOutput, result, passes });
});