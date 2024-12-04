## Two-Pointers Pattern Problems

### Valid Palindrome
Write a function that takes a string, s, as an input and determines whether or not it is a palindrome.


### 3Sum
Given an array of integers, nums, and an integer value, target, determine if there are any three integers in nums whose sum is equal to the target, that is, nums[i] + nums[j] + nums[k] == target. Return TRUE if three such integers exist in the array. Otherwise, return FALSE.


### Remove Nth Node from End of List
Given a singly linked list, remove the nth node from the end of the list and return its head.


### Sort Colors
Given an array, colors, which contains a combination of the following three elements:

- 0 (representing red)
- 1 (representing white)
- 2 (representing blue)

Sort the array in place so that the elements of the same color are adjacent, with the colors in the order of red, white, and blue. To improve your problem-solving skills, do not utilize the built-in sort function.


### Reverse Words in a String
Given a sentence, reverse the order of its words without affecting the order of letters within the given word.

Constraints:

- The sentence contains English uppercase and lowercase letters, digits, and spaces.
- 1 ≤ sentence.length ≤ 10^4
- The order of the letters within a word is not to be reversed.


### Valid Word Abbreviation
Given a string word and an abbreviation abbr, return TRUE if the abbreviation matches the given string. Otherwise, return FALSE.

A certain word "calendar" can be abbreviated as follows:

- "cal3ar" ("cal end ar" skipping three characters "end" from the word "calendar" still matches the provided abbreviation)

- "c6r" ("c alenda r" skipping six characters "alenda" from the word "calendar" still matches the provided abbreviation)

The word "internationalization" can also be abbreviated as "i18n" (the abbreviation comes from skipping 18 characters in "internationalization", leaving the first and last letters "i" and "n").

The following are not valid abbreviations:
- "c06r" (has leading zeroes)
- "cale0ndar" (replaces an empty string)
- "c24r" ("c al enda r" the replaced substrings are adjacent)


### Valid Palindrome II
Write a function that takes a string as input and checks whether it can be a valid palindrome by removing at most one character from it.

