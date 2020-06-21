const { resolve } = require("path");

module.exports = {
  getFixtures(additionalPath = "") {
    return resolve(__dirname, "fixtures", additionalPath);
  },
};
