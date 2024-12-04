
class MinHeap { 
  constructor(data = new Array(), compare = null) {
    const defaultCompare = (a, b) => a[0] - b[0];
    this.data = data;
    this.compare = compare || defaultCompare;
    this.heapify();
  }

  heapify() { 
    if (this.data.length < 2) { 
      return;
    }

    // There are two ways to heapify:
    // - from top, we use heapDown
    // - from bottom, we use heapUp

    // for (let i = this.data.length - 1; i >= 0; i--) { 
    //     this.heapDown(i);
    // }

    for (let i = 1; i < this.data.length; i++) { 
      this.heapUp(i);
    }
  }

  heapUp(index) { 
    while (index > 0) { 
      const interval = this.data[index];
      const parentIdx = (index - 1) >> 1;

      if (this.compare(interval, this.data[parentIdx]) < 0) {
        this.swap(index, parentIdx);
        index = parentIdx;
      } else { 
        break;
      }
    }
  }

  heapDown(index) { 
    while (true) { 
      const interval = this.data[index];
      const leftChildIdx = (index * 2) + 1;
      const rightChildIdx = (index * 2) + 2;

      let findIdx = index;

      if (leftChildIdx < this.data.length
                && this.compare(interval, this.data[leftChildIdx]) > 0
      ) { 
        findIdx = leftChildIdx;
      }

      if (rightChildIdx < this.data.length
                && this.compare(interval, this.data[rightChildIdx]) > 0
      ) { 
        findIdx = rightChildIdx;
      }

      if (findIdx !== index) {
        this.swap(index, findIdx);
        index = findIdx;
      } else { 
        break;
      }
    }
  }

  swap(index1, index2) { 
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
  }

  poll() { 
    if (this.data.length === 0) { 
      return null;
    }

    const removedInterval = this.data[0];
    const newRootInterval = this.data.pop();

    if (this.data.length !== 0) { 
      this.data[0] = newRootInterval;
      this.heapDown(0);
    }

    return removedInterval;
  }

  peek() { 
    return this.data[0];
  }

  insert(interval) { 
    this.data.push(interval);
    this.heapUp(this.data.length - 1);
  }

  size() { 
    return this.data.length;
  }
}


module.exports = MinHeap;
