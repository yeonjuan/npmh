import { join } from "path";
import { loadPackageJson } from "./helpers";
import { YarnManager } from "./yarnManager";
import { PnpmManager } from "./pnpmManager";
import { NpmManager } from "./npmManager";
import { existsSync } from "fs";

export async function createPackageManager(cwd: string) {
  const packageJson = await loadPackageJson(cwd);
  if (packageJson.packageManager) {
    if (packageJson.packageManager.startsWith("yarn")) {
      return new YarnManager(cwd, packageJson);
    }
    if (packageJson.packageManager.startsWith("pnpm")) {
      return new PnpmManager(cwd, packageJson);
    }
    if (packageJson.packageManager.startsWith("npm")) {
      return new NpmManager(cwd, packageJson);
    }
  }

  const pnpmLockPath = join(cwd, "pnpm-lock.yaml");
  if (existsSync(pnpmLockPath)) {
    return new PnpmManager(cwd, packageJson);
  }

  const yarnLockPath = join(cwd, "yarn.lock");
  if (existsSync(yarnLockPath)) {
    return new YarnManager(cwd, packageJson);
  }

  const packageLockPath = join(cwd, "package-lock.json");
  if (existsSync(packageLockPath)) {
    return new NpmManager(cwd, packageJson);
  }

  throw new Error("Unsupported package manager");
}
