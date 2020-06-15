const {
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync
} = require("fs");
const {
  resolve
} = require("path");
const {
  spawnSync
} = require("child_process");

/**
 * @constructor
 * @param {string} path path of the project
 */
class Project {
  constructor(path) {
    this.path = path;
    this.packageJson = JSON.parse(this.readFile("package.json") || {});
    this.manager = this.hasFile("yarn.lock") ? "yarn" : "npm";
  }

  /**
   * Returns runnable scripts in project.
   * @returns {string[]} scripts.
   */
  getRunnableScripts() {
    return Object
      .keys(this.packageJson.scripts)
      .map(script => `${this.manager} run ${script}`);
  }

  /**
   * Returns absolute path of file in project.
   * @param {string} relPath relative path.
   * @returns {string} absolute path.
   */
  getAbsolutePath(relPath) {
    return resolve(this.path, relPath);
  }

  /**
   * Checks whether a file exists or not.
   * @param {string} relPath relative path.
   * @returns {boolean} True if a file is exists, otherwise False.
   */
  hasFile(relPath) {
    return existsSync(this.getAbsolutePath(relPath));
  }

  /**
   * Create file at the project with contents
   * @param {string} relPath relative path
   * @param {string} contents contents to write on file.
   * @returns {void}
   */
  createFile(relPath, contents) {
    writeFileSync(this.getAbsolutePath(relPath), contents);
  }

  /**
   * Read file in project,
   * @param {string} relPath relative path.
   * @returns {string} contents of file.
   */
  readFile(relPath) {
    return this.hasFile(relPath)
      ? readFileSync(this.getAbsolutePath(relPath), "utf-8")
      : "";
  }

  /**
   * Delete file in project.
   * @param {string} relPath relative path
   * @returns {void}
   */
  deleteFile(relPath) {
    unlinkSync(this.getAbsolutePath(relPath));
  }

  /**
   * Exec script
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
