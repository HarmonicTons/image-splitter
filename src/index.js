const images = require('images');

const img1 = images('img/dogo.jpg') // Load image from file
  .size(400) // Geometric scaling the image to 400 pixels width
  .save('img/output.png', { // Save the image to a file, with the quality of 50
    quality: 0, // 保存图片到文件,图片质量为50
  });

const img2 = images(img1, 50, 50, 100, 100);

img2.save('img/output.png', { // Save the image to a file, with the quality of 50
  quality: 100, // 保存图片到文件,图片质量为50
});

// TODO use geometry/Polygon.isInsidePolygon to cut out pixels to keep
