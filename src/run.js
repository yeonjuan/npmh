const NodeChildProc = require("child_process");

/**
 * run script
 * @param {string} str script to run
 * @returns {void}
 */
function script(str) {
  const [command, ...args] = str.split(" ");

  NodeChildProc.spawnSync(command, args, { stdio: "inherit" });
}

module.exports = {
  script
};
