const packageUtils = require("./package-utils");

class Project {
  constructor(path) {
    this.packageJson = packageUtils.readPackageJson(path) || {};
    this.manager = packageUtils.inferManager(path);
  }

  getRunnableScripts() {
    return Object
      .keys(this.packageJson.scripts)
      .map(script => `${this.manager} run ${script}`);
  }
}

module.exports = {
  createProject(root) {
    return new Project(root);
  }
};
