/**
 * Largest Number After Digit Swaps by Parity
 * 
 * You are given a positive integer num. You can swap any two digits of num 
 * as long as they share the same parity (both are odd or both are even).
 * 
 * Your task is to return the largest possible value of num after 
 * performing any number of such swaps.
 * 
 * 
 * Algo:
 * - convert num value into string and split to get each digit
 * - create a placeholder array where 1 indicates odd and 0 indicates even value
 * - create two MaxHeaps one for odd values and the other for even values
 * - create maxNum variable
 * - loop through the placeholder array:
 *      - if value is 1, then pop MaxHeap for odd
 *      - if value is 0, then pop MaxHeap for even
 *      - append the value to maxNum
 * 
 * - return Number value of maxNum via parseInt
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [234567, 674523],
  [8052, 8250],
  [273681, 873621],
  [8890, 8890],
  [1013, 3011],
];

testCases.forEach(([num, expectedOutput]) => { 
  // const result = findLargestNumAfterDigitSwap(num);
  const result = findLargestNumAfterDigitSwapOptimal(num);
  const passes = result === expectedOutput;

  console.log({ num, expectedOutput, result, passes });
});

function findLargestNumAfterDigitSwap(num) { 
  let maxNum = '';

  const oddHeap = new MinHeap();
  const evenHeap = new MinHeap();
  const digits = [];
  num.toString().split('').forEach((value, index) => { 
    const modValue = value % 2;
    digits[index] = modValue;

    if (modValue === 0) {
      evenHeap.offer(-parseInt(value));
    } else { 
      oddHeap.offer(-parseInt(value));
    }
  });

  for (const modValue of digits) { 
    let digitValue = modValue === 0
      ? -1 * evenHeap.poll()
      : -1 * oddHeap.poll();
        
    maxNum = `${maxNum}${digitValue}`;
  }
    
  return parseInt(maxNum);
}


function findLargestNumAfterDigitSwapOptimal(num) { 
  const digits = Array.from(String(num), Number);
  const oddHeap = new MinHeap();
  const evenHeap = new MinHeap();

  digits.forEach((digit) => { 
    if (digit % 2 === 0) {
      evenHeap.offer(-1 * digit);
    } else { 
      oddHeap.offer(-1 * digit);
    }
  });

  const result = digits.map((digit) => { 
    return digit % 2 === 0
      ? (-1 * evenHeap.poll())
      : (-1 * oddHeap.poll());
  });


  return parseInt(result.join(''), 10);
}