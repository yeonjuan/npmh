import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { PackageManager } from "./packageManager";
import { load as loadYaml } from "js-yaml";
import { join } from "path";
import { PackageJson, PackageManagerType } from "./types";

export class PnpmManager extends PackageManager {
  private cache: {
    hasWorkspaces: boolean | null;
    workspacePatterns: string[] | null;
  } = { hasWorkspaces: null, workspacePatterns: null };

  constructor(root: string, packageJson: PackageJson) {
    super(PackageManagerType.PNPM, root, packageJson);
  }

  getCommand(): string {
    return "pnpm";
  }

  getRootScriptCommandArgs(script: string): string[] {
    return ["run", script];
  }

  getWorkspaceScriptCommandArgs(
    script: string,
    packageJson: PackageJson,
  ): string[] {
    return ["run", "--filter", packageJson.name, script];
  }

  async hasWorkspaces(): Promise<boolean> {
    if (this.cache.hasWorkspaces !== null) {
      return this.cache.hasWorkspaces;
    }
    this.cache.hasWorkspaces = existsSync(
      join(this.root, "pnpm-workspace.yaml"),
    );
    return this.cache.hasWorkspaces;
  }

  async getWorkspacePatterns(): Promise<string[]> {
    if (this.cache.workspacePatterns !== null) {
      return this.cache.workspacePatterns;
    }
    const workspaceFile = join(this.root, "pnpm-workspace.yaml");
    const workspaceContent = await readFile(workspaceFile, "utf-8");
    const pnpmWorkspace = loadYaml(workspaceContent) as { packages?: string[] };
    this.cache.workspacePatterns = pnpmWorkspace.packages || [];
    return this.cache.workspacePatterns;
  }
}
