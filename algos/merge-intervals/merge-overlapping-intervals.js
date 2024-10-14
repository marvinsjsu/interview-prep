/**
 * Merge intervals: Given a sorted list of intervals, merge all overlapping intervals.
 * 
 * Questions:
 * - Will an interval always be represented as [start, end]?
 * 
 * Test-cases:
 * - [[1, 3], [3, 7], [9, 12], [10, 14], [15, 17], [16, 18]], [[1, 7], [9, 14], [15, 18]]
 * 
 * 
 * Algos:
 * 
 * 
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

function mergeOverlappingIntervals (intervals) {

    if (intervals.length <= 1) {
        return intervals;
    }

    const overlappingIntervals = [];

    intervals.forEach(([ start, end ]) => {
        const prevInterval = overlappingIntervals[overlappingIntervals.length - 1];

        if (!Array.isArray(prevInterval)) {
            overlappingIntervals.push([start, end]);
        } else {
            const [ prevStart, prevEnd ] = prevInterval;
            
            if (start > prevEnd || end < prevStart) {
                overlappingIntervals.push([start, end]);
            } else {
                let mergedStart = prevStart;
                let mergedEnd = prevEnd;

                if (start <= prevStart) {
                    mergedStart = start;
                } else if (start > prevStart && start < prevEnd) {
                    mergedStart = prevStart;
                }
    
                if (end > prevStart && end < prevEnd) {
                    mergedEnd = prevEnd;
                } else if (end >= prevEnd) {
                    mergedEnd = end;
                }

                overlappingIntervals.pop();
                overlappingIntervals.push([mergedStart, mergedEnd]);
            }
        }
    });

    return overlappingIntervals;
}

const testCases = [
    [[[1, 3], [3, 7], [9, 12], [10, 14], [15, 17], [16, 18]], [[1, 7], [9, 14], [15, 18]]],
    [[[1, 5], [3, 7], [4, 6], [6, 8]], [[1, 8]]],
    [[[10, 12], [12, 15]], [[10, 15]]],
    [[[1, 3], [2, 6], [8, 10], [15, 18], [18, 20]], [[1, 6], [8, 10], [15, 20]]],
    [[[1, 6], [2, 4] ], [[1, 6]]],
    [[[1, 8]], [[1, 8]]],
    [[[2, 9], [3, 5], [4, 8]], [[2, 9]]],
    [[[2, 4], [3, 5], [4, 5], [6, 10], [12, 14] ], [[2, 5], [6, 10], [12, 14]]],
];

testCases.forEach(([ intervals, expectedOutput ]) => {
    const result = mergeOverlappingIntervals(intervals);
    
    let passes = result.length === expectedOutput.length;

    expectedOutput.forEach((expectedInterval, index) => {
        const resultInterval = result[index];

        expectedInterval.forEach((value, idx) => {
            if (resultInterval[idx] !== value) {
                passes = false;
            }
        });
    });

    console.log({ intervals, expectedOutput, result, passes });
});

