const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
  delay,
  getRandom,
};
