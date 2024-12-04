
function reverseWordsInSentence(sentence) { 
  if (!sentence || sentence.length === 0) { 
    return sentence;
  }

  // time-complexity: O(m), m = total # of characters in the sentence
  // space-complexity: O(w), w = total # of words in the sentence
  let words = sentence.replace(/\s+\g/, ' ').split(' '); 

  let ptr1 = 0;
  let ptr2 = words.length - 1;

  // time-complexity: O(w), w = total # of words in the sentence
  // space-complexity: O(1)
  while (ptr1 < ptr2) { 
    [words[ptr1], words[ptr2]] = [words[ptr2], words[ptr1]];
    ptr1++;
    ptr2--;
  }

  return words.join(' ');
}

/**
 * Time-complexity
 *  = O(m) + O(w)
 *  = O(m+w), linear
 * 
 * Space-complexity
 *  = O(w) + O(1)
 *  = O(w), constant
 */


const testCases = [
  ['test case one', 'one case test'],
  ['We love JavaScript ', 'JavaScript love We'],
  ['1234 abc XYZ', 'XYZ abc 1234'],
  ['You are amazing', 'amazing are You'],
  ['Hello   World', 'World Hello'],
  ['Greeting123', 'Greeting123'],
];


testCases.forEach(([input, expectedOutput]) => {
  const result = reverseWordsInSentence(input);
  const isEqual = result === expectedOutput;
  console.log({ input, result, expectedOutput, isEqual });
});

