import { PackageManager } from "../types";

export interface ScriptTarget {
  type: "root" | "workspace";
  workspaceName?: string;
  workspacePath?: string;
}

/**
 * Gets the command to run a script based on the package manager.
 * @param packageManager - The package manager being used.
 * @param script - The script to run.
 * @param target - The target (root or workspace) to run the script in.
 * @returns The command to run the script.
 */
export function getRunCommand(
  packageManager: PackageManager,
  script: string,
  target?: ScriptTarget,
): string {
  if (!target || target.type === "root") {
    switch (packageManager) {
      case PackageManager.YARN:
        return `yarn ${script}`;
      case PackageManager.PNPM:
        return `pnpm ${script}`;
      case PackageManager.NPM:
      default:
        return `npm run ${script}`;
    }
  }

  switch (packageManager) {
    case PackageManager.YARN:
      return `yarn workspace ${target.workspaceName} ${script}`;
    case PackageManager.PNPM:
      return `pnpm --filter ${target.workspaceName} ${script}`;
    case PackageManager.NPM:
    default:
      return `npm run ${script} --workspace=${target.workspaceName}`;
  }
}
