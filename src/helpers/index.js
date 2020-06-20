const project = require("../project");

/**
 * @param {string} path path
 * @param {string} id id
 * @param {string[]} args  args
 * @returns {void}
 */
function run(path, id, args) {
  const helper = require(`./${id}`);

  helper(
    project.createProject(path),
    args
  );
}

module.exports = {
  run
};
