const {
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync
} = require("fs");
const {
  resolve,
  basename
} = require("path");
const {
  spawnSync
} = require("child_process");

/** @module Project */

/**
 * @constructor
 * @param {string} path path of the project
 */
class Project {
  constructor(path) {
    this.path = path;

    if (this.hasFile("package.json")) {
      this.setupPackage();
    }
  }

  setupPackage() {
    this.packageJson = JSON.parse(this.readFile("package.json") || {});
    this.manager = this.hasFile("yarn.lock") ? "yarn" : "npm";
  }

  /**
   * @returns {string[]} scripts.
   */
  getRunnableScripts() {
    return Object
      .keys(this.packageJson.scripts)
      .map(script => `${this.manager} run ${script}`);
  }

  /**
   * @param {string} relPath relative path.
   * @returns {string} absolute path.
   */
  getAbsolutePath(relPath) {
    return resolve(this.path, relPath);
  }

  /**
   * @param {string} relPath relative path.
   * @returns {boolean} True if a file is exists, otherwise False.
   */
  hasFile(relPath) {
    return existsSync(this.getAbsolutePath(relPath));
  }

  /**
   * @param {string} relPath relative path
   * @param {string} contents contents to write on file.
   * @returns {void}
   */
  createFile(relPath, contents) {
    const path = this.getAbsolutePath(relPath);

    writeFileSync(path, contents);
    if (basename(relPath) === "package.json") {
      this.setupPackage();
    }
  }

  /**
   * @param {string} relPath relative path.
   * @returns {string} contents of file.
   */
  readFile(relPath) {
    return this.hasFile(relPath)
      ? readFileSync(this.getAbsolutePath(relPath), "utf-8")
      : "";
  }

  /**
   * @param {string} relPath relative path
   * @returns {void}
   */
  deleteFile(relPath) {
    unlinkSync(this.getAbsolutePath(relPath));
  }

  /**
   * @param {string} script script to exec.
   * @returns {void}
   */
  exec(script) {
    const [command, ...args] = script.split(" ");

    spawnSync(command, args, {
      stdio: "inherit",
      cwd: this.path
    });
  }
}

module.exports = {
  createProject(root) {
    return new Project(root);
  }
};
