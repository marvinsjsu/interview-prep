/**
 * 
 * Questions:
 * - What should we return if our dna input is an empty string? empty set
 * - What should we return if our k input is 0? empty set
 * - Can I have some example test cases? sure
 * - Does the order of substrings matter in our output? no
 * - Does our output have to be a Set or can it be an array of unique substrings? array is fine
 * 
 * Test cases:
 * - "GAGTCACAGTAGTTTCA", 3, ["AGT", "TCA"]
 * - "CAAACCCCGTAAACCCCA", 7, ["AAACCCC"]
 * 
 * Algos:
 * - use Sliding Windows approach:
 *      - use a set, "output", to store substrings that occur more than once
 *      - use another set, "occurrences", to store substrings
 *      - visit each nucleotide in our dna (for loop, terminate this k nucleutides before the end of dna string)
 *          - we'll store a substring that starts from our first nucleotide to k nucleutides (use a set)
 *          - we'll check our "occurrences" set to see if substring has already been stored
 *              - if not, then store it in "occurrences" set
 *              - if yes, then store it in "output" set
 *      - return "output" set
 * 
 * Trade-offs:
 *  - Time-complexity:
 *      = O(n - k) * O(k), n = # of nucleotides or characters in dna, k = length of a substring
 *      = O(nk)
 *      = O(n)
 *  - Space-complexity:
 *      = O(m), m = # of combinations of A, C, G, T in length k
 *      = constant
 */

function getRepeatedDNASequences(dna, k) {
    
  if (dna.length === 0 || k === 0) { 
    return [];
  }

  const output = [];
  const occurrences = new Set();

  // Time-complexity is O(n - k)
  for (let i = 0; i < dna.length - k + 1; i++) { 
    // Time-complexity is a constant
    const substring = dna.slice(i, i + k);

    // Time-complexity is constant
    if (occurrences.has(substring)) {
      output.push(substring);
    } else { 
      occurrences.add(substring);
    }
  }

  return output;
}

const testCases = [
  ['GAGTCACAGTAGTTTCA', 3, ['AGT', 'TCA']],
  ['CAAACCCCGTAAACCCCA', 7, ['AAACCCC']],
];

testCases.forEach(([dna, k, expectedOutput]) => { 
  const result = getRepeatedDNASequences(dna, k);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((substring) => { 
    if (!result.includes(substring)) { 
      passes = false;
    }
  });


  console.log({ dna, k, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});