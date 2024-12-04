## Sliding Windows Pattern Problems

### Repeated DNA Sequences
Given a string, dna, that represents a DNA subsequence, and a number k, return all the contiguous subsequences (substrings) of length k that occur more than once in the string. The order of the returned subsequences does not matter. If no repeated substring is found, the function should return an empty set.

The DNA sequence is composed of a series of nucleotides abbreviated as A, C, G, and T. For example, ACGAATTCCG is a DNA sequence.  When studying DNA, it is useful to identify repeated sequences in it.


### Sliding Window Maximum
Given an integer array, nums, find the maximum values in all the contiguous subarrays (windows) of size w.


### Minimum Window Subsequence
Given two strings, str1 and str2, find the shortest substring in str1 such that str2 is a subsequence of that substring.

A substring is defined as a contiguous sequence of characters within a string. A subsequence is a sequence that can be derived from another sequence by deleting zero or more elements without changing the order of the remaining elements.

Let’s say you have the following two strings:
- str1 = "abbcb"
- str2 = "ac"

In this example, “abbc” is a substring of str1, from which we can derive str2 simply by deleting both the instances of the character b. Therefore, str2 is a subsequence of this substring. Since this substring is the shortest among all the substrings in which str2 is present as a subsequence, the function should return this substring, that is, “abbc”.

If there is no substring in str1 that covers all characters in str2, return an empty string.

If there are multiple minimum-length substrings that meet the subsequence requirement, return the one with the left-most starting index.


### Longest Repeating Character Replacement
Given a string s and an integer k, find the length of the longest substring in s, where all characters are identical, after replacing, at most, k characters with any other lowercase English character.


### Minimum Window Substring
Given two strings, s and t, find the minimum window substring in s, which has the following properties:

1. It is the shortest substring of s that includes all of the characters present in t.
2. It must contain at least the same frequency of each character as in t.
3. The order of the characters does not matter here.

Note: If there are multiple valid minimum window substrings, return any one of them.


### Longest Substring without Repeating Characters
Given a string, str, return the length of the longest substring without repeating characters.


### Minimum Size Subarray Sum
Given an array of positive integers, nums, and a positive integer, target, find the minimum length of a contiguous subarray whose sum is greater than or equal to the target. If no such subarray is found, return 0.


### Best Time to Buy and Sell Stock
Given an array where the element at the index i represents the price of a stock on day i, find the maximum profit that you can gain by buying the stock once and then selling it.

Note: You can buy the stock on one specific day and sell it on a different day to make a profit. If no profit can be achieved, we return zero.

Constraints:
- We can’t sell before buying a stock, that is, the array index at which stock is bought will always be less than the index at which the stock is sold.
