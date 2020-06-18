const { Confirm } = require("enquirer");
const colors = require("colors");
const initGitignore = require("./init-gitignore");

const INIT_FILES = [
  {
    name: ".gitignore",
    init: initGitignore
  }
];

/**
 * Ask init
 * @param {string} file file name
 * @returns {Promise<{init: boolean}} answers
 */
function askInit(file) {
  return (new Confirm({
    name: "init",
    message: `${colors.dim("creates")} ${file}?`,
    initial: true
  })).run();
}

module.exports = async function runHelper(project) {
  INIT_FILES
    .filter(({ name }) => !project.hasFile(name))
    .forEach(async({ name, init: initialize }) => {
      const init = await askInit(name);

      if (init) {
        console.log("init");
        initialize(project);
      }
    });
};
