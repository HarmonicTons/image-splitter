const Point = require('./Point');
const closeTo = require('../helpers/closeTo');

class Line {
  constructor({
    point0, point1, x0, y0, x1, y1,
  }) {
    if (point0 !== undefined) {
      this.point0 = point0;
    } else {
      this.point0 = new Point({ x: x0, y: y0 });
    }
    if (point1 !== undefined) {
      this.point1 = point1;
    } else {
      this.point1 = new Point({ x: x1, y: y1 });
    }
  }

  /**
   * The slope of the line (undefined if vertical)
   */
  get slope() {
    if (this.point0.x < this.point1.x) {
      return (this.point1.y - this.point0.y) / (this.point1.x - this.point0.x);
    }
    if (this.point1.x < this.point0.x) {
      return (this.point0.y - this.point1.y) / (this.point0.x - this.point1.x);
    }
    return undefined;
  }

  /**
   * The y-intercept of the line (undefined if vertical)
   */
  get offset() {
    if (this.slope !== undefined) {
      return this.point0.y - this.slope * this.point0.x;
    }
    return undefined;
  }

  /**
   * Indicate if a point is on a line
   * @param {Object} w wrapper
   * @param {Point} w.point
   * @param {boolean} [w.oob=false] can the point be out of boundary?
   * @param {number} [w.threshold=0.001] how close to the string must we be to be considered on it
   * @returns {boolean} true if the point is on the line or close enough to it
   */
  isOnLine({ point, oob = false, threshold = 0.001 }) {
    if (oob) {
      if (this.slope !== undefined) {
        return closeTo(this.slope * point.x + this.offset, point.y, threshold);
      }
      return closeTo(this.point0.x, point.x, threshold);
    }
    return this.isOnLine({ point, oob: true, threshold })
    && (
      (point.x >= this.point0.x && point.x <= this.point1.x)
    || (point.x >= this.point1.x && point.x <= this.point0.x)
    ) && (
      (point.y >= this.point0.y && point.y <= this.point1.y)
    || (point.y >= this.point1.y && point.y <= this.point0.y)
    );
  }

  /**
   * Return the intersection point of 2 lines if it exists
   * @param {Object} w wrapper
   * @param {Line} w.line1
   * @param {Line} w.line2
   * @param {boolean} [w.oob=false] can the intersection be out of boundary?
   * @returns {Point|undefined} intersection point
   */
  static intersection({ line1, line2, oob = false }) {
    if (oob) {
      if (line1.slope && line2.slope) {
        if (line1.slope === line2.slope) {
          return undefined;
        }
        const x = (line2.offset - line1.offset) / (line1.slope - line2.slope);
        const y = line1.slope * x + line1.offset;
        return new Point({ x, y });
      }
      if (line1.slope) {
        const { x } = line2.point0;
        const y = line1.slope * x + line1.offset;
        return new Point({ x, y });
      }
      if (line2.slope) {
        const { x } = line1.point0;
        const y = line2.slope * x + line2.offset;
        return new Point({ x, y });
      }
      return undefined;
    }
    const point = Line.intersection({ line1, line2, oob: true });
    if (!point) {
      return undefined;
    }
    if (line1.isOnLine({ point, oob: false }) && line2.isOnLine({ point, oob: false })) {
      return point;
    }
    return undefined;
  }
}

module.exports = Line;
