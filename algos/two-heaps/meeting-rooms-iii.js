/**
 * Meeting Rooms III
 * 
 * You have an integer `rooms`, representing room numbers from 0 to rooms - 1.
 * Additionally, you are given a 2D integer array called `meetings`, where
 * each element `meetings[i]` = [start, end] indicates that a meeting will
 * be held in the half-closed interval [start, end].  Each `start` is
 * unique.
 * 
 * Meetings are allocated to rooms in the following manner:
 * 1. Each meeting will take place in the unused room with the lowest number.
 * 2. If there are no available rooms, the meeting will be delayed until a room becomes free,
 *    maintaining the same duration as the original meeting.
 * 3. When a room is vacated, the meeting with the earliest original start time is given
 *    priority for that room.
 * 
 * Your task is to determine the room number that hosted the highest number of meetings.
 * If there are multiple rooms, return th eroom with the lowest number.
 * 
 * ** Note: A `half-closed` interval [a, b] is the interval between a and b including a
 *          and not including b
 *
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[[0, 1], [2, 4], [3, 6]], 2, 0],
  [[[0, 3], [1, 2], [2, 3], [3, 4]], 3, 0],
  [[[0, 5], [1, 2], [2, 3], [3, 4], [5, 6]], 3, 1],
];

testCases.forEach(([meetings, rooms, expectedOutput]) => { 
  const result = findMeetingRooms(meetings, rooms);
  const passes = result === expectedOutput;

  console.log({ meetings, rooms, expectedOutput, result, passes });
});

/**
 * Time-complexity: O(m log m) + O(m log n), m = # of meetings, n = # of rooms
 * Space-complexity:
 *  - O(n) is for the counter variable
 *  - O(2xn) is for the two heaps that store n rooms
 */
function findMeetingRooms(meetings, rooms) { 
  meetings.sort((a, b) => a[0] - b[0]); // O(m logm)
    
  const counter = new Array(rooms).fill(0);
  const availableRoomsHeap = new MinHeap();

  for (let i = 0; i < rooms; i++) { 
    availableRoomsHeap.offer(i);
  }

  const usedRoomsHeap = new MinHeap([], (a, b) => { 
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  });

  for (const [currStart, currEnd] of meetings) { // O (m logn), m = # of meetings, n = # of rooms

    while (usedRoomsHeap.size() > 0 && usedRoomsHeap.peek()[0] <= currStart) { 
      const [end, room] = usedRoomsHeap.poll();
      availableRoomsHeap.offer(room);
    }

    if (availableRoomsHeap.size() === 0) { 
      const [end, room] = usedRoomsHeap.poll();
      currEnd = end + (currEnd - currStart);
      availableRoomsHeap.offer(room);
    }

    const room = availableRoomsHeap.poll();
    usedRoomsHeap.offer([currEnd, room]);
    counter[room] += 1;
  }

  return counter.indexOf(Math.max(...counter));
}
