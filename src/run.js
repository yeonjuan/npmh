const NodeChildProc = require("child_process");

/**
 * run script
 * @param {string} npmScript script to run
 * @returns {void}
 */
function script(npmScript) {
  const [manager, ...args] = npmScript.split(" ");

  NodeChildProc.spawnSync(manager, args, { stdio: "inherit" });
}

module.exports = {
  script
};
