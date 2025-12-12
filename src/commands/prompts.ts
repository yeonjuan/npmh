import inquirer from "inquirer";
import { AnyPackageManager, Package, PackageJson } from "../package-managers";

export class Prompt {
  static async selectWorkspacePackage(packageManager: AnyPackageManager) {
    const workspacePackages = await packageManager.getWorkspacePackages();
    const rootPackage = await packageManager.getRootPackage();
    const rootPath = rootPackage.path;
    const choices = [
      { name: "root", value: rootPackage },
      ...workspacePackages.map((pkg) => {
        return {
          name: `${pkg.packageJson.name} (${pkg.path.replace(rootPath, "").replace(/^\//, "")})`,
          value: pkg,
        };
      }),
    ];
    return await inquirer.prompt<{
      selectedPackage: Package;
    }>([
      {
        type: "list",
        name: "selectedPackage",
        message: "Select a package:",
        choices,
      },
    ]);
  }

  static selectScript(packageJson: PackageJson) {
    const choices = Object.entries(packageJson.scripts || {}).map(
      ([name, command]) => {
        return {
          name: `${name} : "${command}"`,
          value: name,
        };
      },
    );
    return inquirer.prompt<{ selectedScript: string }>([
      {
        type: "list",
        name: "selectedScript",
        message: "Select a script:",
        choices,
      },
    ]);
  }
}
