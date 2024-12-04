const Dequeue = require('./dequeue-test');

function findMaxSlidingWindow (nums, w) {
  const output = [];
  const currentWindow = new Dequeue();

  let i = 0;
  while (i < w) {
    cleanup(i, currentWindow, nums);
    currentWindow.push(i);
    i++;
  }

  output.push(nums[currentWindow.peekFront()]);

  for (let i = w; i < nums.length; i++) {
    cleanup(i, currentWindow, nums);

    if (currentWindow.length > 0
            && currentWindow.peekFront() <= i - w
    ) {
      currentWindow.shift();
    }

    currentWindow.push(i);
        
    output.push(nums[currentWindow.peekFront()]);
  }

  return output;
}

function cleanup (index, currentWindow, nums) {
  while (currentWindow.length > 0
        && nums[index] >= nums[currentWindow.peekBack()]
  ) {
    currentWindow.pop();
  }
}

const testCases = [
  [[-4, 2, -5, 3, 6], 3, [2, 3, 6]],
  [[1, 2, 3, 4, 5, 6], 6, [6]],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4, [4, 5, 6, 7, 8, 9, 10]],
];

testCases.forEach(([nums, w, expectedOutput]) => {
  const result = findMaxSlidingWindow(nums, w);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((expectedValue) => {
    if (!result.includes(expectedValue)) {
      passes = false;
    }
  });

  console.log({ nums, w, expectedOutput, result, passes });
});