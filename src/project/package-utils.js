const NodeFs = require("fs");
const NodePath = require("path");

/**
 * Read "package.json" file in the directory path, and returns it as a object.
 * @param {string} dirPath directory path
 * @returns {Object} package.json object
 * @throws {Error} Throw error if there is no "package.json" file.
 */
function readPackageJson(dirPath) {
  const packageJsonPath = NodePath.resolve(dirPath, "package.json");

  if (!NodeFs.existsSync(packageJsonPath)) {
    throw new Error(`Cannot find 'package.json' in ${dirPath}`);
  }

  const packageJsonFile = NodeFs.readFileSync(packageJsonPath);

  return JSON.parse(packageJsonFile);
}

/**
 * Infer the package manager
 * @param {string} dirPath directory path
 * @returns {("npm"|"yarn")} package manager name
 */
function inferManager(dirPath) {
  const hasYarnLock = NodeFs.existsSync(
    NodePath.resolve(dirPath, "yarn.lock")
  );

  return hasYarnLock ? "yarn" : "npm";
}

module.exports = {
  readPackageJson,
  inferManager
};
