/**
 * K Closest Points to Origin
 * 
 * Given a list of points on a plane, where the plane is a 2-D array
 * with (x, y) coordinates, find the k closest points to the
 * origin (0, 0).
 */

const MinHeap = require('../libs/min-heap');
const Point = require('../libs/point');

const testCases = [
  [[[1, 3], [-2, 2]], 1, [[-2, 2]]],
  [[[1, 3], [3, 4], [2, -1]], 2, [[1, 3], [2, -1]]],
];

testCases.forEach(([points, k, expectedOutput]) => {
    
  points = points.map(([x, y]) => new Point(x, y));

  const result = kClosest(points, k);
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach(([x, y], index) => { 
    const pointRes = result[index];

    if (x !== pointRes.x || y !== pointRes.y) { 
      passes = false;
    }
  }); 

  console.log({ points, k, expectedOutput, result, passes });
});




function kClosest(points, k) { 

  const maxHeap = new MinHeap([], (a, b) => b[0] - a[0]);

  let i = 0;

  for (i; i < Math.min(points.length, k); i++) { 
    const point = points[i];
    const distance = point.getDistance();
    maxHeap.offer([distance, point]);
  }

  while (i < points.length) {
    const point = points[i];
    const distance = point.getDistance();

    if (maxHeap.size() && distance < maxHeap.peek()[0]) { 
      maxHeap.poll();
      maxHeap.offer([distance, point]);
    }

    i++;
  }

  const output = [];

  while (maxHeap.size() > 0) { 
    const [_, point] = maxHeap.poll();
    output.push(point);
  }

  return output;
}

function getDistance(x, y) { 
  const squaredX = Math.abs(x) * Math.abs(x);
  const squaredY = Math.abs(y) * Math.abs(y);
  return Math.sqrt(squaredX + squaredY);
}

