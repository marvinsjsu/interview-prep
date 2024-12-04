/**
 * Task Scheduler
 * 
 * Given a character array tasks, where each character represents
 * a unique task and a positive integer n that represents the
 * cooling period between any two identical tasks, find the
 * minimum number of time units the CPU will need to
 * complete all the given tasks. Each task requires
 * one unit to perform, and the CPU must wait for
 * at least n units of time before it can repeat
 * the same task. During the cooling period,
 * the CPU can perform other tasks or
 * remain idle.
 * 
 * - CPU performs one unit per task
 * - CPU has to cool off after every task, n units (this has to be between the same task)
 * 
 * Questions:
 * - If we have a task list like ['c2', 'c3', 'n4'], this means:
 *      - that between c task, we have to wait 2 units
 *      - between c and n task, do we wait 3 units
 * 
 * 
 * Test cases:
 * - ['A', 'A', 'B', 'B'], 2, 5
 * - ['A', 'B', 'A', 'A', 'B', 'C'], 3, 9
 * - ['A', 'C', 'B', 'A'], 0, 4
 * - ['A', 'A', 'A', 'B', 'B', 'C', 'C'], 1, 7
 * - ['D', 'A', 'F', 'B', 'G', 'E', 'C'], 5, 7
 * - ['A', 'A', 'C', 'C', 'C', 'B', 'E', 'E', 'E'], 2, 9 
 * 
 * 
 * Algos:
 * 
 * 
 * 
 * Trade-offs:
 * - time-complexity: O(n)
 * - space-complexity: O(1), 26 letters representing a task, so Map has at most 26 keys
 * 
 */

function findMinTaskTime(tasks, n) { 
  if (tasks.length === 0) { 
    return 0;
  }

  if (n === 0) { 
    return tasks.length;
  }

  const taskFrequency = new Map();

  tasks.forEach(task => { 
    taskFrequency.set(task, (taskFrequency.get(task) || 0) + 1);
  });

  const sortedTasks = [...taskFrequency.entries()].sort((a, b) => a[1] - b[1]);
  const mostFrequentTask = sortedTasks.pop();
  const maxFrequency = mostFrequentTask[1];

  let idleTime = (maxFrequency - 1) * n;
    
  while (sortedTasks.length > 0 && idleTime > 0) { 
    const currTask = sortedTasks.pop();
    idleTime -= Math.min(maxFrequency - 1, currTask[1]);
  }

  idleTime = Math.max(0, idleTime);

  return tasks.length + idleTime;
}


const testCases = [
  [['A', 'A', 'B', 'B'], 2, 5],
  [['A', 'B', 'A', 'A', 'B', 'C'], 3, 9],
  [['A', 'C', 'B', 'A'], 0, 4],
  [['A', 'A', 'A', 'B', 'B', 'C', 'C'], 1, 7],
  [['D', 'A', 'F', 'B', 'G', 'E', 'C'], 5, 7],
  [['A', 'A', 'C', 'C', 'C', 'B', 'E', 'E', 'E'], 2, 9],
];

testCases.forEach(([tasks, n, expectedOutput]) => { 
  const result = findMinTaskTime(tasks, n);
  const passes = result === expectedOutput;

  console.log({ tasks, n, expectedOutput, result, passes });
});