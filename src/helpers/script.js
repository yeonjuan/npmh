const enquirer = require("enquirer");
const colors = require("colors");
const run = require("../run");

/**
 * styling script
 * @param {string} script script
 * @returns {string} styled script
 */
function stylingScriptMessage(script) {
  const scripts = script.split(" ");
  const last = scripts[scripts.length - 1];

  return [
    colors.dim(script.slice(0, script.lastIndexOf(" "))),
    colors.bold(last)
  ].join(" ");
}

/**
 * Ask what script to run
 * @param {striing[]} scripts script list
 * @returns {Promise<Object>} dd
 */
function askScriptToRun(scripts) {
  return enquirer.prompt([
    {
      type: "select",
      message: "Select a script to run",
      name: "script",
      choices: scripts.map(script => ({
        name: script,
        message: stylingScriptMessage(script)
      }))
    }
  ]);
}

module.exports = async function runHelper(project) {
  const { script } = await askScriptToRun(
    project.getRunnableScripts()
  );

  run.script(script);
};
