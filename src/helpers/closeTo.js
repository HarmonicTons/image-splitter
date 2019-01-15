function closeTo(a, b, threshold = 0.001) {
  return Math.abs(a - b) <= threshold;
}

module.exports = closeTo;
