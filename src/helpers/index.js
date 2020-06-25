const project = require('../project');

/**
 * @param {string} path path
 * @param {string} id id
 * @param {string[]} args  args
 * @returns {void}
 */
function run(path, id, args) {
  const helper = require(`./${id}`);

  const run = typeof helper.default === "function" ? helper.default : helper;
  run(project.createProject(path), args);
  
}

module.exports = {
  run,
};
