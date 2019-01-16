const _ = require('lodash');

const Line = require('./Line');
const Point = require('./Point');

class Polygon {
  /**
   * Construct a Polygon from a list of its corners
   * @param {Object} w wrapper
   * @param {Point[]} w.points corners of the polygon
   * @returns {Polygon}
   */
  constructor({ points }) {
    if (points.length < 3) {
      throw new Error('Polygons must have at least 3 corners');
    }
    this.points = points;
  }

  /**
   * @type {Line[]} list of the sides of the Polygon
   */
  get sides() {
    return this.points.map((point, index) => {
      const nextPoint = this.points[index + 1] || this.points[0];
      return new Line({ point0: point, point1: nextPoint });
    });
  }

  /**
   * @type {number} the lowest x coordinate in the polygon
   */
  get xMin() {
    return _.minBy(this.points, point => point.x).x;
  }

  /**
   * @type {number} the highest x coordinate in the polygon
   */
  get xMax() {
    return _.maxBy(this.points, point => point.x).x;
  }

  /**
   * @type {number} the lowest y coordinate in the polygon
   */
  get yMin() {
    return _.minBy(this.points, point => point.y).y;
  }

  /**
   * @type {number} the highest y coordinate in the polygon
   */
  get yMax() {
    return _.maxBy(this.points, point => point.y).y;
  }

  /**
   * Indicate if a point is inside a polygon
   * @param {Point} point
   * @returns {boolean} true if the point is inside
   */
  isInsidePolygon({ point }) {
    // if the point is not in the same area than the polygon
    if (point.x < this.xMin || point.x > this.xMax || point.y < this.yMin || point.y > this.yMax) {
      return false;
    }

    // the point is inside the polygon if a line from this point
    // intersects the sides of the polygon an odd number of time
    const line = new Line({ point0: point, point1: new Point({ x: this.xMax, y: point.y }) });
    const intersectionsBySide = this.sides.map(side => ({
      intersection: Line.intersection({
        line1: line,
        line2: side,
        oob: false,
      }),
      side,
    }));

    // keep only the intersection where the side is under the control-line
    const intersections = intersectionsBySide.filter(ibs => ibs.intersection !== undefined
      && (
        (
          !Point.areEquals({ point1: ibs.side.point0, point2: ibs.intersection })
      && ibs.side.point0.y < ibs.intersection.y
        ) || (
          !Point.areEquals({ point1: ibs.side.point1, point2: ibs.intersection })
        && ibs.side.point1.y < ibs.intersection.y
        )
      )).map(ibs => ibs.intersections);

    const nbOfIntersections = intersections.length;
    return nbOfIntersections % 2 !== 0;
  }
}

module.exports = Polygon;
