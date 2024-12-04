/**
 * MinHeap methods:
 * - heapify
 * - peek
 * - offer
 * - poll
 * - percolateUp
 * - percolateDown
 * - swap
 * - size
 * 
 */

class MinHeap {
  constructor (data = new Array(), compareFunc = null) {
    this.data = data;
    this.compareVal = compareFunc || ((a, b) => a - b);
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

  percolateUp (index) {
    while (index > 0) {
      // right-shift operator (bit manipulation, move bit one position to the right)
      // or a more efficient way of doing (index - 1) / 2
      const parentIndex = (index - 1) >> 1; 
      if (this.compareVal(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  percolateDown (index) {
    const lastIdx = this.size() - 1;

    while (true) {
      const leftChildIdx = (index * 2) + 1;
      const rightChildIdx = (index * 2) + 2;

      let findIdx = index;

      if (leftChildIdx <= lastIdx
                && this.compareVal(this.data[leftChildIdx], this.data[findIdx]) < 0
      ) {
        findIdx = leftChildIdx;
      }

      if (rightChildIdx <= lastIdx
                && this.compareVal(this.data[rightChildIdx], this.data[findIdx]) < 0
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

  poll () {
    if (this.size() === 0) return null;

    const output = this.data[0];
    const last = this.data.pop();

    if (this.size() > 0) {
      this.data[0] = last;
      this.percolateDown(0);
    }

    return output;
  }

  swap (index1, index2) {
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
  }

  peek () {
    if (this.size() === 0) {
      return null;
    }

    return this.data[0];
  }

  size () {
    return this.data.length;
  }

  display () { 
    return this.data;
  }
}


module.exports = MinHeap;
