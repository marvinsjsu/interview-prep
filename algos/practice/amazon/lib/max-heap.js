
class MaxHeap { 
  constructor(data = new Array(), compareFunc = null) { 
    this.data = data;
    this.compare = compareFunc || this.compare;
    this.heapify();
  }

  compare(a, b) { 
    return b[1] - a[1];
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

  }

  heapDown(index) { 

  }

  swap(index1, index2) { 
        
  }
}

module.exports = MaxHeap;
