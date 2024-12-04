
class MinHeap { 
  constructor(data = new Array(), compareFunc = null) {
    this.data = [...data];
    this.compare = compareFunc || this.defaultCompare;
    this.length = data.length;
    this.heapify();
  }

  defaultCompare(a, b) { 
    return a - b;
  }

  heapify() { 
    if (this.data.length < 2) { 
      return;
    }

    for (let i = 1; i < this.data.length; i++) { 
      this.heapUp(i);
    }
  }

  heapUp(index) { 
    while (index > 0) { 
      const parentIndex = (index - 1) >> 1;

      if (this.compare(this.data[parentIndex], this.data[index]) > 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else { 
        break;
      }
    }
  }

  heapDown(index) { 
    while (true) { 
      const leftChildIndex = (index * 2) + 1;
      const rightChildIndex = (index * 2) + 2;

      let findIndex = index;

      if (leftChildIndex < this.data.length
                && this.compare(this.data[findIndex], this.data[leftChildIndex]) > 0
      ) { 
        findIndex = leftChildIndex;
      }

      if (rightChildIndex < this.data.length
                && this.compare(this.data[findIndex], this.data[rightChildIndex]) > 0
      ) { 
        findIndex = rightChildIndex;
      }

      if (findIndex !== index) {
        this.swap(index, findIndex);
        index = findIndex;
      } else { 
        break;
      }
    }
  }

  peek() { 
    return this.data[0];
  }

  poll() { 
    if (this.data.length === 0) { 
      return null;
    }

    const toRemove = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.heapDown(0);
    }
            
    return toRemove;
  }

  insert(value) { 
    this.data.push(value);
    this.heapUp(this.data.length - 1);
  }

  swap(index1, index2) { 
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
  }
}


module.exports = MinHeap;
