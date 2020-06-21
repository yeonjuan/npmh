const { Form } = require("enquirer");
const { basename } = require("path");

/**
 * @typedef {Object} PackageJsonInfo
 * @property {string} name name
 * @property {string} license license
 * @property {version} version version
 */

/**
 * @param {PackageJsonInfo} defaultInfo default information
 * @returns {Promise<PackageJsonInfo>} filled info
 */
function askPackageJsonInfo({
  name = "",
  license = "MIT",
  version = "1.0.0",
  author = "my name",
}) {
  return new Form({
    name: "packageJson",
    message: "Provide the package json information",
    choices: [
      { name: "name", message: "name", initial: name },
      { name: "author", message: "author", initial: author },
      { name: "version", message: "version", initial: version },
      { name: "license", message: "license", initial: license },
    ],
  }).run();
}

/**
 * @param {PackageJsonInfo} info information from user
 * @returns {string} package.json
 */
function createPackageJson(info) {
  return JSON.stringify(
    Object.assign({}, info, {
      scripts: {},
      devDependencies: {},
      dependencies: {},
    }),
    null,
    2
  );
}

module.exports = async function initPackageJson(project) {
  const packageJsonInfo = await askPackageJsonInfo({
    name: basename(project.getAbsolutePath("./")),
  });

  project.createFile("package.json", `${createPackageJson(packageJsonInfo)}\n`);
};
