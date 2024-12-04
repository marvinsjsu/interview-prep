/**
 * Kth Largest Element in a Stream
 * 
 * Given an infinite stream of integers (sorted or unsorted), nums,
 * design a class to find the kth largest element in a stream.
 * 
 * The class should have the following functions, inputs, and return values:
 * - Init(nums, k): It takes an array of integers nums and an integer k and initializes the class object.
 * - Add(value): It takes one integer value, appends it to the stream, and returns the element
 *   representing the kth largest element in the stream.
 * 
 */

const testCases = [
  [[3, 4, 5], 2, 4],
];

testCases.forEach(([nums, k, expectedOutput]) => { 


});

const MinHeap = require('../libs/min-heap');

class KthLargestElementInStream { 
  constructor() { 
    this.minHeap = new MinHeap([], (a, b) => a - b);
    this.maxHeapSize = null;
  }

  init(nums, k) { 
    this.maxHeapSize = k;

    let i = 0;

    while (this.minHeap.size() < this.maxHeapSize) { 
      this.minHeap.offer(nums[i]);
      i++;
    }

    for (i; i < nums.length; i++) { 
      this.add(nums[i]);
    }
  }

  add(value) { 
    if (this.minHeap.size() < this.maxHeapSize - 1) { 
      this.minHeap.offer(value);
    } else if (value > this.minHeap.peek()) { 
      this.minHeap.poll();
      this.minHeap.offer(value);
    }

    return this.minHeap.peek();
  }
}
