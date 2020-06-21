const { Select } = require("enquirer");
const colors = require("colors");

/**
 * @param {string} script script.
 * @returns {string} styled script message.
 */
function stylingScriptMessage(script) {
  const scripts = script.split(" ");
  const last = scripts[scripts.length - 1];

  return [
    colors.dim(script.slice(0, script.lastIndexOf(" "))),
    colors.bold(last),
  ].join(" ");
}

/**
 * @typedef {Object} Answers
 * @property {boolean} script
 */

/**
 * @param {string[]} scripts script list.
 * @returns {Promise<Answers>} answers from user.
 */
function askScriptToRun(scripts) {
  return new Select({
    message: "Select a script to run",
    name: "script",
    choices: scripts.map((script) => ({
      name: script,
      message: stylingScriptMessage(script),
    })),
  }).run();
}

module.exports = async function runHelper(project) {
  const { script } = await askScriptToRun(project.getRunnableScripts());

  project.exec(script);
};
