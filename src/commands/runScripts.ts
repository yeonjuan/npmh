import {
  getPackageJson,
  detectPackageManager,
  getRunCommand,
  isMonorepo,
  getWorkspacePackages,
  type ScriptTarget,
} from "../utils";
import { spawn } from "child_process";
import inquirer from "inquirer";

export async function runScripts() {
  try {
    const rootPackageJson = getPackageJson();
    const packageManager = detectPackageManager();
    const rootScripts = rootPackageJson?.scripts || {};
    const rootScriptNames = Object.keys(rootScripts);

    if (!isMonorepo(rootPackageJson)) {
      if (rootScriptNames.length === 0) {
        console.log("No scripts found in package.json");
        return;
      }

      const { selectedScript } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedScript",
          message: "Select a script to run:",
          choices: rootScriptNames.map((name) => ({
            name: `${name} - ${rootScripts[name]}`,
            value: name,
          })),
        },
      ]);

      const runCommand = getRunCommand(packageManager, selectedScript);
      console.log(`\nRunning: ${runCommand}\n`);

      const commandArgs = [selectedScript];
      const child = spawn(packageManager, commandArgs, {
        stdio: "inherit",
        shell: true,
      });

      child.on("close", (code) => {
        if (code !== 0) {
          console.log(`\nScript exited with code ${code}`);
        }
      });
      return;
    }

    const workspaces = getWorkspacePackages();
    const repositoryChoices = [];

    if (rootScriptNames.length > 0) {
      repositoryChoices.push({
        name: `Root (${rootScriptNames.length} scripts)`,
        value: { type: "root" },
      });
    }

    for (const workspace of workspaces) {
      const workspaceScriptCount = Object.keys(workspace.scripts).length;
      if (workspaceScriptCount > 0) {
        repositoryChoices.push({
          name: `${workspace.name} (${workspaceScriptCount} scripts)`,
          value: {
            type: "workspace",
            workspaceName: workspace.name,
            workspacePath: workspace.path,
            scripts: workspace.scripts,
          },
        });
      }
    }

    if (repositoryChoices.length === 0) {
      console.log(
        "No scripts found in root package.json or workspace packages",
      );
      return;
    }

    const { selectedRepo } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedRepo",
        message: "Select a repository:",
        choices: repositoryChoices,
      },
    ]);

    const scriptsToShow =
      selectedRepo.type === "root" ? rootScripts : selectedRepo.scripts;
    const scriptNames = Object.keys(scriptsToShow);

    const { selectedScript } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedScript",
        message: "Select a script to run:",
        choices: scriptNames.map((name) => ({
          name: `${name} - ${scriptsToShow[name]}`,
          value: name,
        })),
      },
    ]);

    const target: ScriptTarget =
      selectedRepo.type === "root"
        ? { type: "root" }
        : {
            type: "workspace",
            workspaceName: selectedRepo.workspaceName,
            workspacePath: selectedRepo.workspacePath,
          };

    const selected = {
      script: selectedScript,
      target,
    };

    const runCommand = getRunCommand(
      packageManager,
      selected.script,
      selected.target,
    );
    console.log(`\nRunning: ${runCommand}\n`);

    const commandArgs =
      selected.target.type === "root"
        ? [selected.script]
        : selected.target.type === "workspace" && packageManager === "yarn"
          ? ["workspace", selected.target.workspaceName, selected.script]
          : selected.target.type === "workspace" && packageManager === "pnpm"
            ? ["--filter", selected.target.workspaceName, selected.script]
            : [
                "run",
                selected.script,
                `--workspace=${selected.target.workspaceName}`,
              ];

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
