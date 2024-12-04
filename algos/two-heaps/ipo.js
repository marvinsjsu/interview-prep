/**
 * IPO
 * 
 * https://www.educative.io/courses/grokking-coding-interview-in-javascript/ipo
 * 
 * 
 */


const MinHeap = require('../libs/min-heap');

class Project { 
  constructor(capital, profit, index) { 
    this.capital = capital;
    this.profit = profit;
    this.index = index;
  }
}

function maximumCapital(c, k, capitals, profits) { 

  const compareFunc = (a, b) => a.capital - b.capital;
  const minHeap = new MinHeap([], compareFunc);
    
  capitals.forEach((capital, index) => { 
    const profit = profits[index];
    const project = new Project(capital, profit, index);

    minHeap.offer(project);
  });

  let currentCapital = c;

  for (let i = 0; i < k; i++) { 
    let maxProfit = 0;

    while (minHeap.size() > 0 && minHeap.peek().capital <= currentCapital) { 
      const project = minHeap.poll();
      maxProfit = Math.max(maxProfit, project.profit);

      console.log({ project, maxProfit, currentCapital });
    }

    currentCapital += maxProfit;

    console.log('*'.repeat(50));
  }

  return currentCapital;
}

const testCases = [
  [2, 2, [1, 1, 2, 4], [2, 3, 5, 8], 15],
  [1 , 3 , [0,1,2] , [1,2,3], 7]
];

testCases.forEach(([k, c, capitals, profits, expectedOutput]) => { 
  const result = maximumCapital(k, c, capitals, profits);
  const passes = result === expectedOutput;

  console.log({ k, c, capitals, profits, expectedOutput, result, passes });
});