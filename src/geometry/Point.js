const closeTo = require('../helpers/closeTo');

class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  static distance({ point1, point2 }) {
    return Math.sqrt(((point1.x - point2.x) ** 2) + ((point1.y - point2.y) ** 2));
  }

  static areEquals({ point1, point2, threshold }) {
    return closeTo(Point.distance({ point1, point2 }), 0, threshold);
  }
}

module.exports = Point;
