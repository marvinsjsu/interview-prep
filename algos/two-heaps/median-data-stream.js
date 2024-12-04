
const MinHeap = require('../libs/min-heap');

class MedianDataStream { 
  constructor() { 
    this.minHeapForLarge = new MinHeap();
    this.maxHeapForSmall = new MinHeap();
  }

  insert(num) { 
    if (this.maxHeapForSmall.size() === 0
            || (-1 * this.maxHeapForSmall.peek()) >= num
    ) {
      this.maxHeapForSmall.offer(-1 * num);
    } else { 
      this.minHeapForLarge.offer(num);
    }

    // rebalance
    if (this.maxHeapForSmall.size() > this.minHeapForLarge.size() + 1) {
      this.minHeapForLarge.offer(-1 * this.maxHeapForSmall.poll());
    } else if (this.maxHeapForSmall.size() < this.minHeapForLarge.size()) { 
      this.maxHeapForSmall.offer(-1 * this.minHeapForLarge.poll());
    }
  }

  findMedian() { 
    if (this.maxHeapForSmall.size() === this.minHeapForLarge.size()) {
      return ((-1 * this.maxHeapForSmall.peek()) + this.minHeapForLarge.peek()) / 2.0;
    }

    return (-1 * this.maxHeapForSmall.peek()) / 1.0;
  }
}


