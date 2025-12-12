import { spawn } from "child_process";
import { createPackageManager } from "../package-managers";
import { Prompt } from "./prompts";

export async function runScripts() {
  const packageManager = await createPackageManager(process.cwd());
  const command = packageManager.getCommand();

  if (await packageManager.hasWorkspaces()) {
    const { selectedPackage } =
      await Prompt.selectWorkspacePackage(packageManager);

    const { selectedScript } = await Prompt.selectScript(
      selectedPackage.packageJson,
    );
    const args = packageManager.getWorkspaceScriptCommandArgs(
      selectedScript,
      selectedPackage.packageJson,
    );
    const child = spawn(command, args, {
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

  const rootPackage = await packageManager.getRootPackage();
  const { selectedScript } = await Prompt.selectScript(rootPackage.packageJson);
  const args = packageManager.getRootScriptCommandArgs(selectedScript);
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });
  child.on("close", (code) => {
    if (code !== 0) {
      console.log(`\nScript exited with code ${code}`);
    }
  });
}
