class Point { 
  constructor(x, y) { 
    this.x = x;
    this.y = y;
  }

  getDistance() { 
    const squaredX = this.x * this.x;
    const squaredY = this.y * this.y;

    return Math.sqrt(squaredX + squaredY);
  }
}

module.exports = Point;
