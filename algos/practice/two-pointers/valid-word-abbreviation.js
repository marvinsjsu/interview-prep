/**
 * 
Given a string word and an abbreviation abbr, return TRUE if the abbreviation matches the given string.
Otherwise, return FALSE.

A certain word "calendar" can be abbreviated as follows:

- "cal3ar" ("cal end ar" skipping three characters "end" from the word "calendar"
still matches the provided abbreviation)

- "c6r" ("c alenda r" skipping six characters "alenda" from the word "calendar"
still matches the provided abbreviation)

The word "internationalization" can also be abbreviated as "i18n"
(the abbreviation comes from skipping 18 characters in
"internationalization", leaving the first and last
letters "i" and "n").

The following are not valid abbreviations:
- "c06r" (has leading zeroes)
- "cale0ndar" (replaces an empty string)
- "c24r" ("c al enda r" the replaced substrings are adjacent)
 * 
 */

function isMatchingAbbreviation(abbr, word) { 
  if (word.length === 0 || abbr.length === 0) { 
    return false;
  }

  let ptr1 = 0;
  let ptr2 = 0;

  while (ptr1 < abbr.length && ptr2 < word.length) { 
    const ptr1Char = abbr[ptr1];
    const ptr2Char = word[ptr2];

    let currNumber = '';

    if (isNaN(ptr1Char)) {
      if (ptr1Char !== ptr2Char) {
        return false;
      } else {
        ptr1++;
        ptr2++;
      }
    } else { 
      let i = ptr1;
      while (i < abbr.length && !isNaN(abbr[i])) { 
        currNumber += abbr[i];
        i++;
      }

      let value = parseInt(currNumber);
      currNumber = '';

      ptr1 = i;
      ptr2 += value;
    }
  }

  if (ptr1 < abbr.length || ptr2 < word.length) { 
    return false;
  }

  return true;
}

const testCases = [
  ['i18n', 'internationalization', true],
  ['cal3ar', 'calendar', true],
  ['cal3ar', 'calendars', false]
];

testCases.forEach(([abbr, word, expectedOutput]) => { 
  const result = isMatchingAbbreviation(abbr, word);
    
  let passes = result === expectedOutput;

  console.log({ abbr, word, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});

