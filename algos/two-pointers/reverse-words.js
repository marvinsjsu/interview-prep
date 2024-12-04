/**
 * Questions:
 * - Can we use split using space as the delimiter? no
 * - Will our input string have multiple spaces adjacent to each other?
 * 
 * Algos:
 * - use two-pointer strategy for reversing string
 * 
 * Tradeoffs:
 *    - space-complexity:
 *    - time-complexity:
 * 
 * Tests:
 * 
 */

function reverseHelper (str, start, end) {
  let strArr = str.split('');

  while (start < end) {
    [strArr[start], strArr[end]] = [strArr[end], strArr[start]];
    start++;
    end--;
  }

  return strArr.join('');
}


function reverseWord (sentence) {
  sentence = sentence.replace(/\s+/g, ' ').trim();
    
  const strEndIdx = sentence.length - 1;

  sentence = reverseHelper(sentence, 0, strEndIdx);

  for (let start = 0, end = 0; end <= strEndIdx; end++) {
        
    if (end === strEndIdx || sentence[end] === ' ') {
            
      const endIdx = (end === strEndIdx)
        ? end
        : end - 1;

      sentence = reverseHelper(sentence, start, endIdx);
      start = end + 1;
    }
  }

  return sentence;
}

// Testcases [input, expectedOutput]
const testCases = [
  ['test case one', 'one case test'],
  ['We love JavaScript ', 'JavaScript love We'],
  ['1234 abc XYZ', 'XYZ abc 1234'],
  ['You are amazing', 'amazing are You'],
  ['Hello   World', 'World Hello'],
  ['Greeting123', 'Greeting123'],
];


testCases.forEach(([input, expectedOutput]) => {
  const result = reverseWord(input);
  const isEqual = result === expectedOutput;
  console.log({ input, result, expectedOutput, isEqual });
});

