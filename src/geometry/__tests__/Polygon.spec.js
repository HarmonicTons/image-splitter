const Point = require('../Point');
const Polygon = require('../Polygon');

describe('constructore', () => {
  it('should get a Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    expect(p).toBeDefined();
  });

  it('should get an error if not enough points are given', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
    ];
    expect(() => {
      // eslint-disable-next-line
      const p = new Polygon({ points });
    }).toThrowError('Polygons must have at least 3 corners');
  });
});

describe('sides', () => {
  it('should get the sides of a Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    expect(p.sides.length).toBe(3);
  });
});

describe('limits', () => {
  it('should get the xMin of a Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    expect(p.xMin).toBe(1);
  });
  it('should get the xMax of a Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    expect(p.xMax).toBe(6);
  });
  it('should get the yMin of a Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    expect(p.yMin).toBe(1);
  });
  it('should get the yMax of a Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    expect(p.yMax).toBe(4);
  });
});

describe('isInsidePolygon', () => {
  it('should return true if a point is inside the Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 3, y: 3 });
    expect(p.isInsidePolygon({ point })).toBe(true);
  });

  it('should return false if a point is outside the Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 2, y: 3 });
    expect(p.isInsidePolygon({ point })).toBe(false);
  });

  it('should return false if a point is obviously outside the Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 10, y: 10 });
    expect(p.isInsidePolygon({ point })).toBe(false);
  });

  it('should return true if a point is inside the Polygon, the control line passing by one corner', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 3, y: 2 });
    expect(p.isInsidePolygon({ point })).toBe(true);
  });

  it('should return true if a point is a corner of the Polygon', () => {
    const points = [
      new Point({ x: 1, y: 1 }),
      new Point({ x: 3, y: 4 }),
      new Point({ x: 6, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 6, y: 2 });
    expect(p.isInsidePolygon({ point })).toBe(true);
  });

  it('should return true if a point is inside a complex Polygon', () => {
    const points = [
      new Point({ x: 0, y: 5 }),
      new Point({ x: 7, y: 4 }),
      new Point({ x: 4, y: 7 }),
      new Point({ x: 1, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 4, y: 5 });
    expect(p.isInsidePolygon({ point })).toBe(true);
  });

  it('should return false if a point is outside a complex Polygon', () => {
    const points = [
      new Point({ x: 0, y: 5 }),
      new Point({ x: 7, y: 4 }),
      new Point({ x: 4, y: 7 }),
      new Point({ x: 1, y: 2 }),
    ];
    const p = new Polygon({ points });
    const point = new Point({ x: 2, y: 5 });
    expect(p.isInsidePolygon({ point })).toBe(false);
  });
});
