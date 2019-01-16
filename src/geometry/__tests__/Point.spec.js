const Point = require('../Point');

describe('constructore', () => {
  it('should get a Point', () => {
    const p = new Point({ x: 5, y: 2 });
    expect(p).toBeDefined();
  });
});

describe('distance', () => {
  it('should get the distance between 2 points', () => {
    const point1 = new Point({ x: 5, y: 2 });
    const point2 = new Point({ x: 6, y: 3 });
    expect(Point.distance({ point1, point2 })).toBeCloseTo(1.41);
  });
});

describe('areEquals', () => {
  it('should return true if two points are on top of each other', () => {
    const point1 = new Point({ x: 5, y: 2 });
    const point2 = new Point({ x: 5, y: 2 });
    expect(Point.areEquals({ point1, point2 })).toBe(true);
  });

  it('should return true if two points are close enough with a threshold', () => {
    const point1 = new Point({ x: 5, y: 2 });
    const point2 = new Point({ x: 5.01, y: 1.99 });
    expect(Point.areEquals({ point1, point2, threshold: 0.1 })).toBe(true);
  });

  it('should return false if two points are not on top of each other', () => {
    const point1 = new Point({ x: 5, y: 2 });
    const point2 = new Point({ x: 6, y: 1 });
    expect(Point.areEquals({ point1, point2 })).toBe(false);
  });
});
