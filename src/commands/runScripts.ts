import { getPackageJson, detectPackageManager, getRunCommand } from "../utils";
import { spawn } from "child_process";
import inquirer from "inquirer";

export async function runScripts() {
  try {
    const scripts = getPackageJson()?.scripts || {};
    const scriptNames = Object.keys(scripts);
    const packageManager = detectPackageManager();
    if (scriptNames.length === 0) {
      console.log("No scripts found in package.json");
      return;
    }

    const { selectedScript } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedScript",
        message: "Select a script to run:",
        choices: scriptNames.map((name) => ({
          name: `${name} - ${scripts[name]}`,
          value: name,
        })),
      },
    ]);

    const runCommand = getRunCommand(packageManager, selectedScript);

    console.log(`\nRunning: ${runCommand}\n`);

    const commandArgs =
      packageManager === "npm" ? ["run", selectedScript] : [selectedScript];

    const child = spawn(packageManager, commandArgs, {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code !== 0) {
        console.log(`\nScript exited with code ${code}`);
      }
    });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    process.exit(1);
  }
}
