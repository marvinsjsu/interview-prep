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
    constructor (data = new Array()) {
        this.data = data;
        this.compareVal = (a, b) => a - b;
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

    peek () {
        if (this.size() === 0) {
            return null;
        }

        return this.data[0];
    }

    offer (value) {
        this.data.push(value);
        this.percolateUp(this.size() - 1);
    }

    poll () {
        if (this.size() === 0) {
            return null;
        }

        const removed = this.data[0];
        const last = this.data.pop();

        if (this.size() > 0) {
            this.data[0] = last;
            this.percolateDown(0);
        }

        return removed;
    }

    percolateUp (index) {
        while (index > 0) {
            const parentIndex = (index - 1) >> 1;
            if (this.data[parentIndex] > this.data[index]) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    percolateDown (index) {
        while (true) {
            const leftChildIndex = (index * 2) + 1;
            const rightChildIndex = (index * 2) + 2;

            let findIndex = index;

            if (findIndex < this.size()
                && this.data[leftChildIndex] < this.data[findIndex]
            ) {
                findIndex = leftChildIndex;
            }

            if (findIndex < this.size()
                && this.data[rightChildIndex] < this.data[findIndex]
            ) {
                findIndex = rightChildIndex;
            }

            if (findIndex !== index) {
                this.swap(findIndex, index);
                index = findIndex;
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

const testCases = [
    [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5]],
    [[5, 3, 3, 10], [3, 3, 5, 10]],
];

testCases.forEach(([nums, expectedOutput]) => {
    const minHeap = new MinHeap(nums);
    
    console.log({ nums });
    const result = [];
    while (minHeap.size() > 0) {
        result.push(minHeap.poll());
    }

    let passes = result.length === expectedOutput.length;

    result.forEach((value, index) => {
        if (expectedOutput[index] !== value) {
            passes = false;
        }
    });

    console.log({ expectedOutput, result, passes });
});

