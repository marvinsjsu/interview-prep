/**
 * Schedule Tasks on Minimum Machines
 * 
 * We are given an input array, tasks, which contains the start
 * and end times of n tasks. Your task is to find the minimum
 * number of machines required to complete these n tasks.
 * 
 * Questions:
 * 
 * Test cases (edge cases):
 * - [[1, 7], [8, 13], [5, 6], [10, 14], [6, 7]], 2
 * - [[2, 5], [2, 5], [2, 5], [2, 5]], 4
 * - [[2, 3], [4, 7], [8, 18], [19, 25], [26, 30]], 1
 * - [[12, 13], [13, 15], [17, 20], [13, 14], [19, 21], [18, 20]], 3
 * 
 * Algos:
 * 
 * 
 * Trade-offs:
 * 
 * 
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[[1, 7], [8, 13], [5, 6], [10, 14], [6, 7]], 2],
  [[[2, 5], [2, 5], [2, 5], [2, 5]], 4],
  [[[2, 3], [4, 7], [8, 18], [19, 25], [26, 30]], 1],
  [[[12, 13], [13, 15], [17, 20], [13, 14], [19, 21], [18, 20]], 3],
  [[[1, 3], [2, 6], [5, 9], [4, 7], [8, 10], [8, 10], [12, 15]], 3],
  [[[1,7],[8,13],[5,6],[10,14],[6,7]], 2],
];

testCases.forEach(([tasks, expectedOutput]) => {
  // const result = findMinimumMachinesForTasks(tasks);
  const result = findMinimumMachinesForTasksWithTwoHeaps(tasks);
  const passes = result === expectedOutput;

  console.log({ tasks, expectedOutput, result, passes });
});


function findMinimumMachinesForTasks(tasks) { 
  if (!tasks || tasks.length === 0) { 
    return 0;
  }

  const sortedTasks = tasks.sort((a, b) => a[0] - b[0]);
  const machines = new MinHeap();
    
  let earliestEnd = sortedTasks[0][1];
  machines.offer(earliestEnd);

  for (let i = 1; i < sortedTasks.length; i++) { 
    const [currStart, currEnd] = sortedTasks[i];
    const earliestEnd = machines.peek();
        
    if (earliestEnd <= currStart) {
      machines.poll();
    } 

    machines.offer(currEnd);
  }

  console.log({ sortedTasks, machines });

  return machines.data.length;
}


/**
 * 
 * Time-complexity: O(n logn), n = total number of tasks
 * Space-complexity: O(2n) => O(n), n = total number of tasks
 */
function findMinimumMachinesForTasksWithTwoHeaps(tasks) { 
  if (!tasks || tasks.length === 0) { 
    return 0;
  }

  const tasksHeap = new MinHeap(tasks, (a, b) => a[0] - b[0]);
  const machinesAvailableHeap = new MinHeap();

  let machinesNeeded = 0;

  while (tasksHeap.size() > 0) { 
    const [currStart, currEnd] = tasksHeap.poll();

    if (machinesAvailableHeap.size() === 0) {
      machinesAvailableHeap.offer(currEnd);
      machinesNeeded += 1;
    } else { 
      if (currStart < machinesAvailableHeap.peek()) {
        machinesAvailableHeap.offer(currEnd);
        machinesNeeded += 1;
      } else { 
        machinesAvailableHeap.poll();
        machinesAvailableHeap.offer(currEnd);
      }
    }
  }

  return machinesNeeded;
}