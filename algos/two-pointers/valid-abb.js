
/**
 * Questions:
 * - how should we handle empty string for abb?
 * - how should we handle empty string for word?
 * - do we need to check if inputs are strings?
 * - can an abbreviation have multiple numbers in it?
 * 
 * Algos:
 * - use two-pointer strategy:
 *    - set abbIdx and wordIdx to 0
 *    - iterate each character in abb input:
 *       - check if abb[abbIdx] === word[wordIdx]:
 *          - if it is continue
 *          - if not:
 *              - check if character can be a number:
    *              - if so, convert character to number
 *                   and add number to wordIdx
 *                   and increment abbIdx and wordIdx 
 *              - if not return false
 *    - return true
 * Tradeoffs:
 * 
 * Tests:
 * - 'in5ion', 'innovation' => true
 * - 'min3et', 'mindset' => false,
 * - 'lead04ip', 'leadership' => false,
 */

// '13iz4n'

// 'internationalization'

function isValidAbb(abb, word) {
  let abbIdx = 0;
  let wordIdx = 0;

  let numIdx = 0; // index for start of number

  while (abbIdx < abb.length) {
    if (abb[abbIdx] !== word[wordIdx]) {
      if (!isNaN(abb[abbIdx])) {
        numIdx = abbIdx;
        let numStr = '';

        while (numIdx < abb.length && !isNaN(abb[numIdx])) {
          numStr += abb[numIdx];
          numIdx++;
        }

        const num = Number(numStr);

        if (num === 0) {
          return false;
        }

        abbIdx = numIdx;
        wordIdx += num;
      } else {
        return false;
      }
    } else {
      abbIdx++;
      wordIdx++;
    }
  }

  return wordIdx === word.length && abbIdx === abb.length;
}


// [input, expectedOutput]
const testCases = [
  [['in5ion', 'innovation'], true],
  [['min3et', 'mindset'], false],
  [['lead04ip', 'leadership'], false],
  [['lead2', 'leader'], true],
  [['13iz4n', 'internationalization'], true],
  [['2', 'z'], false],
  [['y0', 'y'], false],
];

testCases.forEach(([input, expectedOutput]) => {
  const [ abb, word ] = input;
  const result = isValidAbb(abb, word);
  const isEqual = result === expectedOutput;

  console.log({ abb, word, result, expectedOutput, isEqual });
});




