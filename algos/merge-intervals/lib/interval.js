
class Interval { 
  constructor(start, end, employeeId) { 
    this.start = start;
    this.end = end;
    this.employeeId = employeeId;
  }

  display() { 
    return `${this.employeeId}: ${start} ---- ${end}`;
  }
}

module.exports = Interval;
