import { readFile } from "fs/promises";
import { findPackageJsonsInDirectory } from "./helpers";
import { dirname } from "path";
import { Package, PackageJson, PackageManagerType } from "./types";

export abstract class PackageManager {
  constructor(
    public readonly type: PackageManagerType,
    protected root: string,
    protected packageJson: PackageJson,
  ) {}

  abstract hasWorkspaces(): Promise<boolean>;
  abstract getWorkspacePatterns(): Promise<string[]>;
  abstract getCommand(): string;
  abstract getRootScriptCommandArgs(script: string): string[];
  abstract getWorkspaceScriptCommandArgs(
    script: string,
    packageJson: PackageJson,
  ): string[];

  async getRootPackage(): Promise<Package> {
    return {
      path: this.root,
      packageJson: this.packageJson,
    };
  }

  async getWorkspacePackages(): Promise<Package[]> {
    const workspacePackages: Package[] = [];
    const patterns = await this.getWorkspacePatterns();
    const packageJsonPaths = await findPackageJsonsInDirectory(
      this.root,
      patterns,
      this.root,
    );
    for (const packageJsonPath of packageJsonPaths) {
      try {
        const packageJson: PackageJson = JSON.parse(
          await readFile(packageJsonPath, "utf-8"),
        );
        const workspacePath = dirname(packageJsonPath);
        workspacePackages.push({
          path: workspacePath,
          packageJson,
        });
      } catch (error) {
        console.error(
          `Error reading package.json at ${packageJsonPath}:`,
          error,
        );
      }
    }
    return workspacePackages;
  }
}
