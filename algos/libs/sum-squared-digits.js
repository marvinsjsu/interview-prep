
function sumSquaredDigits (num) {
  const digits = num.toString().split('');

  let sum = 0;
  let i = 0;

  while (i < digits.length) {
    sum += digits[i] * digits[i];
    i++;
  }

  return sum;
}

const testCases = [
  [24, 20], 
  [8, 64],
  [12, 5],
];

testCases.forEach(([num, expectedOutput]) => {
  const result = sumSquaredDigits(num);
  const passes = result === expectedOutput;

  console.log({ num, expectedOutput, result, passes });
});
