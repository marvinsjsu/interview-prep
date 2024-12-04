## Fast Pointer Slow Pointer Pattern Problems

### Happy Number
Write an algorithm to determine if a number n is a happy number.

We use the following process to check if a given number is a happy number:

Starting with the given number n, replace the number with the sum of the squares of its digits.  Repeat the process until:

- The number equals 1, which will depict that the given number n is a happy number.
- The number enters a cycle, which will depict that the given number n is not a happy number.



### Linked List Cycle
Check whether or not a linked list contains a cycle. If a cycle exists, return TRUE. Otherwise, return FALSE. The cycle means that at least one node can be reached again by traversing the next pointer.



### Middle of the Linked List
Given the head of a singly linked list, return the middle node of the linked list. If the number of nodes in the linked list is even, there will be two middle nodes, so return the second one.



### Circular Array Loop
We are given a circular array of non-zero integers, nums, where each integer represents the number of steps to be taken either forward or backward from its current index. Positive values indicate forward movement, while negative values imply backward movement. When reaching either end of the array, the traversal wraps around to the opposite end.

The input array may contain a cycle, which is a sequence of indexes characterized by the following:

- The sequence starts and ends at the same index.
- The length of the sequence is at least two.
- The loop must be in a single direction, forward or backward.


### Find the Duplicate Number
Given an array of positive numbers, nums, such that the values lie in the range [1, n], inclusive, and that there are n + 1 numbers in the array, find and return the duplicate number present in nums. There is only one repeated number in nums.


### Palindrome Linked List
Given the head of a linked list, your task is to check whether the linked list is a palindrome or not. Return TRUE if the linked list is a palindrome; otherwise, return FALSE.


