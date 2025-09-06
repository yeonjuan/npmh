import { join } from "path";
import { existsSync } from "fs";
import { PackageManager } from "../types";
import { getPackageJson } from "./getPackageJson";

/**
 * Detects the package manager used in the current project directory.
 * @param cwd - Current working directory, defaults to process.cwd()
 * @returns {PackageManager} - Detected package manager
 */
export function detectPackageManager(
  cwd: string = process.cwd(),
): PackageManager {
  const packageJson = getPackageJson(cwd);
  if (packageJson?.packageManager) {
    if (packageJson.packageManager.startsWith("yarn")) {
      return PackageManager.YARN;
    }
    if (packageJson.packageManager.startsWith("pnpm")) {
      return PackageManager.PNPM;
    }
    if (packageJson.packageManager.startsWith("npm")) {
      return PackageManager.NPM;
    }
  }
  const pnpmLockPath = join(cwd, "pnpm-lock.yaml");
  const yarnLockPath = join(cwd, "yarn.lock");
  const packageLockPath = join(cwd, "package-lock.json");

  if (existsSync(pnpmLockPath)) {
    return PackageManager.PNPM;
  }

  if (existsSync(yarnLockPath)) {
    return PackageManager.YARN;
  }

  if (existsSync(packageLockPath)) {
    return PackageManager.NPM;
  }

  return PackageManager.NPM;
}
