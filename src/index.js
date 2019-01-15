const images = require('images');

const Line = require('./geometry/Line');

const img1 = images('img/dogo.jpg') // Load image from file
  .size(400) // Geometric scaling the image to 400 pixels width
  .save('img/output.png', { // Save the image to a file, with the quality of 50
    quality: 0, // 保存图片到文件,图片质量为50
  });

const img2 = images(img1, 50, 50, 100, 100);

img2.save('img/output.png', { // Save the image to a file, with the quality of 50
  quality: 100, // 保存图片到文件,图片质量为50
});

const line1 = new Line({
  x0: 1, y0: 2, x1: 3, y1: 5,
});
const line2 = new Line({
  x0: 0, y0: 6, x1: 3, y1: 3,
});

console.log(line1.slope, line1.offset);
console.log(line2.slope, line2.offset);
console.log(Line.intersection({ line1, line2, oob: false }));
