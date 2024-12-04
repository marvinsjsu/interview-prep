/**
 * Third Maximum Number
 * 
 * For a given integer array nums, your task is to return the 
 * third maximum distinct number in the array. If there are 
 * fewer than three distinct numbers, return the maximum 
 * number.
 * 
 */

class MinHeap {
  constructor(data = new Array(), compareFunc = null) {
    this.data = data;
    this.compareFunc = compareFunc || ((a, b) => a - b);
    this.heapify();
  }
  
  heapify () {
    if (this.size() < 2) {
      return;
    }
    
    for (let i = 1; i < this.size(); i++) {
      this.percolateUp(i);
    }
  }
  
  offer (value) {
    this.data.push(value);
    this.percolateUp(this.size() - 1);
  }
  
  peek () {
    return this.data[0] || null;
  }
  
  poll () {
    if (this.size() === 0) {
      return null;
    }
    
    const output = this.data[0];
    const newRoot = this.data.pop();
    
    if (this.size() > 1) {
      this.data[0] = newRoot;
      this.percolateDown(0);
    }
    
    return output;
  }
  
  percolateUp (index) {
    while (index > 0) {
        const parentIdx = (index - 1) >> 1;
      
        if (this.compareFunc(this.data[parentIdx], this.data[index]) > 0) {
            this.swap(parentIdx, index);
            index = parentIdx;
        } else { 
            break;
        }
      
    }
  }
  
  percolateDown (index) {
    const size = this.size();
    
    while (true) {
      const leftChildIdx = (index * 2) + 1;
      const rightChildIdx = (index * 2) + 2;
      
        let target = index;

        console.log(this.data);
      
      if (leftChildIdx < size
        && this.compareFunc(this.data[index], this.data[leftChildIdx]) > 0
      ) {
        target = leftChildIdx;
      }
      
      if (rightChildIdx < size
        && this.compareFunc(this.data[index], this.data[rightChildIdx]) > 0
      ) {
        target = rightChildIdx;
      }
      
      if (target !== index) {
        this.swap(target, index);
        index = target;
      } else {
        break;
      }
    }
  }
  
  swap (index1, index2) {
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
  }
  
  size () {
    return this.data.length;
  }
  
}


function thirdMax(nums){
  
  const maxSize = 3;
  const set = new Set();
  const minHeap = new MinHeap();
  
  let i = 0;

  for (i; i < Math.min(nums.length, maxSize); i++) {
      const val = nums[i];
    if (!set.has(val)) {
      minHeap.offer(val);
      set.add(val);
    }
  }
    
    while (i < nums.length) { 
        const val = nums[i];

        if (!set.has(val) && minHeap.size() > 0 && val > minHeap.peek()) { 
            const pollVal = minHeap.poll();
            set.delete(pollVal);
            minHeap.offer(val);
        }

        i++;
    } 
    
  return minHeap.size() === maxSize
    ? minHeap.peek()
    : minHeap.data[minHeap.size() - 1];
}


function thirdMaxPseudoMinHeap(nums) { 
    const maxSize = 3;
    const heap = [];
    const set = new Set();

    let i = 0;

    while (i < nums.length) { 
        const val = nums[i];

        if (!set.has(val)) {

            while (heap.length > maxSize) { 
                const polledValue = heap.shift();
                set.delete(polledValue);
            }

            if (heap.length > 0 && val > heap[0]) {
                const polledValue = heap.shift();
                set.delete(polledValue);
                heap.push(val);
                set.add(val);
            } else { 
                heap.push(val);
                set.add(val);
            }

            heap.sort((a, b) => a - b);
        }

        i++;
    }

    return heap.length === maxSize
        ? heap[0]
        : heap[heap.length - 1];
}


const testCases = [
    [[5, 2, 4, 1, 3, 5], 3],
    [[1, 1, 2], 2],
    [[7, 7, 7], 7],
];

testCases.forEach(([nums, expectedOutput]) => { 
    //   const result = thirdMax(nums);
  const result = thirdMaxPseudoMinHeap(nums);
    
  const passes = result === expectedOutput;

  console.log({ nums, expectedOutput, result, passes });
});

