import { PackageManager } from "../types";

/**
 * Gets the command to run a script based on the package manager.
 * @param packageManager - The package manager being used.
 * @param script - The script to run.
 * @returns The command to run the script.
 */
export function getRunCommand(
  packageManager: PackageManager,
  script: string,
): string {
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
