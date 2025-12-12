import { PackageManager } from "./packageManager";
import { PackageJson, PackageManagerType } from "./types";

export class NpmManager extends PackageManager {
  constructor(root: string, packageJson: PackageJson) {
    super(PackageManagerType.NPM, root, packageJson);
  }

  getCommand(): string {
    return "npm";
  }

  getRootScriptCommandArgs(script: string): string[] {
    return ["run", script];
  }

  getWorkspaceScriptCommandArgs(
    script: string,
    packageJson: PackageJson,
  ): string[] {
    return ["run", script, "--workspace", packageJson.name];
  }

  async hasWorkspaces(): Promise<boolean> {
    if (!this.packageJson.workspaces) {
      return false;
    }
    return this.packageJson.workspaces.length > 0;
  }

  async getWorkspacePatterns(): Promise<string[]> {
    if (!this.packageJson.workspaces) {
      return [];
    }
    return this.packageJson.workspaces;
  }
}
