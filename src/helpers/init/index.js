const { Confirm } = require("enquirer");
const colors = require("colors");
const initGitignore = require("./init-gitignore");
const initPackageJson = require("./init-package-json");

const INIT_FILES = [
  {
    name: ".gitignore",
    init: initGitignore,
  },
  {
    name: "package.json",
    init: initPackageJson,
  },
];

/**
 * @param {string} file file name
 * @returns {Promise<{init: boolean}} answers
 */
function askInit(file) {
  return new Confirm({
    name: "init",
    message: `${colors.dim("creates")} ${file}?`,
    initial: true,
  }).run();
}

module.exports = async function runHelper(project) {
  const files = INIT_FILES.filter(({ name }) => !project.hasFile(name));

  for (let i = 0; i < files.length; i++) {
    const { name, init: initialize } = files[i];

    const init = await askInit(name);

    if (init) {
      await initialize(project);
    }
  }
};
