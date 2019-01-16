const images = require('images');
const Point = require('./geometry/Point');
const Polygon = require('./geometry/Polygon');

function main(imageName) {
  const img1 = images(`img/${imageName}`);

  const width = 300;
  const height = 200;

  const img2 = images(img1, 100, 50, width, height);
  const pixel = images(1, 1).fill(0x00, 0x00, 0x00);

  const points1 = [
    new Point({ x: 10, y: 10 }),
    new Point({ x: 270, y: 150 }),
    new Point({ x: 200, y: 50 }),
    new Point({ x: 70, y: 180 }),
    new Point({ x: 90, y: 200 }),
    new Point({ x: 150, y: 20 }),
    new Point({ x: 60, y: 80 }),
    new Point({ x: 220, y: 130 }),
  ];
  const polygon1 = new Polygon({ points: points1 });

  const points2 = [
    new Point({ x: 250, y: 10 }),
    new Point({ x: 270, y: 20 }),
    new Point({ x: 200, y: 30 }),
  ];
  const polygon2 = new Polygon({ points: points2 });

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const point = new Point({ x, y });
      if (!polygon1.isInsidePolygon({ point }) && !polygon2.isInsidePolygon({ point })) {
        img2.draw(pixel, x, y);
      }
    }
  }

  img2.save('img/result.png', 'png');
}

main('dog.png');
