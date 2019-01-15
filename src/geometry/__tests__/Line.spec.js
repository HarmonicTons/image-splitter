const Point = require('../Point');
const Line = require('../Line');

describe('slope', () => {
  it('should get the slope of a non-vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    expect(line.slope).toBe(0.5);
  });

  it('should get the slope of a non-vertical line no matter the order of the declarative points', () => {
    const line = new Line({ x0: 5, y0: 2, x1: 1, y1: 0 });
    expect(line.slope).toBe(0.5);
  });

  it('should get undefined instead of the slope for a vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 1, y1: 2 });
    expect(line.slope).toBeUndefined();
  });
});

describe('offset', () => {
  it('should get the offset of a non-vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    expect(line.offset).toBe(-0.5);
  });

  it('should get undefined instead of the offset for a vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 1, y1: 2 });
    expect(line.offset).toBeUndefined();
  });
});

describe('isOnLine', () => {
  it('should return true when a point is on a non-vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    const point = new Point({ x: 2, y: 0.5 });
    expect(line.isOnLine({ point })).toBe(true);
  });

  it('should return true when a point is on a non-vertical line not matter the order of the declarative points', () => {
    const line = new Line({ x0: 5, y0: 2, x1: 1, y1: 0 });
    const point = new Point({ x: 2, y: 0.5 });
    expect(line.isOnLine({ point })).toBe(true);
  });

  it('should return false when a point is not on a non-vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    const point = new Point({ x: 2, y: 0.6 });
    expect(line.isOnLine({ point })).toBe(false);
  });

  it('should return true when a point is on a vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 1, y1: 2 });
    const point = new Point({ x: 1, y: 1 });
    expect(line.isOnLine({ point })).toBe(true);
  });

  it('should return false when a point is not on a vertical line', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 1, y1: 2 });
    const point = new Point({ x: 1.1, y: 8 });
    expect(line.isOnLine({ point })).toBe(false);
  });

  it('should return true when a point is close enough with a threshold', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    const point = new Point({ x: 2, y: 0.6 });
    expect(line.isOnLine({ point, threshold: 0.2 })).toBe(true);
  });

  it('should return true when a point is close enough with a threshold', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    const point = new Point({ x: 2, y: 0.6 });
    expect(line.isOnLine({ point, threshold: 0.2 })).toBe(true);
  });

  it('should return false when a point is on the line but out of boundary', () => {
    const line = new Line({ x0: 1, y0: 0, x1: 5, y1: 2 });
    const point = new Point({ x: 0, y: -0.5 });
    expect(line.isOnLine({ point, oob: true })).toBe(true);
    expect(line.isOnLine({ point, oob: false })).toBe(false);
  });
});

describe('intersection', () => {
  it('should return a point when two lines intersect', () => {
    const line1 = new Line({x0: 1, y0: 2, x1: 3, y1: 5});
    const line2 = new Line({x0: 0, y0: 6, x1: 3, y1: 3});
    expect(Line.intersection({line1, line2})).toBeDefined();
  });

  it('should return undefined when two lines do not intersect', () => {
    const line1 = new Line({x0: 1, y0: 2, x1: 3, y1: 5});
    const line2 = new Line({x0: 0, y0: 6, x1: 2, y1: 9});
    expect(Line.intersection({line1, line2})).toBeUndefined();
  });

  it('should return undefined when two lines intersect out of boundary', () => {
    const line1 = new Line({x0: 1, y0: 2, x1: 3, y1: 5});
    const line2 = new Line({x0: 0, y0: 6, x1: 1, y1: 5});
    expect(Line.intersection({line1, line2, oob: true})).toBeDefined();
    expect(Line.intersection({line1, line2, oob: false})).toBeUndefined();
  });

  it('should return a point when two lines intersect, the 1st being vertical', () => {
    const line1 = new Line({x0: 1, y0: 2, x1: 3, y1: 5});
    const line2 = new Line({x0: 2, y0: 6, x1: 2, y1: -5});
    expect(Line.intersection({line1, line2})).toBeDefined();
  });

  it('should return a point when two lines intersect, the 2nd being vertical', () => {
    const line1 = new Line({x0: 2, y0: 6, x1: 2, y1: -5});
    const line2 = new Line({x0: 1, y0: 2, x1: 3, y1: 5});
    expect(Line.intersection({line1, line2})).toBeDefined();
  });

  it('should return undefined when two lines are vertical', () => {
    const line1 = new Line({x0: 2, y0: 6, x1: 2, y1: -5});
    const line2 = new Line({x0: 1, y0: 2, x1: 1, y1: 5});
    expect(Line.intersection({line1, line2})).toBeUndefined();
  });
})
